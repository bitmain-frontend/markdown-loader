import path from 'path'
import webpack from 'webpack'
import memoryfs from 'memory-fs'

export default (fixture, options = {}) => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader',
            },
            {
              loader: path.resolve(__dirname, '../src/index.js'),
              options: {
                ...options,
                toc: true,
              },
            },
          ],
        },
      ],
    },
  })

  compiler.outputFileSystem = new memoryfs()

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      // console.log(err, stats.compilation)
      if (err || stats.hasErrors()) reject(err || stats.errors)

      resolve(stats)
    })
  })
}
