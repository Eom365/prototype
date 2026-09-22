import { useEffect, useState } from 'react'
import { productsApi } from '../api'

function VariationsEditor({ productId, onChanged }) {
    const [items, setItems] = useState([])
    const [article, setArticle] = useState('')
    const [model, setModel] = useState('')
    const [error, setError] = useState('')

    const load = async () => {
        const product = await productsApi.get(productId)
        setItems(product.variations || [])
    }

    useEffect(() => {
        if (!productId) return
        load().catch((loadError) => setError(loadError.message))
    }, [productId])

    const handleAdd = async (event) => {
        event.preventDefault()
        if (!article.trim() && !model.trim()) {
            setError('Укажите артикул или модель вариации')
            return
        }
        setError('')
        try {
            await productsApi.addVariation(productId, { article, model })
            setArticle('')
            setModel('')
            await load()
            if (onChanged) onChanged()
        } catch (addError) {
            setError(addError.message)
        }
    }

    const handleSave = async (item) => {
        setError('')
        try {
            await productsApi.updateVariation(productId, item.id, {
                article: item.article,
                model: item.model,
            })
            if (onChanged) onChanged()
        } catch (saveError) {
            setError(saveError.message)
        }
    }

    const handleRemove = async (variationId) => {
        setError('')
        try {
            await productsApi.deleteVariation(productId, variationId)
            await load()
            if (onChanged) onChanged()
        } catch (removeError) {
            setError(removeError.message)
        }
    }

    return (
        <div className="variations">
            <h2 className="subtitle">Вариации</h2>
            <p className="paragraph">
                Вариация копирует характеристики карточки. Артикул и модель можно задать свои.
            </p>

            <form className="variation-form" onSubmit={handleAdd}>
                <input
                    className="input"
                    placeholder="Артикул"
                    value={article}
                    onChange={(event) => setArticle(event.target.value)}
                />
                <input
                    className="input"
                    placeholder="Модель"
                    value={model}
                    onChange={(event) => setModel(event.target.value)}
                />
                <button className="home__button variation-add" type="submit">
                    Добавить
                </button>
            </form>

            {error && <p className="form-error">{error}</p>}

            <div className="variation-list">
                {items.map((item) => (
                    <div className="variation-row" key={item.id}>
                        <input
                            className="input"
                            value={item.article || ''}
                            placeholder="Артикул"
                            onChange={(event) =>
                                setItems((prev) =>
                                    prev.map((row) =>
                                        row.id === item.id ? { ...row, article: event.target.value } : row
                                    )
                                )
                            }
                        />
                        <input
                            className="input"
                            value={item.model || ''}
                            placeholder="Модель"
                            onChange={(event) =>
                                setItems((prev) =>
                                    prev.map((row) =>
                                        row.id === item.id ? { ...row, model: event.target.value } : row
                                    )
                                )
                            }
                        />
                        <button type="button" className="bottom-bar__btn" onClick={() => handleSave(item)}>
                            Сохранить
                        </button>
                        <button type="button" className="bottom-bar__btn" onClick={() => handleRemove(item.id)}>
                            Удалить
                        </button>
                    </div>
                ))}
                {items.length === 0 && <p className="paragraph">Вариаций пока нет</p>}
            </div>
        </div>
    )
}

export default VariationsEditor
