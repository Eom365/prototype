import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import { catalogApi, productsApi } from '../api'
import './Stage2.css'

const HANDPIECE_NAMES = {
    contra_angle: 'Стоматологический угловой наконечник',
    straight: 'Стоматологический прямой наконечник',
    turbine: 'Стоматологический турбинный наконечник',
}

const PRODUCT_LINE_HINT = `Пример линейки продукции:
Линейка смартфонов - iPhone
Линейка ноутбуков - MateBook
Линейка стоматологических наконечников - TX`

function getPurposeRoot(purpose) {
    return purpose === 'Стоматология' ? 'Профессиональная стоматология' : 'Стоматология'
}

function getProductName(kind, categoryCode) {
    if (categoryCode === 'handpieces' && HANDPIECE_NAMES[kind.code]) {
        return HANDPIECE_NAMES[kind.code]
    }
    return kind.name
}

function getCategoryPath(kind, categoryName, purpose) {
    return `${getPurposeRoot(purpose)} > ${categoryName} > ${kind.name}`
}

function Stage2() {
    const [params] = useSearchParams()
    const productId = params.get('id')
    const [catalog, setCatalog] = useState(null)
    const [purpose, setPurpose] = useState('')
    const [categoryCode, setCategoryCode] = useState('')
    const [kindCode, setKindCode] = useState('')
    const [productName, setProductName] = useState('')
    const [categoryPath, setCategoryPath] = useState('')
    const [productLine, setProductLine] = useState('')
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        catalogApi.get().then(setCatalog).catch((loadError) => setError(loadError.message))
    }, [])

    useEffect(() => {
        if (!productId) return
        productsApi.get(productId).then((product) => {
            setPurpose(product.currentStage >= 2 ? (product.purpose || '') : '')
            setKindCode(product.kindCode || '')
            setProductName(product.productName || '')
            setCategoryPath(product.categoryPath || '')
            setProductLine(product.productLine || '')
            setLoaded(true)
        }).catch((loadError) => setError(loadError.message))
    }, [productId])

    useEffect(() => {
        if (!catalog || !kindCode || categoryCode) return
        for (const category of catalog.categories) {
            if (category.kinds.some((kind) => kind.code === kindCode)) {
                setCategoryCode(category.code)
                break
            }
        }
    }, [catalog, kindCode, categoryCode])

    const selectCategory = (code) => {
        if (categoryCode === code) return
        setCategoryCode(code)
        setKindCode('')
        setProductName('')
        setCategoryPath('')
    }

    const applyKindSelection = (kind, code, nextPurpose = purpose) => {
        const category = catalog?.categories.find((item) => item.code === code)
        if (!category) return
        setProductName(getProductName(kind, code))
        setCategoryPath(getCategoryPath(kind, category.name, nextPurpose))
    }

    const selectKind = (kind, code) => {
        setCategoryCode(code)
        setKindCode(kind.code)
        applyKindSelection(kind, code)
    }

    const selectPurpose = (value) => {
        if (purpose === value) return
        setPurpose(value)
        if (!kindCode || !categoryCode || !catalog) return
        const category = catalog.categories.find((item) => item.code === categoryCode)
        const kind = category?.kinds.find((item) => item.code === kindCode)
        if (kind && category) {
            setCategoryPath(getCategoryPath(kind, category.name, value))
        }
    }

    const handleClearAll = () => {
        setCategoryCode('')
        setKindCode('')
        setProductName('')
        setCategoryPath('')
        setProductLine('')
    }

    const save = () => {
        if (!productId) throw new Error('Сначала создайте карточку на главной странице')
        if (!loaded) throw new Error('Карточка ещё загружается, подождите секунду')
        return productsApi.saveCategory(productId, {
            purpose,
            kindCode,
            productName,
            categoryPath,
            productLine,
        })
    }

    return (
        <>
            <div className="container stage2-page">
                <h1 className="title">Этап 2 - Наименование и категория</h1>
                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {error && <p className="form-error">{error}</p>}

                <p className="paragraph">Выберите назначение продукта</p>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="purpose"
                            value="Стоматология"
                            checked={purpose === 'Стоматология'}
                            onChange={() => selectPurpose('Стоматология')}
                        />
                        Стоматология
                    </label>
                </div>

                <p className="paragraph">Выберите тип продукта</p>
                {catalog?.categories.map((category) => (
                    <div className="category-block" key={category.code}>
                        <label className="radio-label radio-label--category">
                            <input
                                type="radio"
                                name="category"
                                value={category.code}
                                checked={categoryCode === category.code}
                                onChange={() => selectCategory(category.code)}
                            />
                            {category.name}
                        </label>
                        <div className="radio-group radio-group--nested">
                            {category.kinds.map((kind) => (
                                <label className="radio-label" key={kind.code}>
                                    <input
                                        type="radio"
                                        name="kind"
                                        value={kind.code}
                                        checked={kindCode === kind.code}
                                        onChange={() => selectKind(kind, category.code)}
                                    />
                                    {kind.name}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="field">
                    <p className="paragraph">Наименование продукта:</p>
                    <input
                        type="text"
                        className="input input--readonly"
                        value={productName}
                        readOnly
                        placeholder="Выберите вид продукта"
                    />
                </div>

                <div className="stage2-category-wrap">
                    <div className="field field--category">
                        <p className="paragraph">Категория продукта:</p>

                        <div className="category-picker">
                            <button type="button" className="category-picker__burger" title="Меню">
                                ☰
                            </button>

                            <input
                                type="text"
                                className="category-picker__input"
                                value={categoryPath}
                                onChange={(event) => setCategoryPath(event.target.value)}
                                placeholder="Раздел > Категория"
                            />

                            <button
                                type="button"
                                className="category-picker__clear"
                                title="Очистить"
                                onClick={handleClearAll}
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                </div>

                <div className="field">
                    <p className="paragraph">Укажите линейку продукции:</p>
                    <div className="field-control-with-hint">
                        <input
                            type="text"
                            className="input"
                            value={productLine}
                            onChange={(event) => setProductLine(event.target.value)}
                        />
                        <span className="hint-icon" data-hint={PRODUCT_LINE_HINT}>?</span>
                    </div>
                </div>
            </div>

            <BottomBar current={2} total={21} prevPath="/stage1" nextPath="/stage3" onSave={save} />
        </>
    )
}

export default Stage2
