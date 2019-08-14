import {
    Component, Input, Output, EventEmitter, ChangeDetectorRef, forwardRef,
    OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef
} from '@angular/core';
import { OnChange } from '../core/decorators';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface Message {
    severity: string;
    message: string;
    id?: any;
}

/*
 * Provider Expression that allows component to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const UPLOADER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UploaderComponent),
    multi: true
};

@Component({
    selector: 'nb-uploader',
    templateUrl: './uploader.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    host: {
        'class': 'nb-widget nb-uploader',
        '[class.nb-uploader-horizontal]': 'direction==="horizontal"',
        '[class.nb-uploader-vertical]': 'direction==="vertical"'

    },
    exportAs: 'nbUploader'
})
export class UploaderComponent implements OnInit {

    /**
     * 上传提交的URL
     */
    @Input() url: string;

    /**
     * 上传模式包括图片上传和文件上传
     * @default 'image'
     */
    @Input() mode: string = 'image';

    /**
     * 可上传的文件类型
     * @default 'image/*'
     */
    @Input() accept: string = 'image/*';

    /**
     * 上传进度包括百分比和进度条
     * @default 'text'
     */
    @Input() progressMode: string = 'text';

    /**
     * 已上传文件列表
     */
    _files: any[] = [];
    @Input() set files(data) {
        this._files = data;
        this._files.forEach((file) => {
            file.state = 'success';
        });
    }

    get files() {
        return this._files;
    }

    /**
     * 布局方式，'horizontal' | 'vertical'
     * @default 'horizontal'
     */
    @Input() direction: string = 'horizontal';

    /**
     * 限制文件的大小
     */
    @Input() maxFileSize: number;

    /**
     * 限制文件的数量
     */
    @Input() maxFileCount: number;

    /**
     * 文件数量不符合要求的提示信息
     * @default '文件的数量超过限制'
     */
    @Input() invalidFileCountMessage: string = '文件的数量超过限制';

    /**
     * 文件大小不符合要求的提示信息
     * @default '文件的大小不符合要求'
     */
    @Input() invalidFileSizeMessage: string = '{0}: 文件的大小不符合要求';

    /**
     * 文件类型不符合要求的提示信息
     * @default '文件的类型不符合要求'
     */
    @Input() invalidFileTypeMessage: string = '{0}: 文件的类型不符合要求';

    /**
     * 上传失败的提示信息
     * @default '上传失败'
     */
    @Input() uploadFailedMessage: string = '上传失败';

    /**
     * 上传是否是禁用状态
     * @default false
     */
    @OnChange(true)
    @Input() disabled: boolean = false;

    /**
     * 跨域请求中是否携带cookie
     */
    @Input() withCredentials: boolean;

    @Output() onBeforeUpload: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeSend: EventEmitter<any> = new EventEmitter();

    @Output() onSuccess: EventEmitter<any> = new EventEmitter();

    @Output() onError: EventEmitter<any> = new EventEmitter();

    @Output() onClear: EventEmitter<any> = new EventEmitter();

    @Output() onRemove: EventEmitter<any> = new EventEmitter();

    @Output() onSelect: EventEmitter<any> = new EventEmitter();

    @Output() onProgress: EventEmitter<any> = new EventEmitter();

    /**
     * Input上传控件
     * @default false
     */
    @ViewChild('uploadInput', {static: false}) uploadInput: ElementRef;

    /**
     * 错误信息集合
     *
     * @docs-private
     */
    msgs: Message[];

    /**
     * 重新上传中被替换的文件
     */
    private _replacingFile: any = null;

    private _method: string = 'POST';

    constructor(
        public sanitizer: DomSanitizer,
        private cdRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
        this.validateFileCount([]);
    }

    /**
     * 选择待上传的文件
     *
     * @param {object} event - 文件选择事件
     * @docs-private
     */
    onFileSelect(event) {
        this.msgs = [];

        const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        this.validateFiles(files);
    }

    /**
     * 文件验证通过后上传
     *
     * @param {object} files - 待上传文件
     */
    private validateFiles(files) {
        if (this.validateFileCount(files)) {
            for (let i = 0; i < files.length; i++) {
                let file = files[i];
                if (this.validate(file)) {
                    // 预览图片
                    if (this.isImage(file)) {
                        file.url = this.sanitizer
                            .bypassSecurityTrustUrl((window.URL.createObjectURL(file)));
                    }
                    file.state = 'toBeUpload';
                    if (this._replacingFile) {
                        this.files.splice(this.files.indexOf(this._replacingFile), 1, file);
                        this._replacingFile = null;
                    }
                    else {
                        this.files.push(file);
                    }
                } else {
                    this.validateFileCount([]);
                }
            }
        }

        this._updateFormModel();

        this.files.forEach(file => {
            if (file.state === 'toBeUpload') {
              this.upload(file);
            }
        });
    }

    /**
     * 清空上传Input所持有的文件，避免上传同一文件不触发change事件
     *
     * @param {object} files - 待上传文件
     */
    clearInputElement() {
        if (this.uploadInput && this.uploadInput.nativeElement) {
            this.uploadInput.nativeElement.value = '';
        }
    }

    /**
     * 上传文件
     *
     * @param {object} files - 待上传文件
     */
    private upload(file) {
        file.state = 'uploading';
        this.clearInputElement();

        let xhr = new XMLHttpRequest();
        file.xhr = xhr;

        this.onBeforeUpload.emit({
            'xhr': xhr,
            'file': file
        });

        let formData = new FormData();
        formData.append('file', file, file.name);

        xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
            if (e.lengthComputable) {
                file.progress = Math.round((e.loaded * 100) / e.total);
                this.cdRef.markForCheck();
            }

            this.onProgress.emit({ originalEvent: e, progress: file.progress });
        }, false);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                file.progress = 0;

                if (xhr.status >= 200 && xhr.status < 300) {
                    this.onSuccess.emit({ xhr: xhr, file: file });
                    file.state = 'success';
                    file.xhr = null;
                    // 调用回调函数

                }
                else {
                    this.onError.emit({ xhr: xhr, file: file });
                    file.state = 'error';
                    this.cdRef.markForCheck();
                    file.xhr = null;
                }
            }
        };

        xhr.open(this._method, this.url, true);

        this.onBeforeSend.emit({
            'xhr': xhr,
            'file': file
        });

        xhr.withCredentials = this.withCredentials;

        xhr.send(formData);
    }

    /**
     * 验证文件的类型、大小
     *
     * @param {object} files - 待上传文件
     */
    private validate(file: File): boolean {
        if (this.accept && !this.isFileTypeValid(file)) {
            this.msgs.push({
                severity: 'error',
                message: this.invalidFileTypeMessage.replace('{0}', file.name),
            });
            return false;
        }

        if (this.maxFileSize && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                message: this.invalidFileSizeMessage.replace('{0}', file.name),
            });
            return false;
        }

        return true;
    }

    /**
     * 验证文件的数量是否超过上限
     *
     * @param {object} files - 待上传文件
     * @return {boolean} 是否通过验证
     */
    private validateFileCount(files): boolean {
        // 上传的文件数量超过上限，显示错误提示
        if (this.files.length + files.length > this.maxFileCount) {
            this.msgs.push({
                severity: 'error',
                message: this.invalidFileCountMessage,
            });
            return false;
        }
        // 上传的文件数量达到上限，置灰上传按钮
        else if (this.files.length + files.length === +this.maxFileCount) {
            this.setDisabledState(true);
        }
        // 否则，点亮上传按钮
        else {
            this.setDisabledState(false);
        }

        return true;

    }

    /**
     * 验证文件的类型是否符合要求
     *
     * @param {object} file - 待上传文件
     * @return {boolean} 是否通过验证
     */
    private isFileTypeValid(file: File): boolean {
        let acceptableTypes = this.accept.split(',');
        for (let type of acceptableTypes) {
            type = type.trim();
            let acceptable = this.isWildcard(type) ?
                this.getTypeClass(file.type) === this.getTypeClass(type) :
                file.type === type || this.getFileExtension(file) === type;

            if (acceptable) {
                return true;
            }
        }

        return false;
    }

    /**
     * 文件类型是否包含通配符
     *
     * @param {string} fileType - 文件类型
     * @return {boolean} 是否通过验证
     */
    private isWildcard(fileType: string): boolean {
        return fileType.indexOf('*') !== -1;
    }

    /**
     * 获取文件的第一类型
     *
     * @param {string} fileType - 文件类型
     * @return {string} 文件的第一类型，如image、file
     */
    private getTypeClass(fileType: string): string {
        return fileType.substring(0, fileType.indexOf('/'));
    }

    /**
     * 获取文件名后缀
     *
     * @param {string} file - 待上传文件
     * @return {string} 文件名后缀
     */
    private getFileExtension(file: File): string {
        return '.' + file.name.split('.').pop();
    }

    /**
     * 将文件原始大小的字节数格式化成可读性更好的单位数
     *
     * @param {number} bytes - 字节数
     * @return {string} 带有单位的文件大小
     */
    private formatSize(bytes) {
        if (bytes === 0) {
            return '0 B';
        }
        let k = 1000,
            dm = 3,
            sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    /**
     * 是否为图片
     *
     * @param {object} file - 待上传的文件
     * @return {boolean} 是否为图片
     */
    private isImage(file: File): boolean {
        return /^image\//.test(file.type);
    }

    /**
     * 取消上传中的文件
     *
     * @param {object} file - 上传中的文件
     * @docs-private
     */
    onCancelFile(file) {
        if (file.xhr) {
            file.xhr.abort();
        }
        this.onRemoveFile(file);
    }

    /**
     * 删除已上传的文件
     *
     * @param {object} file - 已上传的文件
     * @docs-private
     */
    onRemoveFile(file) {
        this.files.splice(this.files.indexOf(file), 1);
        this._updateFormModel();
        this.validateFileCount([]);
        this.onRemove.emit({ file: file });
    }

    /**
     * 上传失败后重新上传当前文件
     *
     * @param {object} file - 上传失败的文件
     * @docs-private
     */
    onReuploadFile(file) {
        this.upload(file);
    }

    /**
     * 上次成功后重新选择其他文件上传
     *
     * @param {object} file - 待上传的文件
     * @docs-private
     */
    onReplaceFile(file) {
        this._replacingFile = file;
    }

    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     */
    private writeValue(value: any[]) {
        if (value) {
            this.files = value;

            // when init, set children toggle button state
            this.files.forEach(file => {
                this.validateFiles(file);
            });
        }
    }

    /**
     * The method to be called in order to update ngModel.
     * Now `ngModel` binding is not supported in multiple selection mode.
     */
    private _onModelChange: Function;

    /**
     * Registers a callback that will be triggered when the value has changed.
     * Implemented as part of ControlValueAccessor.
     * @param fn On change callback function.
     */
    registerOnChange(fn: Function) {
        this._onModelChange = fn;
    }

    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    private _onTouch: Function;

    /**
     * Registers a callback that will be triggered when the control has been touched.
     * Implemented as part of ControlValueAccessor.
     * @param fn On touch callback function.
     */
    registerOnTouched(fn: Function) {
        this._onTouch = fn;
    }

    /**
     * Toggles the disabled state of the component. Implemented as part of ControlValueAccessor.
     * @param isDisabled Whether the component should be disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.cdRef.markForCheck();
    }

    /**
     * 用于Form中的数据接口
     */
    _updateFormModel() {
        if (this._onModelChange) {
            this._onModelChange(this.files);
        }

        if (this._onTouch) {
            this._onTouch(this.files);
        }
    }
}
