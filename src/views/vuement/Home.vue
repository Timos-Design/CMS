<template>
  <div class="view-vuement-home">
    <h1>Components. <span>Edit or Remove</span></h1>

    <vm-flow>
      <vm-input v-model="query" placeholder="Search..."></vm-input>
      <vm-flow>
        <vm-button
          icon="ti-plus"
          :round="true"
          routeName="vuement-register-component"
        />
      </vm-flow>
    </vm-flow>

    <br />
    <vm-divider />

    <vm-list>
      <vm-list-item
        v-for="c in comps"
        :key="c.id"
        :title="c.name"
        :to="{ name: 'vuement-edit-component', params: { id: c.id } }"
      >
        <div class="comp-img" slot="media">
          <img v-if="c.image" :src="c.image" alt="" />
        </div>
      </vm-list-item>
    </vm-list>
    <p v-if="$store.getters.vmComponents.length > 0 && comps.length === 0">
      Nothing found
    </p>
  </div>
</template>

<script lang="ts">
import { VMComponent } from '@/utils/interfaces/vuement.interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class VuementHome extends Vue {
  public query = '';

  get comps(): VMComponent[] {
    return (this.$store.getters.vmComponents as VMComponent[])
      .filter((x) => {
        if (this.query.length > 0) {
          return (
            Object.values(x) + x.props.map(Object.values).join(' ')
          ).includes(this.query.toLowerCase());
        }
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }
}
</script>

<style lang="scss" scoped>
.view-vuement-home {
  .comp-img {
    height: 30px;
    width: 30px;
    background: rgba(var(--vm-primary), 1);
    border-radius: $border-radius;
    padding: 10px;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>
