module.exports = function makeGetOauthLink({
    buildOauthLink,
    oauthConfig,
    googleOauthOptionsConfig,
}) {
    return function getOauthLink() {
        return buildOauthLink({
            oauthConfig,
            googleOauthOptionsConfig,
        });
    }
}