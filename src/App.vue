<template>
  <div id="app">
    <div
      v-for="(tab, tabIndex) in tabs"
      :key="'tab' + tabIndex"
    >
      <Tab :tab-index="tabIndex" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {store} from './store/store';
import Tab from './components/Tab.vue';

export default Vue.extend({
	name: 'App',
	components: {
		Tab
	},
	data() {
		return {
			tabs: store.tabs
		};
	}
});
</script>

<style src="./style/style.css"/>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
