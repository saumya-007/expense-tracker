const config = {
    cockroachCloudCluster: {
      connectionString: '',
      dbName: ''
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
    }
  };
  module.exports = config;
  