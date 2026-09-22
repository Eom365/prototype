import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import PhotoGallery from '../components/PhotoGallery'
import './Stage14.css'

function Stage14() {
    const [params] = useSearchParams()
    const productId = params.get('id')
    const variationId = params.get('variationId')
    const [showNoSub, setShowNoSub] = useState(false)

    const handleAddVideo = () => {
        setShowNoSub(true)
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 14 - Презентация продукта</h1>
                <h2 className="subtitle">Презентационные фотографии продукта</h2>

                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {productId && !variationId && <p className="form-error">Сначала создайте вариант на этапе 13.</p>}
                {productId && variationId && (
                    <PhotoGallery productId={productId} role="presentation" variationId={variationId} />
                )}

                <h2 className="subtitle subtitle--video">
                    Презентационное видео продукта
                </h2>
                <div className="video-row">
                    <button className="add-video-btn" onClick={handleAddVideo}>
                        <span className="add-video-btn__icon">＋</span>
                        <span className="add-video-btn__text">Добавить видео</span>
                    </button>

                    {showNoSub && (
                        <span className="no-sub-text">Оплатите подписку и добавьте видео</span>
                    )}
                </div>
            </div>

            <BottomBar current={14} total={21} prevPath="/stage13" nextPath="/stage15" />
        </>
    )
}

export default Stage14