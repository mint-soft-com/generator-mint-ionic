#!/bin/sh

log () {
  echo "$1"
}

sign_ios(){
  xcrun -sdk iphoneos PackageApplication -v $(pwd)/platforms/ios/build/device/{Appname}.app -o $(pwd)/build/{Appname}.ipa --embed keys/{Appname}.mobileprovision --sign "{Distribution Name}"
}

sign_android(){
  jarsigner -verbose -sigalg SHA1withRSA -storepass {storepass} -digestalg SHA1 -keystore $(pwd)/keys/{hamspro.keystore} $(pwd)/platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk  {alias} 
  zipalign -v 4 $(pwd)/platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk $(pwd)/build/{Appname}.apk
}


if [ "$1" == "android" ]; then
  log  "sign android"
  sign_android
elif [ "$1" == "ios" ]; then
  log  "sign ios"
  sign_ios
else
  echo "Please input android or ios"
fi
