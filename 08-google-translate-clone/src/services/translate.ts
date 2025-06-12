import { SUPPORTED_LANGUAGES } from '../constants';
import { type FromLanguage, type ToLanguage } from '../types';
import OpenAI from "openai"

const apiKey = import.meta.env.VITE_OPENAI_API_KEY
const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
  baseURL: 'https://api.deepseek.com'
})

interface TranslateParams {
  fromLanguage: FromLanguage
  toLanguage: ToLanguage
  text: string
}

export const translate = async ({ fromLanguage, toLanguage, text }: TranslateParams) => {

  if (fromLanguage === toLanguage) return text

  const messages: OpenAI.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: 'You are an AI that translate text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also recieve {{auto}} which means that you have to detect the language. You can translate to any langauge. The language you translate to is surrounded by `[[` and `]]`. Translate everything, including punctuation, offensive words and special characters. Do not add any extra text, note or explanation. If the text is already in the target language, just return the text as is.'
    },
    {
      role: 'user',
      content: 'Hola mundo {{Spanish}} [[English]]'
    },
    {
      role: 'assistant',
      content: 'Hello world'
    },
    {
      role: 'user',
      content: 'How are you? {{auto}} [[German]]'
    },
    {
      role: 'assistant',
      content: 'Wie geht es dir?'
    },
    {
      role: 'user',
      content: 'Bon dia, com estas? {{auto}} [[Spanish]]'
    },
    {
      role: 'assistant',
      content: 'Buenos días, ¿Cómo estás?'
    }
  ]

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]


  const completion = await openai.chat.completions.create(
    {
      model: 'deepseek-chat',
      messages: [
        ...messages,
        {
          role: 'user',
          content: `${text} {{${fromCode}}} [[${toCode}]]`,
        }
      ],
      stream: false
    }
  )
  return completion.choices[0]?.message?.content
}
