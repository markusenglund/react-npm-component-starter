# React component boilerplate

This is a simple boilerplate project for building a react component package for npm. It is suitable for building any type of UI component or library (like for example a dropdown menu or a toggle-switch). The project takes care of the things that are easy to get wrong. It contains a correctly transpiled folder for the component library as well as a demo page for showcasing it. The demo can easily be uploaded to _GitHub Pages_. This boilerplate project is meant to be minimal and easy to understand. Linting, testing, prettier etc have been purposefully left out. It does not include a UMD build, as those aren't really used anymore.

## Getting started

To get started developing your own react component based on this boilerplate, follow these steps on the command line:

* `git clone https://github.com/yogaboll/react-npm-component-starter.git` - Clone the repo
* `npm install` - Install all dependencies
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
* Go to npmjs.com/package/[YOUR COMPONENT NAME]/ to confirm that it is there.

Host demo on GitHub Pages:

* `npm run docs:prod` - Make a production bundle of the demo app.
* Commit your changes to git and push to your GitHub repository.
* On your GitHub repo page, click the **settings** tab and scroll down to the **GitHub Pages** heading. Pick `master branch /docs folder` in the **source** dropdown, And BOOM, your demo page is already live on the internet for free.
* Note: Sometimes it might take about an hour for the page to actually start hosting. Adding /index.html after the url works instantly for whatever reason.

## How it is structured

The source code has two separate parts – the library and the documentation (demo) page. Both are written in ES6 and JSX, and therefore have to be transpiled by Babel but in different ways.

### Component library transpilation

The library source code, which is located in `src/lib`, is transpiled with Babel but is _not_ bundled with Webpack. Bundling is completely unnecessary, since the developer who will in the end use your library for their application will bundle their entire codebase, which includes your library. More importantly, if your library has any dependencies, bundling them together with your code would be a disaster since it could cause duplication and therefore larger final bundle size. If an application has uses many libraries with the same dependencies, those dependencies should only be in the final bundle one time.

### Demo app transpilation

The demo app source code lives inside the `src/docs` folder. It is transpiled, bundled and minified by Webpack and Babel into the `docs` folder in the root directory (by running `npm run docs:prod`). This is a completely normal react app with minimal configuration that imports the component library. It has two purposes: 1. To have a way of inspecting your components while you develop the library, and 2. As a demo to showcase to people who try to figure out what your library does.

The reason that the folder doesn't have a logical name like `demo` is that GitHub Pages requires it to be called `docs`...

Run `npm run build-docs` to transpile in production mode. This will create a /docs folder in the root directory. That is the folder that will be served as the demo page on github pages.
Why is the transpiled docs-folder commited to git? This is not a very nice thing to do obviously, but it is required in order to serve it to github pages. It’s not a disaster and make things very easy. Feel free to make a pull request if you have a simple way of serving the demo to a free static website hosting service without pushing transpiled code to source control.

### How to handle dependencies

When you’ve developed react apps you might have split dependencies into dependencies and devDependencies in your package.json. When developing apps, the distinction is purely semantic and otherwise meaningless. However, when developing libraries this distinction has real effects.

* devDependencies are only installed when the package.json file that includes them are in the root directory (fact-check this!!). This means that if you clone this repository and run `npm install`, all devDependencies will be installed as well as normal dependencies. However, if someone installs a package using npm install <your package>, this will only install dependencies, and not any devDependencies that <your package> has specified in the package.json.

* Normal _dependencies_ are always installed.

* peerDependencies are never installed, but do give the developer a warning when there is a peerDependency that they have not installed.

So your dependency strategy should like like this:
Packages that only affect development on your end and are not used by the app developer should be devDependences. This includes: Babel packages, webpack related packages, linter, prettier and similar stuff.
Packages that you use in your component library, meaning you import them to your component files, and need them for your component to work should be in normal _dependencies_. For example let’s say your making a router similar to react-router, and you need a way to parse query strings, so you import that functionality from a dedicated query string parsing library instead of writing that functionality yourself.
`react` and `react-dom` should be both peerDependencies and devDependencies. Since your making a react related package, the app developer will always have react and react-dom installed. So why not put it in dependencies? Because it might cause duplication. If you both use react version 16.x specified with a carret, react will only be bundled once howver. If you have specified react ^16.0.0 as a dependency and the app developer has specified react ^15.3.2, npm will decide that these packages are not the same and will build them both into the final bundle which is very bad.

React and react-dom should be specified like
`"peerDependencies": { "react": "^15.3.0 || ^16.2.0", "react-dom": "^15.3.0 || ^16.2.0" }`

This will let the end user choose which version of react without incurring duplication costs. Your package should be compatible with at least react >= 15, so this is the way to do it. This might be a good place to remind you: Do not use the exclusively version 16 features like fragments in component. There are still people using react 15. Don’t be stupid, don’t make your component library incompatible with lots of potential users for no reason.

Prop-types should be a normal dependency.

### How to handle css

[Do we need this section? Maybe not.]
