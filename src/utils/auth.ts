import router from '@/router';
import store from '@/store';
import { Route } from 'vue-router';
import { TDUser } from './interfaces/auth.interfaces';

export class Auth {
  public static readonly lsKey = 'cms.timos.design';
  public static toRoute: Route | null = null;

  public static register(): void {
    const token = localStorage.getItem(Auth.lsKey);
    if (token) Auth.validate(token);
  }

  private static async validate(token: string): Promise<boolean> {
    return new Promise((resolve) => {
      fetch('https://api.timos.design/auth/valid', {
        method: 'POST',
        mode: 'cors',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            Auth.persistLogin(token);
            resolve(true);
            return;
          }
          Auth.signOut();
          resolve(false);
        })
        .catch(() => {
          Auth.signOut();
          resolve(false);
        });
    });
  }

  private static persistLogin(token: string): void {
    const user = Auth.extractUser(token);

    if (user && user.group && user.group.toLowerCase() === 'admin') {
      store.commit('signIn', user);
      localStorage.setItem(Auth.lsKey, token);
      if (this.toRoute) {
        const { name, params } = this.toRoute;
        // eslint-disable-next-line
        router.push({ name: name!, params: params }).then(() => {
          this.toRoute = null;
        });
      } else router.push({ name: 'home' });
    }
  }

  private static extractUser(token: string): TDUser {
    const base64Url = (token || 'A.B.C').split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  public static signOut(): void {
    store.commit('signOut');
    localStorage.removeItem(Auth.lsKey);
    router.push({ name: 'login' });
  }

  public static signIn(provider = 'google'): void {
    const params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=500,left=100,top=100`;
    window.open('https://api.timos.design/auth/' + provider, 'login', params);

    window.onmessage = (e: MessageEvent) => {
      const key = 'token=';
      if (e.data && String(e.data).startsWith(key)) {
        const token = String(e.data).substring(key.length);
        Auth.persistLogin(token);
      }
    };
  }
}
