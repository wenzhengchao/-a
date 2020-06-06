<template>
  <div class="player">
    <div class="bj" :style="'background-image: url('+plays.picUrl+')'">
      <div class="filter"></div>
    </div>
    <div class="title">
      <van-icon name="arrow-down" class="icon" @click="fh" />
      <p class="name">{{plays.name}}</p>
      <p class="singer">{{plays.singer}}</p>
    </div>
    <div class="middle">
      <div class="middle-a">
        <div class="ball">
          <div
            class="ball-a"
            :style="gl1===false?'animation-play-state:paused':'animation-play-state:running'"
          >
            <img :src="plays.picUrl" alt />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="progress">
        <span>{{send*1000 | time2}}</span>
        <van-slider v-model="value1" active-color="#ee0a24" @change="onChange">
          <template #button>
            <div class="custom-button"></div>
          </template>
        </van-slider>
        <span>{{plays.duration | time2}}</span>
      </div>
      <div class="operators">
        <div class="icon-a" @click="playtype()">
          <i class="iconfont icon-ziyuan" v-show="indexs===0?true:false"></i>
          <i class="iconfont icon-danquxunhuan" v-show="indexs===1?true:false"></i>
          <i class="iconfont icon-suiji" v-show="indexs===2?true:false"></i>
        </div>
        <div class="icon-b">
          <i class="iconfont icon-shangyishoushangyige" @click="shangyishou"></i>
        </div>
        <div class="icon-c" @click="gb">
          <i class="iconfont icon-bofang" v-show="gl2"></i>
          <i class="iconfont icon-tingzhi" v-show="gl1"></i>
        </div>
        <div class="icon-d">
          <i class="iconfont icon-xiayige" @click="xiayishou"></i>
        </div>
        <div class="icon-e" @click="gb2">
          <i class="iconfont icon-xihuan1" v-show="!xh"></i>
          <i class="iconfont icon-xihuan" v-show="xh"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../fonts/font_3c8be8q3c8r/iconfont.css'
import '../fonts/font_z389rgf1gzg/iconfont.css'
import '../fonts/font_hg6ftgvqb45/iconfont.css'
import '../fonts/font_r833m7zqj1h/iconfont.css'
export default {
  data() {
    return {
      value1: 0,
      xh: '',
      indexs: ''
    }
  },
  props: ['plays', 'gl1', 'gl2', 'send', 'value', 'index'],
  created() {
    this.xh = this.$parent.list.xh
    this.indexs = this.$parent.index
  },
  methods: {
    fh() {
      this.$parent.kg1 = true
      this.$parent.kg2 = false
    },
    gb() {
      this.$parent.gl1 = !this.$parent.gl1
      this.$parent.gl2 = !this.$parent.gl2
      this.$emit('pauseds1', this.$parent.gl1)
    },
    onChange(value) {
      this.$parent.send = (value / 100000) * this.plays.duration
      this.$emit('change')
    },
    gb2() {
      if (this.xh === false) {
        this.$parent.list.xh = true
        this.xh = true
        var local = JSON.parse(localStorage.getItem('cnm') || '[]')
        local.unshift(this.plays)
        localStorage.setItem('cnm', JSON.stringify(local))
      } else {
        this.$parent.list.xh = false
        this.xh = false
        var local1 = JSON.parse(localStorage.getItem('cnm') || '[]')
        local1.some((item, i) => {
          if (item.id === this.plays.id) {
            local1.splice(i, 1)
          }
        })
        localStorage.setItem('cnm', JSON.stringify(local1))
      }
    },
    playtype() {
      if (this.$parent.index === 2) {
        this.$parent.index = 0
      } else {
        this.$parent.index++
      }
    },
    async shangyishou() {
      this.$parent.gl1 = true
      this.$parent.gl2 = false
      this.$emit('pauseds1', this.$parent.gl1)
      if (this.$store.state.playlist.length > 1) {
        this.$store.state.playlist.some((item, i) => {
          if (item.id === this.plays.id && i > 0) {
            this.$parent.list = this.$store.state.playlist[i - 1]
          } else if (item.id === this.plays.id && i === 0) {
            this.$parent.list = this.$store.state.playlist[
              this.$store.state.playlist.length - 1
            ]
          }
        })
        const { data: res } = await this.$http.get(
          '/song/url?id=' + this.$parent.list.id
        )
        this.$parent.list.singer = this.$parent.list.ar[0].name
        this.$parent.list.picUrl = this.$parent.list.al.picUrl
        this.$parent.list.duration = this.$parent.list.dt
        var local1 = JSON.parse(localStorage.getItem('cnm') || '[]')
        if (local1.length !== 0) {
          local1.some((index, i) => {
            if (index.id === this.$parent.list.id) {
              this.$parent.list.xh = true
              this.flg = true
            }
            if (this.flg === false) {
              this.$parent.list.xh = false
            }
          })
        } else {
          this.$parent.list.xh = false
        }
        var local2 = JSON.parse(localStorage.getItem('gouge') || '[]')
        local2.some((index, i) => {
          if (index.id === this.$parent.list.id) {
            local2.splice(i, 1)
          }
        })
        local2.unshift(this.$parent.list)
        localStorage.setItem('gouge', JSON.stringify(local2))
        this.$parent.bf = res.data[0].url
        this.$parent.name = this.$parent.list.name
        this.xh = this.$parent.list.xh
      }
    },
    async xiayishou() {
      this.$parent.gl1 = true
      this.$parent.gl2 = false
      this.$emit('pauseds1', this.$parent.gl1)
      if (this.$store.state.playlist.length > 1) {
        this.$store.state.playlist.some((item, i) => {
          if (
            item.id === this.plays.id &&
            i < this.$store.state.playlist.length - 1
          ) {
            this.$parent.list = this.$store.state.playlist[i + 1]
          } else if (
            item.id === this.plays.id &&
            i === this.$store.state.playlist.length - 1
          ) {
            this.$parent.list = this.$store.state.playlist[0]
          }
        })
        const { data: res } = await this.$http.get(
          '/song/url?id=' + this.$parent.list.id
        )
        this.$parent.list.singer = this.$parent.list.ar[0].name
        this.$parent.list.picUrl = this.$parent.list.al.picUrl
        this.$parent.list.duration = this.$parent.list.dt
        var local1 = JSON.parse(localStorage.getItem('cnm') || '[]')
        if (local1.length !== 0) {
          local1.some((index, i) => {
            if (index.id === this.$parent.list.id) {
              this.$parent.list.xh = true
              this.flg = true
            }
            if (this.flg === false) {
              this.$parent.list.xh = false
            }
          })
        } else {
          this.$parent.list.xh = false
        }
        var local2 = JSON.parse(localStorage.getItem('gouge') || '[]')
        local2.some((index, i) => {
          if (index.id === this.$parent.list.id) {
            local2.splice(i, 1)
          }
        })
        local2.unshift(this.$parent.list)
        localStorage.setItem('gouge', JSON.stringify(local2))
        this.$parent.bf = res.data[0].url
        this.$parent.name = this.$parent.list.name
        this.xh = this.$parent.list.xh
      }
    }
  },
  watch: {
    value() {
      this.value1 = this.value
    },
    index() {
      this.indexs = this.index
    }
  }
}
</script>
<style lang="less" scoped>
.player {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: #f2f3f4;
  .bj {
    position: absolute;
    left: -50%;
    top: -50%;
    width: 300%;
    height: 300%;
    z-index: -1;
    opacity: 1;
  }
  .title {
    margin-top: 15px;
    margin-bottom: 25px;
  }
  .name {
    width: 70%;
    margin: 0 auto;
    line-height: 20px;
    text-align: center;
    color: #f1f1f1;
    font-weight: 700;
    font-size: 18px;
  }
  .singer {
    font-size: 12px;
    width: 70%;
    margin: 0 auto;
    line-height: 20px;
    text-align: center;
    color: #f1f1f1;
  }
  .icon {
    font-size: 30px;
    color: #f1f1f1;
    position: absolute;
    top: 10px;
    left: 15px;
  }
}
.filter {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.6;
}
.middle {
  position: fixed;
  width: 100%;
  top: 80px;
  bottom: 170px;
  display: flex;
  align-items: center;
  .middle-a {
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 80%;
    .ball {
      position: absolute;
      left: 10%;
      top: 0;
      width: 80%;
      height: 100%;
      border-radius: 50%;
      padding: 15px;
      background-color: hsla(0, 0%, 100%, 0.2);
      .ball-a {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
        animation: rotate2 5s linear 0s infinite;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
@keyframes rotate2 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.bottom {
  position: absolute;
  bottom: 50px;
  width: 100%;
  .progress {
    width: 80%;
    margin: 0 auto;
    padding: 10px 0;
    display: flex;
    align-items: center;
    color: #f1f1f1;
    font-weight: 700;
    font-size: 14px;
    .van-slider {
      height: 4px;
      width: 80%;
      background: rgba(0, 0, 0, 0.3);
      margin: 0 10px;
      .custom-button {
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        background: #d44439;
        border-radius: 50%;
        border: 5px solid #f1f1f1;
      }
    }
  }
  .operators {
    display: flex;
    align-items: center;
    .icon-a {
      flex: 1;
      text-align: right;
      .icon-ziyuan {
        font-size: 26px;
      }
      .icon-danquxunhuan {
        font-size: 28px;
      }
      .icon-suiji {
        font-size: 26px;
      }
    }
    .icon-b {
      flex: 1;
      text-align: right;
      .icon-shangyishoushangyige {
        font-size: 30px;
      }
    }
    .icon-c {
      flex: 1;
      text-align: center;
      .icon-bofang {
        font-size: 45px;
      }
      .icon-tingzhi {
        font-size: 45px;
      }
    }
    .icon-d {
      flex: 1;
      text-align: left;
      .icon-xiayige {
        font-size: 30px;
      }
    }
    .icon-e {
      flex: 1;
      text-align: left;
      .icon-xihuan {
        font-size: 30px;
      }
      .icon-xihuan1 {
        font-size: 30px;
      }
    }
  }
}
</style>
