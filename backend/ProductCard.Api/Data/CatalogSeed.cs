using ProductCard.Api.Models;

namespace ProductCard.Api.Data;

public static class CatalogSeed
{
    private sealed record FieldSpec(
        string Code,
        string InputType,
        bool AllowCustom,
        string? UnitGroup,
        (string Value, string Label)[] Options);

    public static void Seed(AppDbContext db)
    {
        DropIncreasing(db);
        ImportWarehouses(db);

        if (db.ProductKinds.Any())
        {
            EnsureAerosolFields(db);
            return;
        }

        var handpieces = new ProductCategory
        {
            Id = Guid.NewGuid(),
            Code = "handpieces",
            Name = "Стоматологические наконечники",
            SortOrder = 1
        };
        var aerosols = new ProductCategory
        {
            Id = Guid.NewGuid(),
            Code = "aerosols",
            Name = "Аэрозольная продукция",
            SortOrder = 2
        };
        db.ProductCategories.AddRange(handpieces, aerosols);

        var kinds = new Dictionary<string, ProductKind>
        {
            ["contra_angle"] = Kind(handpieces, "contra_angle", "Угловой наконечник", 1),
            ["straight"] = Kind(handpieces, "straight", "Прямой наконечник", 2),
            ["turbine"] = Kind(handpieces, "turbine", "Турбинный наконечник", 3),
            ["lubricant"] = Kind(aerosols, "lubricant", "Масло для смазки", 1),
            ["cleaner"] = Kind(aerosols, "cleaner", "Очиститель", 2)
        };
        db.ProductKinds.AddRange(kinds.Values);

        var definitions = Definitions();
        db.CharacteristicDefinitions.AddRange(definitions.Values);
        db.SaveChanges();

        var links = new List<ProductKindCharacteristic>();
        foreach (var code in new[] { "contra_angle", "straight" })
            links.AddRange(Links(kinds[code], definitions, ContraFields()));
        links.AddRange(Links(kinds["turbine"], definitions, TurbineFields()));
        links.AddRange(Links(kinds["lubricant"], definitions, AerosolFields()));
        links.AddRange(Links(kinds["cleaner"], definitions, AerosolFields()));

        db.ProductKindCharacteristics.AddRange(links);
        db.SaveChanges();
    }

    private static void DropIncreasing(AppDbContext db)
    {
        var kind = db.ProductKinds.FirstOrDefault(item => item.Code == "increasing");
        if (kind == null)
            return;

        var products = db.Products.Where(product => product.ProductKindId == kind.Id).ToList();
        foreach (var product in products)
        {
            product.ProductKindId = null;
            if (product.CategoryPath != null && product.CategoryPath.Contains("Повышающий"))
                product.CategoryPath = null;
        }

        db.SaveChanges();
        db.ProductKinds.Remove(kind);
        db.SaveChanges();
    }

    private static ProductKind Kind(ProductCategory category, string code, string name, int sort) => new()
    {
        Id = Guid.NewGuid(),
        CategoryId = category.Id,
        Code = code,
        Name = name,
        SortOrder = sort
    };

    private static Dictionary<string, CharacteristicDefinition> Definitions()
    {
        (string Code, string Name, string Group, int GroupOrder, int Sort)[] rows =
        [
            ("model", "Модель", "Основные", 1, 1),
            ("article", "Артикул", "Основные", 1, 2),
            ("weight", "Вес", "Основные", 1, 3),
            ("weightTolerance", "Погрешность веса", "Основные", 1, 4),
            ("length", "Длина", "Габариты", 2, 1),
            ("width", "Ширина", "Габариты", 2, 2),
            ("height", "Высота", "Габариты", 2, 3),
            ("brand", "Бренд", "Производитель", 3, 1),
            ("manufacturer", "Производитель", "Производитель", 3, 2),
            ("country", "Страна производства", "Производитель", 3, 3),
            ("gearRatio", "Передаточное отношение", "Технические характеристики", 4, 1),
            ("quickConnect", "Тип подключения к быстросъемному соединению", "Технические характеристики", 4, 1),
            ("headAngle", "Угол наклона головки", "Технические характеристики", 4, 2),
            ("maxSpeed", "Максимальная скорость (об/мин)", "Технические характеристики", 4, 3),
            ("light", "Свет", "Освещение", 5, 1),
            ("lightSource", "Источник света", "Освещение", 5, 2),
            ("coolingType", "Тип охлаждения", "Система охлаждения", 6, 1),
            ("sprayPoints", "Количество точек спрея", "Система охлаждения", 6, 2),
            ("burLock", "Механизм фиксации бора", "Механические характеристики", 7, 1),
            ("motorConnection", "Тип соединения с микромотором", "Механические характеристики", 7, 2),
            ("headSize", "Размер головки", "Головка", 8, 1),
            ("bodyMaterial", "Материал корпуса", "Материал", 9, 1),
            ("bodyCoating", "Покрытие корпуса", "Материал", 9, 2),
            ("warranty", "Гарантия производителя", "Гарантия", 10, 1),
            ("agentType", "Тип средства", "Средство", 4, 1),
            ("connectionType", "Тип соединения", "Средство", 4, 2),
            ("volume", "Объём", "Средство", 4, 3)
        ];

        return rows.ToDictionary(
            row => row.Code,
            row => new CharacteristicDefinition
            {
                Id = Guid.NewGuid(),
                Code = row.Code,
                Name = row.Name,
                GroupName = row.Group,
                GroupOrder = row.GroupOrder,
                SortOrder = row.Sort
            });
    }

    private static FieldSpec Text(string code) =>
        new(code, "text", false, null, Array.Empty<(string, string)>());

    private static FieldSpec Measure(string code, string unitGroup) =>
        new(code, "text", false, unitGroup, Array.Empty<(string, string)>());

    private static FieldSpec Choice(string code, bool allowCustom, params (string Value, string Label)[] options) =>
        new(code, "choice", allowCustom, null, options);

    private static FieldSpec[] AerosolOnlyFields() =>
    [
        Choice("agentType", false, ("oil", "Масло"), ("cleaner", "Очиститель")),
        Choice("connectionType", true, ("thread", "Резьба")),
        Choice("volume", true, ("650", "650 мл"), ("800", "800 мл"))
    ];

    private static FieldSpec[] AerosolFields() =>
    [
        ..CommonFields(),
        ..AerosolOnlyFields()
    ];

    private static void EnsureAerosolFields(AppDbContext db)
    {
        (string Code, string Name, int Sort)[] rows =
        [
            ("agentType", "Тип средства", 1),
            ("connectionType", "Тип соединения", 2),
            ("volume", "Объём", 3)
        ];
        foreach (var row in rows)
        {
            if (db.CharacteristicDefinitions.Any(item => item.Code == row.Code))
                continue;
            db.CharacteristicDefinitions.Add(new CharacteristicDefinition
            {
                Id = Guid.NewGuid(),
                Code = row.Code,
                Name = row.Name,
                GroupName = "Средство",
                GroupOrder = 4,
                SortOrder = row.Sort
            });
        }

        db.SaveChanges();
        var definitions = db.CharacteristicDefinitions
            .Where(item => rows.Select(row => row.Code).Contains(item.Code))
            .ToDictionary(item => item.Code);

        foreach (var kindCode in new[] { "lubricant", "cleaner" })
        {
            var kind = db.ProductKinds.FirstOrDefault(item => item.Code == kindCode);
            if (kind == null || definitions.Count < rows.Length)
                continue;
            var linked = db.ProductKindCharacteristics
                .Where(item => item.ProductKindId == kind.Id)
                .Select(item => item.CharacteristicDefinitionId)
                .ToHashSet();
            var order = db.ProductKindCharacteristics.Count(item => item.ProductKindId == kind.Id);
            foreach (var spec in AerosolOnlyFields())
            {
                var definition = definitions[spec.Code];
                if (linked.Contains(definition.Id))
                    continue;
                order++;
                var links = Links(kind, definitions, [spec]).ToList();
                foreach (var link in links)
                    link.SortOrder = order;
                db.ProductKindCharacteristics.AddRange(links);
            }
        }

        EnsureVolumeAllowCustom(db);
        db.SaveChanges();
    }

    private static void EnsureVolumeAllowCustom(AppDbContext db)
    {
        var volumeDef = db.CharacteristicDefinitions.FirstOrDefault(item => item.Code == "volume");
        if (volumeDef == null)
            return;

        var links = db.ProductKindCharacteristics
            .Where(item => item.CharacteristicDefinitionId == volumeDef.Id && !item.AllowCustom)
            .ToList();
        foreach (var link in links)
            link.AllowCustom = true;
    }

    private static void ImportWarehouses(AppDbContext db)
    {
        var warehouses = db.Warehouses.ToList();
        var points = db.ShipmentPoints.Where(item => item.VariationId == null).OrderBy(item => item.SortOrder).ToList();
        foreach (var point in points)
        {
            if (point.WarehouseId != null && warehouses.Any(item => item.Id == point.WarehouseId))
                continue;
            var key = (point.AddressLine ?? "").Trim();
            var warehouse = warehouses.FirstOrDefault(item => item.AddressLine == key);
            if (warehouse == null && !string.IsNullOrWhiteSpace(key))
            {
                warehouse = new Warehouse
                {
                    Id = Guid.NewGuid(),
                    Name = point.Name,
                    PostalCode = point.PostalCode,
                    Region = point.Region,
                    City = point.City,
                    Street = point.Street,
                    House = point.House,
                    Office = point.Office,
                    AddressLine = point.AddressLine ?? "",
                    SortOrder = warehouses.Count + 1
                };
                db.Warehouses.Add(warehouse);
                warehouses.Add(warehouse);
            }

            if (warehouse != null)
                point.WarehouseId = warehouse.Id;
        }

        db.SaveChanges();
    }

    private static FieldSpec[] CommonFields() =>
    [
        Text("model"),
        Text("article"),
        Measure("weight", "weight"),
        Measure("weightTolerance", "tolerance"),
        Measure("length", "dimension"),
        Measure("width", "dimension"),
        Measure("height", "dimension"),
        Text("brand"),
        Text("manufacturer"),
        Text("country")
    ];

    private static FieldSpec[] ContraFields() =>
    [
        ..CommonFields(),
        Choice("gearRatio", true, ("1:1", "1:1"), ("1:5", "1:5"), ("20:1", "20:1")),
        Choice("maxSpeed", true, ("40000", "40 000"), ("200000", "200 000"), ("10000", "10 000")),
        Choice("light", false, ("yes", "Есть"), ("no", "Нет")),
        Choice("lightSource", false, ("fiber", "Световод"), ("led", "Светодиод")),
        Choice("coolingType", false, ("inner", "Внутренний"), ("outer", "Внешний"), ("combined", "Комбинированный")),
        Choice("sprayPoints", false,
            ("1", "1-точечный"),
            ("2", "2-точечный"),
            ("3", "3-точечный"),
            ("4", "4-точечный"),
            ("5", "5-точечный")),
        Choice("burLock", false, ("button", "Кнопочный зажим"), ("collet", "Цанговый зажим")),
        Choice("motorConnection", true, ("e-type", "Е-тип")),
        Choice("headSize", true, ("standard", "Стандартная"), ("mini", "Мини")),
        Choice("bodyMaterial", true,
            ("steel", "Нержавеющая сталь"),
            ("brass", "Латунь"),
            ("titanium", "Титан")),
        Choice("bodyCoating", true, ("chrome", "Хром")),
        Choice("warranty", true, ("6", "6 месяцев"), ("12", "12 месяцев"))
    ];

    private static FieldSpec[] TurbineFields() =>
    [
        ..CommonFields(),
        Choice("quickConnect", false,
            ("nsk", "NSK"),
            ("kavo", "KaVo MULTIflex"),
            ("midwest", "Midwest M4")),
        Choice("headAngle", false, ("90", "90"), ("45", "45")),
        Choice("light", false, ("yes", "Есть"), ("no", "Нет")),
        Choice("lightSource", false, ("fiber", "Световод"), ("led", "Светодиод")),
        Choice("coolingType", false, ("inner", "Внутренний"), ("outer", "Внешний"), ("combined", "Комбинированный")),
        Choice("sprayPoints", false,
            ("1", "1-точечный"),
            ("2", "2-точечный"),
            ("3", "3-точечный"),
            ("4", "4-точечный"),
            ("5", "5-точечный")),
        Text("maxSpeed"),
        Choice("burLock", false, ("button", "Кнопочный зажим"), ("collet", "Цанговый зажим")),
        Choice("headSize", true, ("standard", "Стандартная"), ("mini", "Мини")),
        Choice("bodyMaterial", true,
            ("steel", "Нержавеющая сталь"),
            ("brass", "Латунь"),
            ("titanium", "Титан")),
        Choice("bodyCoating", true, ("chrome", "Хром")),
        Choice("warranty", true, ("6", "6 месяцев"), ("12", "12 месяцев"))
    ];

    private static IEnumerable<ProductKindCharacteristic> Links(
        ProductKind kind,
        Dictionary<string, CharacteristicDefinition> definitions,
        FieldSpec[] specs)
    {
        var order = 0;
        foreach (var spec in specs)
        {
            order++;
            var link = new ProductKindCharacteristic
            {
                Id = Guid.NewGuid(),
                ProductKindId = kind.Id,
                CharacteristicDefinitionId = definitions[spec.Code].Id,
                InputType = spec.InputType,
                AllowCustom = spec.AllowCustom,
                UnitGroup = spec.UnitGroup,
                IsRequired = true,
                SortOrder = order
            };

            var optionOrder = 0;
            foreach (var option in spec.Options)
            {
                optionOrder++;
                link.Options.Add(new CharacteristicOption
                {
                    Id = Guid.NewGuid(),
                    Value = option.Value,
                    Label = option.Label,
                    SortOrder = optionOrder
                });
            }

            yield return link;
        }
    }
}
