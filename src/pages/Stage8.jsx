import { useState, useRef } from 'react'
import BottomBar from '../components/BottomBar'
import './Stage8.css'

const MAX_PHOTOS = 5

function Stage8() {
    // Вид упаковки (радио + своё значение)
    const [packType, setPackType] = useState('')
    const [packTypeCustom, setPackTypeCustom] = useState({
        box: '',
        case: '',
        blister: '',
    })

    // Единицы измерения
    const [sizeUnit, setSizeUnit] = useState('sm')

    // Размеры
    const [sizes, setSizes] = useState({
        length: '',
        width: '',
        height: '',
    })

    // Фотографии
    const [photos, setPhotos] = useState([])
    const fileInputRef = useRef(null)

    const handlePackTypeCustom = (name, value) => {
        setPackTypeCustom((prev) => ({ ...prev, [name]: value }))
    }

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

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 8. Добавьте упаковку</h1>

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
                                onChange={(e) => setPackType(e.target.value)}
                            />
                            <span>Коробка</span>
                        </label>
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <input
                            type="text"
                            className="inline-input"
                            value={packTypeCustom.box}
                            onChange={(e) => handlePackTypeCustom('box', e.target.value)}
                        />
                    </div>

                    <div className="radio-row">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="packType"
                                value="case"
                                checked={packType === 'case'}
                                onChange={(e) => setPackType(e.target.value)}
                            />
                            <span>Футляр</span>
                        </label>
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <input
                            type="text"
                            className="inline-input"
                            value={packTypeCustom.case}
                            onChange={(e) => handlePackTypeCustom('case', e.target.value)}
                        />
                    </div>

                    <div className="radio-row">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="packType"
                                value="blister"
                                checked={packType === 'blister'}
                                onChange={(e) => setPackType(e.target.value)}
                            />
                            <span>Блистер</span>
                        </label>
                        <span className="info-icon" title="Подсказка">ⓘ</span>
                        <input
                            type="text"
                            className="inline-input"
                            value={packTypeCustom.blister}
                            onChange={(e) => handlePackTypeCustom('blister', e.target.value)}
                        />
                    </div>
                </div>

                {/* Материал упаковки */}
                <div className="section">
                    <h2 className="subtitle">Укажите материал упаковки:</h2>

                    <div className="material-list">
                        <p><strong>Коробка</strong> — картон / пластик</p>
                        <p><strong>Футляр</strong> — полиэтилен высокой плотности / пластик / нейлон</p>
                        <p><strong>Блистер</strong> — полиэтилен высокой плотности / Полиэтилентерефталат / Поливинилхлорид</p>
                    </div>
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

            <BottomBar current={8} total={20} prevPath="/stage7" nextPath="/stage9" />
        </>
    )
}

export default Stage8