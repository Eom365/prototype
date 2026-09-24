const emptyConditionGroup = () => ({
    temperatureFrom: '',
    temperatureTo: '',
    humidityFrom: '',
    humidityTo: '',
    lighting: '',
})

export const emptyDescriptionForm = () => ({
    description: {
        purpose: '',
        usage: '',
        design: '',
        principle: '',
    },
    complectation: {
        name: '',
        quantity: '',
    },
    applicationArea: {
        sphere: '',
        method: '',
    },
    storageConditions: {
        transport: emptyConditionGroup(),
        storage: emptyConditionGroup(),
        operation: emptyConditionGroup(),
        shelfLife: '',
    },
    precautions: {
        hazardClass: '',
        safety: '',
        disposal: '',
    },
})

function mergeSection(defaults, parsed) {
    const result = { ...defaults }
    for (const key of Object.keys(defaults)) {
        if (parsed[key] === undefined) continue
        if (typeof defaults[key] === 'object' && defaults[key] !== null && !Array.isArray(defaults[key])) {
            result[key] = { ...defaults[key], ...parsed[key] }
        } else {
            result[key] = parsed[key]
        }
    }
    return result
}

function parseSection(raw, defaults) {
    if (!raw) return { ...defaults }
    try {
        const parsed = JSON.parse(raw)
        if (typeof parsed === 'object' && parsed !== null) {
            return mergeSection(defaults, parsed)
        }
    } catch {
        /* legacy plain text */
    }

    const legacy = { ...defaults }
    const firstKey = Object.keys(defaults)[0]
    if (typeof defaults[firstKey] === 'string') {
        legacy[firstKey] = raw
    } else if (defaults.purpose !== undefined) {
        legacy.purpose = raw
    } else if (defaults.transport !== undefined) {
        legacy.storage = { ...legacy.storage, temperature: raw }
    }
    return legacy
}

function parseConditionGroup(raw) {
    const defaults = emptyConditionGroup()
    const source = typeof raw === 'object' && raw !== null ? raw : {}
    const result = {
        temperatureFrom: source.temperatureFrom || '',
        temperatureTo: source.temperatureTo || '',
        humidityFrom: source.humidityFrom || '',
        humidityTo: source.humidityTo || '',
        lighting: source.lighting || '',
    }

    if (source.temperature && !result.temperatureFrom && !result.temperatureTo) {
        result.temperatureFrom = source.temperature
    }
    if (source.humidity && !result.humidityFrom && !result.humidityTo) {
        result.humidityFrom = source.humidity
    }

    for (const key of Object.keys(defaults)) {
        if (result[key] === undefined) result[key] = ''
    }
    return result
}

function parseStorageConditions(raw) {
    const empty = emptyDescriptionForm().storageConditions
    if (!raw) return { ...empty }
    try {
        const parsed = JSON.parse(raw)
        if (typeof parsed !== 'object' || parsed === null) return { ...empty }
        return {
            transport: parseConditionGroup(parsed.transport),
            storage: parseConditionGroup(parsed.storage),
            operation: parseConditionGroup(parsed.operation),
            shelfLife: parsed.shelfLife || '',
        }
    } catch {
        return {
            ...empty,
            storage: { ...emptyConditionGroup(), temperatureFrom: raw },
        }
    }
}

function parseComplectation(raw) {
    const defaults = emptyDescriptionForm().complectation
    if (!raw) return { ...defaults }
    try {
        const parsed = JSON.parse(raw)
        if (typeof parsed !== 'object' || parsed === null) return { ...defaults }
        if (parsed.name !== undefined || parsed.quantity !== undefined) {
            return {
                name: parsed.name || '',
                quantity: parsed.quantity || '',
            }
        }
        if (parsed.contents) {
            return { name: parsed.contents, quantity: '' }
        }
    } catch {
        return { name: raw, quantity: '' }
    }
    return { ...defaults }
}

export function parseDescriptionForm(product) {
    const empty = emptyDescriptionForm()
    return {
        description: parseSection(product.description, empty.description),
        complectation: parseComplectation(product.complectation),
        applicationArea: parseSection(product.applicationArea, empty.applicationArea),
        storageConditions: parseStorageConditions(product.storageConditions),
        precautions: parseSection(product.precautions, empty.precautions),
    }
}

export function serializeDescriptionForm(form) {
    return {
        description: JSON.stringify(form.description),
        complectation: JSON.stringify(form.complectation),
        applicationArea: JSON.stringify(form.applicationArea),
        storageConditions: JSON.stringify(form.storageConditions),
        precautions: JSON.stringify(form.precautions),
    }
}
