import Vue from 'vue';
import {createEmptyTab, cloneObject} from '../mixins/sharedFunctions';
import {modalSettings, modalLastResponse} from './modals';

export function createInitialStore(): Store{
	return cloneObject({
		tabs: [createEmptyTab()] as Tab[],
		selectedTabIndex: 0,
		modals: {
			modalSettings: modalSettings,
			modalLastResponse: modalLastResponse
		}
	});
}

export const store: Store = Vue.observable<Store>(createInitialStore());