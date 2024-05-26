
export function splitStr(str){
    const separators = /[,;\s、\r?\n]+/; // 逗號、分號、空白、頓號、換行作為分隔符
    const arr = str.split(separators);
    return arr
}