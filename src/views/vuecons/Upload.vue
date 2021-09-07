<template>
  <div class="view-vuecon-upload">
    <label for="upload">
      Upload SVG Files
      <input
        type="file"
        id="upload"
        multiple
        accept=".svg"
        @change="filesChanged"
      />
    </label>

    <ul>
      <li v-for="f in files" :key="f.id">{{ f }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import backend from '@/utils/backend';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class VueconUpload extends Vue {
  public files: {
    name: string;
    uploaded: boolean;
    id: string;
    error: string | null;
  }[] = [];

  public filesChanged(e: Event): void {
    const element = e.target as HTMLInputElement;
    if (!element.files || !element.files[0]) return;

    this.uploadFiles(Array.from(element.files));
    element.value = '';
  }

  public async uploadFiles(files: File[]): Promise<void> {
    if (!files || !files[0]) return;

    await Promise.all(
      files.map(async (f) => {
        const id = Date.now() + f.name;
        this.addToList(id, f.name);
        const formData = new FormData();
        formData.append('vuecon', f, f.name);

        try {
          const { data } = await backend.post('vuecons', formData);
          this.$store.commit('vuecon', data);
          this.uploaded(id);
        } catch (error) {
          this.error(id, error);
        }
      })
    );
  }

  public addToList(id: string, filename: string): void {
    this.files = this.files.filter((x) => x.id !== id);
    this.files.push({ id: id, name: filename, uploaded: false, error: null });
  }

  public uploaded(id: string): void {
    this.files = this.files.map((x) => {
      if (x.id === id) {
        return { ...x, uploaded: true };
      }
      return x;
    });
  }

  public error(id: string, error: string): void {
    this.files = this.files.map((x) => {
      if (x.id === id) {
        return { ...x, error: error };
      }
      return x;
    });
  }
}
</script>

<style lang="scss" scoped>
.view-vuecon-upload {
  padding-top: 20px;

  label {
    background: rgba(var(--vm-primary), 1);
    padding: 7.5px 15px;
    border-radius: $border-radius;
    color: #fff;
    margin: 0 auto;
    display: block;
    width: fit-content;
    cursor: pointer;

    transition: 0.2s ease-in-out;

    &:hover {
      filter: brightness(110%);
    }
    &:active {
      transform: scale(0.9);
    }

    input {
      position: fixed;
      top: 0;
      left: 0;
      transform: scale(0);
      opacity: 0;
    }
  }
}
</style>
