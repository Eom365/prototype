import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import PhotoGallery from '../components/PhotoGallery'
import './Stage3.css'

function Stage3() {
    const [params] = useSearchParams()
    const productId = params.get('id')
    const [showNoSub, setShowNoSub] = useState(false)

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 3 - Презентационный каталог продукции</h1>
                <h2 className="subtitle">Презентационные фотографии продукта</h2>

                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {productId && <PhotoGallery productId={productId} role="presentation" />}

                <h2 className="subtitle subtitle--video">
                    Презентационное видео продукта
                </h2>
                <div className="video-row">
                    <button type="button" className="add-photo-btn" onClick={() => setShowNoSub(true)}>
                        <span className="add-photo-btn__icon">＋</span>
                        <span className="add-photo-btn__text">Добавить видео</span>
                    </button>

                    {showNoSub && (
                        <span className="no-sub-text">Оплатите подписку и добавьте видео</span>
                    )}
                </div>
            </div>

            <BottomBar current={3} total={21} prevPath="/stage2" nextPath="/stage4" />
        </>
    )
}

export default Stage3
