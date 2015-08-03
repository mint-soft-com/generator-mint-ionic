'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

var appPath = path.join(process.cwd(), 'app');

module.exports = yeoman.generators.Base.extend({
  initializing: function() {
    this.pkg = require('../package.json');
  },

  prompting: {
    askForNames: function askForNames() {
      var done = this.async();

      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the ' + chalk.red('mint-ionic') + ' generator. Let\'s build an ionic app, shall we?'
      ));

      var prompts = [{
        "type": "input",
        "name": "appName",
        "message": "What\"s the app name?",
        "default": this.appname 
      }, {
        "type": "input",
        "name": "userName",
        "message": "The author\"s name? (for config files)",
        "default": "Your Name"
      }, {
        "type": "input",
        "name": "userEmail",
        "message": "Author email? (for config files)",
        "default": "email@example.com"
      }, {
        "type": "list",
        "name": "template",
        "message": "Which template of ionic do you want?",
        "choices": [{
          "value": "blank",
          "name": "Blank"
        }, {
          "value": "tabs",
          "name": "Tabs"
        }, {
          "value": "sidemenu",
          "name": "SideMenu"
        }]
      }];

      this.prompt(prompts, function(props) {
        this.appName = props.appName;
        this.userName = props.userName;
        this.userEmail = props.userEmail;
        this.template = props.template;
        done();
      }.bind(this));
    },

    askForAppId: function askForAppId() {
      var done = this.async();
      this.prompt([{
        type: 'input',
        name: 'appId',
        message: 'The app id?',
        default: 'com.' + this._.classify(this.userName).toLowerCase() + '.' + this._.classify(this.appName).toLowerCase()
      }], function(props) {
        this.appId = props.appId;
        done();
      }.bind(this));
    }
  },

  writing: {

    setup: function() {
      var param = {
        appName: this._.underscored(this.appName),
        userName: this.userName,
        userEmail: this.userEmail,
        widgetId: this.appId,
        ngModulName: this._.classify(this.appName) 
      };

      var setupFiles = require("./setup.json").files;

      for (var i = 0; i < setupFiles.length; i++) {
        var file = setupFiles[i];
        this.fs.copyTpl(
          this.templatePath(file.path),
          this.destinationPath(file.dest),
          param
        );
      }
    },

    projectfiles: function() {
      var param = {
        appName: this._.underscored(this.appName),
        userName: this.userName,
        userEmail: this.userEmail,
        widgetId: this.appId,
        ngModulName: this._.classify(this.appName) ,
        title: this.appName
      };

      //app
      this.fs.copyTpl(
        this.templatePath('app/'+this.template),
        this.destinationPath('app'),
        param
      );

      //res
      this.fs.copy(
        this.templatePath('res'),
        this.destinationPath('res/')
      );

      //res
      this.fs.copy(
        this.templatePath('keys'),
        this.destinationPath('keys/')
      );
      //hooks
      this.fs.copy(
        this.templatePath('hooks'),
        this.destinationPath('hooks/')
      );
    }

  },

  install: function() {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
