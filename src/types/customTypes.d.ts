interface Tab{
	name: string;
	isMonitoring: boolean;
	apis: ApiCard[];
}

interface ApiCard {
	name: string;
	isMonitoring: boolean;
	callInfo: ApiCallInfo;
	apiAvailable: boolean;
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
}

interface ApiCallResponse {
	time: string;
	code: number;
	text: string;

}