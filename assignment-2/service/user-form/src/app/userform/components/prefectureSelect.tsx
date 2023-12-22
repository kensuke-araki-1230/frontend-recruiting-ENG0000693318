import clsx from "clsx";
import { SelectHTMLAttributes, forwardRef } from "react";
import Const from "../const";

type SelectType = {
  error: string;
  isPlaceholder: boolean;
}

export type SelectProps = SelectType &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, keyof SelectType>
export const PrefectureSelect = forwardRef<HTMLSelectElement, SelectProps>(function Select (
  {
    error,
    isPlaceholder,
    ...props
  },
  ref
) {
  return (
    <span className='flex flex-col ml-[12px]'>
      <select
        ref={ref}
        className={clsx(
          'w-[230px] h-[30px] rounded-md border border-[#E2E2E2]',
          isPlaceholder && 'text-[#D3D3D3] font-normal',
          error && 'border-[#FB0000]'
        )}
        {...props}
      >
        <option value={''}>選択してください</option>)
        {Const.PREF_OPTIONS.map((option, idx) => {
          return (<option key={`pref-${idx}`} defaultValue={'選択してください'} value={option}>{option}</option>)
        })}
      </select>
      {error && <span className='font-normal text-[#FB0000] text-[10px]'>{error}</span>}
    </span>
  )
})