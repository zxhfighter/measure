export const dataSideBar = {
    title: '世界国家目录',
    expanded: true,
    root: '全部国家',
    tree: [
        {
            id: '1',
            name: '中国',
            children: [
                {
                    id: '01',
                    name: '华北',
                    parent: { id: '1' },
                    children: [
                        {
                            id: '0101',
                            name: '北京',
                            parent: { id: '01' },
                            children: [
                                {
                                    id: '010101',
                                    name: '东城区',
                                    parent: { id: '0101' },
                                },
                                {
                                    id: '010102',
                                    name: '西城区',
                                    parent: { id: '0101' },
                                },
                                {
                                    id: '010103',
                                    name: '朝阳区',
                                    parent: { id: '0101' },

                                },
                                {
                                    id: '010104',
                                    name: '海淀区',
                                    parent: { id: '0101' },
                                }
                            ]
                        },
                        {
                            id: '0102',
                            name: '天津',
                            parent: { id: '01' },
                            selectable: false,
                            children: [
                                {
                                    id: '010201',
                                    name: '南开区',
                                    parent: { id: '0102' },
                                },
                                {
                                    id: '010202',
                                    name: '和平区',
                                    parent: { id: '0102' },
                                },
                                {
                                    id: '010203',
                                    name: '河东区',
                                    parent: { id: '0102' },
                                },
                                {
                                    id: '010204',
                                    name: '河西区',
                                    parent: { id: '0102' },
                                }
                            ]
                        },
                        {
                            id: '0103',
                            name: '河北',
                            parent: { id: '01' },
                            children: [
                                {
                                    id: '010301',
                                    name: '石家庄',
                                    parent: { id: '0103' },
                                    children: [
                                        {
                                            id: '01030101',
                                            name: '桥西区',
                                            parent: { id: '010301' },
                                        },
                                        {
                                            id: '01030102',
                                            name: '新华区',
                                            parent: { id: '010301' },
                                        },
                                        {
                                            id: '01030103',
                                            name: '裕华区',
                                            parent: { id: '010301' },
                                        }
                                    ]
                                },
                                {
                                    id: '010302',
                                    name: '保定',
                                    parent: { id: '0103' },
                                    children: [
                                        {
                                            id: '01030201',
                                            name: '莲池区',
                                            parent: { id: '010302' },
                                        },
                                        {
                                            id: '01030202',
                                            name: '清苑区',
                                            parent: { id: '010302' },
                                        },
                                        {
                                            id: '01030203',
                                            name: '满城区',
                                            parent: { id: '010302' },
                                        }
                                    ]
                                },
                                {
                                    id: '010303',
                                    name: '衡水',
                                    parent: { id: '0103' },
                                    children: []
                                },
                                {
                                    id: '010304',
                                    name: '廊坊',
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
                    children: [
                        {
                            id: '0201',
                            name: '上海',
                            children: [
                                {
                                    id: '020101',
                                    name: '静安区',
                                },
                                {
                                    id: '020102',
                                    name: '浦东新区',
                                },
                                {
                                    id: '020103',
                                    name: '徐汇区',
                                },
                                {
                                    id: '020104',
                                    name: '长宁区',
                                },
                                {
                                    id: '020105',
                                    name: '虹口区',
                                }
                            ]
                        },
                        {
                            id: '0202',
                            name: '江苏',
                            children: [
                                {
                                    id: '020201',
                                    name: '南京',
                                    children: [
                                        {
                                            id: '02020101',
                                            name: '玄武区',
                                        },
                                        {
                                            id: '02020102',
                                            name: '建邺区',
                                        },
                                        {
                                            id: '02020103',
                                            name: '雨花台区',
                                        },
                                        {
                                            id: '02020104',
                                            name: '江宁区',
                                        }
                                    ]
                                },
                                {
                                    id: '020202',
                                    name: '苏州',
                                    children: [
                                        {
                                            id: '02020201',
                                            name: '姑苏区',
                                        },
                                        {
                                            id: '02020202',
                                            name: '吴中区',
                                        },
                                        {
                                            id: '02020203',
                                            name: '相城区',
                                        }
                                    ]
                                },
                                {
                                    id: '020203',
                                    name: '扬州',
                                    children: [
                                        {
                                            id: '02020301',
                                            name: '邗江区',
                                        },
                                        {
                                            id: '02020302',
                                            name: '江都区',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: '0203',
                            name: '浙江',
                            children: [
                                {
                                    id: '020301',
                                    name: '杭州',
                                    children: [
                                        {
                                            id: '02030101',
                                            name: '上城区',
                                        },
                                        {
                                            id: '02030102',
                                            name: '下城区',
                                        },
                                        {
                                            id: '02030103',
                                            name: '西湖区',
                                        },
                                        {
                                            id: '02030104',
                                            name: '江干区',
                                        },
                                        {
                                            id: '02030105',
                                            name: '滨江区',
                                        },
                                        {
                                            id: '02030106',
                                            name: '萧山区',
                                        },
                                        {
                                            id: '02030107',
                                            name: '拱墅区',
                                        }
                                    ]
                                },
                                {
                                    id: '020302',
                                    name: '宁波',
                                    children: [
                                        {
                                            id: '02030201',
                                            name: '江北区',
                                        },
                                        {
                                            id: '02030202',
                                            name: '鄞州区',
                                        },
                                        {
                                            id: '02030203',
                                            name: '海曙区',
                                        },
                                        {
                                            id: '02030204',
                                            name: '北仑区',
                                        }
                                    ]
                                },
                                {
                                    id: '020303',
                                    name: '温州',
                                    children: [
                                        {
                                            id: '02030301',
                                            name: '鹿城区',
                                        },
                                        {
                                            id: '02030302',
                                            name: '龙湾区',
                                        },
                                        {
                                            id: '02030303',
                                            name: '瓯海区',
                                        },
                                        {
                                            id: '02030304',
                                            name: '洞头区',
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
                    children: [
                        {
                            id: '0301',
                            name: '辽宁',
                            children: [
                                {
                                    id: '030101',
                                    name: '沈阳',
                                    children: [
                                        {
                                            id: '03010101',
                                            name: '和平区',
                                        },
                                        {
                                            id: '03010102',
                                            name: '沈河区',
                                        },
                                        {
                                            id: '03010103',
                                            name: '皇姑区',
                                        },
                                        {
                                            id: '03010104',
                                            name: '铁西区',
                                        }
                                    ]
                                },
                                {
                                    id: '030102',
                                    name: '大连',
                                    children: [
                                        {
                                            id: '03010201',
                                            name: '中山区',
                                        },
                                        {
                                            id: '03010202',
                                            name: '西岗区',
                                        },
                                        {
                                            id: '03010203',
                                            name: '沙河口区',
                                        }
                                    ]
                                },
                                {
                                    id: '030103',
                                    name: '鞍山',
                                    children: [
                                        {
                                            id: '03010301',
                                            name: '铁东区',
                                        },
                                        {
                                            id: '03010302',
                                            name: '铁西区',
                                        },
                                        {
                                            id: '03010303',
                                            name: '立山区',
                                        },
                                        {
                                            id: '03010304',
                                            name: '千山区',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: '0302',
                            name: '吉林',
                            children: [
                                {
                                    id: '030201',
                                    name: '长春',
                                    children: [
                                        {
                                            id: '03020101',
                                            name: '南关区',
                                        },
                                        {
                                            id: '03020102',
                                            name: '朝阳区',
                                        },
                                        {
                                            id: '03020103',
                                            name: '绿园区',
                                        }
                                    ]
                                },
                                {
                                    id: '030202',
                                    name: '吉林',
                                    children: [
                                        {
                                            id: '03020201',
                                            name: '船营区',
                                        },
                                        {
                                            id: '03020202',
                                            name: '龙潭区',
                                        },
                                        {
                                            id: '03020203',
                                            name: '丰满区',
                                        }
                                    ]
                                },
                                {
                                    id: '030203',
                                    name: '通化',
                                    children: [
                                        {
                                            id: '03020301',
                                            name: '东昌区',
                                        },
                                        {
                                            id: '03020302',
                                            name: '二道江区',
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: '0303',
                            name: '黑龙江',
                            children: [
                                {
                                    id: '030301',
                                    name: '哈尔滨',
                                    children: [
                                        {
                                            id: '03030101',
                                            name: '道里区',
                                        },
                                        {
                                            id: '03030102',
                                            name: '南岗区',
                                        },
                                        {
                                            id: '03030103',
                                            name: '道外区',
                                        }
                                    ]
                                },
                                {
                                    id: '030302',
                                    name: '齐齐哈尔',
                                    children: [
                                        {
                                            id: '03030201',
                                            name: '龙沙区',
                                        },
                                        {
                                            id: '03030202',
                                            name: '建华区',
                                        },
                                        {
                                            id: '03030203',
                                            name: '铁锋区',
                                        }
                                    ]
                                },
                                {
                                    id: '030303',
                                    name: '大庆',
                                    children: [
                                        {
                                            id: '03030301',
                                            name: '萨尔图区',
                                        },
                                        {
                                            id: '03030302',
                                            name: '龙凤区',
                                        },
                                        {
                                            id: '03030303',
                                            name: '让胡路区',
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
        },
        {
            id: '3',
            name: '日本',
        },
        {
            id: '4',
            name: '德国',
        },
        {
            id: '5',
            name: '其他',
        }
    ]
};
