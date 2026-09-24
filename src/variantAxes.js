export const VARIANT_AXIS_BY_KIND = {
    lubricant: ['model', 'volume'],
    cleaner: ['model', 'volume'],
    contra_angle: ['model', 'gearRatio', 'sprayPoints', 'headSize'],
    straight: ['model', 'gearRatio', 'sprayPoints', 'headSize'],
    turbine: ['model', 'quickConnect', 'headAngle', 'sprayPoints', 'headSize'],
}

export function variantAxisCodesForKind(kindCode) {
    const codes = VARIANT_AXIS_BY_KIND[kindCode]
    return codes ? new Set(codes) : null
}

export function isVariantAxisField(kindCode, fieldCode) {
    const allowed = variantAxisCodesForKind(kindCode)
    if (!allowed) return true
    return allowed.has(fieldCode)
}
