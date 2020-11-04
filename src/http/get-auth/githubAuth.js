const tiny = require("tiny-json-http");

module.exports = async function githubAuth(req) {
    try {
        let result = await tiny.post({
            url: "https://github.com/login/oauth/access_token",
            headers: { Accept: "application/json" },
            data: {
                code: req.query.code,
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                redirect_uri: process.env.AUTH_REDIRECT,
            },
        });
        let token = result.body.access_token;
        let user = await tiny.get({
            url: `https://api.github.com/user`,
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/json",
            },
        });
        return {
            name: user.body.name,
            login: user.body.login,
            id: user.body.id,
            url: user.body.url,
            avatar: user.body.avatar_url,
        };
    } catch (err) {
        return {
            error: err.message,
        };
    }
};
