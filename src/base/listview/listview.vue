<template>
  <scroll class="listview"
          :listen-scroll="listenScroll"
          :probe-type="probeType"
          ref="listview"
          :data="data"
          @scroll="scroll"
  >
    <ul>
      <li v-for="(group, index) in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <uL>
          <li @click="selectItem(item)" v-for="(item, i) in group.item"  class="list-group-item" :data-id="item.id">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-slide-bar" @touchstart.stop.prevent="onSlideBarTouchStart" @touchmove.stop.prevent="onSlideBarTouchMove">
      <ul>
        <li class="item" 
            v-for="(item, index) in slideBarList" 
            :data-index="index"
            :class="{'current': currentIndex == index}"
        >
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length" class="loading-content">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/bable">
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'
import Loading from 'base/loading/loading'

const TITLE_HEIGHT = 30
const SLIDEBAR_HEIGHT = 18

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
    this.touch = {},
    this.listHeight = []
  },
  computed: {
    slideBarList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  mounted () {
    // console.log(this.data)
  },
  methods: {
    onSlideBarTouchStart(e) {
      let touchIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.touchIndex = touchIndex
      this._scrollTo(touchIndex)
    },
    onSlideBarTouchMove(e) {
      let moveTouch = e.touches[0]
      this.touch.y2 = moveTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / SLIDEBAR_HEIGHT | 0
      let touchIndex = parseInt(this.touch.touchIndex) + delta
      this._scrollTo(touchIndex)
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      // this.currentIndex = index
      this.scrollY = -this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    selectItem(item) {
      this.$emit('select', item)
    },
    refresh() {
      this.$refs.listview.refresh()
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // 滚动到顶部 newY > 0
      if (newY > 0) {
        this.currentIndex = 0
      }
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-slide-bar
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
