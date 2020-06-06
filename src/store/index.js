import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playlist: []
  },
  mutations: {
    add(state, item) {
      state.playlist.some((index, i) => {
        if (index.id === item.id) {
          state.playlist.splice(i, 1)
        }
      })
      state.playlist.unshift(item)
    },
    newarray(state, item) {
      state.playlist = item
    }
  },
  actions: {
  },
  modules: {
  }
})
