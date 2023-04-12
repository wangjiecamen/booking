const notEmpty = (v) => {
    if (!v) return {
        errCode: '20001',
        errMsg: '用户名不能为空'
    }
}

module.exports = {
    // 公用模块用法请参考 https://uniapp.dcloud.io/uniCloud/cf-common

}