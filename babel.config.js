module.exports = {
  presets: [
    ['@babel/env', {
      targets: {
        node: true,
        browsers: [
          'last 2 Chrome versions',
          'last 2 Edge versions',
          'last 2 Firefox versions',
          'last 2 Safari versions',
        ],
      },
    }],
    '@babel/flow',
  ],
  plugins: [
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    '@babel/plugin-proposal-optional-chaining',
  ],
};
