// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1",
          ie: "10"
        },
        debug: true,
        // corejs这一项也需要加上，corejs有2和3两个版本
        // 如果不确定有没有下载core-js，可执行 cnpm i core-js@2 --save
        corejs: 2
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
};