const HANDPIECE_AXES = ['model', 'gearRatio', 'sprayPoints', 'headSize']

export const VARIANT_AXIS_BY_KIND = {
    lubricant: ['model', 'volume'],
    cleaner: ['model', 'volume'],
    contra_angle_increasing: HANDPIECE_AXES,
    contra_angle_decreasing: HANDPIECE_AXES,
    contra_angle_1_1: HANDPIECE_AXES,
    straight_increasing: HANDPIECE_AXES,
    straight_1_1: HANDPIECE_AXES,
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
