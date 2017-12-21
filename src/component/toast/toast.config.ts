import { Injectable } from '@angular/core';

@Injectable()
export class ToastConfig {
    // For all toast as default config (can override when dynamically created)
    duration?: number;
    animate?: boolean;
}

export class ToastData {
    // For string content
    type?: 'success' | 'info' | 'warn' | 'error' | string;
    content?: string;
}

export class ToastDataFilled extends ToastData {
    // Toast unique id, auto generated
    toastId: string;
    state?: 'enter' | 'leave';
    options?: ToastConfig;
    // Auto created
    createdAt: Date;
}
