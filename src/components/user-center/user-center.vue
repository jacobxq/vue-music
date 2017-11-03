<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches :currentIndex="currentIndex" :switches="switches" @switch="switchItem"></switches>
      </div>
      <div class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-wrapper" ref="listWrapper" v-show="!noResult">
        <scroll  class="list-scroll" :data="favoriteList" v-if="currentIndex === 0" ref="favoriteList">
           <div class="list-inner">
              <song-list :songs="favoriteList" @select="selectSong" @delete="deleteOne" :showDelete="showDelete">
              </song-list>
            </div>
        </scroll>
        <scroll :data="playHistory" class="list-scroll" v-if="currentIndex === 1" ref="playlist">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong">
            </song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-wrapper" v-show="noResult">
        <no-result :title="noResultTitle"></no-result>
      </div>
      <top-tip ref="topTip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">亲，当前列表没有可播放歌曲哦~</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Switches from 'base/switches/switches'
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import Song from 'common/js/song'
  import {mapGetters, mapActions} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'
  import NoResult from 'base/no-result/no-result'
  import TopTip from 'base/top-tip/top-tip'
  export default {
    mixins: [playlistMixin],
    data() {
      return {
        currentIndex: 0,
        switches: [
          { name: '我喜欢的' },
          { name: '最近听的' }
        ],
        showDelete: true
      }
    },
    computed: {
      noResult() {
        if (this.currentIndex === 0) {
          return !this.favoriteList.length
        } else {
          return !this.favoriteList.length
        }
      },
      noResultTitle() {
        if (this.currentIndex === 0) {
          return '没有收藏歌曲'
        } else {
          return '播放列表为空'
        }
      },
      ...mapGetters([
        'playHistory',
        'favoriteList'
      ])
    },
    methods: {
      back() {
        this.$router.back()
      },
      handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '60px' : '0'
        this.$refs.listWrapper.style.bottom = bottom
        this.$refs.favoriteList && this.$refs.favoriteList.refresh()
        this.$refs.playlist && this.$refs.playlist.refresh()
      },
      switchItem(index) {
        this.currentIndex = index
      },
      selectSong(song) {
        this.insertSong(new Song(song))
      },
      deleteOne(song) {
        this.deleteFavoriteList(song)
      },
      random() {
        let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
        if (list.length <= 0) {
          this.$refs.topTip.show()
          return false
        }
        list = list.map((item) => {
          return new Song(item)
        })
        this.randomPlay({
          list
        })
      },
      ...mapActions([
        'randomPlay',
        'insertSong',
        'deleteFavoriteList'
      ])
    },
    components: {
      Switches,
      Scroll,
      SongList,
      Song,
      NoResult,
      TopTip
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>