import BottomBar from '../components/BottomBar'
import PhotoGallery from '../components/PhotoGallery'
import VariationPreview from '../components/VariationPreview'
import { useCardIds } from '../cardScope'
import './Stage3.css'

function Stage14() {
    const { productId, variationId } = useCardIds()

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 14 - Фотографии продукта</h1>
                <h2 className="subtitle">Добавьте фотографии продукта</h2>
                <VariationPreview stage={14} />

                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {productId && !variationId && <p className="form-error">Сначала создайте вариант на этапе 13.</p>}
                {productId && variationId && (
                    <PhotoGallery
                        key={variationId}
                        productId={productId}
                        role="product"
                        variationId={variationId}
                    />
                )}
            </div>

            <BottomBar current={14} total={21} prevPath="/stage13" nextPath="/stage15" />
        </>
    )
}

export default Stage14
