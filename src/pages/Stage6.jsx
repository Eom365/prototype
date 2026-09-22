import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import { productsApi } from '../api'
import './Stage6.css'

function composeStoredName(parts, features) {
    const head = parts.name || ''
    const tail = ['type', 'brand', 'line', 'model']
        .filter((key) => features[key] && parts[key] && parts[key] !== head)
        .map((key) => parts[key])
    return [head, ...tail].filter(Boolean).join(' ')
}

function Stage6() {
    const [params] = useSearchParams()
    const productId = params.get('id')
    const [productName, setProductName] = useState('')
    const [features, setFeatures] = useState({
        logo: false,
        type: false,
        brand: false,
        line: false,
        model: false,
    })
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [parts, setParts] = useState({
        type: '',
        brand: '',
        line: '',
        model: '',
    })

    useEffect(() => {
        if (!productId) return
        productsApi.get(productId).then((product) => {
            const model = (product.values || []).find((value) => value.code === 'model' && !value.variationId)
            const modelText = model?.value === 'other' ? (model.customValue || '') : (model?.value || '')
            const nextParts = {
                name: product.productName || '',
                type: product.kindName || '',
                brand: product.brandName || '',
                line: product.productLine || '',
                model: modelText,
            }
            const nextFeatures = {
                logo: product.nameIncludesLogo,
                type: product.nameIncludesType,
                brand: product.nameIncludesBrand,
                line: product.nameIncludesLine,
                model: product.nameIncludesModel,
            }
            setParts(nextParts)
            setFeatures(nextFeatures)
            setProductName(composeStoredName(nextParts, nextFeatures))
            setLoaded(true)
        }).catch((loadError) => setError(loadError.message))
    }, [productId])

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
        if (!loaded) throw new Error('Карточка ещё загружается, подождите секунду')
        return productsApi.saveName(productId, {
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
                <h1 className="title">Этап 6. Полное наименование продукта</h1>
                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {error && <p className="form-error">{error}</p>}

                <div className="field">
                    <label className="label">Наименование продукта</label>
                    <input
                        type="text"
                        className="input input--wide"
                        value={productName}
                        onChange={(event) => setProductName(event.target.value)}
                        placeholder="Логотип + тип товара + бренд + линейка + модель"
                    />
                </div>

                <div className="field">
                    <label className="label">
                        Характеристики, которые отображаются в наименовании продукта
                    </label>

                    <div className="feature-list">
                        <button type="button" className={`feature-btn ${features.logo ? 'feature-btn--active' : ''}`} onClick={() => toggleFeature('logo')}>
                            Логотип
                        </button>
                        <button type="button" className={`feature-btn ${features.type ? 'feature-btn--active' : ''}`} onClick={() => toggleFeature('type')}>
                            Тип товара
                        </button>
                        <button type="button" className={`feature-btn ${features.brand ? 'feature-btn--active' : ''}`} onClick={() => toggleFeature('brand')}>
                            Бренд
                        </button>
                        <button type="button" className={`feature-btn ${features.line ? 'feature-btn--active' : ''}`} onClick={() => toggleFeature('line')}>
                            Линейка
                        </button>
                        <button type="button" className={`feature-btn ${features.model ? 'feature-btn--active' : ''}`} onClick={() => toggleFeature('model')}>
                            Модель
                        </button>
                    </div>
                </div>
            </div>

            <BottomBar current={6} total={21} prevPath="/stage5" nextPath="/stage7" onSave={save} />
        </>
    )
}

export default Stage6
