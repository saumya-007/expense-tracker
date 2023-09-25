const config = {
    cockroachCloudCluster: {
      connectionString: 'CONNECTION_STRING',
      dbName: 'authdb'
    },
    googleOauthOptionsConfig: {
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' ')
    },
    googleOauthTokenConfig: {
      grant_type: 'authorization_code' 
    },
    defaultAlgorithm: 'aes-256-cbc',
    tokenConfig: {
      tokenKey: 'SOME_TOKEN_KEY',
    }
  };
  module.exports = config;
  