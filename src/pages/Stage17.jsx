import { useState, useRef } from 'react'
import BottomBar from '../components/BottomBar'
import './Stage17.css'

function Stage17() {
    const [fields, setFields] = useState({
        warranty: '',
        brand: '',
        certificate: '',
        declaration: '',
        stateRegistration: '',
        registration: '',
        manual: '',
        other: '',
    })

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

    const handleChange = (name, value) => {
        setFields((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileClick = (name) => {
        fileInputsRef.current[name]?.click()
    }

    const handleFileChange = (name, label, e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const url = URL.createObjectURL(file)
        setFiles((prev) => ({
            ...prev,
            [name]: { file, url, name: file.name, section: label },
        }))
        e.target.value = ''
    }

    const handleFileRemove = (name) => {
        setFiles((prev) => {
            if (prev[name]?.url) URL.revokeObjectURL(prev[name].url)
            return { ...prev, [name]: null }
        })
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
                    value={files[name] ? files[name].name : fields[name]}
                    onChange={(e) => handleChange(name, e.target.value)}
                    placeholder={label}
                    readOnly={!!files[name]}
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