import { useState } from "react"
import { Button } from "../../react-aria/Button"
import { Checkbox } from "../../react-aria/Checkbox"
import { TextArea } from "../../react-aria/Field"
import { Form } from "../../react-aria/Form"
import { TabPanel } from "../../react-aria/Tabs"
import { MAX_COUNT, getAll, sdk } from "../../api/spotify"
import { convertTracks } from "../../output/markdown"

const Markdown = () => {
  const [output, setOutput] = useState<string>()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))

    const savedTracks = await getAll((limit = MAX_COUNT, offset?: number) => {
      return sdk.currentUser.tracks.savedTracks(limit, offset)
    })
    const tracks = savedTracks.map((sT) => sT.track)

    const output = convertTracks(tracks, data)
    setOutput(output)
  }

  return (
    <TabPanel id="markdown" className="p-0">
      <Form
        className="p-4"
        onSubmit={handleSubmit}
      >
        <Checkbox name="artistLinks">
          Artist hyperlinks
        </Checkbox>
        <Checkbox name="trackLinks">
          Track hyperlinks
        </Checkbox>
        <div className="flex gap-2">
          <Button type="submit" className="mt-3">
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
    <TextArea className="w-full min-h-80 mt-4" defaultValue={output} />

  </TabPanel>
)
}

export default Markdown
