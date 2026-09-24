import './PackTypeHint.css'

const PACK_IMAGES = {
    box: '/packaging-hints/box.png',
    case: '/packaging-hints/case.png',
    blister: '/packaging-hints/blister.png',
}

const PACK_LABELS = {
    box: 'Коробка',
    case: 'Футляр',
    blister: 'Блистер',
}

export default function PackTypeHint({ packType }) {
    const image = PACK_IMAGES[packType]
    if (!image) return null

    return (
        <span className="pack-hint-icon" title="Пример упаковки">
            ⓘ
            <span className="pack-hint-popup" role="tooltip">
                <img src={image} alt={`Пример: ${PACK_LABELS[packType]}`} />
            </span>
        </span>
    )
}
