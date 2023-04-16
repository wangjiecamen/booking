// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
    _before: function() { // 通用预处理器

    },
    async getList(params) {
        const {
            pageNo = 1, pageSize = 10
        } = params
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo()
        })
        const data = await dbJQL.collection('uni-id-users')
            .where("status in [0,1] && role=='user'").field('_id,username,status')
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize)
            .get({
                getCount: true
            })

        return {
            errCode: 0,
            data: data.data,
            total: data.count
        }
    },
    async deleteItem(params) {
        if (!params._id) return {
            errCode: 20001,
            errMsg: 'ID不能为空'
        }
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo()
        })
        await dbJQL.collection('uni-id-users').where({
            _id: params._id
        }).remove()
    },

    async getItem(params) {
        if (!params._id) return {
            errCode: 20001,
            errMsg: 'ID不能为空'
        }
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo()
        })
        const {
            data
        } = await dbJQL.collection('uni-id-users').where({
            _id: params._id
        }).get({
            getOne: true
        })
        console.log(data)
        return {
            errCode: 0,
            data
        }
    }
}