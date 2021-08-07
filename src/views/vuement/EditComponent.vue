<template>
  <div class="view-vuement-edit-component">
    <template v-if="component">
      <h1>
        Edit. <span>{{ component.name }}</span>
      </h1>
    </template>
  </div>
</template>

<script lang="ts">
import { VMComponent } from '@/utils/interfaces/vuement.interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class VuementEditComponent extends Vue {
  mounted(): void {
    if (!this.component) {
      this.$router.push({ name: 'vuement' });
    }
  }

  get component(): VMComponent {
    return (
      this.$store.getters.vmComponents.filter(
        (x: VMComponent) => x.id === this.$route.params.id
      )[0] || null
    );
  }
}
</script>

<style lang="scss" scoped>
.view-vuement-edit-component {
  //
}
</style>
