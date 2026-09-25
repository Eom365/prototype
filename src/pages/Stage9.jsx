import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import { productsApi } from '../api'
import { discountsFrom, emptyDiscounts } from '../cardScope'
import './Stage9.css'

function Stage9() {
    const [params] = useSearchParams()
    const productId = params.get('id')
    const [currency, setCurrency] = useState('RUB')
    const [price, setPrice] = useState('')
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState('')

    // Символ выбранной валюты
    const currencySymbols = {
        RUB: '₽',
        CNY: '¥',
    }

    // Скидки (система лояльности)
    const [discounts, setDiscounts] = useState(() => emptyDiscounts())

    useEffect(() => {
        if (!productId) return
        productsApi.get(productId).then((product) => {
            setCurrency(product.currency || 'RUB')
            setPrice(product.price || '')
            setDiscounts(discountsFrom(product, null))
            setLoaded(true)
        }).catch((loadError) => setError(loadError.message))
    }, [productId])

    const save = () => {
        if (!productId) throw new Error('Сначала создайте карточку на главной странице')
        if (!loaded) throw new Error('Карточка ещё загружается, подождите секунду')
        return productsApi.savePrice(productId, {
            variationId: null,
            currency,
            price,
            discounts: discounts.map((item) => ({
                enabled: item.enabled,
                from: item.from,
                to: item.to,
                value: item.value,
            })),
        })
    }

    const handleDiscountChange = (index, field, value) => {
        setDiscounts((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, [field]: value } : item
            )
        )
    }

    const toggleDiscount = (index) => {
        setDiscounts((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, enabled: !item.enabled } : item
            )
        )
    }

    return (
        <>
            <div className="container stage9-page">
                <h1 className="title">
                    Этап 9. Стоимость товара и система лояльности.
                </h1>
                <h2 className="subtitle">
                Укажите стоимость товара и выберите систему лояльности
                </h2>
                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {error && <p className="form-error">{error}</p>}

                {/* ===== Стоимость товара ===== */}
                <div className="section">
                    <h2 className="subtitle">Стоимость товара</h2>

                    <div className="price-row">
                        <label className="price-label">Выберите валюту:</label>

                        <div className="currency-group">
                            <button
                                type="button"
                                className={`currency-btn ${currency === 'RUB' ? 'currency-btn--active' : ''}`}
                                onClick={() => setCurrency('RUB')}
                            >
                                ₽ RUB
                            </button>
                            <button
                                type="button"
                                className={`currency-btn ${currency === 'CNY' ? 'currency-btn--active' : ''}`}
                                onClick={() => setCurrency('CNY')}
                            >
                                ¥ CNY
                            </button>
                        </div>
                    </div>

                    <div className="price-row">
                        <label className="price-label">Введите стоимость товара:</label>
                        <div className="price-input-wrap">
                            <span className="price-symbol">
                                {currencySymbols[currency]}
                            </span>
                            <input
                                type="text"
                                className="price-input"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>

                {/* ===== Система лояльности ===== */}
                <div className="section">
                    <h2 className="subtitle">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        Система лояльности
                    </h2>

                    <p className="loyalty-subtitle">
                        1.Предоставить скидку от количества продукта
                    </p>

                    {discounts.map((discount, index) => (
                        <div className={`loyalty-row${index === 0 ? ' loyalty-row--first' : ''}`} key={index}>
                            <button
                                type="button"
                                className={`toggle ${discount.enabled ? 'toggle--on' : ''}`}
                                onClick={() => toggleDiscount(index)}
                                title={discount.enabled ? 'Выключить' : 'Включить'}
                            >
                                <span className="toggle__knob" />
                            </button>

                            <div className="loyalty-row__content">
                                <span className="loyalty-text">Стоимость единицы продукта</span>
                                <span className="loyalty-currency">{currencySymbols[currency]}</span>
                                <input
                                    type="text"
                                    className="loyalty-input loyalty-input--price"
                                    value={discount.value}
                                    onChange={(e) => handleDiscountChange(index, 'value', e.target.value)}
                                    disabled={!discount.enabled}
                                />
                                <span className="loyalty-text">при покупке от</span>
                                <input
                                    type="text"
                                    className="loyalty-input loyalty-input--small"
                                    value={discount.from}
                                    onChange={(e) => handleDiscountChange(index, 'from', e.target.value)}
                                    disabled={!discount.enabled}
                                />
                                <span className="loyalty-text">до</span>
                                <input
                                    type="text"
                                    className="loyalty-input loyalty-input--small"
                                    value={discount.to}
                                    onChange={(e) => handleDiscountChange(index, 'to', e.target.value)}
                                    disabled={!discount.enabled}
                                />
                                <span className="loyalty-text">товаров.</span>
                                <span className="info-icon" title="Подсказка">ⓘ</span>
                                {index === 0 && <span className="required-mark">✱</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BottomBar current={9} total={21} prevPath="/stage8" nextPath="/stage10" onSave={save} />
        </>
    )
}

export default Stage9