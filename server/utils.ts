import { z } from 'zod'

export const validate = <T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> => {
  const validation = schema.safeParse(data)

  if (!validation.success) {
    throw createError({
      statusCode: 422,
      statusText: 'Invalid data provided',
      data: {
        errors: validation.error.flatten()
      }
    })
  }

  return validation.data
}
