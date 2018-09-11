// const devServer = {
//   clientLogLevel: 'none',
//   index: 'index.html',
//   contentBase: path.resolve(__dirname, paths.root),
//   proxy: {
//     '/': {
//       target: {
//         host: "hostName",
//         protocol: "http:",
//         port: 8888
//       },
//       changeOrigin: true,
//       secure: false
//     }
//   }
// };

// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// new BrowserSyncPlugin(
//   {
//     proxy: 'http://localhost:8080',
//     logLevel: "silent",
//     ghostMode: false,
//     files: [
//       {
//         match: [
//           'resources/views/**/*.php'
//         ],
//         fn: function (event, file) {
//           if (event === "change") {
//             const bs = require('browser-sync').get('bs-webpack-plugin');
//             bs.reload();
//             console.log(file + ' ' + event);
//           }
//         }
//       }
//     ]
//   },
//   {
//     reload: false
//   }),
