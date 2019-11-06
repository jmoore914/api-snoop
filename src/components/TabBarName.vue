<template>
  <div>
    <div
      v-show="editMode"
      class="fullPage"
      @click="disableEditMode"
    />
    <div :class="{selectedTab: isSelected}">
      <div class="statusContainer">
        <div v-show="anyMonitoring && allAvailable">
          <img
            class=""
            src="../imgs/checkCircleOutline.svg"
          >
        </div>
        <div v-show="anyMonitoring && !allAvailable">
          <img
            class=""
            src="../imgs/exCircleOutline.svg"
          >
        </div>
        <div v-show="!anyMonitoring">
          <img
            class=""
            src="../imgs/pauseCircleOutline.svg"
          >
        </div>
      </div>
      <div
        class="tabName"
        @click="tabClick"
      >
        <input
          :id="inputElementId"
          v-show="editMode"
          class="tabNameInput"
          v-model="tabInfo.name"
          :style="{width: inputWidth}"
        >
        <div
          class="tabNameText"
          :class="{clickable:!isSelected}"
          v-show="!editMode"
        >
          {{ tabInfo.name }}
        </div>
      </div>
      <div class="closeButtonContainer">
        <div
          v-show="isSelected"
          class="closeButton clickable"
          @click="closeTab"
        >
          +
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {store} from '../store/store';

export default Vue.extend({
	props: {
		tabIndex: Number
	},
	data() {
		return {
			tabInfo: store.tabs[this.tabIndex] as Tab,
			editMode: false
		};
	},
	computed: {
		isSelected(): boolean {
			return this.tabIndex === store.selectedTabIndex;
		},
		inputElementId(): string {
			return 'tabBarName' + this.tabInfo.uuid;
		},
		inputWidth(): string {
			return this.tabInfo.name.length + 1 + 'ch';
		},
		anyMonitoring(): boolean {
			return this.tabInfo.apis.some((api: ApiCard): boolean => {
				return api.isMonitoring;
			});
		},
		allAvailable(): boolean {
			return this.tabInfo.apis.every((api: ApiCard): boolean => {
				return api.apiAvailable || !api.isMonitoring;
			});
		}
	},
	methods: {
		tabClick(): void {
			if (this.isSelected) {
				if (!this.editMode) {
					this.editMode = true;
					const inputElement: HTMLInputElement = document.getElementById(this.inputElementId)! as HTMLInputElement;
					console.log(inputElement);
					setTimeout(() => {
						inputElement.focus();
					}, 0);
					setTimeout(() => {
						inputElement.select();
					}, 0);
				}
			} else {
				store.selectedTabIndex = this.tabIndex;
			}
		},
		disableEditMode(): void {
			this.editMode = false;
		},
		closeTab(): void {
			if (this.tabIndex === store.tabs.length - 1) {
				store.selectedTabIndex = this.tabIndex - 1;
			}
			store.tabs.splice(this.tabIndex, 1);
		}
	}
});
</script>

<style scoped>
.fullPage {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  position: fixed;
  z-index: 100;
}

.tabName {
  position: relative;
  height: 28px;
}

.selectedTab {
  position: relative;
  border-bottom: 4px solid black;
  z-index: 1000;
}

.tabNameText {
  padding: 1px;
  padding-left: 4.5px;
  padding-right: 4.5px;
}

.tabNameInput {
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  text-align: center;
  background: none;
  border: none;
  color: black;
  font-size: 1rem;
}

.statusContainer {
  vertical-align: middle;
}

.closeButtonContainer {
  min-width: 12px;
}

.statusContainer,
.tabName,
.closeButtonContainer {
  display: inline-block;
}

.closeButton {
  font-size: 1.5rem;
  transform: rotate(45deg);
}
</style>
