import { Form } from "../react-aria/Form";
import { Tab, TabList, TabPanel, Tabs } from "../react-aria/Tabs";
import { Button } from "../react-aria/Button";
import { Checkbox } from "../react-aria/Checkbox";

export const OutputSelector = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget));
console.log(`data`, data)
  };
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
