<template>
  <div>
    <div
      v-for="(api,apiIndex) in tabInfo.apis"
      :key="'tab' + tabIndex +'_apiCard' + apiIndex"
    >
      <TabApiCard
        :tab-index="tabIndex"
        :api-index="apiIndex"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {store} from '../store/store';
import TabApiCard from './TabApiCard.vue';

import Vue from 'vue';

export default Vue.extend({
	props: {
		tabIndex: Number
	},
	components: {
		TabApiCard
	},
	data() {
		return {
			tabInfo: store.tabs[this.tabIndex] as Tab
		};
	},
	computed: {},
	methods: {}
});
</script>

<style scoped>
</style>
