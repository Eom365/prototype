export const HANDPIECE_PARENTS = {
    contra_angle: {
        name: 'Угловой наконечник',
        productName: 'Стоматологический угловой наконечник',
        kinds: ['contra_angle_increasing', 'contra_angle_decreasing', 'contra_angle_1_1'],
    },
    straight: {
        name: 'Прямой наконечник',
        productName: 'Стоматологический прямой наконечник',
        kinds: ['straight_increasing', 'straight_1_1'],
    },
    turbine: {
        name: 'Турбинный наконечник',
        productName: 'Стоматологический турбинный наконечник',
        kinds: ['turbine'],
    },
}

export const HANDPIECE_PRODUCT_NAMES = {
    contra_angle_increasing: HANDPIECE_PARENTS.contra_angle.productName,
    contra_angle_decreasing: HANDPIECE_PARENTS.contra_angle.productName,
    contra_angle_1_1: HANDPIECE_PARENTS.contra_angle.productName,
    straight_increasing: HANDPIECE_PARENTS.straight.productName,
    straight_1_1: HANDPIECE_PARENTS.straight.productName,
    turbine: 'Стоматологический турбинный наконечник',
}

export function handpieceParentCodeForKind(kindCode) {
    return Object.entries(HANDPIECE_PARENTS).find(([, parent]) => parent.kinds.includes(kindCode))?.[0] || ''
}

export function handpieceParentForKind(kindCode) {
    const code = handpieceParentCodeForKind(kindCode)
    return code ? HANDPIECE_PARENTS[code] : null
}

export function handpieceProductName(kindCode, fallbackName = '') {
    return HANDPIECE_PRODUCT_NAMES[kindCode] || fallbackName
}
