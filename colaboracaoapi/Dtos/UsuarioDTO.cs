using System;
using colaboracaoapi.Models;

namespace colaboracaoapi.Dtos;

public class UsuarioDTO
{
    public UsuarioDTO() { }
    public UsuarioDTO(Usuario obj)
    {
        Id = obj.Id.ToString();
        Nome = obj.Nome;
        Email = obj.Email;
        Role = obj.Role;
        if(obj.ColaboracaoId != null){
            ColaboracaoId = obj.ColaboracaoId.ToString();
        }
    }

    public string Id { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? ColaboracaoId { get; set; } = null;

    public Usuario GetModel()
    {
        var obj = new Usuario();
        PreencherModel(obj);
        return obj;
    }

    public void PreencherModel(Usuario obj)
    {
        long.TryParse(this.Id, out long id);
        obj.Id = id;
        obj.Nome = this.Nome;
        obj.Email = this.Email;
        obj.Role = this.Role;

        if(this.ColaboracaoId != null){
            long.TryParse(this.ColaboracaoId, out long Cid);
            obj.ColaboracaoId = Cid;
        }
    }
}