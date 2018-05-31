// export function deepClone(obj: any) {
//     return JSON.parse(JSON.stringify(obj));
// }

function getDataType(data: any) {
    const dataType = Object.prototype.toString.call(data);
    if (dataType === '[object Object]') {
        return 'Object';
    }
    if (dataType === '[object Array]') {
        return 'Array';
    }
    if (dataType === '[object Number]') {
        return 'Number';
    }
    if (dataType === '[object String]') {
        return 'String';
    }
    if (dataType === '[object Boolean]') {
        return 'Boolean';
    }
    if (dataType === '[object Undefined]') {
        return 'Undefined';
    }
    if (dataType === '[object Null]') {
        return 'Null';
    }
    if (dataType === '[object Date]') {
        return 'Date';
    }
}

export function deepClone(data: any) {
    let dataType = getDataType(data);
    let result;
    if (dataType === 'Object') {
        result = {};
    } else if (dataType === 'Array') {
        result = [];
    } else {
        result = data;
    }

    if (dataType === 'Object') {
        for (let key in data) {
            if(data.hasOwnProperty(key)) {
                result[key] = this.deepClone(data[key]);
            }
        }
    } else if (dataType === 'Array') {
        for (let i = 0, len = data.length; i < len; i++) {
            result.push(this.deepClone(data[i]));
        }
    }

    return result;
}