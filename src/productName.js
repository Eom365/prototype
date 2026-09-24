function norm(value) {
    return String(value || '').trim().toLowerCase()
}

function valueText(values, code) {
    const field = (values || []).find((item) => item.code === code)
    if (!field?.value) return ''
    return field.value === 'other' ? (field.customValue || '') : field.value
}

export function buildNameParts(product, variation = null) {
    const variationValues = variation?.values || []
    const productValues = (product?.values || []).filter((item) => !item.variationId)

    const readValue = (code) => valueText(variationValues, code) || valueText(productValues, code)

    return {
        type: product?.productName || product?.kindName || '',
        brand: readValue('brand'),
        line: product?.productLine || '',
        model: readValue('model'),
    }
}

export function brandLineMerged(parts) {
    const brand = norm(parts?.brand)
    const line = norm(parts?.line)
    return Boolean(brand && line && brand === line)
}

export function brandLineModelMerged(parts) {
    const brand = norm(parts?.brand)
    const line = norm(parts?.line)
    const model = norm(parts?.model)
    return Boolean(brand && brand === line && brand === model)
}

export function composeStoredName(parts, features) {
    const tokens = []
    const seen = new Set()

    for (const key of ['type', 'brand', 'line', 'model']) {
        const text = String(parts?.[key] || '').trim()
        if (!text || !features?.[key]) continue
        const normalized = norm(text)
        if (seen.has(normalized)) continue
        seen.add(normalized)
        tokens.push(text)
    }

    return tokens.join(' ')
}

export function defaultFeaturesFromParts(parts, hasLogo) {
    const merged = brandLineMerged(parts)
    const brandOn = Boolean(parts.brand)
    const lineOn = Boolean(parts.line)
    const sharedBrandLine = merged ? (brandOn || lineOn) : false

    return {
        logo: hasLogo,
        type: Boolean(parts.type),
        brand: merged ? sharedBrandLine : brandOn,
        line: merged ? sharedBrandLine : lineOn,
        model: Boolean(parts.model),
    }
}

export function normalizeNameFeatures(features, parts) {
    const next = { ...features }

    if (brandLineMerged(parts)) {
        const enabled = Boolean(next.brand || next.line)
        next.brand = enabled
        next.line = enabled
    }

    if (brandLineModelMerged(parts)) {
        const enabled = Boolean(next.brand || next.line || next.model)
        next.brand = enabled
        next.line = enabled
        next.model = enabled
    }

    return next
}

export function toggleNameFeature(features, parts, name) {
    const next = { ...features }

    if (name === 'logo') {
        next.logo = !next.logo
        return next
    }

    if (brandLineModelMerged(parts)) {
        const enabled = !(next.brand || next.line || next.model)
        next.brand = enabled
        next.line = enabled
        next.model = enabled
        return next
    }

    if (brandLineMerged(parts) && (name === 'brand' || name === 'line')) {
        const enabled = !(next.brand || next.line)
        next.brand = enabled
        next.line = enabled
        return next
    }

    next[name] = !next[name]
    return next
}

export function mergedFeatureLabel(parts) {
    if (brandLineModelMerged(parts)) return 'Бренд / Линейка / Модель'
    if (brandLineMerged(parts)) return 'Бренд / Линейка'
    return ''
}

export function hasMergedNameFeatures(parts) {
    return brandLineMerged(parts)
}

export function isMergedFeatureActive(features, parts) {
    if (brandLineModelMerged(parts)) return Boolean(features.brand || features.line || features.model)
    if (brandLineMerged(parts)) return Boolean(features.brand || features.line)
    return false
}
