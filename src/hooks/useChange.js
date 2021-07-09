import { useCallback, useState } from "react"

export const useChange = (initialValue="") => {
  const [value, setValue] = useState(initialValue)
  const onChange = useCallback(({ target }) => {
    setValue(target.value)
  }, [])
  return [value, onChange, setValue]
}