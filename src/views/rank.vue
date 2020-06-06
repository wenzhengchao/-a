<template>
  <div class="rank" ref="rank">
    <ul>
      <li v-for="(item,i) in list" :key="i" class="li" @click="showlist(item)">
        <img :src="item.coverImgUrl" alt />
        <ul>
          <li v-for="(items,i) in item.new" :key="items.dt">{{i+1}}.{{items.name}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getlist1()
    this.getlist2()
    this.getlist3()
    this.getlist4()
    this.getlist5()
    this.getlist6()
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.rank, {
        click: true
      })
    })
  },
  methods: {
    async getlist1() {
      const { data: res } = await this.$http.get('/top/list?idx=1')
      res.playlist.new = res.playlist.tracks.slice(0, 3)
      this.list.push(res.playlist)
    },
    async getlist2() {
      const { data: res } = await this.$http.get('/top/list?idx=2')
      res.playlist.new = res.playlist.tracks.slice(0, 3)
      this.list.push(res.playlist)
    },
    async getlist3() {
      const { data: res } = await this.$http.get('/top/list?idx=6')
      res.playlist.new = res.playlist.tracks.slice(0, 3)
      this.list.push(res.playlist)
    },
    async getlist4() {
      const { data: res } = await this.$http.get('/top/list?idx=4')
      res.playlist.new = res.playlist.tracks.slice(0, 3)
      this.list.push(res.playlist)
    },
    async getlist5() {
      const { data: res } = await this.$http.get('/top/list?idx=9')
      res.playlist.new = res.playlist.tracks.slice(0, 3)
      this.list.push(res.playlist)
    },
    async getlist6() {
      const { data: res } = await this.$http.get('/top/list?idx=10')
      res.playlist.new = res.playlist.tracks.slice(0, 3)
      this.list.push(res.playlist)
    },
    showlist(item) {
      this.$parent.kg3 = true
      this.$parent.list1 = item
      item.picUrl = item.coverImgUrl
      console.log(item)
      this.$router.push('/rank/' + item.id)
    }
  }
}
</script>
<style lang="less" scoped>
.rank {
  width: 100%;
  padding-top: 5px;
  position: fixed;
  top: 88px;
  bottom: 0;
  .li {
    width: 95%;
    box-sizing: border-box;
    height: 110px;
    margin-left: 10px;
    padding: 3px 0;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    img {
      width: 100px;
      height: 100px;
    }
    ul {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      width: 255px;
      li {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        line-height: 30px;
        font-size: 12px;
      }
    }
  }
}
</style>
