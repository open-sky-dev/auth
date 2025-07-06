module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
	project: ['./tsconfig.base.json'], // important
	tsconfigRootDir: __dirname,
	ecmaVersion: 2020,
	sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
	'eslint:recommended',
	'plugin:@typescript-eslint/recommended',
	'plugin:prettier/recommended',
  ],
  rules: {
	'prettier/prettier': 'error',
  },
  ignorePatterns: ['node_modules/', 'dist/', 'build/'],
};
