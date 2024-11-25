using System;
using colaboracaoapi.Dtos;
using colaboracaoapi.Infra;
using colaboracaoapi.Models;
using Microsoft.EntityFrameworkCore;

namespace colaboracaoapi.Endpoints;

public static class ColaboracaoEndpoints
{
    public static void AdicionarColaboracaoEndpoints(this WebApplication app)
    {
        var grupo = app.MapGroup("/colaboracoes");

        grupo.MapGet("/", GetAsync);
        grupo.MapGet("/{Id}", GetByIdAsync);
        grupo.MapPost("", PostAsync).RequireAuthorization("AltosCrgs");
        grupo.MapPut("/{Id}", PutAsync).RequireAuthorization("AltosCrgs");
        grupo.MapDelete("/{Id}", DeleteAsync).RequireAuthorization("AltosCrgs");
    }

    private static async Task<IResult> GetAsync(ColaboracaoContext db)
    {
        var objetos = await db.Colaboracoes.ToListAsync();
        return TypedResults.Ok(objetos.Select(x => new ColaboracaoDTO(x)));
    }

    private static async Task<IResult> GetByIdAsync(string id, ColaboracaoContext db)
    {
        var obj = await db.Colaboracoes.FindAsync(Convert.ToInt64(id));

        if (obj == null)
            return TypedResults.NotFound();

        return TypedResults.Ok(new ColaboracaoDTO(obj));
    }

    private static async Task<IResult> PostAsync(ColaboracaoDTO dto, ColaboracaoContext db)
    {
        Colaboracao obj = dto.GetModel();
        obj.Id = GeradorId.GetId();
        await db.Colaboracoes.AddAsync(obj);
        await db.SaveChangesAsync();

        return TypedResults.Created($"colaboracoes/{obj.Id}", new ColaboracaoDTO(obj));
    }

    private static async Task<IResult> PutAsync(string id, ColaboracaoDTO dto, ColaboracaoContext db)
    {
        if (id != dto.Id)
            return TypedResults.BadRequest();

        var obj = await db.Colaboracoes.FindAsync(Convert.ToInt64(id));

        if (obj == null)
            return TypedResults.NotFound();

        dto.PreencherModel(obj);

        db.Colaboracoes.Update(obj);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static async Task<IResult> DeleteAsync(string id, ColaboracaoContext db)
    {
        var obj = await db.Colaboracoes.FindAsync(Convert.ToInt64(id));

        if (obj == null)
            return TypedResults.NotFound();

        db.Colaboracoes.Remove(obj);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }
}