import { ListBox, ListBoxItem } from "../react-aria/ListBox";
import { useState } from "react";

export const InputSelector = () => {
  const [selectedKeys, setSelectedKeys] = useState<'all' | Set<string | number>>(new Set(['liked']));
console.log(`selectedKeys`, selectedKeys)
  return (
    <ListBox aria-label="Which list to create" selectionMode="single" selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}>
    <ListBoxItem id="liked">Liked songs</ListBoxItem>
  </ListBox>
)
}
