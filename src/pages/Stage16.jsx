import { useState } from 'react'
import BottomBar from '../components/BottomBar'
import './Stage16.css'

function Stage16() {
    const [productName, setProductName] = useState('')

    const [features, setFeatures] = useState({
        logo: false,
        type: false,
        brand: false,
        line: false,
        model: false,
    })

    const toggleFeature = (name) => {
        setFeatures((prev) => ({ ...prev, [name]: !prev[name] }))
    }

    return (
        <>
            <div className="container">
                <h1 className="title">
                    Этап 16. Полное наименование продукта
                </h1>

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

            <BottomBar current={16} total={21} prevPath="/stage15" nextPath="/stage17" />
        </>
    )
}

export default Stage16