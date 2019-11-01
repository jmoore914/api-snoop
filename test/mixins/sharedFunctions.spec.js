import {checkObjectMatchesTemplate, replaceEnvVars} from '../../src/mixins/sharedFunctions';

describe('checkObjectMatchesTemplate shoulld check if a supplied object has the same shape as a template', ()=>{
	it('should pass for simple objects', ()=>{
		const template = {
			strProp: 'A',
			numProp: 321,
			boolProp: true};
		const obj = {strProp: 'B',
			numProp: 123,
			boolProp: true};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(true);
	});
	it('should fail if keys  mismatch', ()=>{
		const template = {
			strProp: 'A',
			numProp: 321,
			boolProp: true};
		const obj = {strProp: 'B',
			numProp: 123,
			boolyPropz: true};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(false);
	});
	it('should fail if missing keys', ()=>{
		const template = {
			strProp: 'A',
			numProp: 321,
			boolProp: true};
		const obj = {strProp: 'B',
			numProp: 123
		};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(false);
	});
	it('should fail if extra keys', ()=>{
		const template = {
			strProp: 'A',
			numProp: 321,
			boolProp: true};
		const obj = {strProp: 'B',
			numProp: 123,
			boolProp: true,
			extraProp: 'Extra'
		};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(false);
	});
	it('should fail if mismatched types', ()=>{
		const template = {
			strProp: 'A',
			numProp: 321,
			boolProp: true};
		const obj = {strProp: 'B',
			numProp: 123,
			boolProp: 456
		};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(false);
	});
	it('should work for nested objects', ()=>{
        
		const templateNested = {
			strProp: 'A',
			numProp: 321,
			boolProp: true};
		const template = {
			strProp: '123',
			nestedProp: templateNested
		};
		const objNested = {strProp: 'B',
			numProp: 123,
			boolProp: true};
            
		const obj = {
			strProp: 'abc',
			nestedProp: objNested
		};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(true);
	});
	it('should fail for mismatched nested objects', ()=>{
        
		const templateNested = {
			strProp: 'A',
			numProp: 321,
			boolProp: true};
		const template = {
			strProp: '123',
			nestedProp: templateNested
		};
		const objNested = {strProp: 'B',
			numProp: 123,
			otherProp: true};
            
		const obj = {
			strProp: 'abc',
			nestedProp: objNested
		};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(false);
	});
    
	it('should work for nested objects', ()=>{
        
		const templateNested = {
			strProp: 'A',
			numProp: 321,
			boolProp: true};
		const template = {
			strProp: '123',
			nestedProp: templateNested
		};
		const objNested = {strProp: 'B',
			numProp: 123,
			boolProp: true};
            
		const obj = {
			strProp: 'abc',
			nestedProp: objNested
		};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(true);
	});
	it('should work with arrays', ()=>{
        
		const templateNested = {
			strProp: 'A',
			numProp: 321,
			boolProp: true};
		const template = {
			strProp: '123',
			nestedProp: [templateNested]
		};
		const objNestedOne = {strProp: 'A',
			numProp: 123,
			otherProp: true};

		const objNestedTwo = {strProp: 'A',
			numProp: 345,
			otherProp: true};
            
		const obj = {
			strProp: 'abc',
			nestedProp: [objNestedOne, objNestedTwo]
		};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(false);
	});
	it('should fail if object array is empty', ()=>{
        
		const templateNested = {
			strProp: 'A',
			numProp: 321,
			boolProp: true};
		const template = {
			strProp: '123',
			nestedProp: [templateNested]
		};
		
            
		const obj = {
			strProp: 'abc',
			nestedProp: []
		};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(false);
	});
    
	it('should work with simple arrays', ()=>{

		const template = {
			strProp: '123',
			nestedProp: [4]
		};
		

		const obj = {
			strProp: 'abc',
			nestedProp: [4, 3, 4]
		};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(true);
	});
    
	it('should fail with simple array mismatches', ()=>{

		const template = {
			strProp: '123',
			nestedProp: [4]
		};
		

		const obj = {
			strProp: 'abc',
			nestedProp: [4, 'abc', 4]
		};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(false);
	});
    
	it('should fail if any object in the array is wrong type', ()=>{
        
		const templateNested = {
			strProp: 'A',
			numProp: 321,
			boolProp: true};
		const template = {
			strProp: '123',
			nestedProp: [templateNested]
		};
		
            

		const objNested = {
			strProp: 'B',
			numProp: 456,
			boolProp: true};
            
		const objMismatch = {
			strProp: 'B',
			numProp: 456,
			mismatch: true};

		const obj = {
			strProp: 'abc',
			nestedProp: [objNested, objMismatch]
		};
		const checkedObj = checkObjectMatchesTemplate(template, obj);
		expect(checkedObj).toEqual(false);
	});
} );

describe('replaceEnvVars should replace environment variable keywords with the system environment variable', () => {
	it('should replace a single environment variables', () => {
		process.env.testVar = 'Replaced';
		const originalText = 'Replace this: $ENV_VAR(testVar)';
		const replaced = replaceEnvVars(originalText);
		expect(replaced).toEqual('Replace this: Replaced');
	});
	it('should replace multiple environment variables', () => {
		process.env.testVar1 = 'Replacement1';
		process.env.testVar2 = 'Replacement2';
		const originalText = 'Replace this: $ENV_VAR(testVar1) and also this: $ENV_VAR(testVar2)';
		const replaced = replaceEnvVars(originalText);
		expect(replaced).toEqual('Replace this: Replacement1 and also this: Replacement2');

	});
	
});