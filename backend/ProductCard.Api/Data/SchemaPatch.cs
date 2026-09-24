using System.Data;
using Microsoft.EntityFrameworkCore;

namespace ProductCard.Api.Data;

public static class SchemaPatch
{
    public static void Apply(AppDbContext db)
    {
        var connection = db.Database.GetDbConnection();
        if (connection.State != ConnectionState.Open)
            connection.Open();

        AddColumn(connection, "Products", "AuthorLastName", "TEXT NULL");
        AddColumn(connection, "Products", "AuthorFirstName", "TEXT NULL");
        AddColumn(connection, "Products", "AuthorMiddleName", "TEXT NULL");
        AddColumn(connection, "Products", "Currency", "TEXT NULL");
        AddColumn(connection, "Products", "Price", "TEXT NULL");
        AddColumn(connection, "Products", "WantsVariants", "INTEGER NOT NULL DEFAULT 0");
        AddColumn(connection, "Products", "PackMaterial", "TEXT NULL");
        AddColumn(connection, "Products", "PackMaterialCustom", "TEXT NULL");

        AddColumn(connection, "ProductFiles", "VariationId", "TEXT NULL");

        AddColumn(connection, "ProductVariations", "Currency", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "Price", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "Description", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "Complectation", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "ApplicationArea", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "StorageConditions", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "Precautions", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "FullName", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "NameIncludesLogo", "INTEGER NOT NULL DEFAULT 0");
        AddColumn(connection, "ProductVariations", "NameIncludesType", "INTEGER NOT NULL DEFAULT 0");
        AddColumn(connection, "ProductVariations", "NameIncludesBrand", "INTEGER NOT NULL DEFAULT 0");
        AddColumn(connection, "ProductVariations", "NameIncludesLine", "INTEGER NOT NULL DEFAULT 0");
        AddColumn(connection, "ProductVariations", "NameIncludesModel", "INTEGER NOT NULL DEFAULT 0");
        AddColumn(connection, "ProductVariations", "PackType", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "PackMaterial", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "PackMaterialCustom", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "PackSizeUnit", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "PackLength", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "PackWidth", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "PackHeight", "TEXT NULL");
        AddColumn(connection, "ProductVariations", "ReviewStatus", "TEXT NOT NULL DEFAULT 'filling'");
        AddColumn(connection, "ProductVariations", "ApprovedSignature", "TEXT NULL");

        Execute(connection, """
            CREATE TABLE IF NOT EXISTS LoyaltyTiers (
                Id TEXT NOT NULL CONSTRAINT PK_LoyaltyTiers PRIMARY KEY,
                ProductId TEXT NOT NULL,
                VariationId TEXT NULL,
                Enabled INTEGER NOT NULL,
                FromQuantity TEXT NULL,
                ToQuantity TEXT NULL,
                Value TEXT NULL,
                SortOrder INTEGER NOT NULL
            );
            """);
        Execute(connection, """
            CREATE TABLE IF NOT EXISTS ShipmentPoints (
                Id TEXT NOT NULL CONSTRAINT PK_ShipmentPoints PRIMARY KEY,
                ProductId TEXT NOT NULL,
                VariationId TEXT NULL,
                Name TEXT NULL,
                PostalCode TEXT NULL,
                Region TEXT NULL,
                City TEXT NULL,
                Street TEXT NULL,
                House TEXT NULL,
                Office TEXT NULL,
                AddressLine TEXT NOT NULL,
                Active INTEGER NOT NULL,
                Quantity TEXT NULL,
                SortOrder INTEGER NOT NULL
            );
            """);
        AddColumn(connection, "ShipmentPoints", "WarehouseId", "TEXT NULL");
        Execute(connection, """
            CREATE TABLE IF NOT EXISTS Warehouses (
                Id TEXT NOT NULL CONSTRAINT PK_Warehouses PRIMARY KEY,
                Name TEXT NULL,
                PostalCode TEXT NULL,
                Region TEXT NULL,
                City TEXT NULL,
                Street TEXT NULL,
                House TEXT NULL,
                Office TEXT NULL,
                AddressLine TEXT NOT NULL,
                SortOrder INTEGER NOT NULL
            );
            """);
        Execute(connection, """
            CREATE TABLE IF NOT EXISTS VariantAxes (
                Id TEXT NOT NULL CONSTRAINT PK_VariantAxes PRIMARY KEY,
                ProductId TEXT NOT NULL,
                Code TEXT NOT NULL
            );
            """);
    }

    private static void AddColumn(System.Data.Common.DbConnection connection, string table, string column, string definition)
    {
        var names = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        using (var command = connection.CreateCommand())
        {
            command.CommandText = $"PRAGMA table_info(\"{table}\");";
            using var reader = command.ExecuteReader();
            while (reader.Read())
                names.Add(reader.GetString(1));
        }

        if (names.Count == 0 || names.Contains(column))
            return;

        Execute(connection, $"ALTER TABLE \"{table}\" ADD COLUMN \"{column}\" {definition};");
    }

    private static void Execute(System.Data.Common.DbConnection connection, string sql)
    {
        using var command = connection.CreateCommand();
        command.CommandText = sql;
        command.ExecuteNonQuery();
    }
}
