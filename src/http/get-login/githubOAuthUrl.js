const jwt = require("jsonwebtoken");
module.exports = function githubOAuthUrl({ finalRedirect }) {
    let client_id = process.env.GITHUB_CLIENT_ID;
    let redirect_uri = encodeURIComponent(process.env.AUTH_REDIRECT);
    let state = jwt.sign(
        {
            provider: "github",
            finalRedirect,
        },
        process.env.APP_SECRET,
        { expiresIn: "1 hour" }
    );
    let url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`;
    return url;
};
