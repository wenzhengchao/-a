<template>
  <div class="recommend" ref="gd">
    <div class="content">
      <div class="bj"></div>
      <div class="banner">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,i) in banner" :key="i">
            <img :src="item.imageUrl" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="recommend-list">
        <h1>推荐歌单</h1>
        <ul>
          <li v-for="(item,i) in list" :key="i">
            <img :src="item.picUrl" alt @click="showlist(item)" />
            <div class="bfl">
              <van-icon name="service-o" />
              <span>{{item.playCount | time}}</span>
            </div>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="recommend-song">
        <h1>推荐歌曲</h1>
        <ul>
          <li v-for="(item,i) in song" :key="i">
            <img :src="item.picUrl" alt @click="play(item)" />
            <p class="text">{{item.name}}</p>
            <p class="singer">{{item.song.artists[0].name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      banner: [],
      list: [],
      song: []
    }
  },
  created() {
    this.getbanner()
    this.getlist()
    this.getnewsong()
  },
  methods: {
    async getbanner() {
      const { data: res } = await this.$http.get('/banner')
      this.banner = res.banners
    },
    async getlist() {
      const { data: res } = await this.$http.get('/personalized')
      this.list = res.result
    },
    async getnewsong() {
      const { data: res } = await this.$http.get('/personalized/newsong')
      this.song = res.result
    },
    async play(item) {
      this.$parent.id = item.id
      this.$store.commit('add', item)
      item.singer = item.song.artists[0].name
      item.duration = item.song.duration
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
      this.$parent.kg1 = false
      const { data: res } = await this.$http.get('/song/url?id=' + item.id)
      this.$parent.bf = res.data[0].url
      this.$parent.gl1 = true
      this.$parent.gl2 = false
      this.$parent.value = 0
      this.$emit('ready', item.name)
    },
    showlist(item) {
      this.$parent.kg3 = true
      this.$parent.list1 = item
      // console.log(item.id)
      this.$router.push('/recommend/' + item.id)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.gd, {
        click: true
      })
    })
  }
}
</script>
<style lang="less" scoped>
.recommend {
  position: fixed;
  top: 88px;
  width: 100%;
  bottom: 0;
  .bj {
    position: absolute;
    width: 100%;
    top: -33vh;
    left: 0;
    height: 50vh;
    background-color: #d44439;
    z-index: -1;
  }
}
.banner {
  width: 96%;
  margin: 0 auto;
  border-radius: 5px;
  overflow: hidden;
  .my-swipe {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
.recommend-list {
  width: 100%;
  h1 {
    height: 65px;
    line-height: 65px;
    padding-left: 1.5%;
    text-align: left;
    font-size: 14px;
    font-weight: 700;
    color: #2e3030;
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  li {
    flex: 33.3333%;
    padding: 0 1%;
    position: relative;
    img {
      width: 100%;
    }
    .bfl {
      position: absolute;
      top: 3%;
      right: 6%;
      color: #f1f1f1;
      font-size: 11px;
      .van-icon {
        margin-right: 3px;
      }
    }
    p {
      font-size: 11px;
      height: 40px;
      line-height: 16px;
      color: #000;
    }
  }
}
.recommend-song {
  width: 100%;
  h1 {
    height: 65px;
    line-height: 65px;
    padding-left: 1.5%;
    text-align: left;
    font-size: 14px;
    font-weight: 700;
    color: #2e3030;
  }
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  li {
    flex: 33.3333%;
    padding: 0 1%;
    position: relative;
    img {
      width: 100%;
    }
    .text {
      line-height: 16px;
      height: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 11px;
      color: #000;
    }
    .singer {
      line-height: 16px;
      height: 16px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 11px;
    }
  }
}
</style>
