<template>
  <div class="cms-router">
    <transition :name="transitionName">
      <div class="sub-view" :key="$route.name + $route.params.id">
        <router-view content />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { suffix } from '@/router';
import { Vue, Component } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component
export default class CMSRouter extends Vue {
  public transitionName = 'slide-bottom';

  created(): void {
    this.$router.beforeEach((to: Route, from: Route, next) => {
      const toDepth = this.getDepth(to);
      const fromDepth = this.getDepth(from);
      const toPath = to.fullPath.split('/').slice(0, 2);
      const fromPath = from.fullPath.split('/').slice(0, 2);

      if (fromPath.join('/') !== toPath.join('/')) {
        this.transitionName = 'slide-bottom';
      } else {
        this.transitionName =
          toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }

      if (to.meta) document.title = to.meta.title + suffix;

      next();
    });
  }

  public getDepth(route: Route): number {
    let path = route.fullPath;
    if (path.endsWith('/')) path = path.slice(0, -1);
    return path.split('/').length;
  }
}
</script>

<style lang="scss" scoped>
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(60px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-60px, 0);
}
.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translate(0, 100px);
}
.slide-bottom-enter-active,
.slide-bottom-leave-active,
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.cms-router {
  position: relative;
  max-width: 100vw;
  .sub-view {
    right: 0;
    left: 0px;
    z-index: 10;
    position: absolute;
    min-height: 100vh;
    overflow-x: hidden;
  }
}
</style>
