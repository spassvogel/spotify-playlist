import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Button } from "../../react-aria/Button"
import { Checkbox } from "../../react-aria/Checkbox"
import { TextArea } from "../../react-aria/Field"
import { Form } from "../../react-aria/Form"
import { TabPanel } from "../../react-aria/Tabs"
import { MAX_COUNT, getAll, sdk } from "../../api/spotify"
import { convertTracks } from "../../output/markdown"
import CopyButton from "./CopyButton"
import { Track } from "@spotify/web-api-ts-sdk"

type Props = {
  selectedInput: 'all' | Set<string | number>
}

const Markdown = ({ selectedInput }: Props) => {
  const [output, setOutput] = useState<string>()
  const [loading, setLoading] = useState(false)
  const outputRef = useRef<HTMLTextAreaElement>(null)


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(event.currentTarget))

    if (selectedInput === 'all') {
      return
    }

    const input = Array.from(selectedInput)[0]
    let tracks: Track[] = []

    if (input === 'liked') {
      const savedTracks = await getAll((limit = MAX_COUNT, offset?: number) => {
        return sdk.currentUser.tracks.savedTracks(limit, offset)
      })
      tracks = savedTracks.map((sT) => sT.track)
    } else {
      tracks = (await sdk.playlists.getPlaylist(`${input}`)).tracks.items.map(t => t.track)
    }

    const output = convertTracks(tracks, data)
    setOutput(output)
    setLoading(false)
  }

  useLayoutEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    console.log(`outputRef.current`, outputRef.current)
    if (output && outputRef.current) {
      outputRef.current.focus()
      outputRef.current.select()

      timeout = setTimeout(() => {
        outputRef.current?.focus()
        outputRef.current?.select()
        console.log('focus')
      }, 20)
    }

    return () => {
      // clearTimeout(timeout)
    }
  }, [output])

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
      </div>
    </Form>
    <TextArea className="w-full min-h-80 mt-4" ref={outputRef} defaultValue={output}/>
    <CopyButton output={output} />
  </TabPanel>
)
}

export default Markdown
