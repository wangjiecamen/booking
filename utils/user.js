export const getUserInfo = () => {
    return uni.getStorageSync('userinfo') || {}
}
export const setUserInfo = async () => {
    const user = uniCloud.getCurrentUserInfo()
    const {
        data
    } = await uniCloud.importObject('user').getUserInfo(user.uid)
    uni.setStorageSync('userinfo', data)
}
export const getUserType = () => {
    return uniCloud.getCurrentUserInfo().role[0]
}

export const isAdmin = () => {
    return getUserType() === 'admin'
}

export const isUser = () => {
    return getUserType() === 'user'
}