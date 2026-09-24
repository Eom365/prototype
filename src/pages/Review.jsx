import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productsApi } from '../api'
import './Review.css'

function Review() {
    const [items, setItems] = useState([])
    const [error, setError] = useState('')

    const load = () => productsApi.pendingReviews().then(setItems).catch((loadError) => setError(loadError.message))

    useEffect(() => {
        load()
    }, [])

    const approve = async (item) => {
        setError('')
        try {
            await productsApi.approveReview(item.productId, item.variationId)
            await load()
        } catch (approveError) {
            setError(approveError.message)
        }
    }

    return (
        <div className="review-page">
            <Link to="/" className="review-page__back">На главную</Link>
            <h1>Проверка</h1>
            {error && <p className="form-error">{error}</p>}
            {items.length === 0 && <p className="review-page__empty">Карточек на проверке нет.</p>}
            <div className="review-page__list">
                {items.map((item) => (
                    <article className="review-card" key={item.variationId}>
                        <h2>{item.title}</h2>
                        <div className="review-card__chips">
                            {(item.chips || []).map((chip) => (
                                <span className="review-card__chip" key={chip}>{chip}</span>
                            ))}
                        </div>
                        {item.address && <p>{item.address}</p>}
                        {item.price && (
                            <p className="review-card__price">
                                {item.currency === 'CNY' ? '¥' : '₽'} {item.price}
                            </p>
                        )}
                        <button type="button" className="review-card__approve" onClick={() => approve(item)}>
                            Одобрить
                        </button>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default Review
