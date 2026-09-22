import { useSearchParams } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import PhotoGallery from '../components/PhotoGallery'
import './Stage3.css'

function Stage4() {
    const [params] = useSearchParams()
    const productId = params.get('id')

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 4 - Фотографии продукта</h1>
                <h2 className="subtitle">Добавьте фотографии продукта</h2>

                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {productId && <PhotoGallery productId={productId} role="product" />}
            </div>

            <BottomBar current={4} total={21} prevPath="/stage3" nextPath="/stage5" />
        </>
    )
}

export default Stage4
