import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

export default [
  // add more generic rulesets here, such as:
  // js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
  {
    rules: {
      // override/add rules settings here, such as:
    //   // 'vue/no-unused-vars': 'error'
    //   "vue/multi-word-component-names": ["error", {
    //         "ignores": []
    //     }],
    //     "vue/html-self-closing": ["error", {
    //         "html": {
    //         "void": "always",
    //         "normal": "always",
    //         "component": "always"
    //         },
    //         "svg": "always",
    //         "math": "always"
    //     }],
    //     "vue/max-attributes-per-line": ["error", {
    //         "singleline": {
    //         "max": 1
    //         },      
    //         "multiline": {
    //         "max": 1
    //         }
    //     }]
        
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    }
  }
]