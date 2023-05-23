const config = {
    cockroachCloudCluster: {
      connectionString: 'postgresql://saumya:u9TW21iLXLBGV5RvMuAC5A@expense-tracker-2882.7s5.cockroachlabs.cloud:26257/authdb?sslmode=verify-full',
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
  