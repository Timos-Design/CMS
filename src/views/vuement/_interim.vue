<template>
  <div class="view-vuement-interim">
    <CMSHeader project="vuement" />

    <div class="view-vuement-interim-wrapper">
      <p v-if="error">{{ error }}</p>
      <vm-flow flow="column" v-else-if="loading">
        <br />
        <vm-spinner />
      </vm-flow>

      <vm-revealer>
        <router-view v-if="!loading" />
      </vm-revealer>
    </div>
  </div>
</template>

<script lang="ts">
import CMSHeader from '@/components/CMSHeader.vue';
import { Vue, Component } from 'vue-property-decorator';
import backend from '@/utils/backend';

@Component({
  components: {
    CMSHeader,
  },
})
export default class VuementInterim extends Vue {
  public error = null;
  public loading = true;

  created(): void {
    if (this.$store.getters.vmComponents.length === 0) {
      backend
        .get('vuement/component')
        .then(({ data }) => {
          this.$store.commit('vmComponents', data);
          this.loading = false;
        })
        .catch((err) => {
          this.error = err;
        });
    } else {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.view-vuement-interim {
  //
}
</style>
