import {
    Injectable
} from '@angular/core';
import { AlertComponent } from './alert';
import { OverlayService } from '../overlay/overlay.service';

@Injectable()
export class DialogService<T> {

    private dialogInstance: AlertComponent;

    constructor(
        private overlayService: OverlayService<AlertComponent>) {
    }

    createOverlay(type, content, title) {
        let componentRef = this.overlayService.createOverlayFromTemplate(AlertComponent, '', true);

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
