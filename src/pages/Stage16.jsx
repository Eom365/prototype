import { useEffect, useState } from 'react'
import BottomBar from '../components/BottomBar'
import { productsApi } from '../api'
import { useCardIds } from '../cardScope'
import './Stage16.css'

function composeStoredName(parts, features) {
    const head = parts.name || ''
    const tail = ['type', 'brand', 'line', 'model']
        .filter((key) => features[key] && parts[key] && parts[key] !== head)
        .map((key) => parts[key])
    return [head, ...tail].filter(Boolean).join(' ')
}

function Stage16() {
    const { productId, variationId } = useCardIds()
    const [productName, setProductName] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState('')

    const [features, setFeatures] = useState({
        logo: false,
        type: false,
        brand: false,
        line: false,
        model: false,
    })
    const [parts, setParts] = useState({
        type: '',
        brand: '',
        line: '',
        model: '',
    })

    useEffect(() => {
        if (!productId || !variationId) return
        productsApi.get(productId).then((product) => {
            const variation = (product.variations || []).find((item) => item.id === variationId)
            if (!variation) throw new Error('Вариация не найдена')
            const textOf = (values, code) => {
                const field = (values || []).find((item) => item.code === code)
                if (!field) return ''
                return field.value === 'other' ? (field.customValue || '') : (field.value || '')
            }
            const variationValues = variation.values || []
            const baseValues = product.values || []
            const pick = (code) => textOf(variationValues, code) || textOf(baseValues, code)
            const nextParts = {
                name: product.productName || '',
                type: product.kindName || '',
                brand: product.brandName || pick('brand'),
                line: product.productLine || '',
                model: pick('model'),
            }
            const nextFeatures = {
                logo: variation.nameIncludesLogo,
                type: variation.nameIncludesType,
                brand: variation.nameIncludesBrand,
                line: variation.nameIncludesLine,
                model: variation.nameIncludesModel,
            }
            setParts(nextParts)
            setFeatures(nextFeatures)
            setProductName(composeStoredName(nextParts, nextFeatures))
            setLoaded(true)
        }).catch((loadError) => setError(loadError.message))
    }, [productId, variationId])

    const composeName = (nextFeatures) => composeStoredName(parts, nextFeatures)

    const toggleFeature = (name) => {
        setFeatures((prev) => {
            const next = { ...prev, [name]: !prev[name] }
            if (name !== 'logo') setProductName(composeName(next))
            return next
        })
    }

    const save = () => {
        if (!productId) throw new Error('Сначала создайте карточку на главной странице')
        if (!variationId) throw new Error('Сначала создайте вариант на этапе 13')
        if (!loaded) throw new Error('Карточка ещё загружается, подождите секунду')
        return productsApi.saveVariationName(productId, variationId, {
            fullName: productName,
            nameIncludesLogo: features.logo,
            nameIncludesType: features.type,
            nameIncludesBrand: features.brand,
            nameIncludesLine: features.line,
            nameIncludesModel: features.model,
        })
    }

    return (
        <>
            <div className="container">
                <h1 className="title">
                    Этап 16. Полное наименование продукта
                </h1>
                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {productId && !variationId && <p className="form-error">Сначала создайте вариант на этапе 13.</p>}
                {error && <p className="form-error">{error}</p>}

                <div className="field">
                    <label className="label">Наименование продукта</label>
                    <input
                        type="text"
                        className="input input--wide"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Логотип + тип товара + бренд + линейка + модель"
                    />
                </div>

                <div className="field">
                    <label className="label">
                        Характеристики, которые отображаются в наименовании продукта
                    </label>

                    <div className="feature-list">
                        <button
                            type="button"
                            className={`feature-btn ${features.logo ? 'feature-btn--active' : ''}`}
                            onClick={() => toggleFeature('logo')}
                        >
                            Логотип
                        </button>

                        <button
                            type="button"
                            className={`feature-btn ${features.type ? 'feature-btn--active' : ''}`}
                            onClick={() => toggleFeature('type')}
                        >
                            Тип товара
                        </button>

                        <button
                            type="button"
                            className={`feature-btn ${features.brand ? 'feature-btn--active' : ''}`}
                            onClick={() => toggleFeature('brand')}
                        >
                            Бренд
                        </button>

                        <button
                            type="button"
                            className={`feature-btn ${features.line ? 'feature-btn--active' : ''}`}
                            onClick={() => toggleFeature('line')}
                        >
                            Линейка
                        </button>

                        <button
                            type="button"
                            className={`feature-btn ${features.model ? 'feature-btn--active' : ''}`}
                            onClick={() => toggleFeature('model')}
                        >
                            Модель
                        </button>
                    </div>
                </div>
            </div>

            <BottomBar current={16} total={21} prevPath="/stage15" nextPath="/stage17" onSave={save} />
        </>
    )
}

export default Stage16