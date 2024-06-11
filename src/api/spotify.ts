import { MaxInt, Page, SpotifyApi } from "@spotify/web-api-ts-sdk"
import { useEffect, useState } from "react"

const redirectUrl = window.location.origin + import.meta.env.BASE_URL       // your redirect URL - must be localhost URL and/or HTTPS
export const sdk = SpotifyApi.withUserAuthorization(
  import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  redirectUrl,
  ['user-read-private', 'playlist-read-private', 'user-library-read']
)
export const useSpotifyLogin = () => {
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    sdk.getAccessToken().then((token) => {
      if (token) {
        setAuthorized(true)
      }
    })
  }, [])

  useEffect(() => {
    const args = new URLSearchParams(window.location.search)
    const code = args.get('code')

    if (code &&!authorized) {
      // I'm not fully sure why we have to authorize a second time
      // but apparently its needed?
      sdk.getAccessToken().then((token) => {
        if (!token) {
          authorizeWithSpotify()
        }
      })
    }
  }, [authorized])

  const authorizeWithSpotify = async () => {
    await sdk.authenticate()
  }

  const logout = async () => {
    await sdk.logOut()
    setAuthorized(false)
  }

  return {
    authorized,
    authorizeWithSpotify,
    logout
  }
}

export const MAX_COUNT = 50
export const getAll = async <TItem,>(endpoint: (limit?: MaxInt<typeof MAX_COUNT>, offset?: number) => Promise<Page<TItem>>) => {
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
