// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
module.exports = {
    _before() {

    },
    async login(params) {
        if (!params.username || !params.password) {
            return {
                errCode: '20001',
                errMsg: '用户名或密码不能为空'
            }
        }


    },
    async register(params) {
        if (!params.username || !params.password) {
            return {
                errCode: '20001',
                errMsg: '用户名或密码不能为空'
            }
        }
        const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云对象的clientInfo
            clientInfo: this.getClientInfo()
        })
        const data = await dbJQL.collection('user').add({
            username: params.username,
            password: params.password,
            branch_id: params.branch_id
        })
        console.log(data)

    }
    /**
     * method1方法描述
     * @param {string} param1 参数1描述
     * @returns {object} 返回值描述
     */
    /* 
    method1(param1) {
    	// 参数校验，如无参数则不需要
    	if (!param1) {
    		return {
    			errCode: 'PARAM_IS_NULL',
    			errMsg: '参数不能为空'
    		}
    	}
    	// 业务逻辑
    	
    	// 返回结果
    	return {
    		param1 //请根据实际需要返回值
    	}
    }
    */
}