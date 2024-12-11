import './style.css'

interface SelectProps<T> {
    id: string;
    label: string;
    value: string | number;
    options: T[];
    onChange: (value: string | number) => void;
    displayValue: (option: T) => string;
    valueKey: (option: T) => string | number;
}

export default function Select<T>({
                                      id,
                                      label,
                                      value,
                                      options,
                                      onChange,
                                      displayValue,
                                      valueKey,
                                  }: SelectProps<T>) {
    return (
        <div className="container-select">
            <label htmlFor={id}>
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value as string | number)}
            >
                <option value="">Select a {label}</option>
                {options.map((option) => (
                    <option key={valueKey(option)} value={valueKey(option)}>
                        {displayValue(option)}
                    </option>
                ))}
            </select>
        </div>
    )
}