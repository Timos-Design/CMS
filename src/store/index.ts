/* eslint-disable */

import { TDUser } from '@/utils/interfaces/auth.interfaces';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    user: (state: any): TDUser | null => {
      return state.user;
    },
  },
  mutations: {
    signOut(state: any) {
      state.user = null;
    },
    signIn(state: any, user: TDUser) {
      state.user = user;
    },
  },
});
