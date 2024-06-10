import { Tab, TabList, Tabs } from "../react-aria/Tabs"
import { Key } from "react-aria-components"
import Markdown from "./output/Markdown"


type Props = {
  // setOutput: (value: string) => void
}
export const OutputSelector = () => {

  const handleTabChanged = (key: Key) => {
    // console.log(`key`, key)
  }

  return (
    <Tabs onSelectionChange={handleTabChanged} className="mt-5">
      <TabList aria-label="output">
        <Tab id="markdown">
          Markdown
        </Tab>
        <Tab id="csv">
          Spreadsheet (CSV)
        </Tab>
      </TabList>
      <Markdown />
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
