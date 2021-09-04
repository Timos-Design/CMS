<template>
  <div class="view-vuecons-home">
    <br />
    <vm-flow>
      <vm-title subtitle="Overview" title="Vuecons" />
      <vm-flow>
        <vm-button icon="ti-upload" title="upload" :round="true" />
      </vm-flow>
    </vm-flow>
    <br />
    <div class="grid-wrapper">
      <vm-title
        v-if="icons.length === 0"
        subtitle="no results for"
        :title="`'${query}'`"
      />
      <transition-group name="grid" class="icon-grid">
        <router-link
          v-for="i in icons"
          :key="i.name"
          :to="{ name: 'home', params: { icon: i.name } }"
          class="grid-item"
          :title="i.name"
        >
          <img :src="i.src" :alt="i.name" height="20" />
        </router-link>
      </transition-group>
    </div>
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
  .grid-wrapper {
    padding: 20px;
    background: rgba(var(--vm-paragraph), 1);
    border-radius: $border-radius;
    .vm-title {
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
        text-transform: capitalize;
        text-decoration: none;
        font-size: 1.3rem;
        box-shadow: inset 0 0 0 2px rgba(var(--vm-border), 1),
          2px 4px 8px rgba(#111, 0.08);
        transition: 0.174s ease-in-out;
        &:hover {
          background: rgba(var(--vm-background), 1);
          transform: scale(1.1);
        }
      }
    }
  }
}
</style>
