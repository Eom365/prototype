import { useNavigate } from 'react-router-dom'
import './Stage12.css'

function Stage12() {
    const navigate = useNavigate()

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
                    onClick={() => navigate('/')}
                    title="Нет"
                >
                    <span className="action-btn__circle">✕</span>
                </button>

                <button
                    type="button"
                    className="action-btn action-btn--yes"
                    onClick={() => navigate('/stage13')}
                    title="Да"
                >
                    <span className="action-btn__circle">✓</span>
                </button>
            </div>
        </>
    )
}

export default Stage12