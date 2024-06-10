import { Button } from './react-aria/Button'
import { OutputSelector } from './components/OutputSelector'
import { InputSelector } from './components/InputSelector'
import { useSpotifyLogin } from './api/spotify'
import LoggedInToolbar from './components/LoggedInToolbar'

import './App.css'

function App() {
  const {
    authorized,
    authorizeWithSpotify,
    logout,
  } = useSpotifyLogin()

  const args = new URLSearchParams(window.location.search)
  const code = args.get('code')

  if (!authorized && !code) {
    return (
      <Button onPress={authorizeWithSpotify}>
        Log into Spotify
      </Button>
    )
  }
  return (
    <>
      <LoggedInToolbar onLogout={logout}/>
      <InputSelector/>
      <OutputSelector />
    </>
  )
}

export default App
