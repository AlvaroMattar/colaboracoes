using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using colaboracaoapi.Models;
using Microsoft.IdentityModel.Tokens;

namespace colaboracaoapi.Services;

public class TokenService
{
    public string Gerar(Usuario usuario)
    {
        var handler = new JwtSecurityTokenHandler();

        var token = handler.CreateToken(GetTokenDescriptor(usuario));

        return handler.WriteToken(token);
    }

    private static SecurityTokenDescriptor GetTokenDescriptor(Usuario usuario)
    {
        return new SecurityTokenDescriptor
        {
            Subject = GerarClaims(usuario),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = GetCredentials(),
        };
    }

    private static SigningCredentials GetCredentials()
    {
        var key = Encoding.ASCII.GetBytes(Config.Instancia.ChavePrivada ?? "");

        return new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature
        );
    }

    private static ClaimsIdentity GerarClaims(Usuario usuario)
    {
        var ci = new ClaimsIdentity();

        ci.AddClaim(new Claim(ClaimTypes.Name, usuario.Email));
        ci.AddClaim(new Claim(ClaimTypes.Role, usuario.Role));

        return ci;
    }
}