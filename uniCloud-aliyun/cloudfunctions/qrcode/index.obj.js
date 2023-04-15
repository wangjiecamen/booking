//redis需收费，临时将qrcode缓存做到数据库中
module.exports = {
    _before: function() { // 通用预处理器

    },
    async addItem(params) {
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo(),
        });
        await dbJQL.collection("qrcode").add({
            qrcode: params.qrcode,
            meeting_id: params.id
        })
        return {
            errCode: 0,
        }
    },
    async getItem(params) {
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo(),
        });
        const {
            data
        } = await dbJQL.collection("qrcode").where({
            meeting_id: params.id
        }).get()
        return {
            errCode: 0,
            data: data[0] ? data[0].qrcode : ''
        }
    }
}