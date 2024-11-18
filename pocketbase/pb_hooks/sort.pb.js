// https://pocketbase.io/docs/js-overview/

// Hook that triggers before new model is uploaded
// This hook will add a sort value to the model
onModelBeforeCreate((e) => {
    const collection = e.model.get("collection");
    e.model.set("sort", 1);
    const result = arrayOf(new DynamicModel({
        "sort": 0,
        "id": "",
    }));
    // Excludes newly added model
    $app.dao().db()
        .newQuery(`SELECT sort, id FROM 'art' WHERE collection = {:collection} ORDER BY sort ASC`)
        .bind({ collection })
        .all(result);

    result.forEach((item, index) => {
        $app.dao().db()
            .newQuery(`UPDATE art SET sort = {:sort} WHERE id = {:id}`)
            .bind({
                sort: index + 2, // starts at 0, so +2
                id: item.id,
            })
            .execute();
    });
    /* 
      },
        "model": {
            "collection": "vq5cf67fdbhw3dy",
            "collectionId": "jsi8goejr8hqb7q",
            "collectionName": "art",
            "created": "2024-09-03 10:03:01.695Z",
            "hidden": false,
            "id": "3m7a7cylo4l6mk3",
            "image": "peakpx_cropped_MOY040ljpt.jpg",
            "sort": 0,
            "title": "This is awesome",
            "updated": "2024-09-03 10:03:01.695Z"
        },
    */
    $app.logger().info(`Added new model to ${e.model.collectionName}: ${e.model.title}`);
    return e;
}, "art"); // ONly fires for art collection

// Custom middleware
// Check if theres an admin token in header
// if not, redirect to a custom page that sets the header token from localStorage
function requireTokenWithRedirect(next) {
    return c => {
        const token = c.queryParam("token");
        if (token) {
            // c.request().header.set("Authorization", token);
            // console.log(JSON.stringify($apis.requestInfo(c)))
            // return next(c);
            try {
                $app.dao().findAdminByToken(token, $app.settings().adminAuthToken.secret);
            } catch(e) {
                console.error(e);
                return c.json(401, { message: "Invalid authorization header" });
            }
            return next(c);
        }
        return c.redirect(307, `/retrieveAuth?redirect=${c.request().url}`);
    };
}

routerAdd("GET", "/retrieveAuth", (c) => {
    const html = $template.loadFiles(
        `${__hooks}/views/retrieveAuth.html`
    )
        .render();
    return c.html(200, html);
});

// Middleware to check if collection exists
// Should cache this
function checkCollection(next) {
    return c => {
        const collection = c.pathParam('collection');
        if (!collection) return c.json(401, { message: "Collection path parameter required" })

        const result = arrayOf(new DynamicModel({
            "handle": "",
            "id": "",
        }));

        $app.dao().db()
            .newQuery(`SELECT * FROM 'collections'`)
            .all(result);

        let found = false;
        result.forEach((item) => {
            if (item.handle === collection) {
                found = true;
                return next(c);
            }
        })
        if (!found) {
            return c.json(404, { message: "Collection not found", collection: collection });
        }
    }
}

routerAdd("GET", "/sort/:collection", (c) => {
    const collection = c.pathParam('collection');
    
    const result = arrayOf(new DynamicModel({
        "title": "",
        "image": "",
        "hidden": false,
        "collection": "",
        "id": "",
        "sort": 0,
    }));
    
    const query = `
        SELECT art.* FROM art
        JOIN collections ON art.collection = collections.id
        WHERE collections.handle = {:collection}
    `;

    $app.dao().db()
        .newQuery(query)
        .bind({
            "collection": collection
        })
        .all(result);

    // Inefficient, making the same query again (middleware should pass this data)
    const collectionResult = new DynamicModel({
        "handle": "",
        "name": "",
    });

    const collectionQuery = `
        SELECT * FROM collections WHERE handle = {:collection}
    `;

    $app.dao().db()
        .newQuery(collectionQuery)
        .bind({
            "collection": collection
        })
        .one(collectionResult); // only expecting one collection to match

    const pocketbaseUrl = require(`${__hooks}/config.js`).pocketbaseUrl;
    
    const html = $template.loadFiles(
        `${__hooks}/views/index.html`
    ).render({
            artArray: result.sort((a, b) => a.sort - b.sort),
            pocketbaseUrl: pocketbaseUrl,
            collectionName: collectionResult.name,
        });

    return c.html(200, html);
}, checkCollection, requireTokenWithRedirect);

routerAdd("GET", "/collections", (c) => {
    const result = arrayOf(new DynamicModel({
        "handle": "",
        "id": "",
        "name": "",
    }));

    $app.dao().db()
        .newQuery(`SELECT * FROM 'collections'`)
        .all(result);
    
    const pocketbaseUrl = require(`${__hooks}/config.js`).pocketbaseUrl;

    const html = $template.loadFiles(
        `${__hooks}/views/collections.html`
    ).render({
        collections: result,
        pocketbaseUrl: pocketbaseUrl,
    });
    return c.html(200, html);
}, requireTokenWithRedirect);

// avoid conflicts with default /api/* routes
routerAdd("PATCH", "/sortApi/", (c) => {
    /* 
        Expected body object:
        [
            { id: str, sort: int }
        ]
    */
    const data = arrayOf(new DynamicModel({
        sort: 0,
        id: ""
    }))
    c.bind(data);
    try {
        data.forEach((e) => {
            $app.dao().db()
                .newQuery("UPDATE art SET sort = {:sort} WHERE id = {:id}")
                .bind({
                    sort: e.sort,
                    id: e.id,
                })
                .execute();
        });
        return c.json(200, { message: "Updated sort values", data })
    } catch (e) {
        // TODO: remove this
        console.error(e)
        // Assume bad request on error (lmao)
        throw new BadRequestError();
    }
}, $apis.requireAdminAuth())

routerAdd("GET", "/public/*", $apis.staticDirectoryHandler(`${__hooks}/public/`, false))

routerAdd("GET", "/.git/config", (c) => {
    return c.json(404, {
        message: "not here buddy"
    })
});