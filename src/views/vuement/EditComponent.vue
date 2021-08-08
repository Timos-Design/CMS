<template>
  <div class="view-vuement-edit-component">
    <template v-if="component">
      <vm-flow>
        <h1>
          Edit. <span>{{ component.name }}</span>
        </h1>
        <vm-flow>
          <vm-button
            @click="removeComponent"
            icon="ti-trashcan-alt"
            background="error"
            :round="true"
          />
        </vm-flow>
      </vm-flow>

      <CMSVuementComponentForm :component="component" />
    </template>
  </div>
</template>

<script lang="ts">
import CMSVuementComponentForm from '@/components/vuement/CMSVuementComponentForm.vue';
import backend from '@/utils/backend';
import { VMComponent } from '@/utils/interfaces/vuement.interfaces';
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {
    CMSVuementComponentForm,
  },
})
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

  public removeComponent(): void {
    const id = this.component.id;
    backend
      .delete('vuement/component/' + id)
      .then(() => {
        this.$vm.sendNotification({
          title: 'Component deleted',
        });
        this.$store.commit('vmComponentRemove', id);
        this.$router.push({ name: 'vuement' });
      })
      .catch((error) => {
        this.$vm.sendNotification({ title: 'Error occured', text: error });
      });
  }
}
</script>

<style lang="scss" scoped>
.view-vuement-edit-component {
  //
}
</style>
