import { SimplifiedArtist, Track } from "@spotify/web-api-ts-sdk"

export const convertTracks = (trackData: Track[], config: { [k: string]: FormDataEntryValue }) => {
  const serializeTrack = (trackData: Track) => {
    return `| ${serializeTrackName(trackData)} | ${serializeArtists(trackData)} |`
  }

  const serializeTrackName = (trackData: Track) => {
    if (config.artistLinks) {
      return `[${trackData.name}](${trackData.external_urls.spotify})`
    }
    return `${trackData.name}`
  }

  const serializeArtists = (trackData: Track) => {
    return trackData.artists.map(serializeArtist).join(', ')
  }

  const serializeArtist = (artistData: SimplifiedArtist) => {
    if (config.artistLinks) {
      return `[${artistData.name}](${artistData.external_urls.spotify})`
    }
    return `${artistData.name}`
  }


  const output = ['| Song | Artist |', '| --- | --- |']
  output.push(...trackData.map(serializeTrack))
  return output.join('\n')

}

