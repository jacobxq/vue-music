<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import musicList from 'components/music-list/music-list'
import { createSong } from 'common/js/song'
import { getMusicList } from 'api/rank'
import { ERR_OK } from 'api/config'
import {mapGetters} from 'vuex'
export default {
  created() {
    this._getMusicList()
  },
  data() {
    return {
      songs: []
    }
  },
  methods: {
    _getMusicList() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getMusicList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this.formatSongList(res.songlist)
        }
      })
    },
    formatSongList(list) {
      let ret = []
      list.forEach((item, index) => {
        let musicData = item.data
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      return this.songs.length ? this.songs[0].image : ''
    },
    ...mapGetters([
      'topList'
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
