<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import musicList from 'components/music-list/music-list'
import { createSong } from 'common/js/song'
import { getSongList } from 'api/singer'
import { ERR_OK } from 'api/config'
import {mapGetters} from 'vuex'
export default {
  created() {
    this._getSongList()
  },
  data() {
    return {
      songs: []
    }
  },
  methods: {
    _getSongList() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSongList(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this.formatSongList(res.data.list)
        }
      })
    },
    formatSongList(list) {
      let ret = []
      list.forEach((item, index) => {
        let musicData = item
        if (musicData.albumMID && musicData.latest_song.songid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  components: {
    musicList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
