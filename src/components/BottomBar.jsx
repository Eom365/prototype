import { useNavigate } from 'react-router-dom'
import './BottomBar.css'

function BottomBar({ current, total = 20, nextPath, prevPath }) {
    const navigate = useNavigate()

    return (
        <div className="bottom-bar">
            {/* Колонка 1: Этап X из Y */}
            <div className="bottom-bar__col">
                <span className="bottom-bar__stage">
                    Этап {current} из {total}
                </span>
            </div>

            {/* Колонка 2: Назад */}
            <div className="bottom-bar__col">
                {prevPath && (
                    <button
                        className="bottom-bar__btn"
                        onClick={() => navigate(prevPath)}
                    >
                        ← Назад
                    </button>
                )}
            </div>

            {/* Колонка 3: Крестик */}
            <div className="bottom-bar__col">
                <button
                    className="bottom-bar__close"
                    onClick={() => navigate('/')}
                    title="На главную"
                >
                    ✕
                </button>
            </div>

            {/* Колонка 4: Далее */}
            <div className="bottom-bar__col">
                <button
                    className="bottom-bar__btn"
                    onClick={() => nextPath && navigate(nextPath)}
                    disabled={!nextPath}
                >
                    Далее →
                </button>
            </div>
        </div>
    )
}

export default BottomBar