<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs">
        <!-- <div class="rank">
          <span></span>
        </div> -->
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{song.singer}}·{{song.album}}</p>
        </div>
        <span class="delete" @click.stop="deleteOne(song)" v-show="showDelete">
          <i class="icon-delete"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      showDelete: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem(song, index) {
        this.$emit('select', song, index)
      },
      deleteOne(song) {
        this.$emit('delete', song)
      }
    },
    mounted () {
      // console.log(this.songs)
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      position: relative
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
      .delete
        padding: 10px 10px;
</style>