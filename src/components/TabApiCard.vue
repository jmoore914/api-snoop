<template>
  <form
    id="requestInfoForm"
    @submit.prevent
  >
    <div class="api">
      <div>
        <button
          class="expandButton imgButton"
          :class="{editMode: editMode}"
          id="expandButton"
          @click="submitForm('expandButton')"
        >
          <img src="../imgs/expandArrow.svg">
        </button>
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
                  required
                >
              </div>
            </div>
            <div>
              <h4>Headers:</h4>
              <div
                v-for="(headerInfo, headerIndex) in apiCardInfo.callInfo.headers"
                :key="'header_' + headerIndex.uuid"
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
                <div class="headerButtonsGrid">
                  <div>
                    <button
                      class="imgButton clickable"
                      @click="removeHeader(headerIndex)"
                      type="button"
                    >
                      <img src="../imgs/minusCircleOutline.svg">
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      class="imgButton clickable"
                      @click="addHeader(headerIndex)"
                    >
                      <img src="../imgs/addCircleOutline.svg">
                    </button>
                  </div>
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
          <div class="trashContainer">
            <img
            @click="deleteCard" 
            class="clickable trashIcon"
            src="../imgs/trashOutline.svg"
            >
            </div>
          </div>
</div>
</transition>
</div>
      <div class="icons">
        <div
        :class="{refreshing: refreshing}"
          @click="submitForm('refreshButton')"
      >
        <img 
        class="refreshButton cardIcon clickable"
        src="../imgs/refreshSingleArrow.svg"
>
      </div>
      <div
        v-show="apiCardInfo.isMonitoring"
          @click="submitForm('pauseButton')"
      >
        <img         
          class="cardIcon clickable"
          src="../imgs/pauseCircleOutline.svg"
>
      </div>
      <div
        v-show="!apiCardInfo.isMonitoring"
          @click="submitForm('playButton')"
      >
        <img 
          class="cardIcon clickable"
          src="../imgs/playCircleOutline.svg"
>
      </div>
      <div>
        <div
        v-show="apiCardInfo.apiAvailable && started"
        @click="showLastResponse"
      >
        <img 
          class="cardIcon clickable"
          src="../imgs/checkCircleOutline.svg"
        >
      </div>
      <div
        v-show="!apiCardInfo.apiAvailable && started"
        @click="showLastResponse"
      >
        <img 
          class="cardIcon clickable"
          src="../imgs/exCircleOutline.svg"
>
      </div>
      </div>
      </div>
</div>
</form>
</template>

<script lang="ts">
import {store} from '../store/store';
import {apiCall} from '../mixins/apiCalls';
import {
	sleep,
	createEmptyCallResponse,
	createEmptyHeader,
	createEmptyApiCard
} from '../mixins/sharedFunctions';

import Vue from 'vue';

export default Vue.extend({
	props: {
		tabIndex: Number,
		apiIndex: Number
	},
	data() {
		return {
			apiCardInfo: store.tabs[this.tabIndex].apis[this.apiIndex] as ApiCard,
			lastResponse: createEmptyCallResponse(),
			editMode: true,
			apiMethods: ['GET', 'POST', 'PUT'],
			refreshing: false,
			isLooping: false,
			started: false,
			submitTarget: ''
		};
	},
	computed: {
		namePlaceholder(): string {
			return this.editMode ? 'Enter name' : '';
		},
		isAvailable(): boolean {
			return (
				store.modals.modalSettings.ignoreErrorCodes || 
        (this.lastResponse.code > 199 &&
        this.lastResponse.code < 300) &&
        this.lastResponse.text.includes(this.apiCardInfo.callInfo.expectedResponse)
			);
		}
	},
	methods: {
		submitForm(caller: 'expandButton' | 'refreshButton' | 'playButton' | 'pauseButton'): void {
			const formElement: HTMLFormElement = document.getElementById('requestInfoForm') as HTMLFormElement;
			const formValid: boolean = formElement.checkValidity();
			formElement.reportValidity();
			if (formValid) {
				if (caller === 'expandButton') {
					this.toggleEditMode();
				} else if (caller === 'refreshButton') {
					this.refreshNow();
				} else if (caller === 'playButton') {
					this.startMonitorApi();
				} else if (caller === 'pauseButton') {
					this.stopMonitorApi();
				}
			}
		},
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
				await this.microSleep();
			} while (this.apiCardInfo.isMonitoring);
			this.isLooping = false;
		},

		async microSleep(): Promise<void> {
			let i: number = 0;
			do {
				await sleep(1);
				i++;
			} while (
				this.apiCardInfo.isMonitoring &&
        i < store.modals.modalSettings.refreshIntervalSecs
			);
		},

		async sendRequest(): Promise<void> {
			this.refreshing = true;
			const resp: ApiCallResponse = await apiCall(this.apiCardInfo.callInfo,
				store.modals.modalSettings.timeoutSecs);
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
		},
		showLastResponse(): void {
			store.modals.modalLastResponse.lastResponse = this.lastResponse;
			store.modals.modalLastResponse.showContainer = true;
			store.modals.modalLastResponse.show = true;
		},
		addHeader(index: number): void {
			this.apiCardInfo.callInfo.headers.splice(index + 1,
				0,
				createEmptyHeader());
		},
		removeHeader(index: number): void {
			if (this.apiCardInfo.callInfo.headers.length > 1) {
				this.apiCardInfo.callInfo.headers.splice(index, 1);
			} else {
				this.apiCardInfo.callInfo.headers = [createEmptyHeader()];
			}
		},
		deleteCard() {
			console.log('delete');
			if (store.tabs[this.tabIndex].apis.length === 1) {
				console.log('a');
				store.tabs[this.tabIndex].apis = [createEmptyApiCard()];
			} else {
				console.log('b');

				store.tabs[this.tabIndex].apis.splice(this.apiIndex, 1);
			}
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
  grid-template-columns: 5% 70% 30%;
  width: 70%;
  background: #c9c9c9;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-left: 5%;
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
  grid-template-columns: 30% 55% 10%;
  grid-column-gap: 10px;
  grid-row-gap: 20px;
}

@media screen and (max-width: 1000px) {
  .headersGrid {
    grid-template-columns: 30% 45% 15%;
  }
}

.headerButtonsGrid {
  text-align: right;
  display: grid;
  grid-template-columns: 40% 40%;
  grid-column-gap: 8%;
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

.trashContainer {
  padding-top: 25px;
}

.trashIcon {
  width: 30px;
  width: 30px;
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
