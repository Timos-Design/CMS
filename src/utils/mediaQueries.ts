import Vue from 'vue';

export const mqDarkmode = window.matchMedia('(prefers-color-scheme: dark)');

export function registerMediaQueries(): void {
  mqDarkmode.addListener(mediaListenerDarkmode);
  setDark(mqDarkmode.matches);
}

export function unregisterMediaQueries(): void {
  mqDarkmode.removeListener(mediaListenerDarkmode);
}

function mediaListenerDarkmode(event: MediaQueryListEvent): void {
  setDark(event && event.matches);
}

function setDark(dark: boolean): void {
  Vue.prototype.$vm.setTheme(dark ? 'light' : 'light');
}
