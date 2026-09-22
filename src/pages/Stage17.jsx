import { useEffect, useRef, useState } from 'react'
import BottomBar from '../components/BottomBar'
import { productsApi } from '../api'
import { useCardIds } from '../cardScope'
import './Stage17.css'

const documentLabels = {
    warranty: 'Гарантийный талон',
    brand: 'Бренд',
    certificate: 'Сертификат соответствия',
    declaration: 'Декларация о соответствии',
    stateRegistration: 'Свидетельство о государственной регистрации',
    registration: 'Регистрационное удостоверение',
    manual: 'Руководство по эксплуатации',
    other: 'Иной документ',
}

function Stage17() {
    const { productId, variationId } = useCardIds()
    const [error, setError] = useState('')

    const [files, setFiles] = useState({
        warranty: null,
        brand: null,
        certificate: null,
        declaration: null,
        stateRegistration: null,
        registration: null,
        manual: null,
        other: null,
    })

    const fileInputsRef = useRef({})

    const load = async () => {
        const product = await productsApi.get(productId)
        const next = {
            warranty: null,
            brand: null,
            certificate: null,
            declaration: null,
            stateRegistration: null,
            registration: null,
            manual: null,
            other: null,
        }
        for (const file of product.files || []) {
            if (file.role === 'document' && file.documentType && file.variationId === variationId) {
                next[file.documentType] = { ...file, section: documentLabels[file.documentType] || file.name }
            }
        }
        setFiles(next)
    }

    useEffect(() => {
        if (!productId || !variationId) return
        load().catch((loadError) => setError(loadError.message))
    }, [productId, variationId])

    const handleFileClick = (name) => {
        fileInputsRef.current[name]?.click()
    }

    const handleFileChange = async (name, label, e) => {
        const file = e.target.files?.[0]
        e.target.value = ''
        if (!file || !productId || !variationId) return
        const formData = new FormData()
        formData.append('file', file)
        formData.append('role', 'document')
        formData.append('documentType', name)
        formData.append('variationId', variationId)
        setError('')
        try {
            await productsApi.upload(productId, formData)
            await load()
        } catch (uploadError) {
            setError(uploadError.message)
        }
    }

    const handleFileRemove = async (name) => {
        const file = files[name]
        if (!file?.id) return
        setError('')
        try {
            await productsApi.deleteFile(file.id)
            await load()
        } catch (removeError) {
            setError(removeError.message)
        }
    }

    const renderField = (name, label) => (
        <div className="field" key={name}>
            <label className="label">{label}</label>

            <input
                type="file"
                ref={(el) => (fileInputsRef.current[name] = el)}
                onChange={(e) => handleFileChange(name, label, e)}
                style={{ display: 'none' }}
            />

            <div className="file-input">
                <input
                    type="text"
                    className="file-input__text"
                    value={files[name] ? files[name].name : ''}
                    placeholder={label}
                    readOnly
                />

                {files[name] && (
                    <button
                        type="button"
                        className="file-input__clear"
                        onClick={() => handleFileRemove(name)}
                        title="Удалить файл"
                    >
                        ✕
                    </button>
                )}

                <button
                    type="button"
                    className="file-input__clip"
                    onClick={() => handleFileClick(name)}
                    title="Прикрепить файл"
                >
                    📎
                </button>
            </div>
        </div>
    )

    const uploadedFiles = Object.entries(files).filter(([_, file]) => file !== null)

    return (
        <>
            <div className="container">
                <h2 className="subtitle">Этап 17 - Добавьте документы</h2>
                {!productId && <p className="form-error">Откройте создание карточки с главной страницы.</p>}
                {productId && !variationId && <p className="form-error">Сначала создайте вариант на этапе 13.</p>}
                {error && <p className="form-error">{error}</p>}

                <div className="form">
                    {renderField('warranty', 'Гарантийный талон')}
                    {renderField('brand', 'Бренд')}
                    {renderField('certificate', 'Сертификат соответствия')}
                    {renderField('declaration', 'Декларация о соответствии')}
                    {renderField('stateRegistration', 'Свидетельство о государственной регистрации')}
                    {renderField('registration', 'Регистрационное удостоверение')}
                    {renderField('manual', 'Руководство по эксплуатации')}
                    {renderField('other', 'Иной документ')}
                </div>

                {uploadedFiles.length > 0 && (
                    <div className="uploaded-docs">
                        <h3 className="uploaded-docs__title">Загруженные документы</h3>

                        <div className="uploaded-docs__list">
                            {uploadedFiles.map(([name, file]) => (
                                <div className="file-card" key={name}>
                                    <span className="file-card__icon">📄</span>
                                    <span className="file-card__name">{file.section}</span>
                                    <button
                                        type="button"
                                        className="file-card__remove"
                                        onClick={() => handleFileRemove(name)}
                                        title="Удалить"
                                    >
                                        ✕
                                    </button>
                                    <a
                                        className="file-card__download"
                                        href={file.url}
                                        download={file.name}
                                    >
                                        Скачать
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <BottomBar current={17} total={21} prevPath="/stage16" nextPath="/stage18" />
        </>
    )
}

export default Stage17