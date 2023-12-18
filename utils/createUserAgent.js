// import os from 'os';
// import path from 'path';
// import fs from 'fs';
import moment from 'moment-timezone';
// import uv1 from 'uuid/v1';

// todo 将deviceId改为动态
// let deviceId;
// function getDeviceId() {
//     if (deviceId) return deviceId;
//     // 找到文件夹
//     try {
//         deviceId = readRuntimeValue('id', uv1);
//         return deviceId;
//     } catch (e) {
//         // 应该只是发生在开发或者测试环境
//         return os.hostname().replace('/', '');
//     }
// }
export function toAcceptLang() {
    return 'en' // Hard Coded
    // try {
    //     return 'en' // Hard coded
    //     // return osLocale.sync();
    // } catch (e) {
    //     return 'en';
    // }
}

// function getDeviceType (){
//     if (p === 'Linux') {
//         return p
//     } else if (p === 'Windows_NT') {
//         return 'Windows'
//     } else return 'Mac';
// }

export default function (numberId) {
    try {
        // 约定版本 软件版本 设备
        // 软件版本 = 固定/bundle/version/build

        const bundleId = 'com.dongwang.easypay';
        const buildNumber = '1';
        let version = "1.110";
        // try {
        //   version = electron.remote.app.getVersion();
        //   // eslint-disable-next-line no-empty
        // } catch (e) {}
        const software = `Fortune/${bundleId}/${version}/${buildNumber}`;
        // 设备 = name/id/country/local
        const deviceName = 'Unknown';
        // os.hostname()
        // const did = getDeviceId();
        let did
        try {
            did = 'web-' + numberId;
        } catch (err) {
            did = 'web-new';
        }

        const country = 'CN'; // TODO bad code
        const device = `${deviceName}/${did}/${country}/${toAcceptLang()}`
            .split(' ')
            .join('_');
        // timezone
        // 系统 = name/version/id
        const p = 'Browser'; // Hard coded. change when Webpack is configured

        // var pName = getDeviceType()
        // if (p === 'Linux') {
        //     pName = p;
        // } else if (p === 'Windows_NT') {
        //     pName = 'Windows';
        // } else pName = 'Mac';
        const system = `${p}/web/${did}`;

        // 其他属性分别用1 0 表示
        const flag = '00';
        return `1 ${software} ${device} ${moment.tz.guess()} ${system} ${flag}`;
    } catch (e) {
        console.error(e);
        return 'agent';
    }
}
