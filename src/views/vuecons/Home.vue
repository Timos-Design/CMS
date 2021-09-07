<template>
  <div class="view-vuecons-home">
    <br />
    <vm-flow>
      <vm-title subtitle="Overview" title="Vuecons" />
      <vm-flow>
        <vm-button
          icon="ti-upload"
          title="upload"
          :round="true"
          routeName="vuecons-upload"
        />
      </vm-flow>
    </vm-flow>
    <br />
    <vm-title
      res
      v-if="icons.length === 0"
      subtitle="no results for"
      :title="`'${query}'`"
    />
    <transition-group name="grid" class="icon-grid">
      <router-link
        class="grid-item"
        v-for="i in icons"
        :key="i.name"
        :to="{ name: 'home', params: { icon: i.name } }"
        :title="i.name"
      >
        <img :src="i.src" :alt="i.name" height="20" />
      </router-link>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Vuecon } from '@/utils/interfaces/vuecons.interface';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class VueconsHome extends Vue {
  get query(): string {
    return this.$store.state.vueconsQuery;
  }

  get icons(): Vuecon[] {
    return (this.$store.getters.vuecons as Vuecon[]).filter((x) => {
      if (this.query.length > 0) {
        return x.name.includes(this.query.toLowerCase().split(' ').join('-'));
      }
      return true;
    });
  }
}
</script>

<style lang="scss" scoped>
.view-vuecons-home {
  .vm-title[res] {
    height: 4rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .icon-grid {
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(3rem, 1fr));

    .grid-item {
      display: grid;
      place-content: center;
      border-radius: 25%;
      height: 3rem;
      width: 3rem;
      color: inherit;
      text-decoration: none;
      font-size: 1.3rem;
      background: rgba(var(--vm-paragraph), 1);

      &,
      img {
        transition: 0.174s ease-in-out;
      }
      &:hover {
        background: rgba(var(--vm-primary), 1);
        img {
          filter: invert(100%);
        }
        transform: scale(1.1);
      }
    }
  }
}
</style>
