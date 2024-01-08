const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false
      }
    }
  },
  docs: {
    autodocs: "tag",
  },

  async webpackFinal(config, { configType }) {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../tsconfig.json'),
      })
    ]

    return config
  }
};
export default config;
