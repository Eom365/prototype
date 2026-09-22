import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import './Stage11.css'

function Stage11() {
    const navigate = useNavigate()
    const location = useLocation()
    const [showModal, setShowModal] = useState(false)

    const handleNext = () => {
        setShowModal(true)
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 11 - Предварительный просмотр</h1>

                <div className="links">
                    <span className="link link--disabled">
                        Посмотреть карточку товара на сайте
                        <span className="link__arrow">›</span>
                    </span>
                </div>
            </div>

            <BottomBar
                current={11}
                total={21}
                prevPath="/stage10"
                nextPath="/stage12"
                onNext={handleNext}
            />

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal__title">
                            Карточка товара отправлена на проверку
                        </h2>

                        <button
                            type="button"
                            className="modal__btn"
                            onClick={() => navigate({ pathname: '/stage12', search: location.search })}
                        >
                            Понятно
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Stage11