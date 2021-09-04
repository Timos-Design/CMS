/* eslint-disable */

import { TDUser } from '@/utils/interfaces/auth.interfaces';
import { Vuecon } from '@/utils/interfaces/vuecons.interface';
import { VMComponent } from '@/utils/interfaces/vuement.interfaces';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    projects: [
      {
        name: 'Portfolio',
        website: 'https://timos.design',
        route: 'portfolio',
      },
      {
        name: 'Newsroom',
        website: 'https://newsroom.timos.design',
        route: 'newsroom',
      },
      {
        name: 'Vuement',
        website: 'https://vuement.com',
        route: 'vuement',
      },
      {
        name: 'Vuecons',
        website: 'https://vuecons.timos.design',
        route: 'vuecons',
      },
      {
        name: 'Translator',
        website: 'https://translator.timos.design',
        route: 'translator',
      },
    ],
    vmComponents: [] as VMComponent[],
    vuementQuery: '',
    vuecons: [] as Vuecon[],
    vueconsQuery: '',
  },
  getters: {
    user: (state: any): TDUser | null => {
      return state.user;
    },
    projects: (state: any) => {
      return state.projects;
    },
    vmComponents: (state: any): VMComponent[] => {
      return state.vmComponents;
    },
    vuecons: (state: any): Vuecon[] => {
      return state.vuecons;
    },
  },
  mutations: {
    signOut(state: any) {
      state.user = null;
    },
    signIn(state: any, user: TDUser) {
      state.user = user;
    },
    vmComponents(state: any, vmComponents: VMComponent[]) {
      state.vmComponents = vmComponents;
    },
    vmComponent(state: any, vmComponent: VMComponent) {
      let exists = false;
      state.vmComponents = state.vmComponents.map((x: VMComponent) => {
        if (x.id === vmComponent.id) {
          exists = true;
          return vmComponent;
        }
        return x;
      });
      if (!exists) state.vmComponents.push(vmComponent);
    },
    vmComponentRemove(state: any, id: string) {
      state.vmComponents = state.vmComponents.filter(
        (x: VMComponent) => x.id !== id
      );
    },
    vuecons(state: any, vuecons: Vuecon[]) {
      state.vuecons = vuecons;
    },
    vuecon(state: any, vuecon: Vuecon) {
      let exists = false;
      state.vuecons = state.vuecons.map((x: Vuecon) => {
        if (x.name === vuecon.name) {
          exists = true;
          return vuecon;
        }
        return x;
      });
      if (!exists) state.vuecons.push(vuecon);
    },
    vueconRemove(state: any, name: string) {
      state.vuecons = state.vuecons.filter((x: Vuecon) => x.name !== name);
    },
  },
});
