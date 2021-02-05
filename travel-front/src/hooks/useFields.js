import { useState } from "react"
import 'date-fns';

export const useField = (type) => {
    const [value, setValue] = useState(type)
    const [date, setDate] = useState(new Date())

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onDateChange = (date) => {
        setDate(date)
    }

    const reset = () => {
        setValue('')
    }

    return {
        value,
        date,
        setDate,
        setValue,
        onChange,
        onDateChange,
        reset
    }
}