import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TaskForm } from './TaskForm'

vi.mock('../lib/api', () => ({
  createTask: vi.fn().mockResolvedValue({}),
}))

function renderWithQueryClient(ui: React.ReactNode) {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  )
}

describe('TaskForm', () => {
  it('mostra erro quando o título está vazio no submit', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<TaskForm />)

    const submitButton = screen.getByRole('button', { name: /enviar/i })
    await user.click(submitButton)

    expect(await screen.findByText(/o título é obrigatório/i)).toBeInTheDocument()
  })

  it('permite digitar no campo de título', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<TaskForm />)

    const titleInput = screen.getByPlaceholderText(/digite sua task/i)
    await user.type(titleInput, 'Estudar Vitest')

    expect(titleInput).toHaveValue('Estudar Vitest')
  })
})