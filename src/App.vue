<template>
  <div id="app">
    <top v-show="true"></top>
    <tab></tab>
    <router-view @ready="ready1"></router-view>
    <play v-if="kg1" :plays="list" @pauseds1="pauseds1" :gl1="gl1" :gl2="gl2"></play>
    <player
      v-if="kg2"
      :plays="list"
      :gl1="gl1"
      :gl2="gl2"
      @pauseds1="pauseds1"
      :send="send"
      :value="value"
      :index="index"
      @change="change"
    ></player>
    <audio :src="bf" autoplay ref="paused" @ended="end()"></audio>
    <yylist v-if="kg3" :list="list1" @ready="ready1"></yylist>
    <yylist1 v-if="kg4" :list="list1" @ready="ready1"></yylist1>
    <search v-if="kg5" @ready="ready1"></search>
    <lists v-if="kg6" @ready="ready1" :index="index"></lists>
  </div>
</template>
<script>
import top from './views/header.vue'
import play from './views/play.vue'
import tab from './views/tab.vue'
import player from './views/player.vue'
import yylist from './views/yylist.vue'
import yylist1 from './views/yylist1.vue'
import search from './views/search.vue'
import lists from './views/lists.vue'
export default {
  data() {
    return {
      list: {},
      list1: {},
      kg1: false,
      kg2: false,
      kg3: false,
      kg4: false,
      kg5: false,
      kg6: false,
      bf: '',
      gl1: true,
      gl2: false,
      send: 0,
      timer: null,
      value: 0,
      name: '',
      index: 0,
      id: ''
    }
  },
  components: {
    top,
    tab,
    play,
    player,
    yylist,
    yylist1,
    search,
    lists
  },
  methods: {
    pauseds1(state) {
      if (state === false) {
        this.$refs.paused.pause()
        clearInterval(this.timer)
      } else {
        this.$refs.paused.play()
        this.timer = setInterval(() => {
          this.send = this.$refs.paused.currentTime
          this.value = (parseInt(this.send * 1000) / this.list.duration) * 100
        }, 1000)
      }
    },
    ready1(name) {
      if (this.gl1 === true) {
        this.name = name
        this.timer = setInterval(() => {
          this.send = this.$refs.paused.currentTime
          this.value = (parseInt(this.send * 1000) / this.list.duration) * 100
        }, 1000)
      }
    },
    change() {
      this.value = (parseInt(this.send * 1000) / this.list.duration) * 100
      this.$refs.paused.currentTime = parseInt(this.send)
    },
    async end() {
      if (parseInt(this.value) === 99 && this.index === 1) {
        this.$refs.paused.currentTime = 0
        this.send = 0
        this.value = 0
        this.$refs.paused.load()
      } else if (parseInt(this.value) === 99 && this.index === 0) {
        this.$refs.paused.currentTime = 0
        this.send = 0
        this.value = 0
        if (this.$store.state.playlist.length > 1) {
          this.$store.state.playlist.some((item, i) => {
            if (
              item.id === this.id &&
              i < this.$store.state.playlist.length - 1
            ) {
              this.list = this.$store.state.playlist[i + 1]
            } else if (
              item.id === this.id &&
              i === this.$store.state.playlist.length - 1
            ) {
              this.list = this.$store.state.playlist[0]
            }
          })
          const { data: res } = await this.$http.get(
            '/song/url?id=' + this.list.id
          )
          this.list.singer = this.list.ar[0].name
          this.list.picUrl = this.list.al.picUrl
          this.list.duration = this.list.dt
          this.bf = res.data[0].url
          this.name = this.list.name
          this.$forceUpdate()
          this.pauseds1(this.gl1)
        } else {
          this.$refs.paused.load()
        }
      } else if (parseInt(this.value) === 99 && this.index === 2) {
        this.$refs.paused.currentTime = 0
        this.send = 0
        this.value = 0
        if (this.$store.state.playlist.length > 1) {
          var suijishu = parseInt(
            Math.random() * this.$store.state.playlist.length
          )
          this.list = this.$store.state.playlist[suijishu]
          const { data: res } = await this.$http.get(
            '/song/url?id=' + this.list.id
          )
          this.list.singer = this.list.ar[0].name
          this.list.picUrl = this.list.al.picUrl
          this.list.duration = this.list.dt
          this.bf = res.data[0].url
          this.name = this.list.name
          this.$forceUpdate()
          this.pauseds1(this.gl1)
        } else {
          this.$refs.paused.load()
        }
      }
    }
  }
}
</script>
<style>
</style>
