<template>
  <div class="head">
    <h1>音乐播放器</h1>
    <router-link class="list" tag="div" to="/user">
      <i class="mui-icon mui-icon-bars"></i>
    </router-link>
    <div class="search">
      <i class="mui-icon mui-icon-search" @click="show"></i>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    show() {
      this.$parent.kg5 = true
      this.$router.push('/recommend/search')
    }
  }
}
</script>
<style lang="less" scoped>
.head {
  width: 100%;
  height: 44px;
  background-color: #d44439;
  text-align: center;
  position: fixed;
  top: 0;
  z-index: 100;
  h1 {
    color: #f1f1f1;
    line-height: 44px;
    font-weight: 700;
    letter-spacing: 3px;
  }
  .list {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #fff;
  }
  .search {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #fff;
  }
}
</style>
