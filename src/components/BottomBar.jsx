import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { notifyProductUpdated } from '../api'
import './BottomBar.css'

function BottomBar({ current, total = 21, nextPath, prevPath, onSave, onFinish, onNext }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [params] = useSearchParams()
    const [busy, setBusy] = useState(false)

    const go = async (path, finish) => {
        if (busy) return
        setBusy(true)
        try {
            if (onSave) await onSave()
            notifyProductUpdated(params.get('id'))
            if (finish && onFinish) await onFinish()
            if (finish && onNext) {
                onNext()
                return
            }
            if (path) {
                navigate({
                    pathname: path,
                    search: path === '/' ? '' : location.search,
                })
            }
        } catch (error) {
            window.alert(error.message || 'Не удалось сохранить')
        } finally {
            setBusy(false)
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
                        onClick={() => go(prevPath, false)}
                        disabled={busy}
                    >
                        ← Вернуть на этап назад
                    </button>
                )}
            </div>

            <div className="bottom-bar__col">
                <button
                    className="bottom-bar__close"
                    onClick={() => go('/', false)}
                    title="На главную"
                    disabled={busy}
                >
                    ✕
                </button>
            </div>

            <div className="bottom-bar__col">
                <button
                    className="bottom-bar__btn"
                    onClick={() => go(nextPath, true)}
                    disabled={busy || (!nextPath && !onNext)}
                >
                    {busy ? 'Сохранение...' : 'Далее →'}
                </button>
            </div>
        </div>
    )
}

export default BottomBar
