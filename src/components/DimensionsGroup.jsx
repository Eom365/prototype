import { DIMENSION_CODES, DIMENSION_LABELS, dimensionUnitLabel } from '../productSpecs'
import './DimensionsGroup.css'

const UNIT_ORDER = ['centimeters', 'millimeters']

function sortUnitOptions(options) {
    return [...options].sort((left, right) => {
        const leftIndex = UNIT_ORDER.indexOf(left.value)
        const rightIndex = UNIT_ORDER.indexOf(right.value)
        return (leftIndex === -1 ? 99 : leftIndex) - (rightIndex === -1 ? 99 : rightIndex)
    })
}

export default function DimensionsGroup({ fields, specs, unitOptions, onChange }) {
    const dimensionFields = DIMENSION_CODES
        .map((code) => fields.find((field) => field.code === code))
        .filter(Boolean)

    if (dimensionFields.length === 0) return null

    const sortedUnits = sortUnitOptions(unitOptions)
    const currentUnit = specs[dimensionFields[0].code]?.unit || sortedUnits[0]?.value || 'millimeters'

    const setUnit = (unit) => {
        for (const field of dimensionFields) {
            onChange(field.code, { unit })
        }
    }

    return (
        <div className="dimensions-group">
            <h2 className="subtitle">Выберите единицы измерения габаритов:</h2>
            <div className="radio-group">
                {sortedUnits.map((option) => (
                    <label className="radio-label" key={option.value}>
                        <input
                            type="radio"
                            name="dimensionUnit"
                            value={option.value}
                            checked={currentUnit === option.value}
                            onChange={() => setUnit(option.value)}
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </div>

            <h2 className="subtitle">Укажите габариты (длина × ширина × высота):</h2>
            {dimensionFields.map((field) => {
                const current = specs[field.code] || { value: '', customValue: '', unit: currentUnit }
                return (
                    <div className="dimension-row" key={field.code}>
                        <label className="dimension-label">
                            {DIMENSION_LABELS[field.code] || field.name}
                        </label>
                        <input
                            type="text"
                            className="dimension-input"
                            placeholder="Значение"
                            value={current.value}
                            onChange={(event) => onChange(field.code, { value: event.target.value })}
                        />
                        <span className="dimension-unit">{dimensionUnitLabel(currentUnit)}</span>
                    </div>
                )
            })}
        </div>
    )
}
