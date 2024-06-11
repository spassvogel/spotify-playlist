import { useRef, useState } from "react"
import { Button } from "../../react-aria/Button"
import { Checkbox } from "../../react-aria/Checkbox"
import { TextArea } from "../../react-aria/Field"
import { Form } from "../../react-aria/Form"
import { TabPanel } from "../../react-aria/Tabs"
import { MAX_COUNT, getAll, sdk } from "../../api/spotify"
import { convertTracks } from "../../output/markdown"
import CopyButton from "./CopyButton"

const Markdown = () => {
  const [output, setOutput] = useState<string>()
  const [loading, setLoading] = useState(false)
  const outputRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(event.currentTarget))

    const savedTracks = await getAll((limit = MAX_COUNT, offset?: number) => {
      return sdk.currentUser.tracks.savedTracks(limit, offset)
    })
    const tracks = savedTracks.map((sT) => sT.track)

    const output = convertTracks(tracks, data)
    setOutput(output)

    outputRef.current?.focus()
    outputRef.current?.select()
    console.log(`outputRef.current`, outputRef.current)
    setLoading(false)
  }

  return (
    <TabPanel id="markdown" className="p-0">
      <Form
        className="p-4"
        onSubmit={handleSubmit}
      >
        <Checkbox
          name="artistLinks"
          defaultSelected={localStorage.getItem('markdown-option-artistLinks') === 'true'}
          onChange={(value) => { localStorage.setItem('markdown-option-artistLinks', `${value}`) }}
        >
          Artist hyperlinks
        </Checkbox>
        <Checkbox
          name="trackLinks"
          defaultSelected={localStorage.getItem('markdown-option-trackLinks') === 'true'}
          onChange={(value) => { localStorage.setItem('markdown-option-trackLinks', `${value}`) }}
        >
          Track hyperlinks
        </Checkbox>
        <div className="flex gap-2">
          <Button
            type="submit"
            className="mt-3"
            isDisabled={loading}
          >
            Submit
          </Button>
        {/* <Button
        type="reset"
        variant="secondary"
        >
        Reset
      </Button> */}
      </div>
    </Form>
    <TextArea className="w-full min-h-80 mt-4" ref={outputRef} defaultValue={output} />
    <CopyButton output={output} />
  </TabPanel>
)
}

export default Markdown
