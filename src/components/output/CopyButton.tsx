import { Button } from "../../react-aria/Button"

type Props = {
  output?: string
}

const CopyButton = ({ output }: Props) => {
  if (!output) {
    return null
  }

  const handleClick = () => {
    navigator.clipboard.writeText(output)
      .then(() => {
        console.log('copied')
      }
    )
  }

  return (
    <Button onPress={handleClick} className="mt-4 ml-4">Copy</Button>
  )
}

export default CopyButton
