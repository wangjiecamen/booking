'use strict';
exports.main = async (event, context) => {
    const dbJQL = uniCloud.databaseForJQL({ // 获取JQL database引用，此处需要传入云函数的event和context，必传
        event,
        context
    })
    const id = event.id
    const {
        data
    } = await dbJQL.collection('booking').where({
        _id: id
    }).get()
    const newNum = data[0].sign_num + 1
    await dbJQL.collection('booking').where({
        _id: id
    }).update({
        sign_num: newNum,
        update_time: new Date().getTime()
    })
    return {
        errCode: 0,
    }
};