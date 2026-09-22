import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import { catalogApi, productsApi } from '../api'
import './Stage2.css'

function Stage2() {
    const [params] = useSearchParams()
    const productId = params.get('id')
    const [catalog, setCatalog] = useState(null)
    const [purpose, setPurpose] = useState('Стоматология')
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
            setPurpose(product.purpose || 'Стоматология')
            setKindCode(product.kindCode || '')
            setProductName(product.productName || '')
            setCategoryPath(product.categoryPath || '')
            setProductLine(product.productLine || '')
            setLoaded(true)
        }).catch((loadError) => setError(loadError.message))
    }, [productId])

    const selectKind = (kind) => {
        setKindCode(kind.code)
        setCategoryPath(kind.categoryPath)
    }

    const handleClearAll = () => {
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
            <div className="container">
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
                            onChange={() => setPurpose('Стоматология')}
                        />
                        Стоматология
                    </label>
                </div>

                <p className="paragraph">Выберите вид продукта</p>
                {catalog?.categories.map((category) => (
                    <div className="radio-group" key={category.code}>
                        <p className="paragraph">{category.name}</p>
                        {category.kinds.map((kind) => (
                            <label className="radio-label" key={kind.code}>
                                <input
                                    type="radio"
                                    name="kind"
                                    value={kind.code}
                                    checked={kindCode === kind.code}
                                    onChange={() => selectKind(kind)}
                                />
                                {kind.name}
                            </label>
                        ))}
                    </div>
                ))}

                <div className="field">
                    <p className="paragraph">Наименование продукта:</p>
                    <input
                        type="text"
                        className="input"
                        value={productName}
                        onChange={(event) => setProductName(event.target.value)}
                    />
                </div>

                <div className="field">
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

                <div className="field">
                    <p className="paragraph">Укажите линейку продукции:</p>
                    <input
                        type="text"
                        className="input"
                        value={productLine}
                        onChange={(event) => setProductLine(event.target.value)}
                    />
                </div>
            </div>

            <BottomBar current={2} total={21} prevPath="/stage1" nextPath="/stage3" onSave={save} />
        </>
    )
}

export default Stage2
