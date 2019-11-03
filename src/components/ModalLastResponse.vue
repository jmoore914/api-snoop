<template>
  <Modal :modal-name="'modalLastResponse'">
    <div>
      <h3>Last response</h3>
      <div class="lastResponseGrid">
        <div>Response time:</div>
        <div>
          {{ lastResponse.time }}
        </div>
        <div>Response code:</div>
        <div>
          {{ lastResponse.code }}
        </div>
        <div>Response text:</div>
        <div class="responseText">
          {{ lastResponseText }}
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from './Modal.vue';
import {store} from '../store/store';

export default Vue.extend({
	components: {
		Modal
	},
	computed: {
		lastResponse(): ApiCallResponse {
			return store.modals.modalLastResponse.lastResponse;
		},
		lastResponseText(): string {
			try {
				return JSON.stringify(JSON.parse(this.lastResponse.text), null, 2)
					.replace(/\n/g, '<br>')
					.replace(/\s\s/g, '\xa0\xa0\xa0\xa0')
					.replace(/<br>/g, '\n');
			} catch (e) {
				return 'Failed to parse: ' + this.lastResponse.text;
			}
		}
	}
});
</script>

<style scoped>
.lastResponseGrid {
  width: 740px;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-row-gap: 5px;
  grid-column-gap: 10px;
  padding-bottom: 50px;
}

.responseText {
  white-space: pre-line;
}
</style>
