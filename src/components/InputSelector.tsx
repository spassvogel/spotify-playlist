import { ListBox, ListBoxItem } from "../react-aria/ListBox"
import { useState } from "react"

export const InputSelector = () => {
  const [selectedKeys, setSelectedKeys] = useState<'all' | Set<string | number>>(new Set(['liked']));
  // todo: download the playlists!

  return (
    <ListBox
      aria-label="Which list to create"
      selectionMode="single"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      disallowEmptySelection
    >
      <ListBoxItem id="liked">Liked songs</ListBoxItem>
    </ListBox>
  )
}
