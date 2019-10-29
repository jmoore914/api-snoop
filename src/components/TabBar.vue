<template>
  <div class="tabBar">
    <div>
      <table>
        <tr>
          <td
            class="tabsCell"
            v-for="(tab, index) in tabs"
            :key="tab + index"
          >
            <TabBarName :tab-index="index" />
          </td>
        </tr>
      </table>
    </div>
    <div>
      <div class="tabButtons">
        <div
          class="addTab clickable"
          @click="addNewTab"
        >
          +
        </div>
        <div
          class="settings clickable"
          @click="showSettings"
        >
          <div class="settingsImgContainer">
            <img
              src="../imgs/settings.svg"
              class="settingsImg"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {store} from '../store/store';
import {createEmptyTab} from '../mixins/sharedFunctions';
import TabBarName from './TabBarName.vue';

export default Vue.extend({
	components: {
		TabBarName
	},
	computed: {
		tabs(): Tab[] {
			return store.tabs;
		}
	},
	methods: {
		addNewTab(): void {
			store.tabs.push(createEmptyTab());
		},
		showSettings(): void {
			store.modals.modalSettings.showContainer = true;
			store.modals.modalSettings.show = true;
		}
	}
});
</script>

<style scoped>
.tabBar {
  z-index: 3000;
  padding-bottom: 15px;
  width: 100%;
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 10px;
}

.tabButtons {
  width: 50px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 5px;
}

.addTabCell {
  width: 24px;
}

.addTab {
  font-size: 2.5rem;
  display: inline-block;
}

.settingsImgContainer {
  height: 100%;
  position: relative;
}

.settingsImg {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 8px;
  margin: auto;
}
</style>
