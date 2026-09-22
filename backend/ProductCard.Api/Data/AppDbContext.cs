using Microsoft.EntityFrameworkCore;
using ProductCard.Api.Models;

namespace ProductCard.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<ProductCategory> ProductCategories => Set<ProductCategory>();
    public DbSet<ProductKind> ProductKinds => Set<ProductKind>();
    public DbSet<CharacteristicDefinition> CharacteristicDefinitions => Set<CharacteristicDefinition>();
    public DbSet<ProductKindCharacteristic> ProductKindCharacteristics => Set<ProductKindCharacteristic>();
    public DbSet<CharacteristicOption> CharacteristicOptions => Set<CharacteristicOption>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductVariation> ProductVariations => Set<ProductVariation>();
    public DbSet<CharacteristicValue> CharacteristicValues => Set<CharacteristicValue>();
    public DbSet<ProductFile> ProductFiles => Set<ProductFile>();
    public DbSet<LoyaltyTier> LoyaltyTiers => Set<LoyaltyTier>();
    public DbSet<Warehouse> Warehouses => Set<Warehouse>();
    public DbSet<ShipmentPoint> ShipmentPoints => Set<ShipmentPoint>();
    public DbSet<VariantAxis> VariantAxes => Set<VariantAxis>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ProductCategory>().HasIndex(x => x.Code).IsUnique();
        modelBuilder.Entity<ProductKind>().HasIndex(x => x.Code).IsUnique();
        modelBuilder.Entity<CharacteristicDefinition>().HasIndex(x => x.Code).IsUnique();

        modelBuilder.Entity<ProductKind>()
            .HasOne(x => x.Category)
            .WithMany(x => x.Kinds)
            .HasForeignKey(x => x.CategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProductKindCharacteristic>()
            .HasOne(x => x.ProductKind)
            .WithMany(x => x.Characteristics)
            .HasForeignKey(x => x.ProductKindId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProductKindCharacteristic>()
            .HasOne(x => x.Definition)
            .WithMany()
            .HasForeignKey(x => x.CharacteristicDefinitionId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<CharacteristicOption>()
            .HasOne(x => x.ProductKindCharacteristic)
            .WithMany(x => x.Options)
            .HasForeignKey(x => x.ProductKindCharacteristicId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Product>()
            .HasOne(x => x.ProductKind)
            .WithMany()
            .HasForeignKey(x => x.ProductKindId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<ProductFile>()
            .HasOne(x => x.Product)
            .WithMany(x => x.Files)
            .HasForeignKey(x => x.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ProductVariation>()
            .HasOne(x => x.Product)
            .WithMany(x => x.Variations)
            .HasForeignKey(x => x.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<CharacteristicValue>()
            .HasOne(x => x.Product)
            .WithMany(x => x.Values)
            .HasForeignKey(x => x.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<CharacteristicValue>()
            .HasOne(x => x.Variation)
            .WithMany(x => x.Values)
            .HasForeignKey(x => x.VariationId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Product>().HasIndex(x => x.UpdatedAt);
        modelBuilder.Entity<CharacteristicValue>().HasIndex(x => new { x.ProductId, x.VariationId, x.Code });
        modelBuilder.Entity<ProductFile>().HasIndex(x => new { x.ProductId, x.Role });
    }
}
