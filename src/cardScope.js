import { useSearchParams } from 'react-router-dom'

export function useCardIds() {
    const [params] = useSearchParams()
    return {
        productId: params.get('id'),
        variationId: params.get('variationId'),
    }
}

export function sameScope(variationId, itemVariationId) {
    return variationId ? itemVariationId === variationId : !itemVariationId
}

export function emptyDiscounts() {
    return [
        { enabled: true, from: '', to: '', value: '' },
        { enabled: true, from: '', to: '', value: '' },
        { enabled: true, from: '', to: '', value: '' },
    ]
}

export function discountsFrom(product, variationId) {
    const rows = (product.loyaltyTiers || []).filter((item) => sameScope(variationId, item.variationId))
    const next = emptyDiscounts()
    rows.slice(0, 3).forEach((row, index) => {
        next[index] = {
            enabled: !!row.enabled,
            from: row.from || '',
            to: row.to || '',
            value: row.value || '',
        }
    })
    return next
}

export function pointsFrom(product, variationId) {
    return (product.shipmentPoints || [])
        .filter((item) => sameScope(variationId, item.variationId))
        .map((item) => ({
            id: item.id,
            address: item.addressLine || '',
            active: item.active,
            quantity: item.quantity || '',
            name: item.name || '',
            postalCode: item.postalCode || '',
            region: item.region || '',
            city: item.city || '',
            street: item.street || '',
            house: item.house || '',
            office: item.office || '',
        }))
}

export function blankWarehouse() {
    return {
        name: '',
        index: '',
        region: '',
        city: '',
        street: '',
        house: '',
        office: '',
    }
}

export function composeAddress(fields) {
    const parts = []
    if (fields.name) parts.push(fields.name)
    if (fields.index) parts.push(fields.index)
    if (fields.region) parts.push(fields.region)
    if (fields.city) parts.push(`г. ${fields.city}`)
    if (fields.street) parts.push(`ул. ${fields.street}`)
    if (fields.house) parts.push(`д. ${fields.house}`)
    if (fields.office) parts.push(`офис ${fields.office}`)
    return parts.join(', ') || 'Новый склад'
}

export function warehouseFormFrom(item) {
    const structured = item.name || item.postalCode || item.region || item.city || item.street || item.house || item.office
    return {
        name: item.name || (structured ? '' : (item.address || '')),
        index: item.postalCode || '',
        region: item.region || '',
        city: item.city || '',
        street: item.street || '',
        house: item.house || '',
        office: item.office || '',
    }
}

function guidOrNull(id) {
    return typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
        ? id
        : null
}

export function pointsPayload(items) {
    return items.map((item) => ({
        id: guidOrNull(item.id),
        name: item.name || '',
        postalCode: item.postalCode || '',
        region: item.region || '',
        city: item.city || '',
        street: item.street || '',
        house: item.house || '',
        office: item.office || '',
        addressLine: item.address || '',
        active: !!item.active,
        quantity: item.quantity || '',
    }))
}
