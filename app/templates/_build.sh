#!/bin/sh

log () {
  echo "$1"
}

clear_build(){
  cordova plugin rm org.apache.cordova.console
  rm -rf build
  mkdir build
}

compress(){
  gulp build
}

del_bower(){
  rm -rf www/bower_components
}


prepare_android(){
  cordova platform rm android 
  cordova platform add android 
  ionic browser add crosswalk
}

prepare_ios(){
  cordova platform rm ios
  cordova platform add ios
}

build_ios(){
  security unlock-keychain -p {password} ~/Library/Keychains/login.keychain
  cordova build --device --release ios
}

build_android(){
  cordova build --device --release android
}

if [ "$1" == "android" ]; then
  log  "android build"
  clear_build
  compress
  del_bower
  prepare_android
  build_android
elif [ "$1" == "ios" ]; then
  log  "ios build"
  clear_build
  compress
  del_bower
  prepare_ios
  build_ios
else
  echo "Please input android or ios"
fi