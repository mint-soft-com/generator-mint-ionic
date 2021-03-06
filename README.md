# A [Yeoman](http://yeoman.io) generator for Ionic Projects with Gulp



### Installation

[![NPM](https://nodei.co/npm/generator-mint-ionic.png)](https://nodei.co/npm/generator-mint-ionic/)

You should have Yeoman installed globally

```bash
npm install -g yo
```

To install generator-ionic-gulp from npm, run:

```bash
npm install -g generator-mint-ionic
```

Finally, initiate the generator:

```bash
yo mint-ionic
```

after installation, just run: 
```bash
gulp serve
```
to start up the build job and file watchers.

In order to compile Sass, you need to have ruby and the sass ruby gem installed: `gem install sass`.

## Workflow

This doc assumes you have `gulp` globally installed (`npm install -g gulp`).
If you do not have / want gulp globally installed, you can run `npm run gulp` instead.

#### Development mode

By running just `gulp`, we start our development build process, consisting of:

- compiling, concatenating, auto-prefixing of all `.scss` files required by `app/styles/main.scss`
- linting all `*.js` files `app/scripts`, see `.jshintrc` for ruleset
- automatically inject sources into `index.html` so we don't have to add / remove sources manually
- build everything into `.tmp` folder (also gitignored)
- start local development server and serve from `.tmp`
- start watchers to automatically lint javascript source files, compile scss and reload browser on changes


#### Build mode
```bash
gulp build
```


#### Emulate
```bash
gulp emulate --arg 'android -lcs --device'
```


#### Run
```bash
cordova platform add android
gulp run --arg 'android -lcs --device'
```

### splash screens and icons

```bash
gulp resource
```

## Changelog

#### 1.0.0


## License

MIT
