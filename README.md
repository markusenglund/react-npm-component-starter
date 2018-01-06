# React component boilerplate

[What is it? Make sure it’s very obvious what it is for exactly.][maybe add a note about distinction between library dev, app dev, and end user][Add examples of the type of stuff you can create with this boilerplate]

This is a simple boilerplate project for building a react library for npm. It includes a correctly transpiled library folder, a demo page for showcasing your component(s) that can be uploaded to github pages with a single click. It’s meant to be minimal and to be easy to understand and to customize. Linting, testing, prettier etc have been purposefully left out. Does not include a UMD build, which has fallen out of favour with the community.

## Development

## Structure

The source code has two separate parts – the library and the documentation (demo) page. Both are written in ES6 and JSX, and therefore have to be transpiled by Babel but in different ways.

### Component library transpilation

The library source code is transpiled with babel, but is _not_ bundled with webpack. Bundling is completely unnecessary, since the developer who will in the end use your library for their application will bundle their code, which includes your library. More importantly, if your library has any dependencies, bundling them together with your code would be a disaster since it would cause duplication and therefore larger bundle size. If an application has uses many libraries with the same dependencies, those dependencies should only be in the final bundle one time.

Run `npm run lib` to transpile the src/lib folder into the lib folder. Run `npm run lib:watch` to do the same in watch mode so that your demo page will automatically update.

### Demo app transpilation

The demo app source code lives inside the src/docs folder, and is transpiled, bundled and minified by webpack and babel into the docs folder in the root directory. This is a completely normal react app with minimal configuration that imports the component library to showcase it. It has two purposes: 1. To have a way of inspecting your components while you develop the library, and 2. As a demo to showcase to people who try to figure out what your library does.

Why is it called docs and not something more logical like demo? This is because it makes github pages integration easier. Github pages is a free hosting service that github provides, which is perfect for demoing your library. However, it’s kind of primitive in that you can only configure it to serve files from either the root folder of your repository or a folder called docs, so docs it is. In order to create a gh-pages demo page all you have to do is go into settings → Github Pages and choose `master branch /docs folder` as source. And BOOM, your demo page is already live on the internet for free, it’s that easy!

Note: Sometimes it might take about an hour for the page to actually start hosting. Adding /index.html after the url, should work instantly.

Run `npm run dev` to start a webpack dev server, which includes hot module replacement for great development experience. The resulting transpiled code is only stored in memory, and no actual bundle.js is created.

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
