<template>
  <Modal :modal-name="'modalSettings'">
    <div>
      <h3>Settings</h3>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from './Modal.vue';

export default Vue.extend({
	components: {
		Modal
	},
	data() {
		return {};
	},
	computed: {},
	methods: {}
});
</script>

<style scoped>
</style>
