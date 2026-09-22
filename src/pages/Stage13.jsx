import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import './Stage13.css'

function Stage13() {
    const navigate = useNavigate()

    const [selected, setSelected] = useState({
        model: false,
        headSize: false,
        gearRatio: false,
    })

    const toggleFeature = (name) => {
        setSelected((prev) => ({ ...prev, [name]: !prev[name] }))
    }

    const features = [
        { key: 'model', label: 'Модель' },
        { key: 'headSize', label: 'Размер головки' },
        { key: 'gearRatio', label: 'Передаточное отношение' },
    ]

    // ===== Модель =====
    const [modelInput, setModelInput] = useState('')
    const [modelSaved] = useState('M1')
    const [modelAdded, setModelAdded] = useState([])

    // ===== Размер головки =====
    const [headSizeChoice, setHeadSizeChoice] = useState('')
    const [headSizeCustom, setHeadSizeCustom] = useState('')
    const [headSizeSaved] = useState('Стандартная')
    const [headSizeAdded, setHeadSizeAdded] = useState([])

    // ===== Передаточное отношение =====
    const [gearRatioChoice, setGearRatioChoice] = useState('')
    const [gearRatioCustom, setGearRatioCustom] = useState('')
    const [gearRatioSaved] = useState('1:1')
    const [gearRatioAdded, setGearRatioAdded] = useState([])

    // ===== ОДНА готовая карточка =====
    const [variants] = useState([
        { id: 1, chips: ['M1', 'Стандартная', '1:1'], photo: null },
    ])

    // ===== Флаг: показывать ли заготовку =====
    const [showFormCard, setShowFormCard] = useState(false)

    // ===== Флаг: карточка завершена (зелёная) =====
    const [isCompleted, setIsCompleted] = useState(false)

    // При загрузке страницы читаем флаг из localStorage
    useEffect(() => {
        const completed = localStorage.getItem('variantCompleted') === 'true'
        setIsCompleted(completed)
        if (completed) {
            setShowFormCard(true)
        }
    }, [])

    const handleCreateVariant = () => {
        // Сбрасываем флаг «завершено» при создании нового варианта
        localStorage.removeItem('variantCompleted')
        setIsCompleted(false)

        const modelVal = modelInput.trim()

        let headSizeVal = ''
        if (headSizeChoice === 'other') headSizeVal = headSizeCustom.trim()
        else if (headSizeChoice === 'standard') headSizeVal = 'Стандартная'
        else if (headSizeChoice === 'mini') headSizeVal = 'Мини'

        let gearRatioVal = ''
        if (gearRatioChoice === 'other') gearRatioVal = gearRatioCustom.trim()
        else if (gearRatioChoice) gearRatioVal = gearRatioChoice

        if (modelVal) setModelAdded((prev) => [...prev, modelVal])
        if (headSizeVal) setHeadSizeAdded((prev) => [...prev, headSizeVal])
        if (gearRatioVal) setGearRatioAdded((prev) => [...prev, gearRatioVal])

        setShowFormCard(true)

        setModelInput('')
        setHeadSizeCustom('')
        setHeadSizeChoice('')
        setGearRatioCustom('')
        setGearRatioChoice('')
    }

    const removeValue = (index, setter) => {
        setter((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <>
            <div className="container">
                <h1 className="title">
                    Этап 13 - Выберите характеристики которые могут изменяться
                    <span className="info-icon" title="Подсказка">?</span>
                </h1>

                <p className="description">
                    Характеристики — точные параметры товара, которые можно
                    измерить или проверить (вес, размер, модель, цвет).
                </p>

                <div className="feature-list">
                    {features.map((f) => (
                        <label className="feature-item" key={f.key}>
                            <span
                                className={`checkbox ${selected[f.key] ? 'checkbox--checked' : ''}`}
                            >
                                {selected[f.key] && (
                                    <svg
                                        className="checkbox__tick"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M5 12.5L10 17.5L19 7"
                                            stroke="white"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </span>

                            <input
                                type="checkbox"
                                checked={selected[f.key]}
                                onChange={() => toggleFeature(f.key)}
                                className="feature-item__input"
                            />

                            <span className="feature-item__label">{f.label}</span>
                            <span className="info-icon" title="Подсказка">?</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="variants-section">
                <h2 className="variants-title">
                    Заполните варианты характеристики продукта
                    <span className="info-icon" title="Подсказка">?</span>
                </h2>

                <p className="variants-description">
                    Введите значения характеристик продукта, затем нажмите на кнопку
                    "Создать вариант параметра продукта"
                </p>

                <div className="variants-table">
                    {/* Модель */}
                    <div className="variant-row">
                        <span className="variant-row__name">Модель</span>

                        <input
                            type="text"
                            className="variant-row__input"
                            placeholder="Введите значение"
                            value={modelInput}
                            onChange={(e) => setModelInput(e.target.value)}
                        />

                        <div className="variant-chips">
                            {modelSaved && (
                                <div className="variant-chip">
                                    <span>{modelSaved}</span>
                                    <span className="variant-chip__info" title="Ранее сохранённое">?</span>
                                </div>
                            )}

                            {modelAdded.map((value, i) => (
                                <div className="variant-chip" key={`added-${i}`}>
                                    <span>{value}</span>
                                    <button
                                        type="button"
                                        className="variant-chip__remove"
                                        onClick={() => removeValue(i, setModelAdded)}
                                        title="Удалить"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Размер головки */}
                    <div className="variant-row">
                        <span className="variant-row__name">Размер головки</span>

                        {headSizeChoice === 'other' ? (
                            <input
                                type="text"
                                className="variant-row__input"
                                placeholder="Введите своё значение"
                                value={headSizeCustom}
                                onChange={(e) => setHeadSizeCustom(e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <select
                                className="variant-row__select"
                                value={headSizeChoice}
                                onChange={(e) => setHeadSizeChoice(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="standard">Стандартная</option>
                                <option value="mini">Мини</option>
                                <option value="other">Иное</option>
                            </select>
                        )}

                        <div className="variant-chips">
                            {headSizeSaved && (
                                <div className="variant-chip">
                                    <span>{headSizeSaved}</span>
                                    <span className="variant-chip__info" title="Ранее сохранённое">?</span>
                                </div>
                            )}

                            {headSizeAdded.map((value, i) => (
                                <div className="variant-chip" key={`added-${i}`}>
                                    <span>{value}</span>
                                    <button
                                        type="button"
                                        className="variant-chip__remove"
                                        onClick={() => removeValue(i, setHeadSizeAdded)}
                                        title="Удалить"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Передаточное отношение */}
                    <div className="variant-row">
                        <span className="variant-row__name">Передаточное отношение</span>

                        {gearRatioChoice === 'other' ? (
                            <input
                                type="text"
                                className="variant-row__input"
                                placeholder="Введите своё значение"
                                value={gearRatioCustom}
                                onChange={(e) => setGearRatioCustom(e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <select
                                className="variant-row__select"
                                value={gearRatioChoice}
                                onChange={(e) => setGearRatioChoice(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="1:1">1:1</option>
                                <option value="1:5">1:5</option>
                                <option value="20:1">20:1</option>
                                <option value="other">Иное</option>
                            </select>
                        )}

                        <div className="variant-chips">
                            {gearRatioSaved && (
                                <div className="variant-chip">
                                    <span>{gearRatioSaved}</span>
                                    <span className="variant-chip__info" title="Ранее сохранённое">?</span>
                                </div>
                            )}

                            {gearRatioAdded.map((value, i) => (
                                <div className="variant-chip" key={`added-${i}`}>
                                    <span>{value}</span>
                                    <button
                                        type="button"
                                        className="variant-chip__remove"
                                        onClick={() => removeValue(i, setGearRatioAdded)}
                                        title="Удалить"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="variants-actions">
                    <button
                        type="button"
                        className="action-primary"
                        onClick={handleCreateVariant}
                    >
                        Создать вариант параметра продукта
                        <span className="info-icon info-icon--white" title="Подсказка">?</span>
                    </button>
                    <button type="button" className="action-secondary">
                        Скачать шаблон Excel
                        <span className="info-icon" title="Подсказка">?</span>
                    </button>
                    <button type="button" className="action-secondary">
                        Загрузить шаблон Excel
                        <span className="info-icon" title="Подсказка">?</span>
                    </button>
                </div>

                {/* ===== ОДНА готовая карточка ===== */}
                <div className="variants-preview">
                    <h2 className="variants-preview__title">
                        Ваши варианты товара
                        <span className="info-icon" title="Подсказка">?</span>
                    </h2>

                    <p className="variants-preview__description">
                        Заполните все необходимые данные и отправьте на проверку каждый вариант товара
                    </p>

                    {variants.map((variant) => (
                        <div className="product-card" key={variant.id}>
                            <div className="product-card__chips">
                                {variant.chips.map((chip, i) => (
                                    <span className="product-card__chip" key={i}>
                                        {chip}
                                    </span>
                                ))}
                            </div>

                            <div className="product-card__body">
                                <div className="product-card__col product-card__col--status">
                                    <div className="product-card__status-row">
                                        <span className="product-card__status-label">Активна</span>

                                        <button
                                            type="button"
                                            className="toggle toggle--on"
                                            title="Выключить"
                                        >
                                            <span className="toggle__knob" />
                                        </button>

                                        <button type="button" className="product-card__edit" title="Редактировать">
                                            ✎
                                        </button>

                                        <button type="button" className="product-card__delete" title="Удалить">
                                            ✕
                                        </button>
                                    </div>

                                    <button type="button" className="product-card__preview-link">
                                        Посмотреть карточку товара ›
                                    </button>
                                </div>

                                <div className="product-card__col product-card__col--photo">
                                    <button type="button" className="product-card__nav product-card__nav--prev">‹</button>

                                    <div className="product-card__photo">
                                        <button
                                            type="button"
                                            className="product-card__photo-btn"
                                            title="Добавить фото"
                                        >
                                            ＋
                                        </button>
                                    </div>

                                    <button type="button" className="product-card__nav product-card__nav--next">›</button>

                                    <span className="product-card__counter product-card__counter--left">1/3</span>
                                    <span className="product-card__counter product-card__counter--right">1/3</span>
                                </div>

                                <div className="product-card__col product-card__col--info">
                                    <h3 className="product-card__name">
                                        Масло для смазки наконечников
                                    </h3>

                                    <p className="product-card__desc">
                                        Аэрозольная продукция
                                    </p>

                                    <p className="product-card__line">
                                        Линейка*
                                    </p>

                                    <div className="product-card__article-row">
                                        <span className="product-card__article">6434819</span>
                                    </div>
                                </div>

                                <div className="product-card__col product-card__col--address">
                                    <div className="product-card__address-actions">
                                        <button type="button" className="product-card__edit" title="Редактировать">
                                            ✎
                                        </button>
                                    </div>

                                    <p className="product-card__address">
                                        <span className="product-card__bullet">●</span>
                                        Главный склад, 666666, г. Екатеринбург,<br />
                                        ул. Кирова, д. 56, офис 369
                                    </p>

                                    <p className="product-card__quantity">
                                        Количество - 1693 штуки.
                                    </p>
                                </div>

                                <div className="product-card__col product-card__col--price">
                                    <span className="product-card__price-symbol">₽</span>
                                    <span className="product-card__price-value">9 350</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ===== Заготовка (зелёная, если карточка завершена) ===== */}
                {showFormCard && (
                    <div className={`variant-card ${isCompleted ? 'variant-card--completed' : ''}`}>
                        <div className="variant-card__header">
                            <span className="variant-card__status">
                                {isCompleted ? 'Заполнена' : 'Ожидает заполнения'}
                            </span>

                            {variants[0].chips.map((chip, i) => (
                                <span className="variant-card__chip" key={i}>
                                    {chip}
                                </span>
                            ))}
                        </div>

                        <div className="variant-card__body">
                            <div className="variant-card__photo">
                                <button
                                    type="button"
                                    className="variant-card__photo-btn"
                                    title="Добавить фото"
                                >
                                    ＋
                                </button>
                            </div>

                            <div className="variant-card__sections">
                                <div className="variant-card__col">
                                    <button
                                        type="button"
                                        className="variant-card__section variant-card__section--pending"
                                        onClick={() => navigate('/stage14')}
                                    >
                                        Наименование и категория <span className="variant-card__arrow">›</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="variant-card__section variant-card__section--pending"
                                        onClick={() => navigate('/stage15')}
                                    >
                                        Характеристики <span className="variant-card__arrow">›</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="variant-card__section variant-card__section--pending"
                                        onClick={() => navigate('/stage16')}
                                    >
                                        Документы <span className="variant-card__arrow">›</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="variant-card__section variant-card__section--pending"
                                        onClick={() => navigate('/stage17')}
                                    >
                                        Упаковка <span className="variant-card__arrow">›</span>
                                    </button>
                                </div>

                                <div className="variant-card__col">
                                    <button
                                        type="button"
                                        className="variant-card__section variant-card__section--pending"
                                        onClick={() => navigate('/stage18')}
                                    >
                                        Стоимость / Лояльность <span className="variant-card__arrow">›</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="variant-card__section variant-card__section--pending"
                                        onClick={() => navigate('/stage19')}
                                    >
                                        Доставка <span className="variant-card__arrow">›</span>
                                    </button>
                                    <button type="button" className="variant-card__section variant-card__section--preview">
                                        Посмотреть, как карточка товара будет выглядеть на сайте
                                        <span className="variant-card__arrow">›</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <BottomBar current={13} total={21} prevPath="/stage12" nextPath="/stage14" />
        </>
    )
}

export default Stage13