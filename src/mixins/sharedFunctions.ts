export function cloneObject<T>(object: T): T{
	return JSON.parse(JSON.stringify(object));
}

export function sleep(sec: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, sec*1000));
}

export function createEmptyApiCallInfo(): ApiCallInfo{
	return {
		method: 'GET',
		url: '',
		headers: [{name:'', value:''}],
		body: '',
		expectedResponse: ''
	};
}

export function createEmptyApiCard(): ApiCard{
	const emptyApiCallInfo = createEmptyApiCallInfo();
	return {
		name: '',
		isMonitoring: false,
		callInfo: emptyApiCallInfo,
		apiAvailable: true
	};
}

export function createEmptyTab(): Tab{
	const emptyApiCard = createEmptyApiCard();
	return {
		name: '',
		isMonitoring: false,
		apis: [emptyApiCard]
	};
}

