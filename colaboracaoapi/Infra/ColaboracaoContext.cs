using System;
using colaboracaoapi.Models;
using Microsoft.EntityFrameworkCore;

namespace colaboracaoapi.Infra;

public class ColaboracaoContext : DbContext
{
    public DbSet<Colaboracao> Colaboracoes { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }

    public ColaboracaoContext()
    {
        caminho = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "colaboracao.db");
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={caminho}");
    }

    private readonly string caminho;
}