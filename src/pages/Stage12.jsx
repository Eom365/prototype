import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { productsApi } from '../api'
import './Stage12.css'

function Stage12() {
    const navigate = useNavigate()
    const location = useLocation()
    const [params] = useSearchParams()
    const productId = params.get('id')
    const go = (path) => navigate({ pathname: path, search: path === '/' ? '' : location.search })

    const choose = async (wantsVariants) => {
        if (!productId) {
            window.alert('Сначала создайте карточку на главной странице')
            return
        }
        try {
            await productsApi.saveWantsVariants(productId, { wantsVariants })
            go(wantsVariants ? '/stage13' : '/')
        } catch (error) {
            window.alert(error.message || 'Не удалось сохранить')
        }
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 12 - Вариант параметра продукта</h1>

                <p className="question">
                    У созданного продукта есть вариант параметра продукта?
                </p>

                <p className="description">
                    Вариант параметра продукта — это характеристики (например — модель, цвет, объем, размер), по которым продукт
                    имеет несколько вариантов исполнения, которые можно объединить в одну карточку продукта. 
                </p>
            </div>

            {/* Вместо BottomBar — две кнопки внизу */}
            <div className="action-bar">
                <button
                    type="button"
                    className="action-btn action-btn--no"
                    onClick={() => choose(false)}
                    title="Нет"
                >
                    <span className="action-btn__circle">✕</span>
                </button>

                <button
                    type="button"
                    className="action-btn action-btn--yes"
                    onClick={() => choose(true)}
                    title="Да"
                >
                    <span className="action-btn__circle">✓</span>
                </button>
            </div>
        </>
    )
}

export default Stage12