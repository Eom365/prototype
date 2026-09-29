export const BASE_STAGE_COUNT = 11

/** Stages 14–21: numbered fill flow (12–13 are intro, not counted). */
export const VARIANT_FILL_STAGE_COUNT = 8

export function variantFillStep(routeStage) {
    return routeStage - 13
}

export function variantFillStepLabel(routeStage) {
    return `${variantFillStep(routeStage)} из ${VARIANT_FILL_STAGE_COUNT}`
}

export function variantFillStageHeading(routeStage, title) {
    return `Этап ${variantFillStep(routeStage)} — ${title}`
}
