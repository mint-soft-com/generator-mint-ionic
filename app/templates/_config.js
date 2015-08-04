module.exports = function($, usehtml) {
  var dist = 'www',
    src = 'app',
    tmp = '.tmp',
    res = "res",
    appName = "<%= ngModulName %>";

  var config = {
    appName:appName,
    src:{
      directory:"./"+src,
      styles:[src+"/styles/**/*"],
      scripts:[src+"/scripts/**/*"],
      images:[src+"/images/**/*"],
      index:src+"/index.html",
      views:[src+"/views/**/*.html"]
    },
    dist:{
      directory:"./"+dist,
      style:dist+"/styles/",
      script:dist+"/scripts/",
      image:dist+"/images/",
      index:dist+"/",
      view:dist+"/views/",
      font:dist+"/fonts/"
    },
    tmp:{
      directory:"./"+tmp,
      style:tmp+"/styles/",
      script:tmp+"/scripts/",
    },
    resource:{
      dist:"icons",
      icon:{
        input: res+"icon.png",
        outputDir: 'icons',
        platforms: ['iphone', 'android', 'ipad'],
        classic: true,
        radius: 50
      },
      splash:{
        input: res+"splash.png",
        outputDir: 'icons',
        platforms: ['iphone', 'android', 'ipad'],
        classic: true,
        noCrop: true,
        noNine: false
      },
      copy:{
        icon:{
          src:'icons/platform/android/res/**/*',
          base:'icons/platform/android/res/',  
          dest:'resources/android'
        },
        splash:{
          src:'icons/Resources/iphone/**/*',
          base:'icons/Resources/iphone/',  
          dest:'resources/ios'
        }
        
      }
    }
  };

  return config;

};
