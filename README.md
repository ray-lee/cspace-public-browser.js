# cspace-public-browser

[![npm package](https://img.shields.io/npm/v/cspace-public-browser.svg)](https://www.npmjs.com/package/cspace-public-browser)
[![continuous integration](https://github.com/collectionspace/cspace-public-browser.js/actions/workflows/ci-js.yml/badge.svg?branch=master&event=push)](https://github.com/collectionspace/cspace-public-browser.js/actions/workflows/ci-js.yml)


The CollectionSpace public browser.

## Installation

### For CollectionSpace Administrators

The CollectionSpace public browser is a JavaScript application that runs in a web browser. To install the application in a WordPress site, use the [wp-collectionspace](https://github.com/collectionspace/wp-collectionspace) WordPress plugin.

### For CollectionSpace Developers

[Node.js](https://nodejs.org/) 14 and npm 6 are required to build the application.

To download and install the source code of the application for development:

```
git clone https://github.com/collectionspace/cspace-public-browser.js.git
cd cspace-public-browser.js
npm install
```

To run the application during development:

```
cd cspace-public-browser.js
npm run devserver
```

Then open a browser to http://localhost:8081. This runs the application using the configuration settings specified in `index.html`. The application will reload automatically as changes to source code files are saved.

## About CollectionSpace

[CollectionSpace](http://www.collectionspace.org/) is a free, open-source collections management application for museums, historical societies, natural science collections, and more.
