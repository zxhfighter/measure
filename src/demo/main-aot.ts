/**
 * @file entry file for aot
 * @author zengxiaohui(csu.zengxiaohui@gmail.com)
 */

import {platformBrowser} from '@angular/platform-browser';
import {enableProdMode} from '@angular/core';
import {AppModuleNgFactory} from '../../aot/src/demo/app.module.ngfactory';

enableProdMode();

export function main(): Promise<any> {
    return platformBrowser()
        .bootstrapModuleFactory(AppModuleNgFactory)
        .then(success => {console.log(success);})
        .catch(err => console.log(err));
}

export function bootstrapDomReady() {
    document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
