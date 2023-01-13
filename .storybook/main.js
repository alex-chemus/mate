const path = require('path')

const resolvePath = p => path.join(path.resolve(__dirname, p))

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: async (config) => ({
    ...config,
    resolve: {
      alias: {
        ...config.resolve.alias,
        '@': resolvePath('../src/') 
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.s[ac]ss/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    }
  })
}