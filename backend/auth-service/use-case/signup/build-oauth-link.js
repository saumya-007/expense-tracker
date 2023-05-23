module.exports = function makeBuildOauthLink() {
  return function buildOauthLink({
    oauthConfig,
    googleOauthOptionsConfig,
  }) {
    const options = {
      redirect_uri: oauthConfig.redirectUrl,
      client_id: oauthConfig.clientId,
      ...googleOauthOptionsConfig,
    }
    const qs = new URLSearchParams(options)

    return `${oauthConfig.rootUrl}?${qs.toString()}`
  };
};
