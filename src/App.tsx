import { Button } from './react-aria/Button'
import { OutputSelector } from './components/OutputSelector'
import { InputSelector } from './components/InputSelector'
import { useSpotifyLogin } from './api/spotify'
import LoggedInToolbar from './components/LoggedInToolbar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import './App.css'
import { useState } from 'react'

const queryClient = new QueryClient()
function App() {
  const {
    authorized,
    authorizeWithSpotify,
    logout,
  } = useSpotifyLogin()
  const [selectedInput, setSelectedInput] = useState<'all' | Set<string | number>>(new Set(['liked']))

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
    <QueryClientProvider client={queryClient}>
      <LoggedInToolbar onLogout={logout}/>
      <InputSelector setSelectedInput={setSelectedInput} selectedInput={selectedInput}/>
      <OutputSelector selectedInput={selectedInput}/>
    </QueryClientProvider>
  )
}

export default App
