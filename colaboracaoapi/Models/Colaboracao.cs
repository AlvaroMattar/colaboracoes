using System;

namespace colaboracaoapi.Models;

public class Colaboracao
{
    public long Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int NumColaboradores { get; set; }
    public string Endereco { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public ICollection<Usuario> Usuarios { get; } = [];
}