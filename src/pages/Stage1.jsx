import { useState } from 'react'
import BottomBar from '../components/BottomBar'
import './Stage1.css'

function Stage1() {
    const [fields, setFields] = useState({
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
    })

    const handleChange = (name, value) => {
        setFields((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Проверка идентичности товара</h1>
                <h2 className="subtitle">Этап 1 - Введите информацию о товаре для поиска совпадений среди существующих карточек товаров</h2>

                <div className="form">
                    <div className="field">
                        <label className="label">Фирменное наименование продукта</label>
                        <input
                            type="text"
                            value={fields.field1}
                            onChange={(e) => handleChange('field1', e.target.value)}
                            className="input"
                            placeholder="Введите значение..."
                        />
                    </div>

                    <div className="field">
                        <label className="label">Наименование бренда</label>
                        <input
                            type="text"
                            value={fields.field2}
                            onChange={(e) => handleChange('field2', e.target.value)}
                            className="input"
                            placeholder="Введите значение..."
                        />
                    </div>

                    <div className="field">
                        <label className="label">Производител товара</label>
                        <input
                            type="text"
                            value={fields.field3}
                            onChange={(e) => handleChange('field3', e.target.value)}
                            className="input"
                            placeholder="Введите значение..."
                        />
                    </div>

                    <div className="field">
                        <label className="label">Страна производителя</label>
                        <input
                            type="text"
                            value={fields.field4}
                            onChange={(e) => handleChange('field4', e.target.value)}
                            className="input"
                            placeholder="Введите значение..."
                        />
                    </div>

                    <div className="field">
                        <label className="label">Идентификатор товара</label>
                        <input
                            type="text"
                            value={fields.field5}
                            onChange={(e) => handleChange('field5', e.target.value)}
                            className="input"
                            placeholder="Введите значение..."
                        />
                    </div>
                    <div className="field">
                        <label className="label">Внутренний артикул производителя</label>
                        <input
                            type="text"
                            value={fields.field5}
                            onChange={(e) => handleChange('field5', e.target.value)}
                            className="input"
                            placeholder="Введите значение..."
                        />
                    </div>
                </div>
            </div>

            <BottomBar current={1} total={20} nextPath="/stage2" />
        </>
    )
}

export default Stage1