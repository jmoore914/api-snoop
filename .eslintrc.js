module.exports = {
  root: true,
  env: {
	node: true,
	jest: true
  },
  extends: [    "plugin:vue/strongly-recommended", "eslint:recommended", 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
	plugins: ["@typescript-eslint", "vue"],
	rules: {
		indent: ['error', 'tab'],
		quotes: ['error', 'single', {avoidEscape: true}],
		semi: ['error', 'always'],
		'no-unused-vars': 0,
		'no-console': 0,
		// 'no-extra-parens': [2, 'all', [{ nestedBinaryExpressions: false }, { returnAssign: false }]],
		'array-callback-return': 2,
		eqeqeq: 2,
		'no-use-before-define': [2, {functions: false}],
		'comma-style': ['error', 'last'],
		'comma-spacing': 2,
		'function-paren-newline': ['error', 'never'],
		'one-var': [2, 'never'],
		'semi-style': [2, 'last'],
		'no-const-assign': 'error',
		'array-bracket-spacing': ['error', 'never'],
		'object-curly-spacing': ['error', 'never'],

		'vue/require-default-prop':0,
		'vue/html-indent':0,


		'@typescript-eslint/no-var-requires': 0,
		'@typescript-eslint/indent': ['error', 'tab'],
		'@typescript-eslint/no-use-before-define': [2, {functions: false}],
		'@typescript-eslint/explicit-function-return-type': ['error', {allowExpressions: true}],
		'@typescript-eslint/no-non-null-assertion': 0,
		'@typescript-eslint/no-inferrable-types': 0,
		'@typescript-eslint/typedef': ['error', {parameter: true, propertyDeclaration: true, variableDeclaration:true}]
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser'
	}
}
