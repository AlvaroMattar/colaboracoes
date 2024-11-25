using System;
using SnowflakeGenerator;

namespace colaboracaoapi.Infra;

public static class GeradorId
{
    static GeradorId()
    {
        Settings settings = new Settings
        {
            MachineID = 1,
            CustomEpoch = new DateTimeOffset(2024, 11, 20, 0, 0, 0, TimeSpan.Zero)
        };

        snowflake = new Snowflake(settings);
    }

    public static long GetId()
    {
        return snowflake.NextID();
    }

    private static readonly Snowflake snowflake;
}