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