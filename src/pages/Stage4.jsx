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
                <h1 className="title">Этап 4 — Фотографии продукта</h1>
                <h2 className="subtitle">Добавьте фотографии продукта</h2>
                <p className="section-description standart">
                    Загрузите изображения одного конкретного продукта: общий вид, ракурсы, детали,
                    комплектация. На каждом фото должен быть показан один товар, а не линейка
                    или ассортимент продукции.
                </p>
                <p>Требования к фотографиям продукта: </p>
                <p className="pBold standartOne">Фон: продукт на фотографии должен быть на белом фоне.<br /> Ракурс: продукт должен занимать 2/3 изображения.</p>
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

                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {productId && <PhotoGallery productId={productId} role="product" />}
            </div>

            <BottomBar current={4} total={11} prevPath="/stage3" nextPath="/stage5" />
        </>
    )
}

export default Stage4
