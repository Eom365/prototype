import { useState } from 'react'
import BottomBar from '../components/BottomBar'
import './Stage19.css'

function Stage19() {
    const [currency, setCurrency] = useState('RUB')
    const [price, setPrice] = useState('')

    const currencySymbols = {
        RUB: '₽',
        CNY: '¥',
    }

    const [discounts, setDiscounts] = useState([
        { enabled: true, from: '', to: '', value: '' },
        { enabled: true, from: '', to: '', value: '' },
        { enabled: true, from: '', to: '', value: '' },
    ])

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
            <div className="container">
                <h1 className="title">
                    Этап 19. Добавьте стоимость товара и систему лояльности
                </h1>

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
                        Предоставить скидку от количества продукта
                    </p>

                    {discounts.map((discount, index) => (
                        <div className="loyalty-row" key={index}>
                            <button
                                type="button"
                                className={`toggle ${discount.enabled ? 'toggle--on' : ''}`}
                                onClick={() => toggleDiscount(index)}
                                title={discount.enabled ? 'Выключить' : 'Включить'}
                            >
                                <span className="toggle__knob" />
                            </button>

                            <span className="loyalty-text">
                                Стоимость продукта при покупке от
                            </span>

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

                            <span className="loyalty-text">штук</span>

                            <span className="loyalty-currency">₽</span>

                            <input
                                type="text"
                                className="loyalty-input loyalty-input--price"
                                value={discount.value}
                                onChange={(e) => handleDiscountChange(index, 'value', e.target.value)}
                                disabled={!discount.enabled}
                            />

                            <span className="info-icon" title="Подсказка">ⓘ</span>
                        </div>
                    ))}
                </div>
            </div>

            <BottomBar current={19} total={21} prevPath="/stage18" nextPath="/stage20" />
        </>
    )
}

export default Stage19