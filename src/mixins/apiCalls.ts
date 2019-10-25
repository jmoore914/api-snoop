export function apiCall(apiInfo: ApiCallInfo, timeoutSecs: number): Promise<ApiCallResponse>{
	return new Promise((resolve) => {
		const req = new XMLHttpRequest();
		req.open(apiInfo.method, apiInfo.url);
		req.timeout=timeoutSecs * 1000;
		const headers = apiInfo.headers.filter((header: ApiCallInfoHeader): boolean => {
			return header.name as unknown as boolean;
		});
		headers.forEach((header: ApiCallInfoHeader): void => {
			req.setRequestHeader(header.name, header.value);
		});
		req.ontimeout = () => {
			resolve({
				time: (new Date()).toISOString(),
				code: 400,
				text: 'Timeout'
			}); 
		};
		req.onreadystatechange = () => {
			if (req.readyState === 4) {
				resolve({
					time: (new Date()).toISOString(),
					code: req.status,
					text: req.responseText
				});
			}
		};
		req.send(apiInfo.body);
	});
}