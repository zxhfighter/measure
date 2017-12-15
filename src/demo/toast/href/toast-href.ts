import { Component } from '@angular/core';
import { ToastService } from '../../../component';

interface msgData {
    type: 'success' | 'info' | 'warn' | 'error' | string;
    message: string;
    duration?: number;
}

@Component({
    selector: 'demo-toast-href',
    templateUrl: './toast-href.html',
    styleUrls: ['./toast-href.less']
})
export class ToastHrefDemo {
    private messages: msgData[] = [
        {
            type: 'success',
            message: '恭喜您，您的请求已成功处理',
            duration: 3000
        },
        {
            type: 'warn',
            message: '警告，请确认后再操作',
            duration: 3000
        },
        {
            type: 'info',
            message: '提醒，您的报价低于计划预期',
            duration: 3000
        },
        {
            type: 'error',
            message: '错误，系统未知错误',
            duration: 3000
        }
    ];

    constructor(protected toastService: ToastService) {
    }

    messageMap() {
        return this.messages.reduce((result, current) => {
            result[current.type] = current;
            return result;
        }, {});
    }

    showToast(type: string) {
        if (type === 'all') {
            this.messages.forEach(({type, message, duration}) => {
                this.toastService.create(type, message, {
                    duration: duration
                });
            });
        }
        else {
            let options = this.messageMap()[type];
            this.toastService.create(options.type, options.message, {
                duration: options.duration
            });
        }
    }
}
