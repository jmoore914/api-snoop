<template>
  <div v-show="isSelected">
    <div
      v-for="(api,apiIndex) in tabInfo.apis"
      :key="'tab' +'_' + api.uuid"
      class="card"
    >
      <TabApiCard
        :tab-index="tabIndex"
        :api-index="apiIndex"
      />
    </div>
    <div
      class="addCardButton circle clickable"
      @click="addApiCard"
    >
      +
    </div>
  </div>
</template>

<script lang="ts">
import {store} from '../store/store';
import {createEmptyApiCard} from '../mixins/sharedFunctions';
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
	computed: {
		isSelected(): boolean {
			console.log(process.env.NODE_ENV);
			return this.tabIndex === store.selectedTabIndex;
		}
	},
	methods: {
		addApiCard(): void {
			this.tabInfo.apis.push(createEmptyApiCard());
		}
	}
});
</script>

<style scoped>
.card {
  padding-bottom: 20px;
}

.addCardButton {
  color: #e6e6e6;
  text-align: center;
  font-size: 44px;
  background-color: #878ef1;
  position: fixed;
  right: 10%;
  bottom: 30px;
  width: 50px;
  height: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
