import { useState } from "react";
import { useEffectUpdate } from "./useEffectUpdate";

export function useFormRegister(initialFields, cb = () => { }) {
    const [fields, setFields] = useState(initialFields)

    useEffectUpdate(() => {
        cb(fields)
    }, [fields])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            default:
                break;
        }

        setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }
    // <input onChange={handleChange} value={filterBy.model} type="text" name="model" id="model" />

    function register(field, type = 'text') {
        return {
            onChange: handleChange,
            type,
            name: field,
            id: field,
            value: fields[field]
        }
    }

    return [
        register
    ]

}