<template>
  <transition name="slide">
    <music-list></music-list>
  </transition>
</template>

<script>
import musicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
export default {
  created() {
    console.log(this.singer)
  },
  computed: {
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
