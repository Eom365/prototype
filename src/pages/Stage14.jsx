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
                <h1 className="title">Этап 14 — Фотографии продукта</h1>
                <h2 className="subtitle">Добавьте фотографии продукта</h2>
                <p className="section-description">
                    Загрузите изображения одного конкретного варианта изделия: общий вид, ракурсы,
                    детали. На каждом фото — только этот вариант товара, без ассортимента линейки.
                </p>
                <p className="pBold">Пример правильного заполнения:</p>

                <div className="presentation-images">
                    <img
                        src="/images/product-single-example1.png"
                        alt="Пример: одно изделие — смартфон с двух ракурсов"
                    />
                    <img
                        src="/images/product-single-example2.png"
                        alt="Пример: одно изделие — стоматологический наконечник"
                    />
                </div>

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
