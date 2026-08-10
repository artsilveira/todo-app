import { describe, it, expect } from 'vitest'
import { taskFormSchema } from './schemas'

describe('taskFormSchema', () => {
  it('aceita um payload válido', () => {
    const result = taskFormSchema.safeParse({
      title: 'Estudar Java',
      description: 'Capítulo 3',
      priority: 'HIGH',
    })

    expect(result.success).toBe(true)
  })

  it('rejeita título vazio', () => {
    const result = taskFormSchema.safeParse({
      title: '',
      priority: 'MEDIUM',
    })

    expect(result.success).toBe(false)
  })

  it('rejeita título com mais de 100 caracteres', () => {
    const result = taskFormSchema.safeParse({
      title: 'a'.repeat(101),
      priority: 'MEDIUM',
    })

    expect(result.success).toBe(false)
  })

  it('aceita description ausente, já que é opcional', () => {
    const result = taskFormSchema.safeParse({
      title: 'Task sem descrição',
      priority: 'LOW',
    })

    expect(result.success).toBe(true)
  })
})