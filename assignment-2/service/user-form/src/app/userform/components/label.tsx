
type LabelType = {
  labelName: string;
}

export function Label(props: LabelType) {
  return(
    <label className='w-[85px] text-right'>{props.labelName}</label>
  )
}