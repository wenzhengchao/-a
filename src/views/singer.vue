<template>
  <div class="singers">
    <mt-index-list :show-indicator="false">
      <mt-index-section :index="item" v-for="(item,i) in indexList" :key="i">
        <mt-cell v-for="(items,index) in singesA[i]" :key="index">
          <div class="img">
            <img :src="items.picUrl" @click="show(items)" />
          </div>
          <span class="text" @click="show(items)">{{items.name}}</span>
        </mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexList: [
        '热',
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z'
      ],
      singesA: []
    }
  },
  created() {
    this.getsinge()
    this.getsingeA()
  },
  methods: {
    async getsinge() {
      const { data: res } = await this.$http.get('/top/artists?limit=10')
      this.singesA[0] = res.artists.slice(0, 10)
    },
    async show(item) {
      console.log(1)
      this.$parent.kg4 = true
      this.$parent.list1 = item
      this.$router.push('/singer/' + item.id)
    },
    async getsingeA() {
      for (var i = 1; i < this.indexList.length; i++) {
        const { data: res } = await this.$http.get(
          `/artist/list?type=-1&area=-1&initial=${this.indexList[
            i
          ].toLowerCase()}&limit=5`
        )
        this.singesA[i] = res.artists
      }
      console.log(this.singesA)
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="less">
.singers {
  width: 100%;
  position: fixed;
  top: 88px;
  bottom: 60px;
   .mint-cell-wrapper {
    position: relative;
     .mint-cell-value {
      position: absolute;
      display: flex;
      width: 100%;
      height: 50px;
      top: 0;
      left: 0;
  .text {
    color: black;
    display: inline-block;
    height: 50px;
    line-height: 50px;
  }
  .img {
    width: 50px;
    height: 50px;
    margin: 0 10px;
    img {
      width: 100%;
    }
  }
    }
  }
}
</style>
