<template>
  <div class="view-vuecons-home">
    <h1>Icons. <span>Edit or Remove</span></h1>

    <vm-flow>
      <vm-input v-model="query" placeholder="Search..." />
      <vm-flow>
        <vm-button icon="ti-upload" title="upload" :round="true" />
      </vm-flow>
    </vm-flow>

    <br />
    <vm-divider />

    <vm-list>
      <vm-list-item v-for="i in icons" :key="i.id" :title="i.id">
        <div class="comp-img" slot="media">
          <img :src="i.src" alt="" />
        </div>
      </vm-list-item>
    </vm-list>
    <p v-if="$store.getters.vuecons.length > 0 && icons.length === 0">
      Nothing found
    </p>
  </div>
</template>

<script lang="ts">
import { Vuecon } from '@/utils/interfaces/vuecons.interface';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class VueconsHome extends Vue {
  public query = '';

  get icons(): Vuecon[] {
    return (this.$store.getters.vuecons as Vuecon[]).filter((x) => {
      if (this.query.length > 0) {
        return x.id.includes(this.query.toLowerCase().split(' ').join('-'));
      }
      return true;
    });
  }
}
</script>

<style lang="scss" scoped>
.view-vuecons-home {
  .comp-img {
    height: 20px;
    width: 20px;
    background: rgba(var(--vm-primary), 1);
    border-radius: $border-radius;
    padding: 10px;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
      filter: invert(100%);
    }
  }
}
</style>
