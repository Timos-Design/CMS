<template>
  <div class="cms-vuement-component-form">
    <vm-grid gap="10" width="100" mode="auto-fit">
      <vm-flow flow="column" horizontal="end" vertical="start">
        <vm-title subtitle="name" />
        <vm-input v-model="dto.name" />
      </vm-flow>
      <vm-flow flow="column" horizontal="end" vertical="start">
        <vm-title subtitle="image" />
        <vm-input v-model="dto.image" />
      </vm-flow>
      <vm-flow flow="column" horizontal="end" vertical="start">
        <vm-title subtitle="children" />
        <vm-select :multiple="true" @selection="selectionChanged">
          <vm-select-item
            v-for="c in $store.getters.vmComponents"
            :key="c.id"
            :vmId="c.id"
            :title="c.name"
            :selected="dto.children.includes(c.id)"
          />
        </vm-select>
      </vm-flow>
      <vm-flow flow="column" horizontal="end" vertical="start">
        <vm-checkbox v-model="dto.isChild" title="is child" />
      </vm-flow>
    </vm-grid>

    <br />
    <vm-flow>
      <h2>Properties</h2>
      <vm-flow>
        <vm-button icon="ti-plus" :round="true" @click="addProp" />
      </vm-flow>
    </vm-flow>

    <div v-for="(p, i) in dto.props" :key="i">
      <template v-if="i !== 0">
        <br />
        <vm-divider />
        <br />
      </template>
      <vm-grid gap="10" width="100" mode="auto-fit">
        <vm-flow flow="column" horizontal="end" vertical="start">
          <vm-title subtitle="name" />
          <vm-input v-model="dto.props[i].name" />
        </vm-flow>
        <vm-flow flow="column" horizontal="end" vertical="start">
          <vm-title subtitle="value" />
          <vm-input v-model="dto.props[i].value" />
        </vm-flow>
        <vm-flow flow="column" horizontal="end" vertical="start">
          <vm-title subtitle="type" />
          <vm-input v-model="dto.props[i].type" />
        </vm-flow>
      </vm-grid>
      <br />
      <vm-title subtitle="description" />
      <div class="desc-container">
        <vm-textarea v-model="dto.props[i].description" />
        <vm-button
          icon="ti-trashcan-alt"
          background="error"
          @click="removeProp(i)"
        />
      </div>
    </div>
    <br />
    <vm-flow horizontal="center">
      <vm-button
        :disabled="submitting"
        :block="true"
        :title="component ? 'Update' : 'Register'"
        size="medium"
        @click="saveChanges"
      />
    </vm-flow>

    <p>{{ component }}</p>
    <p>{{ dto }}</p>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { VMComponent } from '@/utils/interfaces/vuement.interfaces';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { VMSelectSelection } from 'vuement';

@Component
export default class CMSVuementComponentForm extends Vue {
  @Prop() component!: VMComponent;
  public submitting = false;

  public dto: VMComponent = {
    id: '',
    name: '',
    image: '',
    isChild: false,
    children: [],
    props: [],
  };

  mounted(): void {
    if (this.component) {
      const { name, image, isChild, children, props } = this.component;
      this.dto.name = name;
      this.dto.image = image;
      this.dto.isChild = !!isChild;
      this.dto.children = children || [];
      this.dto.props = props || [];
    }
  }

  public selectionChanged(selection: VMSelectSelection[]): void {
    this.dto.children = selection.filter((x) => x.state).map((x) => x.id);
  }

  public removeProp(index: number): void {
    this.dto.props.splice(index, 1);
  }

  public addProp(): void {
    this.dto.props.push({ name: '', value: '', type: '', description: 'TODO' });
  }

  public saveChanges(): void {
    this.submitting = true;
    if (this.component) {
      backend
        .patch('vuement/component/' + this.component.id, this.dto)
        .then(this.handleSucces)
        .catch(this.sendError)
        .finally(() => {
          this.submitting = false;
        });
    } else {
      backend
        .post('vuement/component', this.dto)
        .then(this.handleSucces)
        .catch(this.sendError)
        .finally(() => {
          this.submitting = false;
        });
    }
  }

  private sendError(error: string): void {
    this.$vm.sendNotification({ title: 'Error occured', text: error });
  }

  private handleSucces(res: { data: VMComponent }): void {
    this.$vm.sendNotification({
      title: 'Changes saved',
      text: 'Changes made to ' + res.data.name + ' have been saved.',
    });
    this.$store.commit('vmComponent', res.data);
    if (!this.component) {
      this.$router.push({
        name: 'vuement-edit-component',
        params: { id: res.data.id },
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.cms-vuement-component-form {
  //
  .desc-container {
    display: grid;
    grid-template-columns: 1fr auto;
    .vm-button {
      margin: 2.5px;
    }
  }
}
</style>
