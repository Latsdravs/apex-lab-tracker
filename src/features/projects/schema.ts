import { z } from 'zod'

export const projectSchema = z.object({
  name: z.string().min(3, { message: 'Proje adı en az 3 karakter olmalıdır.' }),
  description: z
    .string()
    .min(10, { message: 'Açıklama en az 10 karakter olmalıdır.' }),
  lead: z
    .string()
    .min(5, { message: 'Proje lideri adı en az 5 karakter olmalıdır.' }),
})
