const IDENTITY_FIELD_MAP = {
    brand: 'brandName',
    manufacturer: 'manufacturerName',
    country: 'manufacturerCountry',
}

export function prefillSpecFromProduct(code, saved, product, defaultUnit = '') {
    const savedValue = saved?.value === 'other' ? saved?.customValue : saved?.value
    if (String(savedValue || '').trim()) {
        return {
            value: saved?.value || '',
            customValue: saved?.customValue || '',
            unit: saved?.unit || defaultUnit,
        }
    }

    const identityKey = IDENTITY_FIELD_MAP[code]
    const identityValue = identityKey ? product?.[identityKey] : ''
    if (String(identityValue || '').trim()) {
        return {
            value: String(identityValue).trim(),
            customValue: '',
            unit: saved?.unit || defaultUnit,
        }
    }

    return {
        value: '',
        customValue: '',
        unit: saved?.unit || defaultUnit,
    }
}

export function dimensionUnitLabel(unit) {
    return unit === 'centimeters' ? 'сантиметров' : 'миллиметров'
}

export const DIMENSION_CODES = ['length', 'width', 'height']

export const DIMENSION_LABELS = {
    length: 'Длина',
    width: 'Ширина',
    height: 'Высота',
}
