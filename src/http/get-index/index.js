const arc = require("@architect/functions");

async function page(req) {
    let name = Guest;
    if (req.session && req.session.account.google) {
        name = req.session.account.google.name;
    } else if (req.session && req.session.account.github) {
        name = req.session.account.github.name;
    }

    return {
        status: 200,
        body: `<!doctype html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>login page</title>
                    <meta name="description" content="a page with some links">
                </head>
                <html>
                    <body>
                    <h1>Hello ${name}</h1>
                    </body>
                </html>`,
    };
}

exports.handler = arc.http.async(page);
