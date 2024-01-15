import { MdInfoOutline } from 'react-icons/md'

type NoDataBoxProps = {
  height: string | number
}

export default function NoDataBox(props: NoDataBoxProps) {
  const { height } = props
  return (
    <div
      data-testid="no-data-box"
      style={{ height }}
      className="bg-blue-50 flex flex-col items-center justify-center gap-2 mx-4 rounded-md px-6"
    >
      <MdInfoOutline size={32} className="text-blue-800" />
      <span className="text-center text-blue-800 font-medium">
        Nenhum resultado encontrado.
      </span>
    </div>
  )
}
