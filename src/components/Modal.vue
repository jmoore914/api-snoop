<template>
  <div
    v-show="showContainer"
    class="modalContainer"
  >
    <transition
      name="fade"
      @afterLeave="afterLeave"
    >
      <div v-show="show">
        <div
          class="modalBackground"
          @click="hide"
        />
        <div
          class="modalWindow"
          :id="modalName + 'Window'"
        >
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {store} from '../store/store';

export default Vue.extend({
	props: {
		modalName: String as () => 'modalSettings' | 'modalLastResponse'
	},
	computed: {
		showContainer(): boolean {
			return store.modals[this.modalName].showContainer;
		},
		show(): boolean {
			return store.modals[this.modalName].show;
		}
	},
	methods: {
		hide() {
			store.modals[this.modalName].show = false;
		},
		afterLeave() {
			store.modals[this.modalName].showContainer = false;
		}
	}
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.modalContainer,
.modalBackground {
  overflow: hidden;
  position: fixed;
  width: 200vw;
  height: 200vh;
  padding: 20%;
  margin-left: -20%;
  margin-top: -20%;
  overflow: hidden;
  z-index: 1000;
}

.modalBackground {
  background-color: #000000;
  opacity: 0.4;
}

.modalWindow {
  position: fixed;
  background-color: #eeeeee;
  padding: 15px;
  padding-top: 0;
  z-index: 1000;
  top: 10%;
  left: 50%;
  max-height: 70%;
  max-width: 90%;
  overflow: auto;
  -webkit-transform: translate(-50%, 0%);
  -moz-transform: translate(-50%, 0%);
  -ms-transform: translate(-50%, 0%);
  -o-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
}
</style>