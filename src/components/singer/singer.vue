<template>
  <div class="singer" ref="singer">
    <listview @select="selectSinger" :data="singerList" ref="list"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'
import Listview from 'base/listview/listview'
import {mapMutations} from 'vuex'
import {playlistMixin} from 'common/js/mixin'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
export default {
  mixins: [playlistMixin],
  created () {
    this._getSingerList()
  },
  data () {
    return {
      singerList: []
    }
  },
  methods: {
    handlePlayList(playlist) {
      console.log(11)
      const bottom = playlist.length > 0 ? '60px' : 0
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singerList = this.formatSinger(res.data.list)
        }
      })
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    formatSinger(list) {
      const map = {
        hot: {
          title: HOT_NAME,
          item: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.item.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }

        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            item: []
          }
        }

        map[key].item.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      let ret = []
      let hot = []

      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }

      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      // console.log(hot.concat(ret))
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    Listview
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
