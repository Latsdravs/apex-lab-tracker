import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProjectForm } from './ProjectForm'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useMutation: () => ({ mutate: jest.fn(), isPending: false }),
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}))

describe('ProjectForm', () => {
  const renderWithProviders = (component: React.ReactNode) => {
    const queryClient = new QueryClient()
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    )
  }

  it('renders the form with input fields and a submit button', () => {
    renderWithProviders(<ProjectForm />)

    expect(screen.getByLabelText(/proje adı/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/açıklama/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/proje lideri/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /proje oluştur/i })
    ).toBeInTheDocument()
  })

  it('shows validation errors for empty required fields', async () => {
    renderWithProviders(<ProjectForm />)

    const submitButton = screen.getByRole('button', { name: /proje oluştur/i })
    fireEvent.click(submitButton)

    expect(
      await screen.findByText('Proje adı en az 3 karakter olmalıdır.')
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Açıklama en az 10 karakter olmalıdır.')
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Proje lideri adı en az 5 karakter olmalıdır.')
    ).toBeInTheDocument()
  })

  it.todo('does not show errors and calls mutate function when form is valid')
})
