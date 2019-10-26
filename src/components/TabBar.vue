<template>
  <table class="tabBar">
    <tr class="tabsRow">
      <td class="tabNames">
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
      </td>
      <td class="addTabCell">
        <div
          class="addTab clickable"
          @click="addNewTab"
        >
          +
        </div>
      </td>
      <td>
        <div
          class="settings clickable"
          @click="showSettings"
        >
          <img
            src="../imgs/settings.svg"
            class="settingsImg"
          >
        </div>
      </td>
    </tr>
  </table>
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
.addTabCell {
  width: 24px;
}

.addTab {
  font-size: 2rem;
  display: inline-block;
}

.settings {
  width: 18px;
}

.settingsImg {
  width: 100%;
}

.tabBar {
  z-index: 3000;
  padding-bottom: 15px;
  width: 100%;
}

.tabNames {
  width: 80%;
}

.tabsCells > .tabsRow:not(:last-child):after {
  border-right: 1px solid black;
}
</style>
