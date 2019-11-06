export function getObjectProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
	return obj[key];
}

export function setObjectProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
	obj[key] = value;
}

export function cloneObject<T>(object: T): T{
	return JSON.parse(JSON.stringify(object));
}

export function reassignObjectProperties<T>(startingObject: T, replacementObject: T): void{
	const props: (keyof typeof startingObject)[] = Object.keys(startingObject) as (keyof typeof startingObject)[];
	props.forEach((prop: (keyof typeof startingObject)) => {
		setObjectProperty(startingObject, prop, getObjectProperty(replacementObject, prop));
	});
}

export function checkObjectMatchesTemplate(template: object, object: object): boolean{
	const templateProps: (keyof typeof template)[] = Object.keys(template) as (keyof typeof template)[];
	const objectProps: (keyof typeof object)[] = Object.keys(object)  as (keyof typeof object)[];
	if(templateProps.length !== objectProps.length){
		return false;
	}

	if(!templateProps.every((prop: (keyof typeof template)) => {
		const templateProp: (keyof typeof template) = getObjectProperty(template, prop);
		const objProp: (keyof typeof template)[] = getObjectProperty(object, prop);
		if( typeof templateProp !== typeof objProp){
			return false;
		}
		if(Array.isArray(objProp)){
			if((objProp as unknown[]).length===0){
				return false;
			}
			return (objProp as unknown[]).every( (objPropArrItem: unknown) => {
				if( typeof templateProp[0] !== typeof objPropArrItem){
					return false;
				}
				if(typeof templateProp[0] === 'object'){
					return checkObjectMatchesTemplate(templateProp[0], objPropArrItem as object);
				}
				return true;
			});
		}
		if(typeof templateProp === 'object'){
			return checkObjectMatchesTemplate(templateProp, objProp);
		}
		return true;
	})){
		return false;
	}
	return true;


}

export function sleep(sec: number): Promise<void> {
	return new Promise((resolve: Resolve<void>) => setTimeout(resolve, sec*1000));
}


export function createEmptyTab(): Tab{
	return {
		name: 'New Tab',
		isMonitoring: false,
		apis: [createEmptyApiCard()],
		uuid: generateUuid()
	};
}


export function createEmptyApiCard(): ApiCard{
	return {
		name: '',
		isMonitoring: false,
		callInfo: createEmptyApiCallInfo(),
		apiAvailable: true,
		uuid: generateUuid()
	};
}

export function createEmptyApiCallInfo(): ApiCallInfo{
	return {
		method: 'GET',
		url: '',
		headers: [createEmptyHeader()],
		body: '',
		expectedResponse: ''
	};
}


export function createEmptyHeader(): ApiCallInfoHeader{
	return cloneObject({
		name: '',
		value: '',
		uuid: generateUuid()
	});
}


export function createEmptyCallResponse(): ApiCallResponse{
	return cloneObject({time: '', code: 0, text: ''});
}


export function generateUuid(): string {
	let dateTime: number = new Date().getTime();
	const uuid: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c: string) {
		const random: number = (dateTime + Math.random()*16)%16 | 0;
		dateTime = Math.floor(dateTime/16);
		return (c==='x' ? random :(random&0x3|0x8)).toString(16);
	});
	return uuid;
	
}

export function replaceEnvVars(input: string): string {
	function replaceEnvVar(match: string, group: string): string{
		const found: string | undefined = process.env[group];
		return found ? found : '';
	}
	return input.replace(/\$ENV_VAR\((.*?)\)/g, replaceEnvVar);
}