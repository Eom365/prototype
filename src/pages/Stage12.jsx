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
                <h1 className="title">Этап 12</h1>

                <p className="question">
                    Вы хотите добавить вариант параметра продукта?
                </p>

                <p className="description">
                    Вариант параметра продукта — это параметр (например, модель,
                    серия, размер, цвет), по которому один и тот же товар может
                    иметь несколько вариантов, объединённых в одной карточке.
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