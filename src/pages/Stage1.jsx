import { useState } from 'react'
import BottomBar from '../components/BottomBar'
import './Stage1.css'

function Stage1() {
    const [user, setUser] = useState({
        lastName: '',
        firstName: '',
        middleName: '',
    })

    const [fields, setFields] = useState({
        field1: '',
        field2: '',
        field3: '',
        field4: '',
        field5: '',
        field6: '',
    })

    const handleUserChange = (name, value) => {
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleChange = (name, value) => {
        setFields((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Заполните информацию о себе:</h1>

                <div className="form">
                    <div className="field">
                        <label className="label">Фамилия</label>
                        <input
                            type="text"
                            value={user.lastName}
                            onChange={(e) => handleUserChange('lastName', e.target.value)}
                            className="input"
                            placeholder="Введите фамилию..."
                        />
                    </div>

                    <div className="field">
                        <label className="label">Имя</label>
                        <input
                            type="text"
                            value={user.firstName}
                            onChange={(e) => handleUserChange('firstName', e.target.value)}
                            className="input"
                            placeholder="Введите имя..."
                        />
                    </div>

                    <div className="field">
                        <label className="label">Отчество</label>
                        <input
                            type="text"
                            value={user.middleName}
                            onChange={(e) => handleUserChange('middleName', e.target.value)}
                            className="input"
                            placeholder="Введите отчество..."
                        />
                    </div>
                </div>

                <h1 className="title">Проверка идентичности товара</h1>
                <h2 className="subtitle">
                    Этап 1 — Введите информацию о товаре для поиска совпадений среди существующих карточек товаров
                </h2>

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
                        <label className="label">Производитель товара</label>
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
                            value={fields.field6}
                            onChange={(e) => handleChange('field6', e.target.value)}
                            className="input"
                            placeholder="Введите значение..."
                        />
                    </div>
                </div>
            </div>

            <BottomBar current={1} total={21} nextPath="/stage2" />
        </>
    )
}

export default Stage1