export function getObjectProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
	return obj[key];
}

export function setObjectProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
	obj[key] = value;
}

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
		name: 'New Tab',
		isMonitoring: false,
		apis: [emptyApiCard]
	};
}

export function createEmptyCallResponse(): ApiCallResponse{
	return cloneObject({time: '', code: 0, text: ''});
}