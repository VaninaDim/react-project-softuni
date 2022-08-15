import { useState } from 'react'

const useLocalStorage = (defaultValue) => {
    const [value, setValue] = useState(defaultValue)

    return [value, setValue]
}

export default useLocalStorage