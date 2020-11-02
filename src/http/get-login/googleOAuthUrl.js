const tiny = require("tiny-json-http");
const jwt = require("jsonwebtoken");

module.exports = async function googleOAuthUrl({ finalRedirect }) {
    const googleDiscoveryDoc = await tiny.get({
        url: "https://accounts.google.com/.well-known/openid-configuration",
        headers: { Accept: "application/json" },
    });
    const authorization_endpoint = googleDiscoveryDoc.body.authorization_endpoint;
    const state = await jwt.sign(
        {
            provider: "google",
            finalRedirect,
        },
        process.env.APP_SECRET,
        { expiresIn: "1 hour" }
    );
    const options = {
        access_type: "online",
        scope: ["profile", "email"],
        redirect_uri: process.env.AUTH_REDIRECT,
        response_type: "code",
        client_id: process.env.GOOGLE_CLIENT_ID,
    };
    const url = `${authorization_endpoint}?access_type=${options.access_type}&scope=${encodeURIComponent(
        options.scope.join(" ")
    )}&redirect_uri=${encodeURIComponent(options.redirect_uri)}&response_type=${options.response_type}&client_id=${
        options.client_id
    }&state=${state}`;

    return url;
};
