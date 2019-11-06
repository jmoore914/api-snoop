import {replaceEnvVars} from './sharedFunctions';

export function apiCall(apiInfo: ApiCallInfo, timeoutSecs: number): Promise<ApiCallResponse>{
	return new Promise((resolve: Resolve<ApiCallResponse>) => {
		console.log(JSON.stringify(apiInfo, null, 2));
		const req: XMLHttpRequest = new XMLHttpRequest();
		req.open(apiInfo.method, replaceEnvVars(apiInfo.url));
		req.timeout=timeoutSecs * 1000;
		const headers: ApiCallInfoHeader[] = apiInfo.headers.filter((header: ApiCallInfoHeader): boolean => {
			return header.name as unknown as boolean;
		});
		headers.forEach((header: ApiCallInfoHeader): void => {
			req.setRequestHeader(replaceEnvVars(header.name), replaceEnvVars(header.value));
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
				console.log(req.responseText);
				resolve({
					time: (new Date()).toISOString(),
					code: req.status,
					text: req.responseText
				});
			}
		};
		req.send(replaceEnvVars(apiInfo.body));
	});
}