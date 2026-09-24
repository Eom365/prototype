import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { productsApi } from '../api'
import BottomBar from '../components/BottomBar'
import './Stage21.css'

function Stage21() {
    const navigate = useNavigate()
    const location = useLocation()
    const [showModal, setShowModal] = useState(false)

    const handleNext = () => {
        setShowModal(true)
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 21 - Предварительный просмотр</h1>

                <div className="links">
                    <span className="link link--disabled">
                        Посмотреть карточку товара на сайте
                        <span className="link__arrow">›</span>
                    </span>
                </div>
            </div>

            <BottomBar
                current={21}
                total={21}
                prevPath="/stage20"
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
                            onClick={async () => {
                                localStorage.setItem('variantCompleted', 'true')
                                const id = new URLSearchParams(location.search).get('id')
                                if (id) {
                                    try {
                                        await productsApi.complete(id)
                                    } catch (error) {
                                        window.alert(error.message || 'Не удалось сохранить карточку')
                                        return
                                    }
                                }
                                navigate({ pathname: '/stage13', search: location.search })
                            }}
                        >
                            Понятно
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Stage21