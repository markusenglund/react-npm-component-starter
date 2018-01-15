# React component boilerplate

This is a simple boilerplate project for building a react component package for npm. It is suitable for building any type of UI component or library (like for example a dropdown menu or a toggle-switch). The project contains a correctly transpiled folder for the component library (easy to get wrong) as well as a demo page for showcasing it. The demo can easily be uploaded to _GitHub Pages_. This boilerplate project is meant to be minimal and easy to understand. Linting, testing, prettier etc have been purposefully left out. It does not include a UMD build, as those aren't really used anymore.

If you are new to building React components for npm you should check out [this guide](https://medium.com/@markus.s.englund/a-guide-to-building-a-react-component-for-npm-68f03b314753).

## How it is structured

The source code has two separate parts – the library and the documentation (demo) page. Both are written in ES6 and JSX, and therefore have to be transpiled by Babel but in different ways.

### Component library transpilation

The library source code, which is located in `src/lib`, is transpiled with Babel but is _not_ bundled with Webpack. Bundling is completely unnecessary, since the developer who will in the end use your library for their application will bundle their entire codebase, which includes your library. More importantly, if your library has any dependencies, bundling them together with your code would be a disaster since it could cause duplication and therefore larger final bundle size. The components still have to be transpiled since many developers have Webpack configured to not transpile their node_modules folder. Some may not be using JSX or ES6 at all, and would therefore be unable to transpile your component.

### Demo app transpilation

The demo app source code lives inside the `src/docs` folder. It is transpiled, bundled and minified by Webpack and Babel into the `docs` folder in the root directory (by running `npm run docs:prod`). This is a completely normal react app with minimal configuration that imports the component library. It has two purposes: 1. To have a way of inspecting your components while you develop the library, and 2. As a demo to showcase to people who try to figure out what your library does.

The reason that the folder doesn't have a logical name like `demo` is that GitHub Pages requires it to be called `docs` for some reason...

## Getting started

Follow these steps to get started developing your own react component:

* `git clone https://github.com/yogaboll/react-npm-component-starter.git`
* `npm install`
* `npm run lib:watch` - Transpile the `src/lib` folder in watch mode
* `npm run docs` - start a development server with the demo website based on the `src/docs` folder.
* Go to http://127.0.0.1:8000 to see the demo in action. Whenever you change the code in either src/lib or src/docs, the page will automatically update.

Remember to reset the git history:

* `rm -rf .git`
* `git init`
* `git add .`
* `git commit -m "setup project"`

When you have completed development and want to publish to npm:

* Make sure the "name" field in the package.json file is correct (the npm package will get this name).
* `npm publish`
* Go to npmjs.com/package/[YOUR COMPONENT NAME]/ to confirm that it has been published.

Host demo on GitHub Pages:

* `npm run docs:prod` - Make a production bundle of the demo app.
* Commit your changes to git and push to your GitHub repository.
* On your GitHub repo page, click the **settings** tab and scroll down to the **GitHub Pages** heading. Pick `master branch /docs folder` in the **source** dropdown, And BOOM, your demo page is already live on the internet for free.
* Note: Sometimes it might take about an hour for the page to actually start hosting. Adding /index.html after the url works instantly for whatever reason.
