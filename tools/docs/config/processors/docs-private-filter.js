const INTERNAL_METHODS = [
    // 生命周期
    'ngOnInit',
    'ngOnChanges',
    'ngDoCheck',
    'ngAfterContentInit',
    'ngAfterContentChecked',
    'ngAfterViewInit',
    'ngAfterViewChecked',
    'ngOnDestroy',

    // 校验事件
    'registerOnValidatorChange',
    'validate',

    // 鼠标事件
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',

    // 双向绑定
    'writeValue',
    'registerOnChange',
    'registerOnTouched',
    'setDisabledState',

    // 构造器
    'constructor'
];

module.exports = function docsPrivateFilter() {
    return {
        $runBefore: ['categorizer'],
        $process: docs => docs.filter(doc => isPublicDoc(doc))
    };
};

function isPublicDoc(doc) {
    if (hasDocsPrivateTag(doc)) {
        return false;
    } else if (doc.docType === 'member') {
        return !isInternalMember(doc);
    } else if (doc.docType === 'class') {
        doc.members = doc.members.filter(memberDoc => isPublicDoc(memberDoc));
    }

    return true;
}

// 过滤内部成员
function isInternalMember(memberDoc) {
    return INTERNAL_METHODS.includes(memberDoc.name)
}

// 过滤 docs-private 标记
function hasDocsPrivateTag(doc) {
    let tags = doc.tags && doc.tags.tags;
    return tags ? tags.find(d => d.tagName == 'docs-private') : false;
}
