import router from '@/router';
import store from '@/store';
import VueRouter, { Route } from 'vue-router';
import { TDUser } from './interfaces/auth.interfaces';

export class Auth {
  public static readonly lsKey = 'timos-cms-auth';
  private static toRoute: Route | null = null;

  public static register(router: VueRouter, loginView: string): void {
    router.beforeEach((to, _, next) => {
      if (to.name !== loginView && this.isAuthRoute(to) && !this.isSignedIn) {
        this.toRoute = to;
        next({ name: loginView });
      } else {
        next();
      }
    });

    const token = localStorage.getItem(this.lsKey);
    if (token) this.validate(token);
  }

  private static isAuthRoute(route: Route): boolean {
    return route.name !== 'login';
    //  route.meta && route.meta.auth;
  }

  private static get isSignedIn(): boolean {
    return !!store.getters.user;
  }

  private static async validate(token: string): Promise<boolean> {
    try {
      await fetch('https://api.timos.design/auth/valid', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.persistLogin(token);
      return true;
    } catch (error) {
      this.signOut();
      return false;
    }
  }

  private static persistLogin(token: string): void {
    const user = this.extractUser(token);
    if (user.group.toLowerCase() === 'admin') {
      store.commit('signIn', user);
      localStorage.setItem(this.lsKey, token);
      console.log('login success');
      if (!this.toRoute) {
        router.push({ name: 'home' });
        return;
      }
      const { name, params } = this.toRoute;
      router.push({
        name: name + '',
        params: params,
      });
    } else {
      console.log(user);
    }
  }

  private static extractUser(token: string): TDUser {
    const base64Url = (token || 'A.B.C').split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  public static signOut(): void {
    store.commit('signOut');
    localStorage.removeItem(this.lsKey);
    router.push({ name: 'login' });
  }

  public static signIn(provider = 'google'): void {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=500,left=100,top=100`;
    window.open('https://api.timos.design/auth/' + provider, 'login', params);

    window.onmessage = (e: MessageEvent) => {
      const key = 'token=';
      if (e.data && String(e.data).startsWith(key)) {
        const token = String(e.data).substring(key.length);
        this.validate(token);
      }
    };
  }
}
