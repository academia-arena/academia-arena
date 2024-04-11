module.exports = {
  servers: {
    one: {
      host: '209.38.152.24',
      username: 'root',
      password: 'mintyFresh3161833Hello'
    }
  },
  app: {
    // if you edit the app 'name' field, be sure to run 'mup stop' if the app is already running.
    // otherwise you will have two apps deployed at once, with unpredictable results.
    name: 'academia-arena',
    path: '../',
    servers: { one: {}, },
    buildOptions: { serverOnly: true },
    env: {
      ROOT_URL: 'http://209.38.152.24',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },
    docker: { image: 'zodern/meteor:latest' },
    enableUploadProgressBar: true
  },
  mongo: { version: '5.0', servers: { one: {} }
  },
};
