using System;
using colaboracaoapi.Dtos;
using colaboracaoapi.Infra;
using colaboracaoapi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace colaboracaoapi.Endpoints;

public static class UsuarioEndpoints
{
    public static void AdicionarUsuarioEnpoints(this WebApplication app)
    {
        var grupo = app.MapGroup("/usuarios");

        grupo.MapGet("/", GetAsync).RequireAuthorization("TodosCrgs");
        grupo.MapGet("/{id}", GetByIdAsync).RequireAuthorization("TodosCrgs");
        grupo.MapPost("/", PostAsync);
        grupo.MapPost("/admin", PostAdminAsync).RequireAuthorization("Admin");
        grupo.MapPatch("/{id}/{senhaAnterior}/{senhaNova}", PatchAlteraSenhaAsync)
            .RequireAuthorization("TodosCrgs");
        grupo.MapPut("/{id}", PutAsync).RequireAuthorization("Admin");
        grupo.MapPut("/participar/{id}", PutParticiparAsync).RequireAuthorization("TodosCrgs");
        grupo.MapDelete("/{id}", DeleteAsync).RequireAuthorization("Admin");
    }

    private static async Task<IResult> GetAsync(ColaboracaoContext db)
    {
        var objetos = await db.Usuarios.ToListAsync();
        return TypedResults.Ok(objetos.Select(x => new UsuarioDTO(x)));
    }

    private static async Task<IResult> GetByIdAsync(string id, ColaboracaoContext db)
    {
        var obj = await db.Usuarios.FindAsync(Convert.ToInt64(id));

        if (obj == null)
            return TypedResults.NotFound();

        return TypedResults.Ok(new UsuarioDTO(obj));
    }

    private static async Task<IResult> PostAsync(UsuarioDTO dto, ColaboracaoContext db, IPasswordHasher<Usuario> hasher)
    {
        Usuario obj = dto.GetModel();
        obj.Id = GeradorId.GetId();
        obj.Role = "comum";
        obj.HashSenha = hasher.HashPassword(obj, dto.Senha);
        await db.Usuarios.AddAsync(obj);
        await db.SaveChangesAsync();

        return TypedResults.Created($"usuarios/{obj.Id}", new UsuarioDTO(obj));
    }

    private static async Task<IResult> PostAdminAsync(UsuarioDTO dto, ColaboracaoContext db, IPasswordHasher<Usuario> hasher)
    {
        Usuario obj = dto.GetModel();
        obj.Id = GeradorId.GetId();
        obj.Role = "admin";
        obj.HashSenha = hasher.HashPassword(obj, dto.Senha);
        await db.Usuarios.AddAsync(obj);
        await db.SaveChangesAsync();

        return TypedResults.Created($"usuarios/{obj.Id}", new UsuarioDTO(obj));
    }

    private static async Task<IResult> PatchAlteraSenhaAsync(string id, string senhaAnterior, string senhaNova, ColaboracaoContext db, IPasswordHasher<Usuario> hasher, HttpContext contexto)
    {
        var obj = await db.Usuarios.FindAsync(Convert.ToInt64(id));

        if (obj == null)
            return TypedResults.NotFound();

        if (!obj.Email.Equals(contexto?.User?.Identity?.Name))
            return TypedResults.Forbid();

        if (string.IsNullOrEmpty(obj.HashSenha) || hasher.VerifyHashedPassword(obj, obj.HashSenha, senhaAnterior) != PasswordVerificationResult.Failed)
            obj.HashSenha = hasher.HashPassword(obj, senhaNova);
        else
            return TypedResults.Unauthorized();

        db.Usuarios.Update(obj);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static async Task<IResult> PutAsync(string id, UsuarioDTO dto, ColaboracaoContext db)
    {
        if (id != dto.Id)
            return TypedResults.BadRequest();

        var obj = await db.Usuarios.FindAsync(Convert.ToInt64(id));

        if (obj == null)
            return TypedResults.NotFound();

        dto.PreencherModel(obj);

        db.Usuarios.Update(obj);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static async Task<IResult> PutParticiparAsync(string id, UsuarioDTO dto, ColaboracaoContext db)
    {
        if (id != dto.Id)
            return TypedResults.BadRequest();

        var obj = await db.Usuarios.FindAsync(Convert.ToInt64(id));

        if (obj == null)
            return TypedResults.NotFound();

        if(dto.ColaboracaoId != null){
            long.TryParse(dto.ColaboracaoId, out long Cid);
            obj.ColaboracaoId = Cid;
        }

        db.Usuarios.Update(obj);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }

    private static async Task<IResult> DeleteAsync(string id, ColaboracaoContext db)
    {
        var obj = await db.Usuarios.FindAsync(Convert.ToInt64(id));

        if (obj == null)
            return TypedResults.NotFound();

        db.Usuarios.Remove(obj);
        await db.SaveChangesAsync();

        return TypedResults.NoContent();
    }
}
