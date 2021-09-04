import store from '@/store';
import VueRouter from 'vue-router';
import { Auth } from './auth';

export class NavigationManager {
  public static register(router: VueRouter): void {
    router.beforeEach((to, from, next) => {
      const { name } = to;
      const signedIn = !!store.getters.user;

      if (!name) next();
      else if (!signedIn) {
        if (name === 'login') next();
        else {
          Auth.toRoute = to;
          next({ name: 'login' });
        }
      } else if (name === 'login') next({ name: 'home' });
      else next();
    });
  }
}
