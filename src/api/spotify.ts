import { SpotifyApi } from "@spotify/web-api-ts-sdk"
import { useEffect, useState } from "react"


const redirectUrl = window.location.origin        // your redirect URL - must be localhost URL and/or HTTPS
export const sdk = SpotifyApi.withUserAuthorization(
  import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  redirectUrl,
  ['user-read-private', 'user-read-email', 'user-library-read']
)

export const useSpotifyLogin = () => {
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {

    const args = new URLSearchParams(window.location.search)
    const code = args.get('code')
    let pollingTimeout: number

    if (code) {
      if (!authorized) {
        // I'm not fully sure why we have to authorize a second time
        // but apparently its needed?
        sdk.getAccessToken().then((token) => {
          console.log('found ', token)
          if (!token) {
            authorizeWithSpotify()
          } else {
            setAuthorized(true)
          }
        })
      }
    }
    return () => {
      clearInterval(pollingTimeout)
    }
  }, [authorized])

  // useEffect(() => {

  //   const args = new URLSearchParams(window.location.search)
  //   const code = args.get('code')
  //   if (code) {
  //     setAuthorized(true)
  //   }
  // //     // Remove code from URL so we can refresh correctly.
  //     const url = new URL(window.location.href)
  //     url.searchParams.delete("code")


  // //     // setAuthorized(true)
  // //     (async () => {
  // //       const token = await sdk.getAccessToken()
  // //       console.log(`(wouter left this in) token`, token)
  // //       setAuthorized(token !== null)

  //       const updatedUrl = url.search ? url.href : url.href.replace('?', '')
  //       window.history.replaceState({}, document.title, updatedUrl)
  // //     })()
  // //   }
  // }, [])

  const authorizeWithSpotify = async () => {
    const { authenticated, accessToken } = await sdk.authenticate()
    console.log(`(wouter left this in) authenticated`, authenticated);
    console.log(`(wouter left this in) accessToken`, accessToken);

    setAuthorized(authenticated)
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
