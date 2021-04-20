import { createStore } from 'vuex';

export default createStore({
  state: {
    name: '李星文',
  },
  mutations: {
    setName(state, val) {
      state.name = val;
    },
  },
  actions: {
    getNameFetch({ commit }) {
      setTimeout(() => {
        commit('setName', '李星文2号');
      }, 1000);
    },
  },
  getters: {
    getName(state) {
      return state.name;
    },
  },
});
