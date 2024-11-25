using System;
using colaboracaoapi.Dtos;
using colaboracaoapi.Infra;
using colaboracaoapi.Models;
using colaboracaoapi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace colaboracaoapi.Endpoints;

public static class LoginEndpoints
{
    public static void AdicionarLoginEnpoints(this WebApplication app)
    {
        var grupo = app.MapGroup("/login");

        grupo.MapPost("/app", PostLoginAppAsync);
        grupo.MapPost("/navegador", PostLoginNavegadorAsync);
        grupo.MapGet("/navegador/logout", GetLogoutNavegador);
    }

    private static async Task<IResult> PostLoginAppAsync(LoginDTO infoLogin, ColaboracaoContext db, IPasswordHasher<Usuario> hasher)
    {
        var usuario = await db.Usuarios.FirstOrDefaultAsync(x => x.Email.Equals(infoLogin.Email));

        if (usuario == null)
            return TypedResults.Unauthorized();
        else if (hasher.VerifyHashedPassword(usuario, usuario.HashSenha, infoLogin.Senha) == PasswordVerificationResult.Failed)
            return TypedResults.Unauthorized();

        return TypedResults.Ok(new TokenService().Gerar(usuario));
    }

    private static async Task<IResult> PostLoginNavegadorAsync(LoginDTO infoLogin, ColaboracaoContext db, HttpContext contexto, IPasswordHasher<Usuario> hasher)
    {
        var usuario = await db.Usuarios.FirstOrDefaultAsync(x => x.Email.Equals(infoLogin.Email));

        if (usuario == null)
            return TypedResults.Unauthorized();
        else if (hasher.VerifyHashedPassword(usuario, usuario.HashSenha, infoLogin.Senha) == PasswordVerificationResult.Failed)
            return TypedResults.Unauthorized();

        var token = new TokenService().Gerar(usuario);

        contexto.Response.Cookies.Append(
            "accessToken",
            token
        ,
            new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
            }
        );
        var dto = new UsuarioDTO(usuario);
        return TypedResults.Ok(dto);
    }

    private static IResult GetLogoutNavegador(HttpContext contexto)
    {
        contexto.Response.Cookies.Delete("accessToken");

        return TypedResults.Ok();
    }
}
