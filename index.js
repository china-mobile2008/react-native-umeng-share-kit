
'use strict';

import {
    NativeModules,
    Platform,
    NativeEventEmitter
} from 'react-native';

const RNUmengShareKit = NativeModules.RNUmengShareKit;


class UMSocial extends NativeEventEmitter {

    // 构造
    constructor(props) {
        super(RNUmengShareKit);

        // 初始状态
        this.state = {};
    }

    /**
     * 初始化分享参数
     * @param appkey
     * @param sharePlatforms
     * @param debug
     */
    initShare(appkey: string, sharePlatforms: Object, debug: boolean) {

        RNUmengShareKit.initShare(appkey, sharePlatforms, debug);
    }

    /**
     *
     * @param title
     * @param desc
     * @param thumb
     * @param link
     */
    share(title, desc, thumb, link) {

        return new Promise(function (callback, errorCallback) {
            RNUmengShareKit.share(title, desc, thumb, link)
                .then((data) => {
                callback(data);
            }, (error) => {
                errorCallback(error);
            });
        });

    }

    /**
     * 微信分享
     * @param title
     * @param desc
     * @param thumb
     * @param link
     */
    shareWeixin(title, desc, thumb, link) {

        return new Promise(function (callback, errorCallback) {
            RNUmengShareKit.shareWithPlatformType(1, title, desc, thumb, link)
                .then((data) => {
                callback(data);
        }, (error) => {
                errorCallback(error);
            });
        });

    }

    /**
     * 微信朋友圈分享
     * @param title
     * @param desc
     * @param thumb
     * @param link
     */
    shareWeixinTimeLine(title, desc, thumb, link) {

        return new Promise(function (callback, errorCallback) {
            RNUmengShareKit.shareWithPlatformType(2, title, desc, thumb, link)
                .then((data) => {
                callback(data);
        }, (error) => {
                errorCallback(error);
            });
        });

    }

    /**
     * QQ分享
     * @param title
     * @param desc
     * @param thumb
     * @param link
     */
    shareQQ(title, desc, thumb, link) {

        return new Promise(function (callback, errorCallback) {
            RNUmengShareKit.shareWithPlatformType(4, title, desc, thumb, link)
                .then((data) => {
                callback(data);
        }, (error) => {
                errorCallback(error);
            });
        });

    }

    /**
     * QQ空间分享
     * @param title
     * @param desc
     * @param thumb
     * @param link
     */
    shareQzone(title, desc, thumb, link) {

        return new Promise(function (callback, errorCallback) {
            RNUmengShareKit.shareWithPlatformType(5, title, desc, thumb, link)
                .then((data) => {
                callback(data);
        }, (error) => {
                errorCallback(error);
            });
        });

    }

    /**
     * 微博分享
     * @param title
     * @param desc
     * @param thumb
     * @param link
     */
    shareWeibo(title, desc, thumb, link) {

        return new Promise(function (callback, errorCallback) {
            RNUmengShareKit.shareWithPlatformType(0, title, desc, thumb, link)
                .then((data) => {
                callback(data);
        }, (error) => {
                errorCallback(error);
            });
        });

    }

    /**
     * 登录
     * @param platform weixin,weibo,qq
     * @returns {Promise}
     */
    auth(platform) {
        return new Promise(function(callback, errorCallback) {
            RNUmengShareKit.auth(platform)
            .then((data) => {
                callback(data);
            }, (error) => {
                errorCallback(error);
            });
        });
    }

    /**
     * 登录并获取信息
     * @param platform weixin,weibo,qq
     * @returns {Promise}
     */
    login(platform) {
        return new Promise(function(callback, errorCallback) {
            RNUmengShareKit.login(platform)
            .then((data) => {
                callback(data);
            }, (error) => {
                errorCallback(error);
            });
        });
    }

    /**
     * 是否安装
     * @param platform weixin,weibo,qq
     * @returns {Promise}
     */
    checkInstall(platform) {
        return new Promise(function(callback, errorCallback) {
            RNUmengShareKit.checkInstall(platform)
            .then((data) => {
                callback(data);
            });
        });
    }

}

const UMSocialInstance = new UMSocial();

module.exports = UMSocialInstance;