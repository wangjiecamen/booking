// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const a2b = require("base64-arraybuffer");

module.exports = {
    _before: function() {
        // 通用预处理器
    },
    async getList(params) {
        const {
            pageNo = 1, pageSize = 10
        } = params;
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo(),
        });
        const data = await dbJQL
            .collection("booking")
            .where({
                del_flag: 0,
            })
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize)
            .orderBy("update_time desc")
            .get({
                getCount: true,
            });
        return {
            errCode: 0,
            data: data.data,
            total: data.count,
        };
    },
    async getListByUser(params) {
        const {
            pageNo = 1, pageSize = 10
        } = params;
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo(),
        });
        const data = await dbJQL
            .collection("booking")
            .where({
                del_flag: 0,
                user_id: params.user_id,
            })
            .skip((pageNo - 1) * pageSize)
            .limit(pageSize)
            .get({
                getCount: true,
            });
        return {
            errCode: 0,
            data: data.data,
            total: data.count,
        };
    },
    async deleteItem(params) {
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo(),
        });
        await dbJQL
            .collection("booking")
            .where({
                _id: params._id,
            })
            .update({
                del_flag: 1,
            });
        return {
            errCode: 0,
        };
    },
    async addItem(params) {
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo(),
        });
        params.status = params.audit === 1 ? 0 : 1;
        await dbJQL.collection("booking").add(params);
        return {
            errCode: 0,
        };
    },
    async updateItem(params) {
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo(),
        });
        const cloneParams = {
            ...params,
        };
        delete cloneParams._id;
        await dbJQL
            .collection("booking")
            .where({
                _id: params._id,
            })
            .update({
                ...cloneParams,
                update_time: new Date().getTime(),
            });
        return {
            errCode: 0,
        };
    },
    async getItem(params) {
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo(),
        });
        const {
            data
        } = await dbJQL
            .collection("booking")
            .where({
                _id: params.id,
            })
            .get();
        return {
            errCode: 0,
            data: data[0],
        };
    },
    async auditItem(params) {
        const dbJQL = uniCloud.databaseForJQL({
            clientInfo: this.getClientInfo(),
        });
        const {
            data
        } = await dbJQL
            .collection("booking")
            .where({
                _id: params.id,
            })
            .update({
                status: params.status,
            });
        return {
            errCode: 0,
        };
    },
    async sign(params) {
        const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
            clientInfo: this.getClientInfo(),
        })
        const {
            data
        } = await dbJQL.collection('booking').where({
            _id: params.id
        }).get()
        const newNum = data[0].sign_num + 1
        await dbJQL.collection('booking').where({
            _id: params.id
        }).update({
            sign_num: newNum,
            update_time: new Date().getTime()
        })
        return {
            errCode: 0,
        }
    },
    async getQRCode(params) {
        const qrcodeRes = await uniCloud.importObject('qrcode').getItem({
            id: params.id
        })
        if (qrcodeRes.data) {
            return {
                errCode: 0,
                data: qrcodeRes.data,
            };
        }
        const tokenRes = await uniCloud.httpclient.request(
            `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa2697757b76e7271&secret=ccff691b177a9831f3cf0b267cdaf2c2`, {
                dataType: "json",
            }
        );
        const token = tokenRes.data.access_token;
        console.log(token);
        const res = await uniCloud.httpclient.request(
            `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${token}`, {
                method: "POST",
                timeout: 10000,
                data: {
                    scene: params.id,
                    page: "pages/sign/index",
                    check_path: false,
                    env_version: "trial",
                },
                contentType: "json",
            }
        );
        const base64 = a2b.encode(res.data)
        await uniCloud.importObject('qrcode').addItem({
            qrcode: base64,
            id: params.id
        })
        return {
            errCode: 0,
            data: base64
        };
    },
};