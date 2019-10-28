import Vue from 'vue';
import {createEmptyTab} from '../mixins/sharedFunctions';
import {modalSettings, modalLastResponse} from './modals';

export const store = Vue.observable<Store>({
	tabs: [createEmptyTab()] as Tab[],
	selectedTabIndex: 0,
	modals: {
		modalSettings: modalSettings,
		modalLastResponse: modalLastResponse
	}
});