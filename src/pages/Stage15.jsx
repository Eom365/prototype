import { useState, useRef } from 'react'
import BottomBar from '../components/BottomBar'
import './Stage15.css'

function Stage15() {
    // Блок 1: Описание товара
    const [description, setDescription] = useState({
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
    })

    // Блок 2: Характеристики
    const [specs, setSpecs] = useState({
        article: '',
        model: '',
        weight: '',
        weightUnit: 'gram',
        tolerance: '',
        toleranceMode: 'gram',
        length: '',
        lengthUnit: 'millimeters',
        width: '',
        widthUnit: 'millimeters',
        height: '',
        heightUnit: 'millimeters',
        headSize: '',
        headSizeCustom: '',
        brand: '',
        manufacturer: '',
        country: '',
        gearRatio: '',
        gearRatioCustom: '',
        maxSpeed: '',
        maxSpeedCustom: '',
        light: '',
        lightSource: '',
        coolingType: '',
        sprayPoints: '',
        burLock: '',
        motorConnection: '',
        motorConnectionCustom: '',
        bodyMaterial: '',
        bodyMaterialCustom: '',
        bodyCoating: '',
        bodyCoatingCustom: '',
        warranty: '',
        warrantyCustom: '',
    })

    // Логотип
    const [logoFile, setLogoFile] = useState(null)
    const logoInputRef = useRef(null)

    const handleLogoClick = () => {
        logoInputRef.current?.click()
    }

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const url = URL.createObjectURL(file)
        setLogoFile({ file, url, name: file.name })
        e.target.value = ''
    }

    const handleLogoRemove = () => {
        if (logoFile?.url) URL.revokeObjectURL(logoFile.url)
        setLogoFile(null)
    }

    const handleDescriptionChange = (name, value) => {
        setDescription((prev) => ({ ...prev, [name]: value }))
    }

    const handleSpecsChange = (name, value) => {
        setSpecs((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <div className="container">
                {/* ===== БЛОК 1: ОПИСАНИЕ ===== */}
                <h2 className="subtitle">Введите описание товара:</h2>

                <div className="form">
                    <div className="field">
                        <label className="label">Описание</label>
                        <input
                            type="text"
                            className="input"
                            value={description.field1}
                            onChange={(e) => handleDescriptionChange('field1', e.target.value)}
                            placeholder="Введите значение..."
                        />
                    </div>

                    <div className="field">
                        <label className="label">Комплектация</label>
                        <input
                            type="text"
                            className="input"
                            value={description.field2}
                            onChange={(e) => handleDescriptionChange('field2', e.target.value)}
                            placeholder="Введите значение..."
                        />
                    </div>

                    <div className="field">
                        <label className="label">Область применения</label>
                        <input
                            type="text"
                            className="input"
                            value={description.field3}
                            onChange={(e) => handleDescriptionChange('field3', e.target.value)}
                            placeholder="Введите значение..."
                        />
                    </div>

                    <div className="field">
                        <label className="label">Условия хранения</label>
                        <input
                            type="text"
                            className="input"
                            value={description.field4}
                            onChange={(e) => handleDescriptionChange('field4', e.target.value)}
                            placeholder="Введите значение..."
                        />
                    </div>

                    <div className="field">
                        <label className="label">Меры предосторожности</label>
                        <input
                            type="text"
                            className="input"
                            value={description.field5}
                            onChange={(e) => handleDescriptionChange('field5', e.target.value)}
                            placeholder="Введите значение..."
                        />
                    </div>
                </div>

                {/* ===== БЛОК 2: ХАРАКТЕРИСТИКИ ===== */}
                <h2 className="subtitle subtitle--spaced">Заполните характеристики продукта:</h2>

                <div className="form">
                    {/* Логотип */}
                    <div className="field-row">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Логотип</span>

                        <input
                            type="file"
                            accept="image/*"
                            ref={logoInputRef}
                            onChange={handleLogoChange}
                            style={{ display: 'none' }}
                        />

                        {logoFile ? (
                            <div className="field-input field-input--file field-input--has-file">
                                <img
                                    src={logoFile.url}
                                    alt="Логотип"
                                    className="file-preview"
                                />
                                <span className="file-text">{logoFile.name}</span>
                                <button
                                    type="button"
                                    className="file-remove"
                                    onClick={handleLogoRemove}
                                    title="Удалить"
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                className="field-input field-input--file"
                                onClick={handleLogoClick}
                            >
                                <span className="file-icon">📎</span>
                                <span className="file-text">Загрузить фотографию</span>
                            </button>
                        )}
                    </div>

                    {/* Артикул */}
                    <div className="field-row">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Артикул</span>
                        <input
                            type="text"
                            className="field-input"
                            placeholder="Значение"
                            value={specs.article}
                            onChange={(e) => handleSpecsChange('article', e.target.value)}
                        />
                        <span className="required-mark">✱</span>
                    </div>

                    {/* Модель */}
                    <div className="field-row">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Модель</span>
                        <input
                            type="text"
                            className="field-input"
                            placeholder="Значение"
                            value={specs.model}
                            onChange={(e) => handleSpecsChange('model', e.target.value)}
                        />
                        <span className="required-mark">✱</span>
                    </div>

                    {/* Вес */}
                    <div className="field-row">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Вес</span>
                        <input
                            type="text"
                            className="field-input"
                            placeholder="Значение"
                            value={specs.weight}
                            onChange={(e) => handleSpecsChange('weight', e.target.value)}
                        />
                        <select
                            className="field-select"
                            value={specs.weightUnit}
                            onChange={(e) => handleSpecsChange('weightUnit', e.target.value)}
                        >
                            <option value="gram">Грамм</option>
                            <option value="kilogram">Килограмм</option>
                        </select>
                        <span className="required-mark">✱</span>
                    </div>

                    {/* Погрешность веса */}
                    <div className="field-row">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Погрешность веса</span>
                        <input
                            type="text"
                            className="field-input"
                            placeholder="Значение"
                            value={specs.tolerance}
                            onChange={(e) => handleSpecsChange('tolerance', e.target.value)}
                        />
                        <select
                            className="field-select"
                            value={specs.toleranceMode}
                            onChange={(e) => handleSpecsChange('toleranceMode', e.target.value)}
                        >
                            <option value="gram">Грамм</option>
                            <option value="percent">%</option>
                        </select>
                        <span className="required-mark">✱</span>
                    </div>

                    {/* ===== ГАБАРИТЫ ===== */}
                    <h3 className="subtitle subtitle--spaced">Габариты продукта</h3>

                    <div className="field-row">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Длина</span>
                        <input
                            type="text"
                            className="field-input"
                            placeholder="Значение"
                            value={specs.length}
                            onChange={(e) => handleSpecsChange('length', e.target.value)}
                        />
                        <select
                            className="field-select"
                            value={specs.lengthUnit}
                            onChange={(e) => handleSpecsChange('lengthUnit', e.target.value)}
                        >
                            <option value="millimeters">Миллиметры</option>
                            <option value="centimeters">Сантиметры</option>
                        </select>
                        <span className="required-mark">✱</span>
                    </div>

                    <div className="field-row">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Ширина</span>
                        <input
                            type="text"
                            className="field-input"
                            placeholder="Значение"
                            value={specs.width}
                            onChange={(e) => handleSpecsChange('width', e.target.value)}
                        />
                        <select
                            className="field-select"
                            value={specs.widthUnit}
                            onChange={(e) => handleSpecsChange('widthUnit', e.target.value)}
                        >
                            <option value="millimeters">Миллиметры</option>
                            <option value="centimeters">Сантиметры</option>
                        </select>
                        <span className="required-mark">✱</span>
                    </div>

                    <div className="field-row">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Высота</span>
                        <input
                            type="text"
                            className="field-input"
                            placeholder="Значение"
                            value={specs.height}
                            onChange={(e) => handleSpecsChange('height', e.target.value)}
                        />
                        <select
                            className="field-select"
                            value={specs.heightUnit}
                            onChange={(e) => handleSpecsChange('heightUnit', e.target.value)}
                        >
                            <option value="millimeters">Миллиметры</option>
                            <option value="centimeters">Сантиметры</option>
                        </select>
                        <span className="required-mark">✱</span>
                    </div>

                    {/* Размер головки */}
                    <div className="field-row field-row--options">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Размер головки</span>

                        <div className="option-group">
                            <button
                                type="button"
                                className={`option-btn ${specs.headSize === 'standard' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('headSize', 'standard')}
                            >
                                Стандартная
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.headSize === 'mini' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('headSize', 'mini')}
                            >
                                Мини
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.headSize === 'other' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('headSize', 'other')}
                            >
                                Иное
                            </button>

                            {specs.headSize === 'other' && (
                                <input
                                    type="text"
                                    className="field-input option-custom-input"
                                    placeholder="Введите своё значение"
                                    value={specs.headSizeCustom}
                                    onChange={(e) => handleSpecsChange('headSizeCustom', e.target.value)}
                                />
                            )}
                        </div>

                        <span className="required-mark">✱</span>
                    </div>

                    {/* ===== ИНФОРМАЦИЯ О ПРОИЗВОДИТЕЛЕ ===== */}
                    <h3 className="subtitle subtitle--spaced">Информация о производителе</h3>

                    <div className="field-row">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Бренд</span>
                        <input
                            type="text"
                            className="field-input"
                            placeholder="Значение"
                            value={specs.brand}
                            onChange={(e) => handleSpecsChange('brand', e.target.value)}
                        />
                        <span className="required-mark">✱</span>
                    </div>

                    <div className="field-row">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Производитель</span>
                        <input
                            type="text"
                            className="field-input"
                            placeholder="Значение"
                            value={specs.manufacturer}
                            onChange={(e) => handleSpecsChange('manufacturer', e.target.value)}
                        />
                        <span className="required-mark">✱</span>
                    </div>

                    <div className="field-row">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Страна производства</span>
                        <input
                            type="text"
                            className="field-input"
                            placeholder="Значение"
                            value={specs.country}
                            onChange={(e) => handleSpecsChange('country', e.target.value)}
                        />
                        <span className="required-mark">✱</span>
                    </div>

                    {/* ===== ТЕХНИЧЕСКИЕ ХАРАКТЕРИСТИКИ ===== */}
                    <h3 className="subtitle subtitle--spaced">Технические характеристики продукта</h3>

                    <div className="field-row field-row--options">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Передаточное отношение</span>

                        <div className="option-group">
                            <button
                                type="button"
                                className={`option-btn ${specs.gearRatio === '1:1' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('gearRatio', '1:1')}
                            >
                                1:1
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.gearRatio === '1:5' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('gearRatio', '1:5')}
                            >
                                1:5
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.gearRatio === '20:1' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('gearRatio', '20:1')}
                            >
                                20:1
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.gearRatio === 'other' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('gearRatio', 'other')}
                            >
                                Иное
                            </button>

                            {specs.gearRatio === 'other' && (
                                <input
                                    type="text"
                                    className="field-input option-custom-input"
                                    placeholder="Введите своё значение"
                                    value={specs.gearRatioCustom}
                                    onChange={(e) => handleSpecsChange('gearRatioCustom', e.target.value)}
                                />
                            )}
                        </div>

                        <span className="required-mark">✱</span>
                    </div>

                    <div className="field-row field-row--options">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Максимальная скорость (об/мин)</span>

                        <div className="option-group">
                            <button
                                type="button"
                                className={`option-btn ${specs.maxSpeed === '40000' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('maxSpeed', '40000')}
                            >
                                40 000
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.maxSpeed === '200000' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('maxSpeed', '200000')}
                            >
                                200 000
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.maxSpeed === '10000' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('maxSpeed', '10000')}
                            >
                                10 000
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.maxSpeed === 'other' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('maxSpeed', 'other')}
                            >
                                Иное
                            </button>

                            {specs.maxSpeed === 'other' && (
                                <input
                                    type="text"
                                    className="field-input option-custom-input"
                                    placeholder="Введите своё значение"
                                    value={specs.maxSpeedCustom}
                                    onChange={(e) => handleSpecsChange('maxSpeedCustom', e.target.value)}
                                />
                            )}
                        </div>

                        <span className="required-mark">✱</span>
                    </div>

                    {/* ===== ОСВЕЩЕНИЕ ===== */}
                    <h3 className="subtitle subtitle--spaced">Освещение</h3>

                    <div className="field-row field-row--options">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Свет</span>

                        <div className="option-group">
                            <button
                                type="button"
                                className={`option-btn ${specs.light === 'yes' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('light', 'yes')}
                            >
                                Есть
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.light === 'no' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('light', 'no')}
                            >
                                Нет
                            </button>
                        </div>

                        <span className="required-mark">✱</span>
                    </div>

                    <div className="field-row field-row--options">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Источник света</span>

                        <div className="option-group">
                            <button
                                type="button"
                                className={`option-btn ${specs.lightSource === 'fiber' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('lightSource', 'fiber')}
                            >
                                Световод
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.lightSource === 'led' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('lightSource', 'led')}
                            >
                                Светодиод
                            </button>
                        </div>

                        <span className="required-mark">✱</span>
                    </div>

                    {/* ===== СИСТЕМА ОХЛАЖДЕНИЯ ===== */}
                    <h3 className="subtitle subtitle--spaced">Система охлаждения</h3>

                    <div className="field-row field-row--options">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Тип охлаждения</span>

                        <div className="option-group">
                            <button
                                type="button"
                                className={`option-btn ${specs.coolingType === 'inner' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('coolingType', 'inner')}
                            >
                                Внутренний
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.coolingType === 'outer' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('coolingType', 'outer')}
                            >
                                Внешний
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.coolingType === 'combined' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('coolingType', 'combined')}
                            >
                                Комбинированный
                            </button>
                        </div>

                        <span className="required-mark">✱</span>
                    </div>

                    <div className="field-row field-row--options">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Количество точек спрея</span>

                        <div className="option-group">
                            <button
                                type="button"
                                className={`option-btn ${specs.sprayPoints === '1' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('sprayPoints', '1')}
                            >
                                1-точечный
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.sprayPoints === '2' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('sprayPoints', '2')}
                            >
                                2-точечный
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.sprayPoints === '3' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('sprayPoints', '3')}
                            >
                                3-точечный
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.sprayPoints === '4' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('sprayPoints', '4')}
                            >
                                4-точечный
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.sprayPoints === '5' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('sprayPoints', '5')}
                            >
                                5-точечный
                            </button>
                        </div>

                        <span className="required-mark">✱</span>
                    </div>

                    {/* ===== МЕХАНИЧЕСКИЕ ХАРАКТЕРИСТИКИ ===== */}
                    <h3 className="subtitle subtitle--spaced">Механические характеристики</h3>

                    <div className="field-row field-row--options">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Механизм фиксации бора</span>

                        <div className="option-group">
                            <button
                                type="button"
                                className={`option-btn ${specs.burLock === 'button' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('burLock', 'button')}
                            >
                                Кнопочный зажим
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.burLock === 'collet' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('burLock', 'collet')}
                            >
                                Цанговый зажим
                            </button>
                        </div>

                        <span className="required-mark">✱</span>
                    </div>

                    <div className="field-row field-row--options">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Тип соединения с микромотором</span>

                        <div className="option-group">
                            <button
                                type="button"
                                className={`option-btn ${specs.motorConnection === 'e-type' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('motorConnection', 'e-type')}
                            >
                                Е-тип
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.motorConnection === 'other' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('motorConnection', 'other')}
                            >
                                Иное
                            </button>

                            {specs.motorConnection === 'other' && (
                                <input
                                    type="text"
                                    className="field-input option-custom-input"
                                    placeholder="Введите своё значение"
                                    value={specs.motorConnectionCustom}
                                    onChange={(e) => handleSpecsChange('motorConnectionCustom', e.target.value)}
                                />
                            )}
                        </div>

                        <span className="required-mark">✱</span>
                    </div>

                    {/* ===== МАТЕРИАЛ ПРОДУКТА ===== */}
                    <h3 className="subtitle subtitle--spaced">Материал продукта</h3>

                    <div className="field-row field-row--options">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Материал корпуса</span>

                        <div className="option-group">
                            <button
                                type="button"
                                className={`option-btn ${specs.bodyMaterial === 'steel' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('bodyMaterial', 'steel')}
                            >
                                Нержавеющая сталь
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.bodyMaterial === 'brass' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('bodyMaterial', 'brass')}
                            >
                                Латунь
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.bodyMaterial === 'titanium' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('bodyMaterial', 'titanium')}
                            >
                                Титан
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.bodyMaterial === 'other' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('bodyMaterial', 'other')}
                            >
                                Иное
                            </button>

                            {specs.bodyMaterial === 'other' && (
                                <input
                                    type="text"
                                    className="field-input option-custom-input"
                                    placeholder="Введите своё значение"
                                    value={specs.bodyMaterialCustom}
                                    onChange={(e) => handleSpecsChange('bodyMaterialCustom', e.target.value)}
                                />
                            )}
                        </div>

                        <span className="required-mark">✱</span>
                    </div>

                    <div className="field-row field-row--options">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Покрытие корпуса</span>

                        <div className="option-group">
                            <button
                                type="button"
                                className={`option-btn ${specs.bodyCoating === 'chrome' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('bodyCoating', 'chrome')}
                            >
                                Хром
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.bodyCoating === 'other' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('bodyCoating', 'other')}
                            >
                                Иное
                            </button>

                            {specs.bodyCoating === 'other' && (
                                <input
                                    type="text"
                                    className="field-input option-custom-input"
                                    placeholder="Введите своё значение"
                                    value={specs.bodyCoatingCustom}
                                    onChange={(e) => handleSpecsChange('bodyCoatingCustom', e.target.value)}
                                />
                            )}
                        </div>

                        <span className="required-mark">✱</span>
                    </div>

                    {/* ===== ГАРАНТИЯ ===== */}
                    <h3 className="subtitle subtitle--spaced">Гарантия</h3>

                    <div className="field-row field-row--options">
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <span className="field-name">Гарантия завода</span>

                        <div className="option-group">
                            <button
                                type="button"
                                className={`option-btn ${specs.warranty === '6' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('warranty', '6')}
                            >
                                6 месяцев
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.warranty === '12' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('warranty', '12')}
                            >
                                12 месяцев
                            </button>
                            <button
                                type="button"
                                className={`option-btn ${specs.warranty === 'other' ? 'option-btn--active' : ''}`}
                                onClick={() => handleSpecsChange('warranty', 'other')}
                            >
                                Иное
                            </button>

                            {specs.warranty === 'other' && (
                                <input
                                    type="text"
                                    className="field-input option-custom-input"
                                    placeholder="Введите своё значение"
                                    value={specs.warrantyCustom}
                                    onChange={(e) => handleSpecsChange('warrantyCustom', e.target.value)}
                                />
                            )}
                        </div>

                        <span className="required-mark">✱</span>
                    </div>
                </div>
            </div>

            <BottomBar current={15} total={21} prevPath="/stage14" nextPath="/stage16" />
        </>
    )
}

export default Stage15