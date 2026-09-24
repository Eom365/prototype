using System.Data.Common;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace ProductCard.Api.Data;

public class SqlitePragmaInterceptor : DbConnectionInterceptor
{
    public override void ConnectionOpened(DbConnection connection, ConnectionEndEventData eventData)
    {
        Apply(connection);
        base.ConnectionOpened(connection, eventData);
    }

    public override async Task ConnectionOpenedAsync(
        DbConnection connection,
        ConnectionEndEventData eventData,
        CancellationToken cancellationToken = default)
    {
        Apply(connection);
        await base.ConnectionOpenedAsync(connection, eventData, cancellationToken);
    }

    private static void Apply(DbConnection connection)
    {
        foreach (var sql in new[]
                 {
                     "PRAGMA busy_timeout=5000;",
                     "PRAGMA journal_mode=WAL;",
                     "PRAGMA foreign_keys=ON;"
                 })
        {
            using var command = connection.CreateCommand();
            command.CommandText = sql;
            command.ExecuteNonQuery();
        }
    }
}
