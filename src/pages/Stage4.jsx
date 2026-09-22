import { useState, useRef } from 'react'
import BottomBar from '../components/BottomBar'

const MAX_PHOTOS = 5

function Stage4() {
    const [photos, setPhotos] = useState([])
    const fileInputRef = useRef(null)

    const handleAddClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const url = URL.createObjectURL(file)
        setPhotos((prev) => [...prev, { id: Date.now(), url, name: file.name }])
        e.target.value = ''
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 4 - Фотографии продукта</h1>
                <h2 className="subtitle">Добавьте фотографии продукта</h2>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <button
                    className="add-photo-btn"
                    onClick={handleAddClick}
                    disabled={photos.length >= MAX_PHOTOS}
                >
                    <span className="add-photo-btn__icon">＋</span>
                    <span className="add-photo-btn__text">
                        {photos.length >= MAX_PHOTOS
                            ? `Все ${MAX_PHOTOS} фото добавлены`
                            : `Добавить фотографию (${photos.length}/${MAX_PHOTOS})`}
                    </span>
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

            <BottomBar current={4} total={20} prevPath="/stage3" nextPath="/stage5" />
        </>
    )
}

export default Stage4