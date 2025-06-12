import { expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock the translate service
vi.mock('./services/translate', () => ({
  translate: vi.fn().mockResolvedValue('Hola mundo')
})) 

test('My app works correctly', async () => {
  const app = render(<App />)
  
  const user = userEvent.setup()
  const textAreaFrom = app.getByPlaceholderText('Enter text')

  await user.type(textAreaFrom, 'Hello world')

  const result = await app.findByDisplayValue(/Hola mundo/i, {}, { timeout: 20000 })

  expect(result).toBeTruthy()
}, 40000)