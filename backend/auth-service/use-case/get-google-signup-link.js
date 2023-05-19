module.exports = function makeGoogleSignUpLink({
    buildOauthLink,
    oauthConfig,
    googleOauthOptionsConfig,
}) {
    return function getGoogleSignUpLink() {
        return buildOauthLink({
            oauthConfig,
            googleOauthOptionsConfig,
        });
    }
}