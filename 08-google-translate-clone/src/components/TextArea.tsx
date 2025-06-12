import { SectionType } from "../types"
import type { FC } from "react"

interface Props {
  type: SectionType,
  loading?: boolean,
  value: string,
  onChange: (value: string) => void,
}

const commonsStyles = 'w-full mt-2 p-3 rounded-lg h-37 resize-none outline-none text-lg font-norma text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary/70'

const getPlaceHolder = (type: SectionType, loading?: boolean) => {
  if (type === SectionType.From) return 'Enter text'
  if (loading) return 'Translating...'
  return 'Translation'
}

export const TextArea: FC<Props> = ({ loading, type, value, onChange }) => {
  const styles = type === SectionType.To ?
    `${commonsStyles} bg-accent/50` :
    `${commonsStyles} bg-primary/50`

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }
  return (
    <textarea
      name="inputText"
      id="inputText"
      disabled={type === SectionType.To}
      className={styles}
      placeholder={getPlaceHolder(type, loading)}
      onChange={handleChange}
      value={value}
      autoFocus={type === SectionType.From}
    />
  )
}