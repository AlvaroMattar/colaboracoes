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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Colaboracao>()
        .HasMany(b => b.Usuarios)
        .WithOne(c => c.Colaboracao)
        .OnDelete(DeleteBehavior.SetNull);
    }

    private readonly string caminho;
}