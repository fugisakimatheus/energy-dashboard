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
      className="mx-4 flex flex-col items-center justify-center gap-3 rounded-xl border border-info/30 bg-info/10 px-6 backdrop-blur-sm"
    >
      <MdInfoOutline size={36} className="text-info" />
      <span className="text-center text-sm font-medium text-info-foreground sm:text-base">
        Nenhum resultado encontrado.
      </span>
    </div>
  )
}
