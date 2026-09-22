import { useState } from 'react'
import BottomBar from '../components/BottomBar'
import './Stage2.css'

function Stage2() {
    const [radio, setRadio] = useState('')
    const [field1, setField1] = useState('')
    const [field2, setField2] = useState('')
    const [field3, setField3] = useState('')

    const handleClearAll = () => {
        setRadio('')
        setField1('')
        setField2('')
        setField3('')
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 2 - Наименование и категория</h1>

                <p className="paragraph">Выберите назначение продукта</p>

                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="option"
                            value="one"
                            checked={radio === 'one'}
                            onChange={(e) => setRadio(e.target.value)}
                        />
                        Стоматология
                    </label>

                    <p className="paragraph">Выберите вид продукта</p>

                    <label className="radio-label">
                        <input
                            type="radio"
                            name="option"
                            value="two"
                            checked={radio === 'two'}
                            onChange={(e) => setRadio(e.target.value)}
                        />
                        Турбинный наконечник
                    </label>

                    <label className="radio-label">
                        <input
                            type="radio"
                            name="option"
                            value="three"
                            checked={radio === 'three'}
                            onChange={(e) => setRadio(e.target.value)}
                        />
                        Угловой наконечник
                    </label>

                    <label className="radio-label">
                        <input
                            type="radio"
                            name="option"
                            value="four"
                            checked={radio === 'four'}
                            onChange={(e) => setRadio(e.target.value)}
                        />
                        Прямой наконечник
                    </label>
                </div>

                <div className="field">
                    <p className="paragraph">Наименование продукта:</p>
                    <input
                        type="text"
                        className="input"
                        value={field1}
                        onChange={(e) => setField1(e.target.value)}
                    />
                </div>

                <div className="field">
                    <p className="paragraph">Категория продукта:</p>

                    <div className="category-picker">
                        <button className="category-picker__burger" title="Меню">
                            ☰
                        </button>

                        <input
                            type="text"
                            className="category-picker__input"
                            value={field2}
                            onChange={(e) => setField2(e.target.value)}
                            placeholder="Раздел > Категория"
                        />

                        <button
                            className="category-picker__clear"
                            title="Очистить"
                            onClick={handleClearAll}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                <div className="field">
                    <p className="paragraph">Укажите линейку продукции:</p>
                    <input
                        type="text"
                        className="input"
                        value={field3}
                        onChange={(e) => setField3(e.target.value)}
                    />
                </div>
            </div>

            <BottomBar current={2} total={20} prevPath="/stage1" nextPath="/stage3" />
        </>
    )
}

export default Stage2