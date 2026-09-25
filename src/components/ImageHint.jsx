import './PackTypeHint.css'

export default function ImageHint({ src, alt, title = 'Подсказка', size = 'default' }) {
    if (!src) return null

    const popupClass = size === 'large' ? 'pack-hint-popup pack-hint-popup--large' : 'pack-hint-popup'

    return (
        <span className="pack-hint-icon" title={title}>
            ⓘ
            <span className={popupClass} role="tooltip">
                <img src={src} alt={alt} />
            </span>
        </span>
    )
}
