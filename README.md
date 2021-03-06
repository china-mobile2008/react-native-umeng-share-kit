# 集成友盟分享与第三方登录

支持平台：微信、QQ、新浪微博  
支持功能：登录、分享

### 作者

邮箱：china_mobile2008@sina.com  
说明：此模块是根据[react-native-umshare](https://github.com/a289459798/react-native-umshare)项目更改而来，在此基础上更新了友盟的版本，并增加了微博登录功能，非常感谢原作者！

### 友盟SDK版本

Android：v6.4.8(精简版)  
iOS: v6.4.8

### 账号申请

1. 到友盟平台申请账号 [http://www.umeng.com/](http://www.umeng.com/)
2. 微信开发平台申请 [http://open.weixin.qq.com/](http://open.weixin.qq.com/)
3. QQ开放平台申请 [http://open.qq.com/](http://open.qq.com/)
4. 微博开放平台申请[http://open.weibo.com/](http://open.weibo.com/)

### 安装

```
npm install react-native-umeng-share-kit --save
react-native link
```


### Android


添加Activity

1. QQ

```xml
<activity
    android:name="com.umeng.qq.tencent.AuthActivity"
    android:launchMode="singleTask"
    android:noHistory="true" >

    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="tencent+您的QQ appkey" />
    </intent-filter>
</activity>

<activity
    android:name="com.umeng.qq.tencent.AssistActivity"
    android:screenOrientation="portrait"
    android:theme="@android:style/Theme.Translucent.NoTitleBar"
    android:configChanges="orientation|keyboardHidden|screenSize"/>
```

2. 微信

```xml
<activity
    android:name=".wxapi.WXEntryActivity"
    android:configChanges="keyboardHidden|orientation|screenSize"
    android:exported="true"
    android:screenOrientation="portrait"
    android:theme="@android:style/Theme.Translucent.NoTitleBar" />
```
需要手动在包名下添加`wxapi.WXEntryActivity`文件，继承`WXCallbackActivity`

3. 微博

```xml
<activity
	android:name="com.umeng.socialize.editorpage.ShareActivity"
            android:theme="@style/Theme.UMDefault"
            android:excludeFromRecents="true"/>
```

android 需要编译出来的apk文件的签名和申请微信和QQ时填写的一致，开发过程中可以在build.gradle 文件加入以下代码

```
signingConfigs {
        debug {
            storeFile file('keystore 文件路径')
            storePassword "keydtore 密码"
            keyAlias "keydtore 别名"
            keyPassword "keydtore 别名密码"
        }
    }
```

### IOS


1. 在项目的的`Build Settings` 中搜索 `header` 找到 `Framework Search Paths` 
添加 `$(SRCROOT)/../node_modules/react-native-umeng-share-kit/ios/RNUmengShareKit/UMSocialSDK` 及 
`$(SRCROOT)/../node_modules/react-native-umeng-share-kit/ios/RNUmengShareKit/UMSocialUI`


2. 在项目的`Build Phases`中`Link Binary With Libraries`中添加 `UMSocialCore.framework`、`UMSocialNetwork.framework`、`UShareUI.framework`

3. 添加依赖库
	
	- CoreGraphics.framework
	- SystemConfiguration.framework
    - ImageIO.framework
	- libc++.tbd
	- libz.tbd
    - libsqlite3.tbd
	

4. 配置SSO白名单

```
<key>LSApplicationQueriesSchemes</key>
<array>
    <!-- 微信 URL Scheme 白名单-->
    <string>wechat</string>
    <string>weixin</string>

    <!-- 新浪微博 URL Scheme 白名单-->
    <string>sinaweibohd</string>
    <string>sinaweibo</string>
    <string>sinaweibosso</string>
    <string>weibosdk</string>
    <string>weibosdk2.5</string>

    <!-- QQ、Qzone URL Scheme 白名单-->
    <string>mqqapi</string>
    <string>mqq</string>
    <string>mqqOpensdkSSoLogin</string>
    <string>mqqconnect</string>
    <string>mqqopensdkdataline</string>
    <string>mqqopensdkgrouptribeshare</string>
    <string>mqqopensdkfriend</string>
    <string>mqqopensdkapi</string>
    <string>mqqopensdkapiV2</string>
    <string>mqqopensdkapiV3</string>
    <string>mqqopensdkapiV4</string>
    <string>mqzoneopensdk</string>
    <string>wtloginmqq</string>
    <string>wtloginmqq2</string>
    <string>mqqwpa</string>
    <string>mqzone</string>
    <string>mqzonev2</string>
    <string>mqzoneshare</string>
    <string>wtloginqzone</string>
    <string>mqzonewx</string>
    <string>mqzoneopensdkapiV2</string>
    <string>mqzoneopensdkapi19</string>
    <string>mqzoneopensdkapi</string>
    <string>mqqbrowser</string>
    <string>mttbrowser</string>

</array>
```

5. URL Scheme
	- 微信  
		直接填写微信AppKey，如：wx066e05f6c8b43e85
	- QQ
		需要添加两项URL Scheme：
        1、"tencent"+腾讯QQ互联应用appID  
        2、“QQ”+腾讯QQ互联应用appID转换成十六进制（不足8位前面补0）
        如appID：100424468 
        1、tencent100424468  
        2、QQ05fc5b14| QQ05fc5b14为100424468转十六进制而来，因不足8位向前补0，然后加"QQ"前缀
    - 新浪微博
    	“wb”+微博appKey，如：wb3921700954

6. 修改 `AppDelegate.m`

    ```oc
    #import <UMSocialCore/UMSocialCore.h>
    
    ...
    
    //#define __IPHONE_10_0    100000
    #if __IPHONE_OS_VERSION_MAX_ALLOWED > 100000
    - (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
    {
      //6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响。
      BOOL result = [[UMSocialManager defaultManager]  handleOpenURL:url options:options];
      if (!result) {
        // 其他如支付等SDK的回调
        // result = other;
      }
      return result;
    }
    
    #endif
    
    - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
    {
      //6.3的新的API调用，是为了兼容国外平台(例如:新版facebookSDK,VK等)的调用[如果用6.2的api调用会没有回调],对国内平台没有影响
      BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url sourceApplication:sourceApplication annotation:annotation];
      if (!result) {
        // 其他如支付等SDK的回调
        // result = other;
      }
      return result;
    }
    
    - (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url
    {
      BOOL result = [[UMSocialManager defaultManager] handleOpenURL:url];
      if (!result) {
        // 其他如支付等SDK的回调
        // result = other;
      }
      return result;
    }
    ```

### 使用方式

先初始化参数

```js
import UMSocial from 'react-native-umsocial';
...

// 第二个参数决定在分享界面的排序1_、2_、3_为前缀
UMSocial.initShare("友盟appkey", 
	{
        "1_weixin": {
            appKey: "",
            appSecret: "",
            redirectURL: "",
        },
        "2_qq": {
            appKey: "",
            appSecret: "",
            redirectURL: "",
        },
        "3_sina": {
            appKey: "",
            appSecret: "",
            redirectURL: "",
        },
    },
    false);
```

调用分享

```js
import UMSocial from 'react-native-umsocial';
...
UMSocial.share("标题", "简介", "缩略图地址", "链接地址")
.then(() => {
	// 成功
}, (error) => {
	// 失败
})
```

调用登录
```js
//platform 为 weixin/weibo/qq 中的一个
UMSocial.login(platform)
    .then((data) => {
        console.log(data);
    }, (error) => {
        console.log(error)
    })
```

### API

```js

/**
 * 初始化分享参数
 * @param appkey
 * @param sharePlatforms
 * @param debug
 */
initShare(appkey: string, sharePlatforms: Object, debug: boolean);

/**
 * 友盟默认UI分享
 * @param title
 * @param desc
 * @param thumb
 * @param link
 */
share(title, desc, thumb, link);

/**
 * 自定义UI, 微信分享
 * @param title
 * @param desc
 * @param thumb
 * @param link
 */
shareWeixin(title, desc, thumb, link);

/**
 * 自定义UI, 微信朋友圈分享
 * @param title
 * @param desc
 * @param thumb
 * @param link
 */
shareWeixinTimeLine(title, desc, thumb, link);

/**
 * 自定义UI, QQ分享
 * @param title
 * @param desc
 * @param thumb
 * @param link
 */
shareQQ(title, desc, thumb, link);

/**
 * 自定义UI, QQ空间分享
 * @param title
 * @param desc
 * @param thumb
 * @param link
 */
shareQzone(title, desc, thumb, link);

/**
 * 自定义UI, 微博分享
 * @param title
 * @param desc
 * @param thumb
 * @param link
 */
shareWeibo(title, desc, thumb, link);

/**
 * 登录验证，只返回openId和token，不返回用户资料
 * @param platform 平台：weixin/weibo/qq
 * @returns {Promise}
 */
auth(platform);

/**
 * 登录并获取用户资料
 * @param platform 平台：weixin/weibo/qq
 * @returns {Promise}
 */
login(platform);

/**
 * 判断app是否安装
 * @param platform 平台：weixin/weibo/qq
 * @returns {Promise}
 */
checkInstall(platform);
```
