# Artcube Project

This is an example of an eyejack artcube project that a user might work with.

It is built as an app and exports a few files.

- dist/index.html (this is the boilerplate so it runs on users computer and
  can be deleted);
- dist/assets/index-[hash].js (this is the boilerplate so it runs on users
  computer and can be deleted)
- dist/assets/main-[hash].js This is the entry point of the user's experience
  that references all other files and assets.
- dist/assets/**.* (everything else) These are other dependencies that are have
  been bundled and everything is linked together, automatically loaded using
  relative paths.

## Caveats

- Need to define which assets can be imported inside of `vite.config.js`.
  - Solution: We can setup the boilerplate to support all reasonable assets
    (all 3d, audio, video, image, font file types)
  - If the user is using assets outside of these standard ones I think it's fair
    to assume they'll know how to add their own assets automatically.
  - We can document this and put it in the docs.
- Not sure how public folder will work.
  - While the user will be able to use the public/static folder on their local
    machine, it's a little prone to error if user uses absolute paths.
  - Solution: Document not to use public folder, direct them to imported assets.
  - If they really want to use the public folder we can provide the base path
    of their current experience so they can join the path themselves.
- Small painpoint bundling library assets.  Currently ej-lib has some assets
  that need to be bundled with it.
  - This includes some HDR textures and stuff.  Sadly vite only supports inline
    compile time asset bundling for libraries.  What this means is that, using
    the regular `import MyAsset from './my-asset.jpg` syntax, assets are inlined
    into the javascript (large file size, must import everything, inefficient).
  - Solution: Copy the library assets into the `public/` folder of the user's
    project.  Another option is if we are creating a CLI tool, that tool could
    wrap vite and auto-inject the most up to date library assets.
