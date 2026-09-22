import { useNavigate } from 'react-router-dom'
import './BottomBar.css'

function BottomBar({ current, total = 21
    , nextPath, prevPath, onNext }) {
    const navigate = useNavigate()

    const handleNextClick = () => {
        if (onNext) {
            onNext()        
        } else if (nextPath) {
            navigate(nextPath) 
        }
    }

    return (
        <div className="bottom-bar">
            <div className="bottom-bar__col">
                <span className="bottom-bar__stage">
                    Этап {current} из {total}
                </span>
            </div>

            <div className="bottom-bar__col">
                {prevPath && (
                    <button
                        className="bottom-bar__btn"
                        onClick={() => navigate(prevPath)}
                    >
                        ← Вернуть на этап назад
                    </button>
                )}
            </div>

            <div className="bottom-bar__col">
                <button
                    className="bottom-bar__close"
                    onClick={() => navigate('/')}
                    title="На главную"
                >
                    ✕
                </button>
            </div>

            <div className="bottom-bar__col">
                <button
                    className="bottom-bar__btn"
                    onClick={handleNextClick}
                    disabled={!nextPath && !onNext}
                >
                    Далее →
                </button>
            </div>
        </div>
    )
}

export default BottomBar