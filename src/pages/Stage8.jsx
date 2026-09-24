import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import PackTypeHint from '../components/PackTypeHint'
import PhotoGallery from '../components/PhotoGallery'
import { productsApi } from '../api'
import './Stage8.css'

function Stage8() {
    const [params] = useSearchParams()
    const productId = params.get('id')
    const [packType, setPackType] = useState('')
    const [material, setMaterial] = useState('')
    const [materialCustom, setMaterialCustom] = useState('')
    const [sizeUnit, setSizeUnit] = useState('sm')
    const [sizes, setSizes] = useState({
        length: '',
        width: '',
        height: '',
    })
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!productId) return
        productsApi.get(productId).then((product) => {
            setPackType(product.packType || '')
            setMaterial(product.packMaterial || '')
            setMaterialCustom(product.packMaterialCustom || '')
            setSizeUnit(product.packSizeUnit || 'sm')
            setSizes({
                length: product.packLength || '',
                width: product.packWidth || '',
                height: product.packHeight || '',
            })
            setLoaded(true)
        }).catch((loadError) => setError(loadError.message))
    }, [productId])

    const save = () => {
        if (!productId) throw new Error('Сначала создайте карточку на главной странице')
        if (!loaded) throw new Error('Карточка ещё загружается, подождите секунду')
        return productsApi.savePackaging(productId, {
            packType,
            packMaterial: material,
            packMaterialCustom: materialCustom,
            packSizeUnit: sizeUnit,
            packLength: sizes.length,
            packWidth: sizes.width,
            packHeight: sizes.height,
        })
    }

    return (
        <>
            <div className="container">
                <h1 className="title">Этап 8. Добавьте упаковку</h1>
                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {error && <p className="form-error">{error}</p>}

                <div className="section">
                    <h2 className="subtitle">Укажите вид упаковки:</h2>

                    <div className="radio-row">
                        <label className="radio-label">
                            <input type="radio" name="packType" value="box" checked={packType === 'box'} onChange={() => { setPackType('box'); setMaterial('') }} />
                            <span>Коробка</span>
                        </label>
                        <PackTypeHint packType="box" />
                    </div>

                    <div className="radio-row">
                        <label className="radio-label">
                            <input type="radio" name="packType" value="case" checked={packType === 'case'} onChange={() => { setPackType('case'); setMaterial('') }} />
                            <span>Футляр</span>
                        </label>
                        <PackTypeHint packType="case" />
                    </div>

                    <div className="radio-row">
                        <label className="radio-label">
                            <input type="radio" name="packType" value="blister" checked={packType === 'blister'} onChange={() => { setPackType('blister'); setMaterial('') }} />
                            <span>Блистер</span>
                        </label>
                        <PackTypeHint packType="blister" />
                    </div>
                </div>

                <div className="section">
                    <h2 className="subtitle">Укажите материал упаковки:</h2>
                    {!packType && <p className="material-hint">Сначала выберите вид упаковки выше</p>}
                    {packType === 'box' && (
                        <div className="material-buttons">
                            <button type="button" className={`material-btn ${material === 'cardboard' ? 'material-btn--active' : ''}`} onClick={() => setMaterial('cardboard')}>Картон</button>
                            <button type="button" className={`material-btn ${material === 'plastic' ? 'material-btn--active' : ''}`} onClick={() => setMaterial('plastic')}>Пластик</button>
                            <button type="button" className={`material-btn ${material === 'other' ? 'material-btn--active' : ''}`} onClick={() => setMaterial('other')}>Иное</button>
                            {material === 'other' && (
                                <input type="text" className="material-input" placeholder="Введите своё значение" value={materialCustom} onChange={(event) => setMaterialCustom(event.target.value)} />
                            )}
                        </div>
                    )}
                    {packType === 'case' && (
                        <div className="material-buttons">
                            <button type="button" className={`material-btn ${material === 'hdpe' ? 'material-btn--active' : ''}`} onClick={() => setMaterial('hdpe')}>Полиэтилен высокой плотности</button>
                            <button type="button" className={`material-btn ${material === 'plastic' ? 'material-btn--active' : ''}`} onClick={() => setMaterial('plastic')}>Пластик</button>
                            <button type="button" className={`material-btn ${material === 'nylon' ? 'material-btn--active' : ''}`} onClick={() => setMaterial('nylon')}>Нейлон</button>
                            <button type="button" className={`material-btn ${material === 'other' ? 'material-btn--active' : ''}`} onClick={() => setMaterial('other')}>Иное</button>
                            {material === 'other' && (
                                <input type="text" className="material-input" placeholder="Введите своё значение" value={materialCustom} onChange={(event) => setMaterialCustom(event.target.value)} />
                            )}
                        </div>
                    )}
                    {packType === 'blister' && (
                        <div className="material-buttons">
                            <button type="button" className={`material-btn ${material === 'hdpe' ? 'material-btn--active' : ''}`} onClick={() => setMaterial('hdpe')}>Полиэтилен высокой плотности</button>
                            <button type="button" className={`material-btn ${material === 'pet' ? 'material-btn--active' : ''}`} onClick={() => setMaterial('pet')}>Полиэтилентерефталат</button>
                            <button type="button" className={`material-btn ${material === 'pvc' ? 'material-btn--active' : ''}`} onClick={() => setMaterial('pvc')}>Поливинилхлорид</button>
                            <button type="button" className={`material-btn ${material === 'other' ? 'material-btn--active' : ''}`} onClick={() => setMaterial('other')}>Иное</button>
                            {material === 'other' && (
                                <input type="text" className="material-input" placeholder="Введите своё значение" value={materialCustom} onChange={(event) => setMaterialCustom(event.target.value)} />
                            )}
                        </div>
                    )}
                </div>

                <div className="section">
                    <h2 className="subtitle">Выберите единицы измерения размеров упаковки:</h2>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input type="radio" name="sizeUnit" value="sm" checked={sizeUnit === 'sm'} onChange={(event) => setSizeUnit(event.target.value)} />
                            <span>Сантиметры</span>
                        </label>
                        <label className="radio-label">
                            <input type="radio" name="sizeUnit" value="mm" checked={sizeUnit === 'mm'} onChange={(event) => setSizeUnit(event.target.value)} />
                            <span>Миллиметры</span>
                        </label>
                    </div>
                </div>

                <div className="section">
                    <h2 className="subtitle">Укажите внешние размеры упаковки (длина x ширина x высота):</h2>
                    {['length', 'width', 'height'].map((name) => (
                        <div className="dimension-row" key={name}>
                            <label className="dimension-label">
                                {name === 'length' ? 'Длина' : name === 'width' ? 'Ширина' : 'Высота'}
                            </label>
                            <input
                                type="text"
                                className="dimension-input"
                                value={sizes[name]}
                                onChange={(event) => setSizes((prev) => ({ ...prev, [name]: event.target.value }))}
                            />
                            <span className="dimension-unit">
                                {sizeUnit === 'sm' ? 'сантиметров' : 'миллиметров'}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="section">
                    <h2 className="subtitle">Добавьте фотографии упаковки:</h2>
                    {productId && <PhotoGallery productId={productId} role="package" />}
                </div>
            </div>

            <BottomBar
                current={8}
                total={21}
                prevPath="/stage7"
                nextPath="/stage9"
                onSave={save}
            />
        </>
    )
}

export default Stage8
