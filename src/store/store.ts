import Vue from 'vue';
import {createEmptyTab} from '../mixins/sharedFunctions';

export const store = Vue.observable({
	tabs: [createEmptyTab()] as Tab[],
	timeoutSecs: 15,
	refreshIntervalSecs: 300
});