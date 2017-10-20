export default class Song {
  constructor({id, mid, singers, name, ablum, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singers = singers
    this.name = name
    this.ablum = ablum
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.latest_song.songid,
    mid: musicData.albumMID,
    singers: filterSinger(musicData.singers),
    name: musicData.latest_song.track_name,
    ablum: musicData.albumName,
    duration: musicData.listen_count,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albumMID}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicData.latest_song.songid}.m4a?fromtag=46`
  })
}

function filterSinger(singers) {
  let ret = []
  if (!singers) {
    return
  }
  singers.forEach(item => {
    ret.push(item.singer_name)
  })
  return ret
}