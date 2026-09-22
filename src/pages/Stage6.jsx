import { useState } from 'react'
import BottomBar from '../components/BottomBar'
import './Stage6.css'

function Stage6() {
    const [productName, setProductName] = useState('')

    const [features, setFeatures] = useState({
        logo: false,
        type: false,
        brand: false,
        line: false,
        model: false,
    })

    // Переключение одного варианта
    const toggleFeature = (name) => {
        setFeatures((prev) => ({ ...prev, [name]: !prev[name] }))
    }

    return (
        <>
            <div className="container">
                <h1 className="title">
                    Этап 6. Полное наименование продукта
                </h1>

                {/* Поле "Наименование товара" */}
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

                {/* Список характеристик */}
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

            <BottomBar current={6} total={20} prevPath="/stage5" nextPath="/stage7" />
        </>
    )
}

export default Stage6