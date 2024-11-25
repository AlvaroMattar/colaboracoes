using System;

namespace colaboracaoapi;

public class Config
{
    public string? ChavePrivada { get; set; }

    public static Config Instancia => instancia ??= new Config
    {
        ChavePrivada =
            Environment.GetEnvironmentVariable("AUTH_CHAVE_PRIVADA")
    };

    private Config() { }
    private static Config? instancia = null;
}
