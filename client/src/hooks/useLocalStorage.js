import { useState } from 'react'

const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const dataFromLS = localStorage.getItem(key)

        return dataFromLS ? JSON.parse(dataFromLS) : defaultValue
    })

    const setLocalStorageValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue))
        setValue(newValue)
    }

    return [value, setLocalStorageValue]
}

export default useLocalStorage