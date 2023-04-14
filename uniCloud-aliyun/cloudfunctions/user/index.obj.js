// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
    _before() {

    },
    async getUserInfo(userid) {

        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo()
        })
        const user = dbJQL.collection('uni-id-users').field('department_id ,username,nickname,role').getTemp()
        const branch = dbJQL.collection('branch').field('_id,name').getTemp()
        const {
            data
        } = await dbJQL.collection(user, branch).where({
            '_id': userid
        }).get()
        const res = data[0]
        if (res) {
            const branch = res.department_id[0] || {}
            res.branchName = branch.name || ''
            res.branchId = branch._id || ''
            delete res.department_id
        }
        console.log(res)
        return {
            errCode: 0,
            data: res
        }
    }
}