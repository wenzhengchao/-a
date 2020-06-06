<template>
  <div class="yylist1">
    <div class="header">
      <van-icon name="arrow-left" class="icon" @click="kg" />
      <div class="name">歌单</div>
    </div>
    <div class="bottom" ref="wrapper">
      <div class="wrapper">
        <div class="img" :style="'background-image: url('+list.picUrl+')'">
          <div class="filter"></div>
          <div class="text">{{list.name}}</div>
        </div>
        <div class="list">
          <div class="list-a">
            <i class="iconfont icon-bofang"></i>
            <span class="text">播放全部(共{{lists.length}}首)</span>
          </div>
          <div class="list-b">
            <ul>
              <li v-for="(item,i) in lists" :key="i" @click="getmusic(item)">
                <p class="index">{{i+1}}</p>
                <div class="content">
                  <p class="name">{{item.name}}</p>
                  <p class="desc">{{item.ar[0].name}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../fonts/font_3c8be8q3c8r/iconfont.css'
import BScroll from 'better-scroll'
export default {
  props: ['list'],
  data() {
    return {
      lists: [],
      flg: false
    }
  },
  created() {
    this.getid()
  },
  methods: {
    async getid() {
      const { data: res } = await this.$http.get(`artists?id=${this.list.id}`)
      console.log(res)
      this.lists = res.hotSongs
    },
    kg() {
      this.$parent.kg4 = false
      this.$router.push('/singer')
    },
    async getmusic(item) {
      this.$store.commit('newarray', this.lists)
      console.log(this.$store.state.playlist)
      const { data: res } = await this.$http.get('/song/url?id=' + item.id)
      this.$parent.bf = res.data[0].url
      item.singer = item.ar[0].name
      item.picUrl = item.al.picUrl
      item.duration = item.dt
      var local1 = JSON.parse(localStorage.getItem('cnm') || '[]')
      if (local1.length !== 0) {
        local1.some((index, i) => {
          if (index.id === item.id) {
            item.xh = true
            this.flg = true
          }
          if (this.flg === false) {
            item.xh = false
          }
        })
      } else {
        item.xh = false
      }
      var local2 = JSON.parse(localStorage.getItem('gouge') || '[]')
      local2.some((index, i) => {
        if (index.id === item.id) {
          local2.splice(i, 1)
        }
      })
      local2.unshift(item)
      localStorage.setItem('gouge', JSON.stringify(local2))
      this.$parent.list = item
      this.$parent.kg2 = true
      this.$parent.gl1 = true
      this.$parent.gl2 = false
      this.$parent.value =
        (parseInt(this.$parent.send * 1000) / item.duration) * 100
      this.$emit('ready', item.name)
    },
    handle() {
      console.log(123)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true
      })
    })
  }
}
</script>
<style lang="less" scoped>
.yylist1 {
  position: fixed;
  background: #f2f3f4;
  z-index: 101;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 44px;
    color: #fff;
    z-index: 500;
    .icon {
      position: absolute;
      top: 4px;
      left: 4px;
      font-size: 26px;
    }
    .name {
      position: absolute;
      top: 8px;
      left: 36px;
      font-size: 18px;
    }
  }
  .bottom {
    position: fixed;
    top: 0;
    width: 100%;
    bottom: 0;
    .img {
      width: 100%;
      height: 0;
      padding-top: 75%;
      background-size: cover;
      position: relative;
      .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.2;
      }
      .text {
        position: absolute;
        width: 80%;
        height: 40px;
        bottom: 50px;
        left: 15px;
        color: #fff;
        font-size: 17px;
        font-weight: 700;
      }
      .bfl {
        position: absolute;
        left: 15px;
        font-size: 11px;
        color: #fff;
        bottom: 30px;
        .play-count {
          margin-left: 2px;
          font-weight: 700;
        }
      }
    }
    .list {
      width: 100%;
      position: relative;
      border-radius: 10px;
      top: -15px;
      background: #f2f3f4;
      padding: 41px 0 20px;
      .list-a {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        width: 100%;
        height: 40px;
        border-bottom: 1px solid #e4e4e4;
        padding-left: 16px;
        .icon-bofang {
          font-size: 26px;
        }
        .text {
          margin-left: 14px;
        }
      }
      .list-b {
        li {
          position: relative;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          border-bottom: 1px solid #e4e4e4;
          height: 60px;
          .index {
            width: 50px;
            text-align: center;
            color: #757575;
            flex: 0 0 50px;
          }
          .content {
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .name {
              margin-top: 4px;
              width: 80%;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              color: #2e3030;
            }
            .desc {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              width: 80%;
              font-size: 12px;
              color: #757575;
            }
          }
        }
      }
    }
  }
}
.iconfont {
  color: black;
}
</style>
