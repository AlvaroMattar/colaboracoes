using System;
using colaboracaoapi.Models;

namespace colaboracaoapi.Dtos;

public class ColaboracaoDTO
{
    public ColaboracaoDTO() { }
    public ColaboracaoDTO(Colaboracao obj)
    {
        Id = obj.Id.ToString();
        Nome = obj.Nome;
        NumColaboradores = obj.NumColaboradores;
        Endereco = obj.Endereco;
        Descricao = obj.Descricao;
    }
    public string Id { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public int NumColaboradores { get; set; }
    public string Endereco { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;

    public Colaboracao GetModel()
    {
        var obj = new Colaboracao();
        PreencherModel(obj);
        return obj;
    }

    public void PreencherModel(Colaboracao obj)
    {
        long.TryParse(this.Id, out long id);
        obj.Id = id;
        obj.Nome = this.Nome;
        obj.NumColaboradores = this.NumColaboradores;
        obj.Endereco = this.Endereco;
        obj.Descricao = this.Descricao;
    }
}