const arc = require("@architect/functions");

async function page(req) {
    let name = "Guest";
    if (req.session.account && req.session.account.google) {
        name = req.session.account.google.email + " (logged in with Google)";
    } else if (req.session.account && req.session.account.github) {
        name = req.session.account.github.login + " (logged in with Github)";
    }

    return {
        status: 200,
        html: `<!doctype html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>login page</title>
                    <meta name="description" content="a page with some links">
                </head>
                <html>
                    <body>
                    <h1>Welcome</h1>
                    <p>${name}</p>
                    ${
                        req.session.account
                            ? '<form method="post" action="/logout"> <button type="submit">Logout</button></form>'
                            : '<a href="/login">Login</a>'
                    }
                    </body>
                </html>`,
    };
}

exports.handler = arc.http.async(page);
