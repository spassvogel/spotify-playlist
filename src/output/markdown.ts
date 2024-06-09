import { SimplifiedArtist, Track } from "@spotify/web-api-ts-sdk"

export const serializeTrack = (trackData: Track) => {
  return `| ${serializeTrackName(trackData)} | ${serializeArtists(trackData)} |`
}

const serializeTrackName = (trackData: Track) => {
  return `[${trackData.name}](${trackData.external_urls.spotify})`
}

const serializeArtists = (trackData: Track) => {
  return trackData.artists.map(serializeArtist).join(', ')
}

const serializeArtist = (artistData: SimplifiedArtist) => {
  return `[${artistData.name}](${artistData.external_urls.spotify})`
}

// try {
//   const data = await getSavedTracks()
//   const output = ['| Song | Artist |', '| --- | --- |']
//   output.push(...data.map(parseTrack))
//   console.log(`data`, data);
//   console.log(`output`, output.join('\n'));

// } catch (e) {
//   console.error(e);
// }
// }
