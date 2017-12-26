
# react-native-umeng-share-kit

## Getting started

`$ npm install react-native-umeng-share-kit --save`

### Mostly automatic installation

`$ react-native link react-native-umeng-share-kit`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-umeng-share-kit` and add `RNUmengShareKit.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNUmengShareKit.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNUmengShareKitPackage;` to the imports at the top of the file
  - Add `new RNUmengShareKitPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-umeng-share-kit'
  	project(':react-native-umeng-share-kit').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-umeng-share-kit/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-umeng-share-kit')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNUmengShareKit.sln` in `node_modules/react-native-umeng-share-kit/windows/RNUmengShareKit.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Umeng.Share.Kit.RNUmengShareKit;` to the usings at the top of the file
  - Add `new RNUmengShareKitPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNUmengShareKit from 'react-native-umeng-share-kit';

// TODO: What to do with the module?
RNUmengShareKit;
```
  