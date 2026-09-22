namespace ProductCard.Api.Models;

public class ProductCategory
{
    public Guid Id { get; set; }
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";
    public int SortOrder { get; set; }
    public List<ProductKind> Kinds { get; set; } = new();
}

public class ProductKind
{
    public Guid Id { get; set; }
    public Guid CategoryId { get; set; }
    public ProductCategory Category { get; set; } = null!;
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";
    public int SortOrder { get; set; }
    public List<ProductKindCharacteristic> Characteristics { get; set; } = new();
}

public class CharacteristicDefinition
{
    public Guid Id { get; set; }
    public string Code { get; set; } = "";
    public string Name { get; set; } = "";
    public string GroupName { get; set; } = "";
    public int GroupOrder { get; set; }
    public int SortOrder { get; set; }
}

public class ProductKindCharacteristic
{
    public Guid Id { get; set; }
    public Guid ProductKindId { get; set; }
    public ProductKind ProductKind { get; set; } = null!;
    public Guid CharacteristicDefinitionId { get; set; }
    public CharacteristicDefinition Definition { get; set; } = null!;
    public string InputType { get; set; } = "text";
    public bool AllowCustom { get; set; }
    public string? UnitGroup { get; set; }
    public bool IsRequired { get; set; }
    public int SortOrder { get; set; }
    public List<CharacteristicOption> Options { get; set; } = new();
}

public class CharacteristicOption
{
    public Guid Id { get; set; }
    public Guid ProductKindCharacteristicId { get; set; }
    public ProductKindCharacteristic ProductKindCharacteristic { get; set; } = null!;
    public string Value { get; set; } = "";
    public string Label { get; set; } = "";
    public int SortOrder { get; set; }
}

public class Product
{
    public Guid Id { get; set; }
    public string Status { get; set; } = "draft";
    public int CurrentStage { get; set; } = 1;

    public string? AuthorLastName { get; set; }
    public string? AuthorFirstName { get; set; }
    public string? AuthorMiddleName { get; set; }

    public string? Currency { get; set; }
    public string? Price { get; set; }
    public bool WantsVariants { get; set; }

    public string? TradeName { get; set; }
    public string? BrandName { get; set; }
    public string? ManufacturerName { get; set; }
    public string? ManufacturerCountry { get; set; }
    public string? ProductIdentifier { get; set; }
    public string? InternalArticle { get; set; }

    public string? Purpose { get; set; }
    public Guid? ProductKindId { get; set; }
    public ProductKind? ProductKind { get; set; }
    public string? ProductName { get; set; }
    public string? CategoryPath { get; set; }
    public string? ProductLine { get; set; }

    public string? Description { get; set; }
    public string? Complectation { get; set; }
    public string? ApplicationArea { get; set; }
    public string? StorageConditions { get; set; }
    public string? Precautions { get; set; }

    public string? FullName { get; set; }
    public bool NameIncludesLogo { get; set; }
    public bool NameIncludesType { get; set; }
    public bool NameIncludesBrand { get; set; }
    public bool NameIncludesLine { get; set; }
    public bool NameIncludesModel { get; set; }

    public string? PackType { get; set; }
    public string? PackMaterial { get; set; }
    public string? PackMaterialCustom { get; set; }
    public string? PackBoxNote { get; set; }
    public string? PackCaseNote { get; set; }
    public string? PackBlisterNote { get; set; }
    public string? PackSizeUnit { get; set; }
    public string? PackLength { get; set; }
    public string? PackWidth { get; set; }
    public string? PackHeight { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public List<CharacteristicValue> Values { get; set; } = new();
    public List<ProductVariation> Variations { get; set; } = new();
    public List<ProductFile> Files { get; set; } = new();
}

public class ProductVariation
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public string? Article { get; set; }
    public string? Model { get; set; }
    public string? Currency { get; set; }
    public string? Price { get; set; }
    public string? Description { get; set; }
    public string? Complectation { get; set; }
    public string? ApplicationArea { get; set; }
    public string? StorageConditions { get; set; }
    public string? Precautions { get; set; }
    public string? FullName { get; set; }
    public bool NameIncludesLogo { get; set; }
    public bool NameIncludesType { get; set; }
    public bool NameIncludesBrand { get; set; }
    public bool NameIncludesLine { get; set; }
    public bool NameIncludesModel { get; set; }
    public string? PackType { get; set; }
    public string? PackMaterial { get; set; }
    public string? PackMaterialCustom { get; set; }
    public string? PackSizeUnit { get; set; }
    public string? PackLength { get; set; }
    public string? PackWidth { get; set; }
    public string? PackHeight { get; set; }
    public int SortOrder { get; set; }
    public string ReviewStatus { get; set; } = "filling";
    public string? ApprovedSignature { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<CharacteristicValue> Values { get; set; } = new();
}

public class CharacteristicValue
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid? VariationId { get; set; }
    public ProductVariation? Variation { get; set; }
    public string Code { get; set; } = "";
    public string? Value { get; set; }
    public string? CustomValue { get; set; }
    public string? Unit { get; set; }
}

public class ProductFile
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public Guid? VariationId { get; set; }
    public string Role { get; set; } = "";
    public string? DocumentType { get; set; }
    public string OriginalName { get; set; } = "";
    public string StoredName { get; set; } = "";
    public string ContentType { get; set; } = "";
    public long Size { get; set; }
    public int SortOrder { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class LoyaltyTier
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Guid? VariationId { get; set; }
    public bool Enabled { get; set; } = true;
    public string? FromQuantity { get; set; }
    public string? ToQuantity { get; set; }
    public string? Value { get; set; }
    public int SortOrder { get; set; }
}

public class Warehouse
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? PostalCode { get; set; }
    public string? Region { get; set; }
    public string? City { get; set; }
    public string? Street { get; set; }
    public string? House { get; set; }
    public string? Office { get; set; }
    public string AddressLine { get; set; } = "";
    public int SortOrder { get; set; }
}

public class ShipmentPoint
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Guid? VariationId { get; set; }
    public Guid? WarehouseId { get; set; }
    public string? Name { get; set; }
    public string? PostalCode { get; set; }
    public string? Region { get; set; }
    public string? City { get; set; }
    public string? Street { get; set; }
    public string? House { get; set; }
    public string? Office { get; set; }
    public string AddressLine { get; set; } = "";
    public bool Active { get; set; } = true;
    public string? Quantity { get; set; }
    public int SortOrder { get; set; }
}

public class VariantAxis
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public string Code { get; set; } = "";
}
