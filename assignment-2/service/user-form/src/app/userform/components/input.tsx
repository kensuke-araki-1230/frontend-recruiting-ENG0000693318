import clsx from "clsx";
import { InputHTMLAttributes, forwardRef } from "react";

type InputType = {
  error: string;
  customStyle?: string;
} 

export type InputProps = InputType &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputType>

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input (
  {
    error,
    customStyle,
    ...props
  },
  ref,
) {
  return (
    <span className='flex flex-col ml-[12px]'>
      <input
        ref={ref}
        className={clsx(
          'w-[230px] h-[30px] rounded-md border border-[#E2E2E2] placeholder:font-normal placeholder:text-[#D3D3D3]',
          error && 'border-[#FB0000]',
          customStyle
        )}
        {...props} />
      {error && <span className='font-normal text-[#FB0000] text-[10px]'>{error}</span>}
    </span>
  )
})
