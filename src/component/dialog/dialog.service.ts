import {
    Injectable
} from '@angular/core';
import { AlertComponent } from './alert';
import { DynamicComponentService } from '../overlay/dynamic-component.service';

@Injectable()
export class DialogService<T> {

    private dialogInstance: AlertComponent;

    constructor(
        private dynamicComponentService: DynamicComponentService<AlertComponent>) {
    }

    createOverlay(type, content, title) {
        let componentRef = this.dynamicComponentService.createDynamicComponent(AlertComponent, '', window.document.body);

        this.dialogInstance = componentRef.instance;

        const config = {
            type: type,
            title: title,
            content: content
        };
        Object.keys(config).forEach(key => this.dialogInstance![key] = config[key]);
        this.dialogInstance.open();
    }

    info(content: string, title: string) {
        this.createOverlay('info', content, title);
    }

    error(content: string, title: string) {
        this.createOverlay('error', content, title);
    }

    success(content: string, title: string) {
        this.createOverlay('success', content, title);
    }
}
