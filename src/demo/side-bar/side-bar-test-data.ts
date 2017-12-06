export const dataSideBar = {
    title: '世界国家目录',
    expanded: false,
    root: '全部国家',
    tree: [
        {
            id: '1',
            name: '中国',
            selectable: true,
            isExpanded: true,
            isSelected: false,
            ico: 'custom',
            expandedIco: 'expanded',
            collapsedIco: 'collapsed',
            styleClass: 'selfStyle',
            children: [
                {
                    id: '01',
                    name: '华北',
                    selectable: true,
                    isExpanded: true,
                    isSelected: false,
                    parent: { id: '1' },
                    ico: 'custom',
                    expandedIco: 'expanded',
                    collapsedIco: 'collapsed',
                    styleClass: 'selfStyle',
                    children: [
                        {
                            id: '0101',
                            name: '北京',
                            selectable: true,
                            isExpanded: true,
                            isSelected: false,
                            ico: 'custom',
                            expandedIco: 'expanded',
                            collapsedIco: 'collapsed',
                            styleClass: 'selfStyle',
                            parent: { id: '01' },
                            children: [
                                {
                                    id: '010101',
                                    name: '东城区',
                                    selectable: true,
                                    isExpanded: true,
                                    isSelected: false,
                                    parent: { id: '0101' },
                                    children: [],
                                    ico: 'custom',
                                    expandedIco: 'expanded',
                                    collapsedIco: 'collapsed',
                                    styleClass: 'selfStyle',
                                },
                                {
                                    id: '010102',
                                    name: '西城区',
                                    selectable: true,
                                    isExpanded: true,
                                    isSelected: false,
                                    parent: { id: '0101' },
                                    children: [],
                                    ico: 'custom',
                                    expandedIco: 'expanded',
                                    collapsedIco: 'collapsed',
                                    styleClass: 'selfStyle',
                                },
                                {
                                    id: '010103',
                                    name: '朝阳区',
                                    selectable: true,
                                    isExpanded: true,
                                    isSelected: false,
                                    parent: { id: '0101' },
                                    children: [],
                                    ico: 'custom',
                                    expandedIco: 'expanded',
                                    collapsedIco: 'collapsed',
                                    styleClass: 'selfStyle',
                                },
                                {
                                    id: '010104',
                                    name: '海淀区',
                                    selectable: true,
                                    isExpanded: true,
                                    isSelected: false,
                                    parent: { id: '0101' },
                                    children: [],
                                    ico: 'custom',
                                    expandedIco: 'expanded',
                                    collapsedIco: 'collapsed',
                                    styleClass: 'selfStyle',
                                }
                            ]
                        },
                        {
                            id: '0102',
                            name: '天津',
                            selectable: false,
                            isExpanded: true,
                            isSelected: false,
                            ico: 'custom',
                            expandedIco: 'expanded',
                            collapsedIco: 'collapsed',
                            styleClass: 'selfStyle',
                            parent: { id: '01' },
                            children: [
                                {
                                    id: '010201',
                                    name: '南开区',
                                    isExpanded: true,
                                    parent: { id: '0102' },
                                    children: [],
                                    ico: 'custom',
                                    expandedIco: 'expanded',
                                    collapsedIco: 'collapsed',
                                    styleClass: 'selfStyle',
                                },
                                {
                                    id: '010202',
                                    name: '和平区',
                                    selectable: true,
                                    isExpanded: true,
                                    isSelected: false,
                                    parent: { id: '0102' },
                                    children: [],
                                    ico: 'custom',
                                    expandedIco: 'expanded',
                                    collapsedIco: 'collapsed',
                                    styleClass: 'selfStyle',
                                },
                                {
                                    id: '010203',
                                    name: '河东区',
                                    selectable: true,
                                    isExpanded: true,
                                    isSelected: false,
                                    parent: { id: '0102' },
                                    children: [],
                                    ico: 'custom',
                                    expandedIco: 'expanded',
                                    collapsedIco: 'collapsed',
                                    styleClass: 'selfStyle',
                                },
                                {
                                    id: '010204',
                                    name: '河西区',
                                    selectable: true,
                                    isExpanded: true,
                                    isSelected: false,
                                    parent: { id: '0102' },
                                    children: [],
                                    ico: 'custom',
                                    expandedIco: 'expanded',
                                    collapsedIco: 'collapsed',
                                    styleClass: 'selfStyle',
                                }
                            ]
                        },
                        {
                            id: '0103',
                            name: '河北',
                            selectable: true,
                            isExpanded: true,
                            isSelected: false,
                            ico: 'custom',
                            expandedIco: 'expanded',
                            collapsedIco: 'collapsed',
                            styleClass: 'selfStyle',
                            parent: { id: '01' },
                            children: [
                                {
                                    id: '010301',
                                    name: '石家庄',
                                    selectable: true,
                                    isExpanded: true,
                                    isSelected: false,
                                    ico: 'custom',
                                    expandedIco: 'expanded',
                                    collapsedIco: 'collapsed',
                                    styleClass: 'selfStyle',
                                    parent: { id: '0103' },
                                    children: [
                                        {
                                            id: '01030101',
                                            name: '桥西区',
                                            selectable: true,
                                            isExpanded: true,
                                            isSelected: false,
                                            parent: { id: '010301' },
                                            children: [],
                                            ico: 'custom',
                                            expandedIco: 'expanded',
                                            collapsedIco: 'collapsed',
                                            styleClass: 'selfStyle',
                                        },
                                        {
                                            id: '01030102',
                                            name: '新华区',
                                            selectable: true,
                                            isExpanded: true,
                                            isSelected: false,
                                            parent: { id: '010301' },
                                            children: [],
                                            ico: 'custom',
                                            expandedIco: 'expanded',
                                            collapsedIco: 'collapsed',
                                            styleClass: 'selfStyle',
                                        },
                                        {
                                            id: '01030103',
                                            name: '裕华区',
                                            selectable: true,
                                            isExpanded: true,
                                            isSelected: false,
                                            parent: { id: '010301' },
                                            children: [],
                                            ico: 'custom',
                                            expandedIco: 'expanded',
                                            collapsedIco: 'collapsed',
                                            styleClass: 'selfStyle',
                                        }
                                    ]
                                },
                                {
                                    id: '010302',
                                    name: '保定',
                                    selectable: true,
                                    isExpanded: true,
                                    isSelected: false,
                                    ico: 'custom',
                                    expandedIco: 'expanded',
                                    collapsedIco: 'collapsed',
                                    styleClass: 'selfStyle',
                                    parent: { id: '0103' },
                                    children: [
                                        {
                                            id: '01030201',
                                            name: '莲池区',
                                            selectable: true,
                                            isExpanded: true,
                                            isSelected: false,
                                            parent: { id: '010302' },
                                            children: [],
                                            ico: 'custom',
                                            expandedIco: 'expanded',
                                            collapsedIco: 'collapsed',
                                            styleClass: 'selfStyle',
                                        },
                                        {
                                            id: '01030202',
                                            name: '清苑区',
                                            selectable: true,
                                            isExpanded: true,
                                            isSelected: false,
                                            parent: { id: '010302' },
                                            children: [],
                                            ico: 'custom',
                                            expandedIco: 'expanded',
                                            collapsedIco: 'collapsed',
                                            styleClass: 'selfStyle',
                                        },
                                        {
                                            id: '01030203',
                                            name: '满城区',
                                            selectable: true,
                                            isExpanded: true,
                                            isSelected: false,
                                            parent: { id: '010302' },
                                            children: [],
                                            ico: 'custom',
                                            expandedIco: 'expanded',
                                            collapsedIco: 'collapsed',
                                            styleClass: 'selfStyle',
                                        }
                                    ]
                                },
                                {
                                    id: '010303',
                                    name: '衡水',
                                    selectable: true,
                                    isExpanded: true,
                                    isSelected: false,
                                    ico: 'custom',
                                    expandedIco: 'expanded',
                                    collapsedIco: 'collapsed',
                                    styleClass: 'selfStyle',
                                    parent: { id: '0103' },
                                    children: []
                                },
                                {
                                    id: '010304',
                                    name: '廊坊',
                                    selectable: true,
                                    isExpanded: true,
                                    isSelected: false,
                                    ico: 'custom',
                                    expandedIco: 'expanded',
                                    collapsedIco: 'collapsed',
                                    styleClass: 'selfStyle',
                                    parent: { id: '0103' },
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '02',
                    name: '华东',
                    selectable: true,
                    isExpanded: false,
                    ico: 'custom',
                    children: [
                        {
                            id: '0201',
                            name: '上海',
                            selectable: true,
                            isExpanded: false,
                            ico: 'custom',
                            children: [
                                {
                                    id: '020101',
                                    name: '静安区',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                },
                                {
                                    id: '020102',
                                    name: '浦东新区',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                },
                                {
                                    id: '020103',
                                    name: '徐汇区',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                },
                                {
                                    id: '020104',
                                    name: '长宁区',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                },
                                {
                                    id: '020105',
                                    name: '虹口区',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                }
                            ]
                        },
                        {
                            id: '0202',
                            name: '江苏',
                            selectable: true,
                            isExpanded: false,
                            ico: 'custom',
                            children: [
                                {
                                    id: '020201',
                                    name: '南京',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '02020101',
                                            name: '玄武区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02020102',
                                            name: '建邺区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02020103',
                                            name: '雨花台区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02020104',
                                            name: '江宁区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                },
                                {
                                    id: '020202',
                                    name: '苏州',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '02020201',
                                            name: '姑苏区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02020202',
                                            name: '吴中区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02020203',
                                            name: '相城区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                },
                                {
                                    id: '020203',
                                    name: '扬州',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '02020301',
                                            name: '邗江区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02020302',
                                            name: '江都区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: '0203',
                            name: '浙江',
                            selectable: true,
                            isExpanded: false,
                            ico: 'custom',
                            children: [
                                {
                                    id: '020301',
                                    name: '杭州',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '02030101',
                                            name: '上城区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02030102',
                                            name: '下城区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02030103',
                                            name: '西湖区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02030104',
                                            name: '江干区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02030105',
                                            name: '滨江区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02030106',
                                            name: '萧山区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02030107',
                                            name: '拱墅区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                },
                                {
                                    id: '020302',
                                    name: '宁波',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '02030201',
                                            name: '江北区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02030202',
                                            name: '鄞州区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02030203',
                                            name: '海曙区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02030204',
                                            name: '北仑区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                },
                                {
                                    id: '020303',
                                    name: '温州',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '02030301',
                                            name: '鹿城区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02030302',
                                            name: '龙湾区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02030303',
                                            name: '瓯海区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '02030304',
                                            name: '洞头区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '03',
                    name: '东北',
                    selectable: true,
                    isExpanded: false,
                    ico: 'custom',
                    children: [
                        {
                            id: '0301',
                            name: '辽宁',
                            selectable: true,
                            isExpanded: false,
                            ico: 'custom',
                            children: [
                                {
                                    id: '030101',
                                    name: '沈阳',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '03010101',
                                            name: '和平区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03010102',
                                            name: '沈河区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03010103',
                                            name: '皇姑区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03010104',
                                            name: '铁西区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                },
                                {
                                    id: '030102',
                                    name: '大连',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '03010201',
                                            name: '中山区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03010202',
                                            name: '西岗区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03010203',
                                            name: '沙河口区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                },
                                {
                                    id: '030103',
                                    name: '鞍山',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '03010301',
                                            name: '铁东区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03010302',
                                            name: '铁西区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03010303',
                                            name: '立山区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03010304',
                                            name: '千山区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: '0302',
                            name: '吉林',
                            selectable: true,
                            isExpanded: false,
                            ico: 'custom',
                            children: [
                                {
                                    id: '030201',
                                    name: '长春',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '03020101',
                                            name: '南关区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03020102',
                                            name: '朝阳区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03020103',
                                            name: '绿园区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                },
                                {
                                    id: '030202',
                                    name: '吉林',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '03020201',
                                            name: '船营区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03020202',
                                            name: '龙潭区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03020203',
                                            name: '丰满区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                },
                                {
                                    id: '030203',
                                    name: '通化',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '03020301',
                                            name: '东昌区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03020302',
                                            name: '二道江区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: '0303',
                            name: '黑龙江',
                            selectable: true,
                            isExpanded: false,
                            ico: 'custom',
                            children: [
                                {
                                    id: '030301',
                                    name: '哈尔滨',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '03030101',
                                            name: '道里区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03030102',
                                            name: '南岗区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03030103',
                                            name: '道外区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                },
                                {
                                    id: '030302',
                                    name: '齐齐哈尔',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '03030201',
                                            name: '龙沙区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03030202',
                                            name: '建华区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03030203',
                                            name: '铁锋区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                },
                                {
                                    id: '030303',
                                    name: '大庆',
                                    selectable: true,
                                    isExpanded: false,
                                    ico: 'custom',
                                    children: [
                                        {
                                            id: '03030301',
                                            name: '萨尔图区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03030302',
                                            name: '龙凤区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        },
                                        {
                                            id: '03030303',
                                            name: '让胡路区',
                                            selectable: true,
                                            isExpanded: false,
                                            ico: 'custom',
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: '2',
            name: '美国',
            selectable: true,
            isExpanded: true,
            isSelected: false,
            ico: 'custom',
            expandedIco: 'expanded',
            collapsedIco: 'collapsed',
            styleClass: 'selfStyle'
        },
        {
            id: '3',
            name: '日本',
            selectable: true,
            isExpanded: true,
            isSelected: false,
            ico: 'custom',
            expandedIco: 'expanded',
            collapsedIco: 'collapsed',
            styleClass: 'selfStyle'
        },
        {
            id: '4',
            name: '德国',
            selectable: true,
            isExpanded: true,
            isSelected: false,
            ico: 'custom',
            expandedIco: 'expanded',
            collapsedIco: 'collapsed',
            styleClass: 'selfStyle'
        },
        {
            id: '5',
            name: '其他',
            selectable: true,
            isExpanded: true,
            isSelected: false,
            ico: 'custom',
            expandedIco: 'expanded',
            collapsedIco: 'collapsed',
            styleClass: 'selfStyle'
        }
    ]
};