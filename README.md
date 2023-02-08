# EJX Artcube Template Project

This repo is a template to start building EyeJackX AR experiences.  It uses vite
to bundle and import the `@eyejack/ejx` library to interface with the EJX player.

## Getting Started

First clone the repo with your project name.

```bash
npx degit https://github.com/eyejackapp/ejx-template-cube project-name
```

Then jump into your folder and install dependencies.

```bash
cd project-name
yarn i
```

### Developing

Start the dev server by running `yarn dev`.  This will create a hot-reloading
dev environment with vite.  The entrypoint of your EJX experience is content.js.
Extra javascript files or libraries can be included using regular import syntax.
When you're ready to build, run `yarn build`.

## FAQ

### Adding assets

Currently assets need to be imported through javascript to be included in the
final bundle.  These imports result in the path to load a specific asset.

```javascript
import MyImgSrc from './assets/my-image.png';
console.log(MyImgSrc); // '/path/to/load/my-image.png'

const texture = new THREE.TextureLoader().load(MyImgSrc); // Texture of my image.
```

An alternative approach is to keep the assets in the `public/` folder.

> :warning: Any assets loaded from the public folder MUST use relative paths
> or they will not work when deployed.

```javascript
// - public/
// -   my-image.png

const MyImgSrc = './my-image.png'; // Relative path
const texture = new THREE.TextureLoader().load(MyImgSrc); // Texture of my image
```

> :warning: There are internal assets stored in the `./public/internal/` folder.
> You should not put any files in this folder as it will be deleted when your 
> EJX cube content is uploaded.

### Using typescript

You can develop your experiences using typescript by renaming
`./src/content.js` -> `./src/content.ts`.  And then editing `./index.html` to
reference the renamed file.

```javascript
    import("./src/content.js").then(module => { // Change this to `./src/content.ts`
      player.setContent({filename: 'my-content', module});
    });
```

This will not enable build time type checking, etc. To do that you will need to
look into adding a `tsconfig.json`, installing typescript (`yarn add -D typescript`),
and modifying the build command in `package.json` to `tsc --no-emit && vite build`.

> :warning: The `@eyejack/ejx` library does not support typescript yet so I recommend
> not enabling build time typechecking just yet.

### Why are there external dependencies, can I upgrade three.js?

EJX Cubes are designed to plug and play into the same three.js instance, which is
managed by `@eyejack/ejx` library.  When this template builds your project it will
not bundle three.js with it.  For that reason, we should always develop on
`three@^0.149.0` as it's the currently supported version.
