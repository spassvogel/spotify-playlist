import { Toolbar } from './react-aria/Toolbar'
import { ToggleButton } from './react-aria/ToggleButton'
import { Bold, Italic, Underline } from 'lucide-react'
import { Button } from './react-aria/Button'
import { Separator } from './react-aria/Separator'
import { Checkbox } from './react-aria/Checkbox'
import './App.css'
import { OutputSelector } from './components/OutputSelector'
import { InputSelector } from './components/InputSelector'
import { useSpotifyLogin } from './api/spotify'
import { Input, TextArea } from './react-aria/Field'
import { useState } from 'react'

function App() {
  const {
    authorized,
    authorizeWithSpotify,
    logout,
  } = useSpotifyLogin()

  const [output, setOutput] = useState<string>()

  if (!authorized) {
    return (
      <Button onPress={authorizeWithSpotify}>
        Log into Spotify
      </Button>
    )
  }
  return (
    <>
      <Button onPress={logout}>
        Logout
      </Button>
      <InputSelector/>
      <OutputSelector setOutput={setOutput} />
      <TextArea className="w-full min-h-80" defaultValue={output} />
    </>
  )
}

export default App
