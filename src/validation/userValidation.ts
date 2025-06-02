import { z } from 'zod'

export const userValidation = z.object({
  username: z
    .string({
      required_error: 'Username must be provided with string type',
    })
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 50 characters')
    .regex(
      /^[a-z0-9-]+$/,
      'Username must be lowercase and can only include letters, numbers, and hyphens (no spaces)'
    ),

  password: z
    .string({
      required_error: 'Password must be provided with string type',
    })
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character'
    ),

  role: z
    .string()
    .optional()
    .default('user'),

  shops: z
    .string()
    .refine((value) => {
      const shops = value.split(',').map((shop) => shop.trim());
      return shops.every((shop) => shop.length >= 3);
    }, {
      message: 'Each shop name must be at least 3 characters long',
    })
    .refine((value) => {
      const shops = value.split(',').map((shop) => shop.trim());
      return shops.length >= 3;
    }, {
      message: 'At least 3 shop names are required',
    }),
})

export const loginValidation = z.object({
  username: z.string().min(3, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type UserSchema = z.infer<typeof userValidation>;
