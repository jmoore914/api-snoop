<template>
  <div>
    <div
      v-show="editMode"
      class="fullPage"
      @click="disableEditMode"
    />
    <div :class="{selectedTab: isSelected}">
      <div class="spacer" />
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
          class="closeButton"
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
			return 'tabBarName' + this.tabIndex;
		},
		inputWidth(): string {
			return this.tabInfo.name.length + 1 + 'ch';
		}
	},
	methods: {
		tabClick(): void {
			if (this.isSelected) {
				this.editMode = true;
				const inputElement = document.getElementById(this.inputElementId)! as HTMLInputElement;
				inputElement.focus();
				inputElement.select();
			} else {
				store.selectedTabIndex = this.tabIndex;
			}
		},
		disableEditMode(): void {
			this.editMode = false;
		}
	}
});
</script>

<style scoped>
.fullPage {
  width: 100vw;
  height: 100vh;
  opacity: 0;
  position: fixed;
  z-index: 100;
}

.tabName {
  position: relative;
  z-index: 200;
  height: 28px;
}

.selectedTab {
  border-bottom: 4px solid black;
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

.spacer,
.closeButtonContainer {
  width: 10px;
}

.spacer,
.tabName,
.closeButtonContainer {
  display: inline-block;
}

.closeButton {
  font-weight: bold;
  transform: rotate(45deg);
}
</style>
