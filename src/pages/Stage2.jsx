import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import { catalogApi, productsApi } from '../api'
import {
    HANDPIECE_PARENTS,
    handpieceParentCodeForKind,
    handpieceParentForKind,
    handpieceProductName,
} from '../handpieceKinds'
import './Stage2.css'

function getPurposeRoot(purpose) {
    return purpose === 'Стоматология' ? 'Профессиональная стоматология' : 'Стоматология'
}

function getProductName(kind, categoryCode) {
    if (categoryCode === 'handpieces') {
        return handpieceProductName(kind.code, kind.name)
    }
    return kind.name
}

function getCategoryPath(kind, categoryName, purpose) {
    const parent = handpieceParentForKind(kind.code)
    if (parent) {
        return `${getPurposeRoot(purpose)} > ${categoryName} > ${parent.name} > ${kind.name}`
    }
    return `${getPurposeRoot(purpose)} > ${categoryName} > ${kind.name}`
}

function Stage2() {
    const [params] = useSearchParams()
    const productId = params.get('id')
    const [catalog, setCatalog] = useState(null)
    const [purpose, setPurpose] = useState('')
    const [categoryCode, setCategoryCode] = useState('')
    const [kindCode, setKindCode] = useState('')
    const [handpieceParent, setHandpieceParent] = useState('')
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
        if (!catalog || !kindCode || categoryCode || !purpose) return
        for (const category of catalog.categories) {
            if (category.kinds.some((kind) => kind.code === kindCode)) {
                setCategoryCode(category.code)
                break
            }
        }
    }, [catalog, kindCode, categoryCode, purpose])

    useEffect(() => {
        if (!kindCode) return
        setHandpieceParent(handpieceParentCodeForKind(kindCode))
    }, [kindCode])

    const selectCategory = (code) => {
        if (!purpose || categoryCode === code) return
        setCategoryCode(code)
        setHandpieceParent('')
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
        if (!purpose) return
        setCategoryCode(code)
        setHandpieceParent(handpieceParentCodeForKind(kind.code))
        setKindCode(kind.code)
        applyKindSelection(kind, code)
    }

    const selectHandpieceParent = (parentCode, category) => {
        if (!purpose) return
        setCategoryCode(category.code)
        setHandpieceParent(parentCode)
        const parent = HANDPIECE_PARENTS[parentCode]
        if (parent?.kinds.length === 1) {
            const kind = category.kinds.find((item) => item.code === parent.kinds[0])
            if (kind) {
                setKindCode(kind.code)
                applyKindSelection(kind, category.code)
                return
            }
        }
        setKindCode('')
        setProductName('')
        setCategoryPath('')
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
        setHandpieceParent('')
        setKindCode('')
        setProductName('')
        setCategoryPath('')
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
                    <div
                        className={`category-block${purpose ? '' : ' category-block--disabled'}`}
                        key={category.code}
                    >
                        <label className="radio-label radio-label--category">
                            <input
                                type="radio"
                                name="category"
                                value={category.code}
                                checked={Boolean(purpose) && categoryCode === category.code}
                                disabled={!purpose}
                                onChange={() => selectCategory(category.code)}
                            />
                            {category.name}
                        </label>
                        <div className="radio-group radio-group--nested">
                            {category.code === 'handpieces' ? (
                                Object.entries(HANDPIECE_PARENTS).map(([parentCode, parent]) => (
                                    <div className="subtype-block" key={parentCode}>
                                        <label className="radio-label subtype-block__title">
                                            <input
                                                type="radio"
                                                name="handpieceParent"
                                                value={parentCode}
                                                checked={Boolean(purpose) && handpieceParent === parentCode}
                                                disabled={!purpose}
                                                onChange={() => selectHandpieceParent(parentCode, category)}
                                            />
                                            {parent.name}
                                        </label>
                                        {parent.kinds.length > 1 && (
                                            <div className="subtype-block__options">
                                                {parent.kinds.map((code) => {
                                                    const kind = category.kinds.find((item) => item.code === code)
                                                    if (!kind) return null
                                                    return (
                                                        <label className="radio-label" key={kind.code}>
                                                            <input
                                                                type="radio"
                                                                name="kind"
                                                                value={kind.code}
                                                                checked={Boolean(purpose) && kindCode === kind.code}
                                                                disabled={!purpose}
                                                                onChange={() => selectKind(kind, category.code)}
                                                            />
                                                            {kind.name}
                                                        </label>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                category.kinds.map((kind) => (
                                    <label className="radio-label" key={kind.code}>
                                        <input
                                            type="radio"
                                            name="kind"
                                            value={kind.code}
                                            checked={Boolean(purpose) && kindCode === kind.code}
                                            disabled={!purpose}
                                            onChange={() => selectKind(kind, category.code)}
                                        />
                                        {kind.name}
                                    </label>
                                ))
                            )}
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

            </div>

            <BottomBar current={2} total={21} prevPath="/stage1" nextPath="/stage3" onSave={save} />
        </>
    )
}

export default Stage2
