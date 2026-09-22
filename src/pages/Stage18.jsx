import { useState, useRef } from 'react'
import BottomBar from '../components/BottomBar'
import './Stage18.css'

const MAX_PHOTOS = 5

function Stage18() {
    const [packType, setPackType] = useState('')
    const [material, setMaterial] = useState('')
    const [materialCustom, setMaterialCustom] = useState('')
    const [sizeUnit, setSizeUnit] = useState('sm')
    const [sizes, setSizes] = useState({
        length: '',
        width: '',
        height: '',
    })
    const [photos, setPhotos] = useState([])
    const fileInputRef = useRef(null)

    const handleSizeChange = (name, value) => {
        setSizes((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddPhoto = () => {
        fileInputRef.current?.click()
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const url = URL.createObjectURL(file)
        setPhotos((prev) => [...prev, { id: Date.now(), url, name: file.name }])
        e.target.value = ''
    }

    const selectPackType = (value) => {
        setPackType(value)
        setMaterial('')
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 18. Добавьте упаковку</h1>

                {/* Вид упаковки */}
                <div className="section">
                    <h2 className="subtitle">Укажите вид упаковки:</h2>

                    <div className="radio-row">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="packType"
                                value="box"
                                checked={packType === 'box'}
                                onChange={() => selectPackType('box')}
                            />
                            <span>Коробка</span>
                        </label>
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                    </div>

                    <div className="radio-row">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="packType"
                                value="case"
                                checked={packType === 'case'}
                                onChange={() => selectPackType('case')}
                            />
                            <span>Футляр</span>
                        </label>
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                    </div>

                    <div className="radio-row">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="packType"
                                value="blister"
                                checked={packType === 'blister'}
                                onChange={() => selectPackType('blister')}
                            />
                            <span>Блистер</span>
                        </label>
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                    </div>
                </div>

                {/* Материал упаковки */}
                <div className="section">
                    <h2 className="subtitle">Укажите материал упаковки:</h2>

                    {!packType && (
                        <p className="material-hint">
                            Сначала выберите вид упаковки выше
                        </p>
                    )}

                    {/* ===== Коробка ===== */}
                    {packType === 'box' && (
                        <div className="material-buttons">
                            <button
                                type="button"
                                className={`material-btn ${material === 'cardboard' ? 'material-btn--active' : ''}`}
                                onClick={() => setMaterial('cardboard')}
                            >
                                Картон
                            </button>
                            <button
                                type="button"
                                className={`material-btn ${material === 'plastic' ? 'material-btn--active' : ''}`}
                                onClick={() => setMaterial('plastic')}
                            >
                                Пластик
                            </button>
                            <button
                                type="button"
                                className={`material-btn ${material === 'other' ? 'material-btn--active' : ''}`}
                                onClick={() => setMaterial('other')}
                            >
                                Иное
                            </button>

                            {material === 'other' && (
                                <input
                                    type="text"
                                    className="material-input"
                                    placeholder="Введите своё значение"
                                    value={materialCustom}
                                    onChange={(e) => setMaterialCustom(e.target.value)}
                                />
                            )}
                        </div>
                    )}

                    {/* ===== Футляр ===== */}
                    {packType === 'case' && (
                        <div className="material-buttons">
                            <button
                                type="button"
                                className={`material-btn ${material === 'hdpe' ? 'material-btn--active' : ''}`}
                                onClick={() => setMaterial('hdpe')}
                            >
                                Полиэтилен высокой плотности
                            </button>
                            <button
                                type="button"
                                className={`material-btn ${material === 'plastic' ? 'material-btn--active' : ''}`}
                                onClick={() => setMaterial('plastic')}
                            >
                                Пластик
                            </button>
                            <button
                                type="button"
                                className={`material-btn ${material === 'nylon' ? 'material-btn--active' : ''}`}
                                onClick={() => setMaterial('nylon')}
                            >
                                Нейлон
                            </button>
                            <button
                                type="button"
                                className={`material-btn ${material === 'other' ? 'material-btn--active' : ''}`}
                                onClick={() => setMaterial('other')}
                            >
                                Иное
                            </button>

                            {material === 'other' && (
                                <input
                                    type="text"
                                    className="material-input"
                                    placeholder="Введите своё значение"
                                    value={materialCustom}
                                    onChange={(e) => setMaterialCustom(e.target.value)}
                                />
                            )}
                        </div>
                    )}

                    {/* ===== Блистер ===== */}
                    {packType === 'blister' && (
                        <div className="material-buttons">
                            <button
                                type="button"
                                className={`material-btn ${material === 'hdpe' ? 'material-btn--active' : ''}`}
                                onClick={() => setMaterial('hdpe')}
                            >
                                Полиэтилен высокой плотности
                            </button>
                            <button
                                type="button"
                                className={`material-btn ${material === 'pet' ? 'material-btn--active' : ''}`}
                                onClick={() => setMaterial('pet')}
                            >
                                Полиэтилентерефталат
                            </button>
                            <button
                                type="button"
                                className={`material-btn ${material === 'pvc' ? 'material-btn--active' : ''}`}
                                onClick={() => setMaterial('pvc')}
                            >
                                Поливинилхлорид
                            </button>
                            <button
                                type="button"
                                className={`material-btn ${material === 'other' ? 'material-btn--active' : ''}`}
                                onClick={() => setMaterial('other')}
                            >
                                Иное
                            </button>

                            {material === 'other' && (
                                <input
                                    type="text"
                                    className="material-input"
                                    placeholder="Введите своё значение"
                                    value={materialCustom}
                                    onChange={(e) => setMaterialCustom(e.target.value)}
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* Единицы измерения */}
                <div className="section">
                    <h2 className="subtitle">Выберите единицы измерения размеров упаковки:</h2>

                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="sizeUnit"
                                value="sm"
                                checked={sizeUnit === 'sm'}
                                onChange={(e) => setSizeUnit(e.target.value)}
                            />
                            <span>Сантиметры</span>
                        </label>

                        <label className="radio-label">
                            <input
                                type="radio"
                                name="sizeUnit"
                                value="mm"
                                checked={sizeUnit === 'mm'}
                                onChange={(e) => setSizeUnit(e.target.value)}
                            />
                            <span>Миллиметры</span>
                        </label>
                    </div>
                </div>

                {/* Размеры */}
                <div className="section">
                    <h2 className="subtitle">
                        Укажите внешние размеры упаковки (длина x ширина x высота):
                    </h2>

                    <div className="dimension-row">
                        <label className="dimension-label">Длина</label>
                        <input
                            type="text"
                            className="dimension-input"
                            value={sizes.length}
                            onChange={(e) => handleSizeChange('length', e.target.value)}
                        />
                        <span className="dimension-unit">
                            {sizeUnit === 'sm' ? 'сантиметров' : 'миллиметров'}
                        </span>
                    </div>

                    <div className="dimension-row">
                        <label className="dimension-label">Ширина</label>
                        <input
                            type="text"
                            className="dimension-input"
                            value={sizes.width}
                            onChange={(e) => handleSizeChange('width', e.target.value)}
                        />
                        <span className="dimension-unit">
                            {sizeUnit === 'sm' ? 'сантиметров' : 'миллиметров'}
                        </span>
                    </div>

                    <div className="dimension-row">
                        <label className="dimension-label">Высота</label>
                        <input
                            type="text"
                            className="dimension-input"
                            value={sizes.height}
                            onChange={(e) => handleSizeChange('height', e.target.value)}
                        />
                        <span className="dimension-unit">
                            {sizeUnit === 'sm' ? 'сантиметров' : 'миллиметров'}
                        </span>
                    </div>
                </div>

                {/* Фотографии */}
                <div className="section">
                    <h2 className="subtitle">Добавьте фотографии упаковки:</h2>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                    />

                    <button
                        className="add-photo-btn"
                        onClick={handleAddPhoto}
                        disabled={photos.length >= MAX_PHOTOS}
                    >
                        <span className="add-photo-btn__icon">＋</span>
                        <span className="add-photo-btn__text">Добавить фотографию</span>
                    </button>

                    <div className="gallery">
                        <div className="slot--big">
                            {photos[0] && (
                                <img src={photos[0].url} alt={photos[0].name} className="slot__img" />
                            )}
                        </div>

                        <div className="slots-small">
                            {[1, 2, 3, 4].map((index) => (
                                <div key={index} className="slot--small">
                                    {photos[index] && (
                                        <img
                                            src={photos[index].url}
                                            alt={photos[index].name}
                                            className="slot__img"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <BottomBar current={18} total={21} prevPath="/stage17" nextPath="/stage19" />
        </>
    )
}

export default Stage18