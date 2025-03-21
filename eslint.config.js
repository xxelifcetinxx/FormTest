import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

module.exports = {
  plugins: ['regexp'],
  rules: {
    'no-invalid-regexp': 'error', // Geçersiz düzenli ifadeleri yakalar
    'prefer-regex-literals': 'error', // RegExp yapıcısı yerine değişmez değerleri tercih eder
    'no-control-regex': 'error', // Kontrol karakterlerinin kullanımını yasaklar
    'no-useless-escape': 'error', // Gereksiz kaçış karakterlerini yasaklar
    'regexp/no-dupe-characters-character-class': 'error', // Karakter sınıflarında yinelenen karakterleri yakalar
    'regexp/optimal-regex': 'warn', // Düzenli ifadeleri optimize etmeye yardımcı olur
  },
};
export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ['cypress/**/*.{js,ts,jsx,tsx}', '**/*.cy.{js,ts,jsx,tsx}', '**/*.spec.{js,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.cypress,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-expressions': 'off', // Cypress'da kullanılan bazı ifadeleri kabul et
      'no-unused-vars': 'off', // Cypress'da kullanılan bazı değişkenleri kabul et
      'no-undef': 'off' // cy ve diğer cypress global değişkenlerini kabul et.
    },
  },
];
