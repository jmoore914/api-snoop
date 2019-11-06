interface Tab{
	name: string;
	isMonitoring: boolean;
	apis: ApiCard[];
	uuid: string;
}

interface ApiCard {
	name: string;
	isMonitoring: boolean;
	callInfo: ApiCallInfo;
	apiAvailable: boolean;
	uuid: string;
}

interface ApiCallInfo {
	method: 'GET' | 'POST' | 'PUT';
	url: string;
	headers: ApiCallInfoHeader[];
	body: string;
	expectedResponse: string;
}

interface ApiCallInfoHeader {
	name: string;
	value: string;
	uuid: string;
}

interface ApiCallResponse {
	time: string;
	code: number;
	text: string;

}

interface ModalBase{
	show: boolean;
	showContainer: boolean;
}

interface ModalSettings extends ModalBase {
	timeoutSecs: number;
	refreshIntervalSecs: number;
}

interface ModalLastResponse extends ModalBase {
	lastResponse: ApiCallResponse;
}

type Modal = ModalSettings | ModalLastResponse

interface Store {
	tabs: Tab[];
	selectedTabIndex: number;
	modals: {
		modalSettings: ModalSettings;
		modalLastResponse: ModalLastResponse;
	};
}

type Resolve<T> = (value?: T | PromiseLike<T> | undefined) => void