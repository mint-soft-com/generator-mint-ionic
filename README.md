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
- creating `vendor.js` file from external sources defined in `./vendor.json`
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
gulp build --arg 'android -lcs --device'
```


#### Run
```bash
gulp build --arg 'android -lcs --device'
```

### splash screens and icons

Replace `splash.png` and `icon.png` inside `/resources`. Then run `ionic resources`. If you only want to regenerate icons or splashs, you can run `gulp icon` or `gulp splash` shorthand.

## Changelog

#### 1.2.2
- update to ionic 1.0.1
- keep angular explicitly on 1.3.x branch until Ionic officialy supports 1.4.x [see this thread](http://forum.ionicframework.com/t/angular-1-4-and-ionic/21458/12)


#### 1.2.0
- Drop rubySass in favor of libsass
- compile Ionic .scss dynamically so we can support custom themes
- update to ionic 1.0.0
- update to ngCordova 0.1.17-alpha
- update ro lodash 3.9.3

## License

MIT
