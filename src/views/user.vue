<template>
  <div class="user">
    <div class="back">
      <van-icon name="arrow-left" class="icon" @click="back" />
    </div>
    <div class="switches-wrapper">
      <ul>
        <li :class="['switch-item',showlist===true?'active':'']" @click="sc">我的收藏</li>
        <li :class="['switch-item',showlist===false?'active':'']" @click="zj">最近播放</li>
      </ul>
    </div>
    <div class="sequence-play">
      <i class="iconfont icon-bofang"></i>
      <span class="text">播放全部(共{{count}}首)</span>
    </div>
    <div class="list-wrapper" v-if="showlist">
      <div class="list-scroll">
        <div ref="wrapper" class="wrapper">
          <ul>
            <li v-for="(item,i) in list" :key="i" @click="bf(item)">
              <p>{{i+1}}</p>
              <div class="content">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.singer}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-wrapper" v-if="!showlist">
      <div class="list-scroll">
        <div ref="wrapper" class="wrapper">
          <ul>
            <li v-for="(item,i) in lists" :key="i" @click="bf(item)">
              <p>{{i+1}}</p>
              <div class="content">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.singer}}</p>
              </div>
            </li>
          </ul>
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
      list: [],
      lists: [],
      showlist: true,
      count: 0,
      flg: false
    }
  },
  methods: {
    back() {
      this.$router.push('/recommend')
    },
    getlist() {
      this.list = JSON.parse(localStorage.getItem('cnm') || '[]')
      this.count = this.list.length
    },
    getlist1() {
      this.lists = JSON.parse(localStorage.getItem('gouge') || '[]')
    },
    sc() {
      this.showlist = true
      this.list = JSON.parse(localStorage.getItem('cnm') || '[]')
      this.count = this.list.length
    },
    zj() {
      this.showlist = false
      this.lists = JSON.parse(localStorage.getItem('gouge') || '[]')
      this.count = this.lists.length
    },
    async bf(item) {
      // this.$store.commit('add', item)
      const { data: res } = await this.$http.get('/song/url?id=' + item.id)
      this.$parent.bf = res.data[0].url
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
      this.$parent.value = 0
      this.$emit('ready', item.name)
      this.getlist1()
    }
  },
  created() {
    this.getlist()
    this.getlist1()
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
.wrapper {
  position: fixed;
  top: 84px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.user {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #f2f3f4;
  .back {
    position: absolute;
    top: 8px;
    left: 4px;
    .icon {
      font-size: 30px;
      color: #fff;
    }
  }
  .switches-wrapper {
    display: flex;
    align-items: center;
    background: #d44439;
    height: 44px;
    ul {
      display: flex;
      align-items: center;
      width: 240px;
      margin: 0 auto;
      .switch-item {
        flex: 1;
        padding: 8px;
        margin: 0 20px;
        text-align: center;
        font-size: 14px;
        color: #f1f1f1;
        border-bottom: 2px solid #d44439;
      }
      .active {
        border-bottom: 2px solid #f1f1f1;
        color: #fff;
      }
    }
  }
  .sequence-play {
    position: absolute;
    top: 44px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding-left: 16px;
    border-bottom: 1px solid #e4e4e4;
    .iconfont {
      color: #2e3030;
    }
    .icon-bofang {
      font-size: 25px;
      padding-right: 14px;
    }
    .text {
      font-size: 16px;
    }
  }
  .list-wrapper {
    position: absolute;
    top: 84px;
    bottom: 0;
    width: 100%;
    .list-scroll {
      overflow: hidden;
      height: 100%;
      li {
        position: relative;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 60px;
        border-bottom: 1px solid #e4e4e4;
        p {
          flex: 0 0 50px;
          width: 50px;
          text-align: center;
          color: #757575;
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
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
