import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants"
import type { FC } from "react"
import { SectionType, type FromLanguage, type ToLanguage } from "../types"

type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: ToLanguage, onChange: (language: ToLanguage) => void }

export const LanguageSelector: FC<Props> = ({ onChange, value, type }) => {

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as ToLanguage)
  }

  return (
    <div>
      <form>
        {/* <label className='block mb-2 text-sm font-medium'>
          From Language
        </label> */}
        <select
          onChange={handleChange}
          value={value}
          className='bg-primary/90 border border-primary text-white text-sm font-bold rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5'
        >
          {type === SectionType.From && <option value={AUTO_LANGUAGE}>Auto</option>}
          {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
            <option key={key} value={key}>
              {literal}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}