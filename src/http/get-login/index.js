const arc = require("@architect/functions");
const githubOAuthUrl = require("./githubOAuthUrl");
const googleOAuthUrl = require("./googleOAuthUrl");

async function login(req) {
    let finalRedirect = "/";
    if (req.query.next === "admin") {
        finalRedirect = "/admin";
    }
    const googleUrl = await googleOAuthUrl({ finalRedirect });
    const githubUrl = githubOAuthUrl({ finalRedirect });
    return {
        status: 200,
        html: `<!doctype html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>login page</title>
                </head>
                <body>
                    <h1>Login</h1>
                    </br>
                    <a href="${githubUrl}">Login with Github</a>
                    </br>
                    <a href="${googleUrl}">Login with Google</a>
                </body>
            </html>`,
    };
}

exports.handler = arc.http.async(login);
