<template>
  <div class="view-vuecons-interim">
    <CMSHeader project="vuecons" />

    <div class="view-vuecons-interim-wrapper">
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
import backend from '@/utils/backend';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    CMSHeader,
  },
})
export default class VueconsInterim extends Vue {
  public error = null;
  public loading = true;

  created(): void {
    if (this.$store.getters.vuecons.length === 0) {
      backend
        .get('vuecons')
        .then(({ data }) => {
          this.$store.commit('vuecons', data);
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
.view-vuecons-interim {
  //
}
</style>
