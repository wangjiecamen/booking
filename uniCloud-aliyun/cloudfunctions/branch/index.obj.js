// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129


module.exports = {
    _before: function() { // 通用预处理器

    },
    async getBranchList() {
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo()
        })
        const data = await dbJQL.collection('branch').where({
            del_flag: 0,
            status: 1
        }).field('_id,name').get()
        return {
            errCode: 0,
            data: data.data,
        }
    },
    async getList(params) {
        const {
            pageNo = 1, pageSize = 10
        } = params
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo()
        })
        const data = await dbJQL.collection('branch')
            .where({
                del_flag: 0
            })
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
    async addItem(params) {
        if (!params.name) {
            return {
                errCode: 20001,
                errMsg: '部门名称不能为空'
            }
        }
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo()
        })
        await dbJQL.collection('branch').add(params)
    },
    async deleteItem(params) {
        if (!params._id) return {
            errCode: 20001,
            errMsg: 'ID不能为空'
        }
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo()
        })
        await dbJQL.collection('branch').where({
            _id: params._id
        }).update({
            del_flag: 1
        })
    },
    async updateItem(params) {
        if (!params._id) return {
            errCode: 20001,
            errMsg: 'ID不能为空'
        }
        if (!params.name) return {
            errCode: 20001,
            errMsg: '部门不能为空'
        }
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo()
        })
        await dbJQL.collection('branch').where({
            _id: params._id
        }).update({
            name: params.name,
            status: params.status,
            update_time: new Date().getTime()
        })
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
        } = await dbJQL.collection('branch').where({
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