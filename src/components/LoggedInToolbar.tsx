import { Separator } from "react-aria-components"
import { Toolbar } from "../react-aria/Toolbar"
import { Button } from "../react-aria/Button"
import { sdk } from "../api/spotify"
import { useEffect, useState } from "react"
import { UserProfile } from "@spotify/web-api-ts-sdk"

type Props = {
  onLogout: () => void
}
const LoggedInToolbar = ({ onLogout }: Props) => {
  const [userProfile, setUserProfile] = useState<UserProfile>()

  useEffect(() => {
    sdk.currentUser.profile()
      .then((profile) => {
        setUserProfile(profile)
      })
  }, [])

  return (
    <Toolbar aria-label="Text formatting" className="items-center mb-4">
      <div className="rounded-full w-7 h-7 bg-gray-200 overflow-hidden flex-shrink-0">
        <img src={userProfile?.images[0]?.url} className="w-full h-full" />
      </div>
      <div>
        {userProfile?.display_name}
      </div>
      <div className="w-full"></div>
      <Separator orientation="vertical" />
      <Button onPress={onLogout}>
        Logout
      </Button>
    </Toolbar>
  )
}

export default LoggedInToolbar
