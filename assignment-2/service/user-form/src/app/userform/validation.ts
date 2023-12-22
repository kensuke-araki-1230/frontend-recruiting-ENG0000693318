import { z } from "zod";

export const userFormValidationScheme = z
  .object({
    name: z
      .string({ required_error: '必須項目のため必ず入力してください' })
      .min(1, { message: '必須項目のため必ず入力してください' }),

    email: z
      .string({ required_error: '必須項目のため必ず入力してください' })
      .min(1, { message: '必須項目のため必ず入力してください' })
      .regex(
        /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        {
          message: '有効なメールアドレスを入力してください'
        }
      ),
    zip: z
      .string({ required_error: '必須項目のため必ず入力してください' })
      .min(1, { message: '必須項目のため必ず入力してください' })
      .regex(/^[0-9]+$/,
        {
          message: '半角数字で入力してください'
        }
      )
      .length(7, { message: '正しい郵便番号を入力してください' }),
    prefecture: z
      .string({ required_error: '必須項目のため必ず選択してください' })
      .min(1, { message: '必須項目のため必ず力してください' }),
    address1: z
      .string({ required_error: '必須項目のため必ず入力してください' })
      .min(1, { message: '必須項目のため必ず入力してください' }),
    address2: z
      .string()
  })

export type UserFormValidation = z.infer<
  typeof userFormValidationScheme
>