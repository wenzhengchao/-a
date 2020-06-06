<template>
  <div class="play">
    <div
      class="ball"
      :style="gl1===false?'animation-play-state:paused':'animation-play-state:running'"
    >
      <img :src="plays.picUrl" alt @click="toggle" />
    </div>
    <div class="wz">
      <p class="text">{{plays.name}}</p>
      <p class="name">{{plays.singer}}</p>
    </div>
    <div class="toggle" @click="toggle2()">
      <i class="iconfont icon-tingzhi" v-show="gl1"></i>
      <i class="iconfont icon-bofang" v-show="gl2"></i>
    </div>
    <div class="list">
      <i class="iconfont icon-liebiao" @click="showlist"></i>
    </div>
  </div>
</template>

<script>
import '../fonts/font_z389rgf1gzg/iconfont.css'
export default {
  data() {
    return {}
  },
  created() {},
  methods: {
    toggle() {
      this.$parent.kg1 = false
      this.$parent.kg2 = true
    },
    toggle2() {
      this.$parent.gl1 = !this.$parent.gl1
      this.$parent.gl2 = !this.$parent.gl2
      this.$emit('pauseds1', this.$parent.gl1)
    },
    showlist() {
      this.$parent.kg6 = true
    }
  },
  props: ['plays', 'gl1', 'gl2']
}
</script>
<style lang="less" scoped>
.play {
  height: 60px;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 301;
  .ball {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 20px;
    overflow: hidden;
    animation: rotate1 5s linear 0s infinite;
    img {
      width: 100%;
    }
  }
  .wz {
    margin-left: 70px;
    margin-top: 14px;
    .text {
      font-size: 14px;
      color: #2e3030;
      line-height: 14px;
      margin-bottom: 3px;
      width: 50%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .name {
      font-size: 12px;
      line-height: 12px;
      width: 50%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  .toggle {
    position: absolute;
    bottom: 10px;
    right: 54px;
    z-index: 300;
    width: 36px;
    height: 36px;
    .icon-tingzhi {
      font-size: 36px;
    }
    .icon-bofang {
      font-size: 39px;
      margin-right: 2px;
    }
  }
  .list {
    position: absolute;
    bottom: 5px;
    z-index: 300;
    width: 36px;
    height: 36px;
    right: 12px;
    .icon-liebiao {
      font-size: 30px;
    }
  }
}
@keyframes rotate1 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.iconfont {
  color: #494841;
}
</style>
