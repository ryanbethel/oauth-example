const arc = require("@architect/functions");

async function admin(req) {
    if (req.session.account) {
        return {
            status: 200,
            body: `<!doctype html>
                        <html lang="en">
                            <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <title>login page</title>
                        </head>
                        <html>
                            <body>
                                <h1>Admin Page</h1>
                                <p>${req.session.account.name}</p>
                            </body>
                        </html>`,
        };
    } else {
        return {
            status: 401,
            location: "/login?finalRedirect=admin",
        };
    }
}

exports.handler = arc.http.async(admin);
