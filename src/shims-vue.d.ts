declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vuecons' {
  export function install(Vue: VueConstructor, options: object): void;
}
