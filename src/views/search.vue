<template>
  <div class="search">
    <div class="search-box-wrapper">
      <van-icon name="arrow-left" class="icon" @click="back" />
      <div class="search-box">
        <input type="text" placeholder="搜索歌曲、歌手" class="box" @input="showxx" ref="text" />
        <van-icon name="cross" class="cross" v-show="xx" />
      </div>
    </div>
    <div class="search-scroll-wrapper">
      <div>
        <div class="search-hots" v-show="kg1">
          <p class="title">热门搜索</p>
          <span
            class="search-hots-item"
            v-for="(item,i) in hot"
            :key="i"
            @click="span(item)"
          >{{item.first}}</span>
        </div>
        <div class="shortcut-wrapper" v-show="kg1">
          <div class="search-history" v-show="clickvalue.length===0?false:true">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <van-icon name="delete" class="delete" @click="clear" />
            </h1>
            <div class="search-list">
              <ul>
                <li v-for="(item,i) in clickvalue" :key="i">
                  <span class="text" @click="render(item)">{{item}}</span>
                  <van-icon name="cross" class="cross" @click="remove(i)" />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="search-result" v-show="kg2">
          <div class="wrapper" ref="wrapper3">
            <div class="suggest">
              <div class="search-suggest">
                <p>最佳匹配</p>
              </div>
              <ul>
                <li v-for="(item,i) in result" :key="i" @click="play(item)">
                  <div class="name">
                    <p class="song">{{item.name}}</p>
                    <p class="singer">{{item.artists[0].name}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      xx: false,
      hot: [],
      kg1: true,
      kg2: false,
      result: [],
      list: {},
      click: false,
      clickvalue: []
    }
  },
  created() {
    this.showhot()
  },
  methods: {
    async showxx() {
      if (this.$refs.text.value.length === 0) {
        this.xx = false
        this.kg1 = true
        this.kg2 = false
      } else {
        this.xx = true
        this.kg1 = false
        this.kg2 = true
        const { data: res } = await this.$http.get(
          '/search?keywords=' + this.$refs.text.value
        )
        this.result = res.result.songs
        this.click = true
      }
    },
    async showhot() {
      const { data: res } = await this.$http.get('/search/hot')
      this.hot = res.result.hots
      this.clickvalue = JSON.parse(localStorage.getItem('tmd') || '[]')
    },
    async span(item) {
      this.kg1 = false
      this.kg2 = true
      this.$refs.text.value = item.first
      const { data: res } = await this.$http.get(
        '/search?keywords=' + item.first
      )
      this.result = res.result.songs
    },
    back() {
      this.$parent.kg5 = false
      this.$router.push('/recommend')
    },
    async play(item) {
      this.$parent.id = item.id
      this.$store.commit('add', item)
      const { data: res } = await this.$http.get('/song/url?id=' + item.id)
      const { data: res1 } = await this.$http.get(`/song/detail?ids=${item.id}`)
      if (this.click === true) {
        this.clickvalue.unshift(this.$refs.text.value)
        var local = JSON.parse(localStorage.getItem('tmd') || '[]')
        local.unshift(this.$refs.text.value)
        localStorage.setItem('tmd', JSON.stringify(local))
      }
      this.$parent.bf = res.data[0].url
      this.list = res1.songs[0]
      this.list.duration = this.list.dt
      this.list.picUrl = this.list.al.picUrl
      this.list.singer = this.list.ar[0].name
      var local1 = JSON.parse(localStorage.getItem('cnm') || '[]')
      if (local1.length !== 0) {
        local1.some((index, i) => {
          if (index.id === item.id) {
            this.list.xh = true
            this.flg = true
          }
          if (this.flg === false) {
            this.list.xh = false
          }
        })
      } else {
        this.list.xh = false
      }
      var local2 = JSON.parse(localStorage.getItem('gouge') || '[]')
      local2.some((index, i) => {
        if (index.id === item.id) {
          local2.splice(i, 1)
        }
      })
      local2.unshift(item)
      localStorage.setItem('gouge', JSON.stringify(local2))
      this.$parent.list = this.list
      this.$parent.kg2 = true
      this.$parent.gl1 = true
      this.$parent.gl2 = false
      this.$parent.value = 0
      this.$emit('ready', item.name)
    },
    clear() {
      localStorage.setItem('tmd', '')
      this.clickvalue = []
    },
    remove(index) {
      this.clickvalue.splice(index, 1)
      var local = JSON.parse(localStorage.getItem('tmd'))
      local.splice(index, 1)
      localStorage.setItem('tmd', JSON.stringify(local))
    },
    async render(item) {
      this.$refs.text.value = item
      this.kg1 = false
      this.kg2 = true
      this.xx = true
      const { data: res } = await this.$http.get('/search?keywords=' + item)
      this.result = res.result.songs
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper3, {
        click: true
      })
    })
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  position: fixed;
  top: 55px;
  bottom: 60px;
  width: 100%;
  overflow: hidden;
}
.search {
  position: fixed;
  z-index: 300;
  width: 100%;
  top: 0;
  bottom: 0;
  background: #f2f3f4;
  .search-box-wrapper {
    z-index: 400;
    padding: 10px 40px 10px 43px;
    background: #d44439;
    .icon {
      position: absolute;
      left: 5px;
      top: 8px;
      padding: 3px 10px;
      font-size: 20px;
      color: #fff;
    }
    .search-box {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      height: 25px;
      .box {
        padding-top: 20px;
        flex: 1;
        line-height: 25px;
        background: #d44439;
        color: #fff;
        font-size: 14px;
        border: none;
        // outline: medium;
      }
      .cross {
        position: absolute;
        right: 12px;
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.8);
        border: none;
      }
    }
  }
  .search-scroll-wrapper {
    height: 100%;
    overflow: hidden;
    .search-hots {
      margin: 0 20px;
      .title {
        padding: 15px 5px 0;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #757575;
        margin-bottom: 12px;
      }
      .search-hots-item {
        display: inline-block;
        padding: 3px 5px;
        margin: 4px;
        border: 0.8px solid #c7c7c7;
        border-radius: 5px;
        line-height: 20px;
        color: #2e3030;
        font-size: 14px;
      }
    }
    .shortcut-wrapper {
      position: relative;
      margin: 0 auto;
      .search-history {
        position: relative;
        margin: 10px 25px;
        .title {
          display: flex;
          align-items: center;
          height: 30px;
          font-size: 12px;
          color: #757575;
          .text {
            flex: 1;
          }
          .delete {
            font-size: 17px;
            color: #2e3030;
            position: relative;
          }
        }
        .search-list {
          ul {
            li {
              display: flex;
              align-items: center;
              height: 35px;
              overflow: hidden;
              font-size: 14px;
              .text {
                flex: 1;
                color: #2e3030;
              }
              .cross {
                position: relative;
                font-size: 16px;
                color: #2e3030;
              }
            }
          }
        }
      }
    }
    .search-result {
      position: relative;
      width: 100%;
      top: 10px;
      bottom: 0;
      .suggest {
        position: absolute;
        top: 0;
        left: 0;
        .search-suggest {
          p {
            padding-left: 20px;
            padding-bottom: 10px;
            color: #d44439;
            font-size: 11px;
          }
        }
        ul {
          padding-bottom: 30px;
          li {
            display: flex;
            padding: 3px 20px;
            height: 50px;
            align-items: center;
            border-bottom: 1px solid #e4e4e4;
            .name {
              flex: 1;
              font-size: 14px;
              color: #2e3030;
              overflow: hidden;
              .song {
                font-size: 16px;
                color: #2e3030;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .singer {
                font-size: 12px;
                color: #757575;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
