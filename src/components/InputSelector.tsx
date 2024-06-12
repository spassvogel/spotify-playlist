import { useQuery } from "@tanstack/react-query";
import { ListBox, ListBoxItem } from "../react-aria/ListBox"
import { MAX_COUNT, sdk } from "../api/spotify";


const getPlaylists = async () => {
  return sdk.currentUser.playlists.playlists(MAX_COUNT)
}

type Props = {
  selectedInput: 'all' | Set<string | number>
  setSelectedInput: (value: 'all' | Set<string | number>) => void
}

export const InputSelector = ({ selectedInput, setSelectedInput }: Props) => {

  const { isError, data, error } = useQuery({
    queryKey: ['playlists'],
    queryFn: getPlaylists
  })

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <ListBox
      aria-label="Which list to create"
      selectionMode="single"
      selectedKeys={selectedInput}
      onSelectionChange={setSelectedInput}
      disallowEmptySelection
    >
      <ListBoxItem id="liked">Liked songs</ListBoxItem>
      {(data?.items ?? []).map((pl) => (
        <ListBoxItem id={pl.id} textValue={pl.name} key={pl.id}>
          <div className="whitespace-nowrap overflow-auto truncate shrink-0">{pl.name}</div>
          <div className="whitespace-nowrap overflow-auto truncate text-gray-500">{pl.description}</div>
        </ListBoxItem>
      ))}
    </ListBox>
  )
}
