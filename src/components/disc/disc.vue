<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import musicList from 'components/music-list/music-list'
import { createSong } from 'common/js/song'
import { getSongList } from 'api/recommend'
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
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      console.log(this.disc)
      getSongList(this.disc.dissid).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this.formatSongList(res.cdlist[0].songlist)
        }
      })
    },
    formatSongList(list) {
      let ret = []
      list.forEach((item, index) => {
        let musicData = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  computed: {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
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
