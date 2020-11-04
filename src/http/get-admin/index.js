const arc = require("@architect/functions");

async function admin(req) {
    if (req.session.account) {
        let info;
        if (req.session.account.google) {
            info = req.session.account.google.email + " (logged in with Google)";
        } else if (req.session.account.github) {
            info = req.session.account.github.login + " (logged in with Github)";
        }
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
                            <h1>Admin Page</h1>
                            <p>username: ${info}</p>
                            <form method="post" action="/logout"><button type="submit">Logout</button></form>
                        </body>
                    </html>`,
        };
    } else {
        return {
            status: 302,
            location: "/login?next=admin",
        };
    }
}

exports.handler = arc.http.async(admin);
