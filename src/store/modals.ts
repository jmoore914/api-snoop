import {createEmptyCallResponse} from '../mixins/sharedFunctions';




export const modalSettings: ModalSettings = {
	show: false,
	showContainer: false,
	timeoutSecs: 15,
	refreshIntervalSecs: 300,
	ignoreErrorCodes: false
}; 



export const modalLastResponse: ModalLastResponse = {
	show: false,
	showContainer: false,
	lastResponse: createEmptyCallResponse()
};