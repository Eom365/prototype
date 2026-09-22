import { useState } from 'react'
import BottomBar from '../components/BottomBar'
import './Stage10.css'

function Stage10() {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            address: 'г. Екатеринбург, ул. Вайнера, д. 22, офис 304',
            active: true,
            quantity: '',
        },
        {
            id: 2,
            address: 'г. Екатеринбург, ул. Шейкмана, д. 6, офис 114',
            active: false,
            quantity: '',
        },
    ])

    // Показывать ли форму добавления
    const [showForm, setShowForm] = useState(false)

    // Поля новой формы
    const [newAddress, setNewAddress] = useState({
        name: '',
        index: '',
        region: '',
        city: '',
        street: '',
        house: '',
        office: '',
    })

    const handleNewAddressChange = (field, value) => {
        setNewAddress((prev) => ({ ...prev, [field]: value }))
    }

    // Сохранить новый адрес
    const handleSaveAddress = () => {
        // Собираем строку адреса из полей
        const parts = []
        if (newAddress.city) parts.push(`г. ${newAddress.city}`)
        if (newAddress.street) parts.push(`ул. ${newAddress.street}`)
        if (newAddress.house) parts.push(`д. ${newAddress.house}`)
        if (newAddress.office) parts.push(`офис ${newAddress.office}`)

        const addressString = parts.join(', ') || 'Новый склад'

        setAddresses((prev) => [
            ...prev,
            {
                id: Date.now(),
                address: addressString,
                active: true,
                quantity: '',
            },
        ])

        // Сброс формы
        setNewAddress({
            name: '',
            index: '',
            region: '',
            city: '',
            street: '',
            house: '',
            office: '',
        })
        setShowForm(false)
    }

    // Отмена
    const handleCancel = () => {
        setNewAddress({
            name: '',
            index: '',
            region: '',
            city: '',
            street: '',
            house: '',
            office: '',
        })
        setShowForm(false)
    }

    const toggleAddress = (id) => {
        setAddresses((prev) =>
            prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
        )
    }

    const handleQuantityChange = (id, value) => {
        setAddresses((prev) =>
            prev.map((a) => (a.id === id ? { ...a, quantity: value } : a))
        )
    }

    const editAddress = (id) => {
        const current = addresses.find((a) => a.id === id)
        const newAddr = prompt('Введите адрес:', current.address)
        if (newAddr === null) return
        setAddresses((prev) =>
            prev.map((a) => (a.id === id ? { ...a, address: newAddr } : a))
        )
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 10. Доставка</h1>

                <h2 className="subtitle">Количество товара на складе</h2>

                <button
                    className="add-address-btn"
                    type="button"
                    onClick={() => setShowForm((prev) => !prev)}
                >
                    <span className="add-address-btn__icon">＋</span>
                    <span className="add-address-btn__text">Добавить адрес отгрузки</span>
                </button>

                {/* Форма добавления нового адреса */}
                {showForm && (
                    <div className="address-form">
                        <input
                            type="text"
                            className="address-form__input"
                            placeholder="Наименование склада"
                            value={newAddress.name}
                            onChange={(e) => handleNewAddressChange('name', e.target.value)}
                        />
                        <input
                            type="text"
                            className="address-form__input"
                            placeholder="Индекс"
                            value={newAddress.index}
                            onChange={(e) => handleNewAddressChange('index', e.target.value)}
                        />
                        <input
                            type="text"
                            className="address-form__input"
                            placeholder="Область"
                            value={newAddress.region}
                            onChange={(e) => handleNewAddressChange('region', e.target.value)}
                        />
                        <input
                            type="text"
                            className="address-form__input"
                            placeholder="Город"
                            value={newAddress.city}
                            onChange={(e) => handleNewAddressChange('city', e.target.value)}
                        />
                        <input
                            type="text"
                            className="address-form__input"
                            placeholder="Улица"
                            value={newAddress.street}
                            onChange={(e) => handleNewAddressChange('street', e.target.value)}
                        />
                        <input
                            type="text"
                            className="address-form__input"
                            placeholder="Дом"
                            value={newAddress.house}
                            onChange={(e) => handleNewAddressChange('house', e.target.value)}
                        />
                        <input
                            type="text"
                            className="address-form__input"
                            placeholder="Офис"
                            value={newAddress.office}
                            onChange={(e) => handleNewAddressChange('office', e.target.value)}
                        />

                        {/* Кнопки Сохранить / Отмена */}
                        <div className="address-form__actions">
                            <button
                                type="button"
                                className="address-form__btn address-form__btn--cancel"
                                onClick={handleCancel}
                                title="Отмена"
                            >
                                ✕
                            </button>
                            <button
                                type="button"
                                className="address-form__btn address-form__btn--save"
                                onClick={handleSaveAddress}
                                title="Сохранить"
                            >
                                ✓
                            </button>
                        </div>
                    </div>
                )}

                {/* Список адресов */}
                <div className="address-list">
                    {addresses.map((item) => (
                        <div className="address-item" key={item.id}>
                            <button
                                type="button"
                                className={`toggle ${item.active ? 'toggle--on' : ''}`}
                                onClick={() => toggleAddress(item.id)}
                                title={item.active ? 'Выключить' : 'Включить'}
                            >
                                <span className="toggle__knob" />
                            </button>

                            <div className="address-body">
                                <div className="address-text">{item.address}</div>

                                <div className="address-status">
                                    {item.active ? 'Склад активный' : 'Склад неактивный'}
                                </div>

                                {item.active && (
                                    <div className="address-quantity">
                                        <span className="address-quantity__label">
                                            Количество товаров на складе:
                                        </span>
                                        <input
                                            type="text"
                                            className="address-quantity__input"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        />
                                        <span className="address-quantity__unit">штук</span>
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                className="address-edit"
                                onClick={() => editAddress(item.id)}
                                title="Редактировать"
                            >
                                ✎
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <BottomBar current={10} total={21} prevPath="/stage9" nextPath="/stage11" />
        </>
    )
}

export default Stage10