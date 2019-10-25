<template>
  <div class="api">
    <div>
      <div
        class="expandButton"
        :class="{editMode: editMode}"
        @click="toggleEditMode"
      >
        <img src="../imgs/expandArrow.svg">
      </div>
    </div>
    <div>
      <div>
        <div class="apiName">
          <input
            class="textInput apiNameInput"
            :class="[{editMode: editMode},{monitorMode: !editMode}]"
            :disabled="!editMode"
            v-model="apiCardInfo.name"
            :placeholder="namePlaceholder"
          >
        </div>
      </div>
      <transition name="expand">
        <div
          v-show="editMode"
          class="expandedInfo"
        >
          <div class="methodAndUrlGrid">
            <div>
              <select
                v-model="apiCardInfo.callInfo.method"
                class="select"
              >
                <option
                  v-for="method in apiMethods"
                  :key="method"
                >
                  {{ method }}
                </option>
              </select>
            </div>
            <div>
              <input
                class="textInput"
                v-model="apiCardInfo.callInfo.url"
                placeholder="http://example.com"
              >
            </div>
          </div>
          <div>
            <h4>Headers:</h4>
            <div
              v-for="(headerInfo, headerIndex) in apiCardInfo.callInfo.headers"
              :key="'header_' + headerIndex"
              class="headersGrid"
            >
              <div>
                <input
                  class="textInput"
                  v-model="apiCardInfo.callInfo.headers[headerIndex].name"
                  placeholder="Key"
                >
              </div>
              <div>
                <input
                  class="textInput"
                  v-model="apiCardInfo.callInfo.headers[headerIndex].value"
                  placeholder="Value"
                >
              </div>
            </div>
          </div>
          <div>
            <h4>Body</h4>
            <textarea
              class="textInput"
              :disabled="apiCardInfo.callInfo.method === 'GET'"
              v-model="apiCardInfo.callInfo.body"
              placeholder=""
            />
            </div>
        <div>
        <h4>Expected Response</h4>
        <input
          class="textInput"
          v-model="apiCardInfo.callInfo.expectedResponse"
        >
        </div>
      </div>
      </transition>
      </div>
      <div class="icons">
        <div
        :class="{refreshing: refreshing}"
        @click="refreshNow"
      >
        <img 
        class="refreshButton cardIcon clickable"
        src="../imgs/refreshSingleArrow.svg"
>
      </div>
      <div
        v-show="apiCardInfo.isMonitoring"
        @click="stopMonitorApi"
      >
        <img         
          class="cardIcon clickable"
          src="../imgs/pauseCircleOutline.svg"
>
      </div>
      <div
        v-show="!apiCardInfo.isMonitoring"
        @click="startMonitorApi"
      >
        <img 
          class="cardIcon clickable"
          src="../imgs/playCircleOutline.svg"
>
      </div>
      <div>
        <div
        v-show="apiCardInfo.apiAvailable && started"
      >
        <img 
          class="cardIcon clickable"
          src="../imgs/checkCircleOutline.svg"
>
      </div>
      <div
        v-show="!apiCardInfo.apiAvailable && started"
      >
        <img 
          class="cardIcon clickable"
          src="../imgs/exCircleOutline.svg"
>
      </div>
      </div>
      </div>
</div>
</template>

<script lang="ts">
import {store} from '../store/store';
import {apiCall} from '../mixins/apiCalls';
import {sleep} from '../mixins/sharedFunctions';

import Vue from 'vue';

export default Vue.extend({
	props: {
		tabIndex: Number,
		apiIndex: Number
	},
	data() {
		return {
			apiCardInfo: store.tabs[this.tabIndex].apis[this.apiIndex] as ApiCard,
			lastResponse: {time: '', code: 0, text: ''},
			editMode: true,
			apiMethods: ['GET', 'POST', 'PUT'],
			refreshing: false,
			isLooping: false,
			started: false
		};
	},
	computed: {
		namePlaceholder(): string {
			console.log(store.tabs[0].apis[0]);
			return this.editMode ? 'Enter name' : '';
		},
		isAvailable(): boolean {
			return (
				this.lastResponse.code > 199 &&
        this.lastResponse.code < 300 &&
        this.lastResponse.text.includes(this.apiCardInfo.callInfo.expectedResponse)
			);
		}
	},
	methods: {
		toggleEditMode(): void {
			this.editMode = !this.editMode;
		},
		startMonitorApi(): void {
			this.apiCardInfo.isMonitoring = true;
			this.started = true;
			if (!this.isLooping) {
				this.monitorApi();
			}
		},
		async monitorApi(): Promise<void> {
			this.isLooping = true;
			do {
				this.sendRequest();
				await sleep(store.refreshIntervalSecs);
			} while (this.apiCardInfo.isMonitoring);
			this.isLooping = false;
		},

		async sendRequest(): Promise<void> {
			this.refreshing = true;
			const resp = await apiCall(this.apiCardInfo.callInfo, store.timeoutSecs);
			this.lastResponse = resp;
			this.apiCardInfo.apiAvailable = this.isAvailable;
			this.refreshing = false;
		},
		stopMonitorApi(): void {
			this.apiCardInfo.isMonitoring = false;
		},
		refreshNow(): void {
			this.started = true;
			this.sendRequest();
		}
	}
});
</script>

<style scoped>
.textInput,
.select {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}

.api {
  padding: 20px;
  display: grid;
  grid-template-columns: 5% 60% 30%;
  width: 80%;
  background: #c9c9c9;
}

.expandButton {
  text-align: center;
  font-size: 2.5em;
  transition: 0.25s linear;
  margin-top: 10px;
}

.expandButton:hover {
  cursor: pointer;
}

.expandButton.editMode {
  transform: rotate(90deg);
}

.apiName {
  font-size: 2em;
}

.apiNameInput {
  font-size: 1.25em;
  padding-bottom: 10px;
  transition: all 0.5s ease;
}

.apiNameInput.monitorMode {
  background: #c9c9c9;
  border: none;
  color: black;
}

.apiInfoGrid {
  display: grid;
  grid-template-columns: 100%;
  grid-row-gap: 8px;
}

.expandedInfo {
  padding-top: 20px;
  overflow-y: hidden;
}

.methodAndUrlGrid {
  display: grid;
  grid-template-columns: 15% 80%;
  grid-column-gap: 5%;
}

.headersGrid {
  display: grid;
  grid-template-columns: 30% 50%;
  grid-column-gap: 20%;
}

.icons {
  display: grid;
  padding-left: 20px;
  padding-top: 8px;
  grid-template-columns: 20% 20% 20%;
  grid-column-gap: 5%;
}

.cardIcon {
  width: 100%;
}

.expand-enter-active,
.expand-leave-active {
  -webkit-transition: max-height 0.5s ease;
  -moz-transition: max-height 0.5s ease;
  transition: max-height 0.5s ease;
  max-height: 1000px;
}
.expand-enter,
.expand-leave-to {
  max-height: 0px;
}
</style>
