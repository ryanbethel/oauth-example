const tiny = require("tiny-json-http");
const jwt = require("jsonwebtoken");

module.exports = async function googleAuth(req) {
    let googleDiscoveryDoc = await tiny.get({
        url: "https://accounts.google.com/.well-known/openid-configuration",
        headers: { Accept: "application/json" },
    });
    let token_endpoint = googleDiscoveryDoc.body.token_endpoint;

    let result = await tiny.post({
        url: token_endpoint,
        headers: { Accept: "application/json" },
        data: {
            code: req.query.code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.AUTH_REDIRECT,
            grant_type: "authorization_code",
        },
    });
    return jwt.decode(result.body.id_token);
};
