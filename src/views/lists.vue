<template>
  <div class="playlist">
    <div class="list-wrapper">
      <div class="list-header">
        <h1 class="title" v-show="indexs===0?true:false">
          <i class="iconfont icon-ziyuan" @click="playtype()"></i>
          <span class="text">顺序播放（{{count}}）</span>
          <van-icon name="delete" class="clear" @click="clear()" />
        </h1>
        <h1 class="title" v-show="indexs===1?true:false">
          <i class="iconfont icon-danquxunhuan" @click="playtype()"></i>
          <span class="text">单曲循环（{{count}}）</span>
          <van-icon name="delete" class="clear" @click="clear()" />
        </h1>
        <h1 class="title" v-show="indexs===2?true:false">
          <i class="iconfont icon-suiji" @click="playtype()"></i>
          <span class="text">随机播放（{{count}}）</span>
          <van-icon name="delete" class="clear" @click="clear()" />
        </h1>
      </div>
      <div class="list-content" ref="wrapper">
        <ul>
          <li v-for="(item,i) in list" :key="i">
            <van-icon name="volume-o" class="current" v-show="item.icon" />
            <span class="text" @click="playmusic(item)">{{item.name}}</span>
            <van-icon name="cross" class="cross" @click="remove(i)" />
          </li>
        </ul>
      </div>
      <div class="list-close">
        <span @click="close">关闭</span>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import '../fonts/font_hg6ftgvqb45/iconfont.css'
import '../fonts/font_r833m7zqj1h/iconfont.css'
export default {
  data() {
    return {
      list: [],
      count: 0,
      indexs: ''
    }
  },
  props: ['index'],
  created() {
    this.getlist()
    this.indexs = this.$parent.index
  },
  methods: {
    close() {
      this.$parent.kg6 = false
    },
    getlist() {
      var local = this.$store.state.playlist
      if (local.length > 0) {
        local.some(item => {
          if (this.$parent.name === item.name) {
            item.icon = true
          } else {
            item.icon = false
          }
        })
      }
      this.list = local
      this.count = this.list.length
      console.log(this.list)
    },
    clear() {
      this.$store.state.playlist = []
      this.$parent.kg6 = false
    },
    remove(index) {
      var local1 = this.$store.state.playlist
      local1.splice(index, 1)
      this.$store.state.playlist = local1
      this.count = this.list.length
    },
    playtype() {
      if (this.$parent.index === 2) {
        this.$parent.index = 0
      } else {
        this.$parent.index++
      }
    },
    async playmusic(item) {
      this.$parent.name = item.name
      const { data: res } = await this.$http.get('/song/url?id=' + item.id)
      this.$parent.bf = res.data[0].url
      item.singer = item.ar[0].name
      item.picUrl = item.al.picUrl
      item.duration = item.dt
      this.$parent.list = item
      this.$parent.gl1 = true
      this.$parent.gl2 = false
      this.$parent.value = 0
      this.$emit('ready', item.name)
      this.getlist()
      this.$forceUpdate()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    })
  },
  watch: {
    index() {
      this.indexs = this.index
    }
  }
}
</script>
<style lang="less" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 302;
  background-color: rgba(0, 0, 0, 0.3);
  .list-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-radius: 8px;
    background-color: #f2f3f4;
    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .iconfont {
          color: #757575;
        }
        .icon-ziyuan {
          margin-right: 10px;
          font-size: 20px;
        }
        .icon-suiji {
          margin-right: 10px;
          font-size: 20px;
        }
        .icon-danquxunhuan {
          margin-right: 10px;
          font-size: 20px;
        }
        .text {
          flex: 1;
          font-size: 14px;
          color: #2e3030;
        }
        .clear {
          position: relative;
          font-size: 20px;
        }
      }
    }
    .list-content {
      max-height: 240px;
      overflow: hidden;
      top: 0;
      bottom: 0;
      width: 100%;
      li {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        .current {
          color: #d44439;
          margin-right: 5px;
        }
        .text {
          flex: 1;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          line-height: 20px;
          font-size: 14px;
          color: #2e3030;
          z-index: 1;
        }
        .cross {
          position: relative;
          font-size: 13px;
          color: #d44439;
          z-index: 2;
        }
      }
    }
    .list-close {
      text-align: center;
      line-height: 50px;
      background: #f2f3f4;
      font-size: 16px;
      color: #2e3030;
    }
  }
}
</style>
