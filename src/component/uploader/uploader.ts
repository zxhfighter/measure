import {
    Component, Input, Output, EventEmitter, ChangeDetectorRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy
} from '@angular/core';

export interface Message {
    severity?: string;
    summary?: string;
    detail?: string;
    id?: any;
}

// TODO 可能没有必要
interface FormData {
    append(name: string, value: string | Blob, fileName?: string): void;
    delete(name: string): void;
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: string | Blob, fileName?: string): void;
}

@Component({
    selector: 'nb-uploader',
    templateUrl: './uploader.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-uploader'
    },
    exportAs: 'nbUploader'
})
export class UploaderComponent implements OnInit {

    @Input() name: string;

    @Input() url: string;

    @Input() method: string = 'POST';

    @Input() multiple: boolean;

    // 暂时不定位file type
    // @Input() files: File[];
    @Input() files: any[] = [];
    // @Input() set placement(data) {
    //     this._placement = data;
    //     this.firstPlacement = this._placement.split('-')[0];
    // }

    // get placement () {
    //     return this._placement;
    // }

    @Input() auto: boolean = true;

    @Input() accept: string;

    @Input() maxFileSize: number;

    @Input() withCredentials: boolean;

    @Input() invalidFileSizeMessageSummary: string = '{0}: Invalid file size, ';

    @Input() invalidFileSizeMessageDetail: string = 'maximum upload size is {0}.';

    @Input() invalidFileTypeMessageSummary: string = '{0}: Invalid file type, ';

    @Input() invalidFileTypeMessageDetail: string = 'allowed file types: {0}.';

    @Output() onBeforeUpload: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeSend: EventEmitter<any> = new EventEmitter();

    @Output() onUpload: EventEmitter<any> = new EventEmitter();

    @Output() onError: EventEmitter<any> = new EventEmitter();

    @Output() onClear: EventEmitter<any> = new EventEmitter();

    @Output() onRemove: EventEmitter<any> = new EventEmitter();

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Output() onProgress: EventEmitter<any> = new EventEmitter();

    @Output() uploadHandler: EventEmitter<any> = new EventEmitter();

    msgs: Message[];

    progress: number;

    /**
     * 文件上传的状态
     * 'uploading' | 'success' | 'error'
     */
    state: string;

    constructor(
        private cdRef: ChangeDetectorRef
    ) {

    }

    ngOnInit() {
        console.log(this.files);
    }

    onFileSelect(event) {
        this.msgs = [];
        // if (!this.multiple) {
        //     this.files = [];
        // }

        let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (this.validate(file)) {
                if (this.isImage(file)) {
                    // file.objectURL = this.sanitizer
                        // .bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
                }

                this.files.push(files[i]);
            }
        }

        this.onSelect.emit({originalEvent: event, files: files});

        if (this.hasFiles() && this.auto) {
            this.state = 'uploading';
            this.cdRef.markForCheck();
            this.upload();
        }

        this.clearInputElement();
    }

    upload() {
        this.msgs = [];
        let xhr = new XMLHttpRequest(),
        formData = new FormData();

        this.onBeforeUpload.emit({
            'xhr': xhr,
            'formData': formData
        });

        for (let i = 0; i < this.files.length; i++) {
            formData.append(this.name, this.files[i], this.files[i].name);
        }

        xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
            if (e.lengthComputable) {
                this.progress = Math.round((e.loaded * 100) / e.total);
                this.cdRef.markForCheck();
            }

            this.onProgress.emit({originalEvent: e, progress: this.progress});
        }, false);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this.progress = 0;

                if (xhr.status >= 200 && xhr.status < 300) {
                    this.onUpload.emit({xhr: xhr, files: this.files});
                    this.state = 'success';
                    // 调用回调函数
                }
                else {
                    this.onError.emit({xhr: xhr, files: this.files});
                    this.state = 'error';
                }
                // TODO 先注释掉
                // this.clear();
            }
        };

        xhr.open(this.method, this.url, true);
        xhr.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
        xhr.setRequestHeader('x-requested-with', 'XMLHttpRequest');

        this.onBeforeSend.emit({
            'xhr': xhr,
            'formData': formData
        });

        xhr.withCredentials = this.withCredentials;

        xhr.send(formData);
    }

    validate(file: File): boolean {
        if (this.accept && !this.isFileTypeValid(file)) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept)
            });
            return false;
        }

        if (this.maxFileSize  && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
            });
            return false;
        }

        return true;
    }

    isFileTypeValid(file: File): boolean {
        let acceptableTypes = this.accept.split(',');
        for (let type of acceptableTypes) {
            let acceptable = this.isWildcard(type) ?
                this.getTypeClass(file.type) === this.getTypeClass(type) :
                file.type === type || this.getFileExtension(file) === type;

            if (acceptable) {
                return true;
            }
        }

        return false;
    }

    isWildcard(fileType: string): boolean {
        return fileType.indexOf('*') !== -1;
    }

    getTypeClass(fileType: string): string {
        return fileType.substring(0, fileType.indexOf('/'));
    }

    getFileExtension(file: File): string {
        return '.' + file.name.split('.').pop();
    }

    formatSize(bytes) {
        if (bytes === 0) {
            return '0 B';
        }
        let k = 1000,
        dm = 3,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    isImage(file: File): boolean {
        return /^image\//.test(file.type);
    }

    hasFiles(): boolean {
        return this.files && this.files.length > 0;
    }

    clearInputElement() {
        // TODO 还应该有个input file用于重新上传
        // let inputViewChild = this.advancedFileInput||this.basicFileInput;
        // if(inputViewChild && inputViewChild.nativeElement) {
        //     inputViewChild.nativeElement.value = '';
        // }
    }

    clear() {
        this.files = [];
        this.onClear.emit();
        this.clearInputElement();
    }
}
