# Setting a placeholder image for search results with no image

> [!NOTE]
> These instructions are written for a CollectionSpace public browser embedded in a WordPress site, but they apply with slight differences to any kind of web site that contains a public browser.

A placeholder image can be displayed for search results that don't have an image by adding a rule to the CSS stylesheet for your site. For general instructions on adding CSS rules for the public browser in WordPress, see: https://github.com/collectionspace/wp-collectionspace?tab=readme-ov-file#adding-css

To do this, the CSS selector you want to target is `.cspace-SearchResultImage--noimage`. Here is an example rule you can add that sets a background image, and changes the color of the "no image available" text:

```
.cspace-SearchResultImage--noimage {
    background-image: url("https://collectionspace.org/wp-content/uploads/2020/09/Collection.jpg");
    color: white;
}
```

CSS allows you to configure how this looks very precisely. If you have someone on staff with web site authoring skills, they can help you get exactly the look you want.

If you want to change "no image available" to some other text, this can be done by editing the `config` field in the WordPress post. You likely have something like this in that field (but with different values for `basename` and `gatewayUrl`):

```
{
    basename: '/collection/core',
    gatewayUrl: 'https://core.dev.collectionspace.org/gateway/core',
}
```

You can add a messages setting to the configuration, as below. (Keep the `basename` and `gatewayUrl` values that you have, as the ones below are just examples).

```
{
    basename: '/collection/core',
    gatewayUrl: 'https://core.dev.collectionspace.org/gateway/core',
    messages: {
        'searchResultImage.noimage': 'nothing to see',
    },
}
```
