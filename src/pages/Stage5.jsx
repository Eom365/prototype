import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import CustomCharacteristicsBlock from '../components/CustomCharacteristicsBlock'
import { catalogApi, productsApi } from '../api'
import { customRowsFromValues, normalizeCustomRows, serializeCustomRows } from '../customCharacteristics'
import { emptyDescriptionForm, parseDescriptionForm, serializeDescriptionForm } from '../descriptionForm'
import Stage5Description from './Stage5Description'
import './Stage5.css'

const defaultUnits = {
    weight: 'gram',
    tolerance: 'gram',
    dimension: 'millimeters',
}

function findKind(catalog, kindCode) {
    if (!catalog || !kindCode) return null
    for (const category of catalog.categories) {
        const kind = category.kinds.find((item) => item.code === kindCode)
        if (kind) return kind
    }
    return null
}

function Stage5() {
    const [params] = useSearchParams()
    const productId = params.get('id')
    const [catalog, setCatalog] = useState(null)
    const [kindCode, setKindCode] = useState('')
    const [kindName, setKindName] = useState('')
    const [descriptionForm, setDescriptionForm] = useState(emptyDescriptionForm)
    const [specs, setSpecs] = useState({})
    const [customRows, setCustomRows] = useState(() => normalizeCustomRows([]))
    const [logo, setLogo] = useState(null)
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(false)
    const logoInputRef = useRef(null)

    useEffect(() => {
        catalogApi.get().then(setCatalog).catch((loadError) => setError(loadError.message))
    }, [])

    useEffect(() => {
        if (!productId || !catalog) return
        productsApi.get(productId).then((product) => {
            setKindCode(product.kindCode || '')
            setKindName(product.kindName || '')
            setDescriptionForm(parseDescriptionForm(product))
            setLogo((product.files || []).find((file) => file.role === 'logo' && !file.variationId) || null)

            const kind = findKind(catalog, product.kindCode)
            const next = {}
            for (const field of kind?.characteristics || []) {
                const saved = (product.values || []).find((value) => value.code === field.code)
                next[field.code] = {
                    value: saved?.value || '',
                    customValue: saved?.customValue || '',
                    unit: saved?.unit || (field.unitGroup ? defaultUnits[field.unitGroup] : ''),
                }
            }
            setSpecs(next)
            setCustomRows(normalizeCustomRows(customRowsFromValues(product.values, {}, catalog.unitGroups)))
            setLoaded(true)
        }).catch((loadError) => setError(loadError.message))
    }, [productId, catalog])

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
        if (!file || !productId) return
        const formData = new FormData()
        formData.append('file', file)
        formData.append('role', 'logo')
        setError('')
        try {
            const saved = await productsApi.upload(productId, formData)
            setLogo(saved)
        } catch (uploadError) {
            setError(uploadError.message)
        }
    }

    const handleLogoRemove = async () => {
        if (!logo) return
        setError('')
        try {
            await productsApi.deleteFile(logo.id)
            setLogo(null)
        } catch (removeError) {
            setError(removeError.message)
        }
    }

    const save = async () => {
        if (!productId) throw new Error('Сначала создайте карточку на главной странице')
        if (!loaded) throw new Error('Карточка ещё загружается, подождите секунду')
        await productsApi.saveDescription(productId, serializeDescriptionForm(descriptionForm))
        const values = [
            ...Object.entries(specs).map(([code, value]) => ({
                code,
                value: value.value,
                customValue: value.customValue,
                unit: value.unit || null,
            })),
            ...serializeCustomRows(customRows),
        ]
        await productsApi.saveCharacteristics(productId, { values })
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 5 - Описание и характеристики продукта</h1>
                <h2 className="subtitle">Введите описание товара:</h2>
                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {error && <p className="form-error">{error}</p>}

                <Stage5Description
                    form={descriptionForm}
                    onChange={(section, value) => setDescriptionForm((prev) => ({ ...prev, [section]: value }))}
                />

                <h2 className="subtitle subtitle--spaced">Заполните характеристики продукта:</h2>
                {!kind && <p className="paragraph">Сначала выберите вид продукта на этапе 2. От него зависит набор характеристик.</p>}

                <div className="form">
                    <input
                        type="file"
                        accept="image/*"
                        ref={logoInputRef}
                        onChange={handleLogoChange}
                        style={{ display: 'none' }}
                    />

                    {groups.map((group) => (
                        <div key={group.name}>
                            <h3 className="subtitle subtitle--spaced">{group.name}</h3>
                            {group.name === 'Производитель' && (
                                <div className="field-row">
                                    <span className="info-icon" title="Подсказка">ⓘ</span>
                                    <span className="field-name">Логотип</span>
                                    {logo ? (
                                        <div className="field-input field-input--file field-input--has-file">
                                            <img src={logo.url} alt="Логотип" className="file-preview" />
                                            <span className="file-text">{logo.name}</span>
                                            <button type="button" className="file-remove" onClick={handleLogoRemove} title="Удалить">
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <button type="button" className="field-input field-input--file" onClick={() => logoInputRef.current?.click()}>
                                            <span className="file-icon">📎</span>
                                            <span className="file-text">Загрузить фотографию</span>
                                        </button>
                                    )}
                                </div>
                            )}
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

                    {kind && (
                        <CustomCharacteristicsBlock
                            rows={customRows}
                            unitGroups={catalog?.unitGroups}
                            onChange={setCustomRows}
                        />
                    )}
                </div>
            </div>

            <BottomBar current={5} total={21} prevPath="/stage4" nextPath="/stage6" onSave={save} />
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
                    {field.options.map((option) => (
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

export default Stage5
