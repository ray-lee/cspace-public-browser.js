# Installing the public browser

The CollectionSpace public browser application can be added to a web page with a few lines of HTML and JavaScript, and a small amount of web server configuration. For WordPress users, a [plugin](https://github.com/collectionspace/wp-collectionspace) is available that automates most of the work to add the public browser to a WordPress site.

## Adding the application to a web page

The public browser is a JavaScript application that can be loaded onto a web page, and configured to render into a container on the page. Typically, the page will be an HTML file named `index.html`, placed in some directory inside the server's web root.

Load the application's JavaScript code by adding a `script` tag to the HTML. The JavaScript code for the application can be retrieved from a JavaScript CDN, such as [jsDelivr](https://www.jsdelivr.com/) or [UNPKG](https://www.unpkg.com/). For example, do load the JavaScript for version 1.5.1 of the public browser from jsDelivr, add the following tag to the HTML file:

```
<script src="https://cdn.jsdelivr.net/npm/@collectionspace/cspace-public-browser@1.5.1/dist/cspacePublicBrowser.min.js "></script>
```

Add a container element to the page. The public browser will be rendered into this element. Typically, the container element will be a `div` whose `id` is `cspace-browser`. For example:

```
<div id="cspace-browser"></div>
```

The container element should not have any content. Any existing content will be deleted.

The application must be initialized by adding some JavaScript code that calls an initialization function, passing in the desired configuration options. For example:

```
<script>
  cspacePublicBrowser({
    basename: '/collection',
    gatewayUrl: 'https://core.dev.collectionspace.org/gateway/core',
  });
</script>
```

Two configuration options are required:

- `basename` - This should be set to the path to the web page containing the public browser, as seen in the URL to the page (which typically would also be the path to the index.html file, from the web root directory). For example, if the public browser is being added to a web page located at http://mymuseum.org/cspace/collection/index.html, then `basename` should be set to `/cspace/collection`.

- `gatewayUrl` - This should be set to the URL of a CollectionSpace public gateway that has access to the collection data. Typically, this is something like `https://{cspace server hostname}/gateway/{tenant short name}`. This can vary depending on how the CollectionSpace back-end has been configured, so verify the gateway URL with your CollectionSpace administrator.

## Configuring the web server

The CollectionSpace public browser application runs as a "front controller". This means that if the application is added to a web page at e.g., http://mymuseum.org/cspace/collection, then any request to a subdirectory of http://mymuseum.org/cspace/collection should return the same HTML as http://mymuseum.org/cspace/collection. The web server must be configured to do this. In Apache, this can be done using the [FallbackResource](https://httpd.apache.org/docs/trunk/mod/mod_dir.html#fallbackresource) directive. For example:

```
<Directory "/cspace/collection">
    FallbackResource /index.html
</Directory>
```

Other web servers will vary.
