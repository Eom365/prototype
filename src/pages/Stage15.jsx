import { useEffect, useRef, useState } from 'react'
import BottomBar from '../components/BottomBar'
import { catalogApi, productsApi } from '../api'
import { useCardIds } from '../cardScope'
import './Stage15.css'

const descriptionFields = [
    ['field1', 'description', 'Описание'],
    ['field2', 'complectation', 'Комплектация'],
    ['field3', 'applicationArea', 'Область применения'],
    ['field4', 'storageConditions', 'Условия хранения'],
    ['field5', 'precautions', 'Меры предосторожности'],
]

const defaultUnits = {
    weight: 'gram',
    tolerance: 'gram',
    dimension: 'millimeters',
}

function findKind(catalog, kindCode) {
    if (!catalog || !kindCode) return null
    for (const category of catalog.categories || []) {
        const kind = category.kinds.find((item) => item.code === kindCode)
        if (kind) return kind
    }
    return null
}

function Stage15() {
    const { productId, variationId } = useCardIds()
    const [catalog, setCatalog] = useState(null)
    const [kindCode, setKindCode] = useState('')
    const [description, setDescription] = useState({
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
    })
    const [specs, setSpecs] = useState({})
    const [logoFile, setLogoFile] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState('')
    const logoInputRef = useRef(null)

    useEffect(() => {
        catalogApi.get().then(setCatalog).catch((loadError) => setError(loadError.message))
    }, [])

    useEffect(() => {
        if (!productId || !variationId || !catalog) return
        productsApi.get(productId).then((product) => {
            const variation = (product.variations || []).find((item) => item.id === variationId)
            if (!variation) throw new Error('Вариация не найдена')
            setKindCode(product.kindCode || '')
            setDescription({
                field1: variation.description || '',
                field2: variation.complectation || '',
                field3: variation.applicationArea || '',
                field4: variation.storageConditions || '',
                field5: variation.precautions || '',
            })
            const kind = findKind(catalog, product.kindCode)
            const next = {}
            for (const field of kind?.characteristics || []) {
                const saved = (variation.values || []).find((value) => value.code === field.code)
                next[field.code] = {
                    value: saved?.value || '',
                    customValue: saved?.customValue || '',
                    unit: saved?.unit || (field.unitGroup ? defaultUnits[field.unitGroup] : ''),
                }
            }
            setSpecs(next)
            setLogoFile((product.files || []).find((file) => file.role === 'logo' && file.variationId === variationId) || null)
            setLoaded(true)
        }).catch((loadError) => setError(loadError.message))
    }, [productId, variationId, catalog])

    const kind = findKind(catalog, kindCode)
    const groups = []
    for (const field of kind?.characteristics || []) {
        let group = groups.find((item) => item.name === field.group)
        if (!group) {
            group = { name: field.group, fields: [] }
            groups.push(group)
        }
        group.fields.push(field)
    }

    const updateSpec = (code, patch) => {
        setSpecs((prev) => {
            const next = {
                ...prev,
                [code]: { ...(prev[code] || { value: '', customValue: '', unit: '' }), ...patch },
            }
            if (code === 'light' && patch.value === 'no') {
                next.lightSource = { ...(prev.lightSource || { value: '', customValue: '', unit: '' }), value: '', customValue: '' }
            }
            return next
        })
    }

    const handleLogoChange = async (event) => {
        const file = event.target.files?.[0]
        event.target.value = ''
        if (!file || !productId || !variationId) return
        const formData = new FormData()
        formData.append('file', file)
        formData.append('role', 'logo')
        formData.append('variationId', variationId)
        setError('')
        try {
            setLogoFile(await productsApi.upload(productId, formData))
        } catch (uploadError) {
            setError(uploadError.message)
        }
    }

    const handleLogoRemove = async () => {
        if (!logoFile?.id) return
        setError('')
        try {
            await productsApi.deleteFile(logoFile.id)
            setLogoFile(null)
        } catch (removeError) {
            setError(removeError.message)
        }
    }

    const save = () => {
        if (!productId) throw new Error('Сначала создайте карточку на главной странице')
        if (!variationId) throw new Error('Сначала создайте вариант на этапе 13')
        if (!loaded) throw new Error('Карточка ещё загружается, подождите секунду')
        const values = Object.entries(specs).map(([code, field]) => ({
            code,
            value: field.value || '',
            customValue: field.customValue || '',
            unit: field.unit || null,
        }))
        return productsApi.saveVariationDescription(productId, variationId, {
            description: description.field1,
            complectation: description.field2,
            applicationArea: description.field3,
            storageConditions: description.field4,
            precautions: description.field5,
        }).then(() => productsApi.saveVariationCharacteristics(productId, variationId, { values }))
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 15. Характеристики варианта</h1>
                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {productId && !variationId && <p className="form-error">Сначала создайте вариант на этапе 13.</p>}
                {error && <p className="form-error">{error}</p>}

                <h2 className="subtitle">Введите описание товара:</h2>
                <div className="form">
                    {descriptionFields.map(([key, , label]) => (
                        <div className="field" key={key}>
                            <label className="label">{label}</label>
                            <input
                                type="text"
                                className="input"
                                value={description[key]}
                                onChange={(event) => setDescription((prev) => ({ ...prev, [key]: event.target.value }))}
                                placeholder="Введите значение..."
                            />
                        </div>
                    ))}
                </div>

                <h2 className="subtitle subtitle--spaced">Заполните характеристики продукта:</h2>
                <div className="form">
                    <div className="field-row">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Логотип</span>
                        <input type="file" accept="image/*" ref={logoInputRef} onChange={handleLogoChange} style={{ display: 'none' }} />
                        {logoFile ? (
                            <div className="field-input field-input--file field-input--has-file">
                                <img src={logoFile.url} alt="Логотип" className="file-preview" />
                                <span className="file-text">{logoFile.name}</span>
                                <button type="button" className="file-remove" onClick={handleLogoRemove} title="Удалить">✕</button>
                            </div>
                        ) : (
                            <button type="button" className="field-input field-input--file" onClick={() => logoInputRef.current?.click()}>
                                <span className="file-icon">📎</span>
                                <span className="file-text">Загрузить фотографию</span>
                            </button>
                        )}
                    </div>

                    {groups.map((group) => (
                        <div key={group.name}>
                            <h3 className="subtitle subtitle--spaced">{group.name}</h3>
                            {group.fields.filter((field) => !(field.code === 'lightSource' && specs.light?.value === 'no')).map((field) => (
                                <CharacteristicRow
                                    key={field.code}
                                    field={field}
                                    value={specs[field.code]}
                                    unitGroups={catalog?.unitGroups}
                                    onChange={(patch) => updateSpec(field.code, patch)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <BottomBar current={15} total={21} prevPath="/stage14" nextPath="/stage16" onSave={save} />
        </>
    )
}

function CharacteristicRow({ field, value, unitGroups, onChange }) {
    const current = value || { value: '', customValue: '', unit: '' }
    const units = field.unitGroup ? unitGroups?.[field.unitGroup] || [] : []

    return (
        <div className={`field-row ${field.inputType === 'choice' ? 'field-row--options' : ''}`}>
            <span className="info-icon" title="Подсказка">ⓘ</span>
            <span className="field-name">{field.name}</span>
            {field.inputType === 'choice' ? (
                <div className="option-group">
                    {(field.options || []).map((option) => (
                        <button
                            type="button"
                            key={option.value}
                            className={`option-btn ${current.value === option.value ? 'option-btn--active' : ''}`}
                            onClick={() => onChange({ value: option.value, customValue: '' })}
                        >
                            {option.label}
                        </button>
                    ))}
                    {field.allowCustom && (
                        <button
                            type="button"
                            className={`option-btn ${current.value === 'other' ? 'option-btn--active' : ''}`}
                            onClick={() => onChange({ value: 'other' })}
                        >
                            Иное
                        </button>
                    )}
                    {field.allowCustom && current.value === 'other' && (
                        <input
                            type="text"
                            className="field-input option-custom-input"
                            placeholder="Введите своё значение"
                            value={current.customValue}
                            onChange={(event) => onChange({ customValue: event.target.value })}
                        />
                    )}
                </div>
            ) : (
                <input
                    type="text"
                    className="field-input"
                    placeholder="Значение"
                    value={current.value}
                    onChange={(event) => onChange({ value: event.target.value })}
                />
            )}
            {units.length > 0 && (
                <select
                    className="field-select"
                    value={current.unit || units[0].value}
                    onChange={(event) => onChange({ unit: event.target.value })}
                >
                    {units.map((unit) => (
                        <option key={unit.value} value={unit.value}>{unit.label}</option>
                    ))}
                </select>
            )}
            {field.required && <span className="required-mark">✱</span>}
        </div>
    )
}

export default Stage15
