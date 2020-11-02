const arc = require("@architect/functions");
const githubAuth = require("./githubAuth");
const googleAuth = require("./googleAuth");
const jwt = require("jsonwebtoken");

async function auth(req) {
    let account = {};
    let state;
    if (req.query.code && req.query.state) {
        try {
            state = jwt.verify(req.query.state, process.env.APP_SECRET);
            if (state.provider === "google") {
                account.google = await googleAuth(req);
                if (!account.google.email) {
                    throw new Error();
                }
            } else if (state.provider === "github") {
                account.github = await githubAuth(req);
                if (!account.github.login) {
                    throw new Error();
                }
            } else {
                throw new Error();
            }
        } catch (err) {
            return {
                status: 401,
                body: "not authorized",
            };
        }
        return {
            session: { account },
            status: 302,
            location: state.finalRedirect,
        };
    } else {
        return {
            status: 401,
            body: "not authorized",
        };
    }
}

exports.handler = arc.http.async(auth);
