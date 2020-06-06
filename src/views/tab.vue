<template>
  <div class="tab">
    <router-link to="/recommend" class="a"><span>推荐</span></router-link>
    <router-link to="/rank" class="a"><span>排行</span></router-link>
    <router-link to="/singer" class="a"><span>歌手</span></router-link>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="less" scoped>
.tab{
  display: flex;
  width: 100%;
  height: 44px;
  background-color: #d44439;
  font-size: 14px;
  line-height: 44px;
  z-index: 100;
  position: fixed;
  top: 44px;
  .a{
    flex: 1;
    text-align: center;
    color: #e4e4e4;
  }
}
.router-link-active span{
  border-bottom: 2px solid #f1f1f1;
  font-weight: 700;
  padding-bottom: 3px;
}
</style>
