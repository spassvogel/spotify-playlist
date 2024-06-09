import { Form } from "../react-aria/Form"
import { Tab, TabList, TabPanel, Tabs } from "../react-aria/Tabs"
import { Button } from "../react-aria/Button"
import { Checkbox } from "../react-aria/Checkbox"
import { sdk } from "../api/spotify"
import { MaxInt, Page } from "@spotify/web-api-ts-sdk"
import { serializeTrack } from "../output/markdown"

const MAX_COUNT = 50
const getAll = async <TItem,>(endpoint: (limit?: MaxInt<typeof MAX_COUNT>, offset?: number) => Promise<Page<TItem>>) => {
  const items: TItem[] = []

  const fetchPage = async (offset = 0) => {
    console.log(`Fetching page ${(1 + offset / MAX_COUNT).toFixed(0)}`)
    const response = await endpoint(MAX_COUNT, offset)
    items.push(...response.items)

    if (response.next) {
      await fetchPage(offset + MAX_COUNT)
    }
  }

  // kick off fetch of first page
  await fetchPage()
  return items
}

type Props = {
  setOutput: (value: string) => void
}
export const OutputSelector = ({ setOutput}: Props) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))

    const savedTracks = await getAll((limit = MAX_COUNT, offset?: number) => {
      return sdk.currentUser.tracks.savedTracks(limit, offset)
    })
    const tracks = savedTracks.map((sT) => sT.track)
    const output = ['| Song | Artist |', '| --- | --- |']
    output.push(...tracks.map(serializeTrack))
    // console.log(`output`, output.join('\n'))
    setOutput(output.join('\n'))
  }

  return (
    <Tabs onSelectionChange={function Qa(){}}>
    <TabList aria-label="History of Ancient Rome">
      <Tab id="markdown">
        Markdown
      </Tab>
    </TabList>
    <TabPanel id="markdown">
      <Form
        onInvalid={function Qa(){}}
        onReset={function Qa(){}}
        onSubmit={handleSubmit}
      >
      <Checkbox name="artistLinks">
        Artist hyperlinks
      </Checkbox>
      <Checkbox name="trackLinks">
        Track hyperlinks
      </Checkbox>
      <div className="flex gap-2">
        <Button type="submit">
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
    </TabPanel>
  </Tabs>
)
}


/**
 *
 * @keyframes EQYv7q_spectrum-fill-mask-1 {
  0% {
    transform: rotate(90deg)
  }

  1.69% {
    transform: rotate(72.3deg)
  }

  3.39% {
    transform: rotate(55.5deg)
  }

  5.08% {
    transform: rotate(40.3deg)
  }

  6.78% {
    transform: rotate(25deg)
  }

  8.47% {
    transform: rotate(10.6deg)
  }

  10.17% {
    transform: rotate(0)
  }

  11.86% {
    transform: rotate(0)
  }

  13.56% {
    transform: rotate(0)
  }

  15.25% {
    transform: rotate(0)
  }

  16.95% {
    transform: rotate(0)
  }

  18.64% {
    transform: rotate(0)
  }

  20.34% {
    transform: rotate(0)
  }

  22.03% {
    transform: rotate(0)
  }

  23.73% {
    transform: rotate(0)
  }

  25.42% {
    transform: rotate(0)
  }

  27.12% {
    transform: rotate(0)
  }

  28.81% {
    transform: rotate(0)
  }

  30.51% {
    transform: rotate(0)
  }

  32.2% {
    transform: rotate(0)
  }

  33.9% {
    transform: rotate(0)
  }

  35.59% {
    transform: rotate(0)
  }

  37.29% {
    transform: rotate(0)
  }

  38.98% {
    transform: rotate(0)
  }

  40.68% {
    transform: rotate(0)
  }

  42.37% {
    transform: rotate(5.3deg)
  }

  44.07% {
    transform: rotate(13.4deg)
  }

  45.76% {
    transform: rotate(20.6deg)
  }

  47.46% {
    transform: rotate(29deg)
  }

  49.15% {
    transform: rotate(36.5deg)
  }

  50.85% {
    transform: rotate(42.6deg)
  }

  52.54% {
    transform: rotate(48.8deg)
  }

  54.24% {
    transform: rotate(54.2deg)
  }

  55.93% {
    transform: rotate(59.4deg)
  }

  57.63% {
    transform: rotate(63.2deg)
  }

  59.32% {
    transform: rotate(67.2deg)
  }

  61.02% {
    transform: rotate(70.8deg)
  }

  62.71% {
    transform: rotate(73.8deg)
  }

  64.41% {
    transform: rotate(76.2deg)
  }

  66.1% {
    transform: rotate(78.7deg)
  }

  67.8% {
    transform: rotate(80.6deg)
  }

  69.49% {
    transform: rotate(82.6deg)
  }

  71.19% {
    transform: rotate(83.7deg)
  }

  72.88% {
    transform: rotate(85deg)
  }

  74.58% {
    transform: rotate(86.3deg)
  }

  76.27% {
    transform: rotate(87deg)
  }

  77.97% {
    transform: rotate(87.7deg)
  }

  79.66% {
    transform: rotate(88.3deg)
  }

  81.36% {
    transform: rotate(88.6deg)
  }

  83.05% {
    transform: rotate(89.2deg)
  }

  84.75% {
    transform: rotate(89.2deg)
  }

  86.44% {
    transform: rotate(89.5deg)
  }

  88.14% {
    transform: rotate(89.9deg)
  }

  89.83% {
    transform: rotate(89.7deg)
  }

  91.53% {
    transform: rotate(90.1deg)
  }

  93.22% {
    transform: rotate(90.2deg)
  }

  94.92% {
    transform: rotate(90.1deg)
  }

  96.61% {
    transform: rotate(90deg)
  }

  98.31% {
    transform: rotate(89.8deg)
  }

  100% {
    transform: rotate(90deg)
  }
}
 *
 */
