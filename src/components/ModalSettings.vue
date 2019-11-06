<template>
  <Modal :modal-name="'modalSettings'">
    <div>
      <h3>Settings</h3>
      <div class="settingsGrid">
        <div>Request timeout (secs):</div>
        <div>
          <input
            class="numInput"
            v-model.number="store.modals.modalSettings.timeoutSecs"
            type="number"
          >
        </div>
        <div>Request refresh interval (secs):</div>
        <div>
          <input
            class="numInput"
            v-model.number="store.modals.modalSettings.refreshIntervalSecs"
            type="number"
          >
        </div>
      </div>
      <div class="buttonsGrid">
        <div>
          <button
            @click="saveConfig()"
            class="button"
          >
            Save config
          </button>
        </div>
        <div>
          <button
            @click="openConfigFile()"
            class="button"
          >
            Load config
          </button>
          <input
            type="file"
            id="loadConfigInput"
            style="display:none"
            @change="loadConfigFile()"
          >
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from './Modal.vue';
import {store} from '../store/store';
import {
	checkObjectMatchesTemplate,
	createEmptyTab
} from '../mixins/sharedFunctions';

export default Vue.extend({
	components: {
		Modal
	},
	data() {
		return {
			store: store
		};
	},
	computed: {},
	methods: {
		saveConfig(): void {
			const encodedContent: string = encodeURI('data:application/json;charset=utf-8,' +
          JSON.stringify({tabs: store.tabs}, null, 2));
			const link: HTMLAnchorElement = document.createElement('a');
			link.setAttribute('href', encodedContent);
			link.setAttribute('download', 'config.json');
			document.body.appendChild(link);
			link.click();
		},
		openConfigFile(): void {
			document.getElementById('loadConfigInput')!.click();
		},
		loadConfigFile(): void {
			const uploadedFile: File = (document.getElementById('loadConfigInput')! as HTMLInputElement).files![0];
			const fileReader: FileReader = new FileReader();
			fileReader.onload = (fileLoadedEvent: ProgressEvent<FileReader>) => {
				const textFromFileLoaded:
				| string
				| ArrayBuffer
				| null = (fileLoadedEvent.target! as FileReader).result;
				const parsedText: object = JSON.parse(textFromFileLoaded as string);
				if (
					checkObjectMatchesTemplate({tabs: [createEmptyTab()]}, parsedText)
				) {
					store.tabs.push(...(parsedText as { tabs: Tab[] }).tabs);
				} else {
					console.log('Uploaded file not a store');
				}
			};

			fileReader.readAsText(uploadedFile, 'UTF-8');
		}
	}
});
</script>

<style scoped>
.settingsGrid {
  width: 80%;
  display: grid;
  grid-template-columns: 75% 25%;
  grid-row-gap: 5px;
  grid-column-gap: 10px;
  padding-bottom: 50px;
}

.buttonsGrid {
  text-align: center;
  width: 80%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-row-gap: 5px;
  grid-column-gap: 10px;
  padding-bottom: 20px;
}

.numInput {
  width: 100%;
}
</style>
