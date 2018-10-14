// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isShow: true
  },

  handleClick(){
    wx.switchTab({
      url: '/pages/list/list',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 在页面加载完成时，需要：1、根据用户是否授权来确定 button 是否显示，
    // 2、获取用户信息（如果已授权，则更新 data 数据，如果未授权，则输出失败提示）
    // 为实现1、2，需要执行 getUserInfo()
    this.getUserInfo();
  },

  getUserInfo(){
    // 获取用户当前设置（根据用户是否进行了授权来确定 button 是否显示）
    wx.getSetting({
      success: (data) => {
        console.log(data)
        // 用户已经进行了授权
        if (data.authSetting['scope.userInfo']) {
          this.setData({
            isShow: false
          });
        }
        // 用户没有进行授权
        else {
          this.setData({
            isShow: true
          });
        }
      }
    })
    // 获取用户信息
    wx.getUserInfo({
      success: (data) => {
        // console.log(data);
        // 更新data中的userInfo
        this.setData({
          userInfo: data.userInfo
        })
      },
      fail: () => {
        console.log('获取用户信息失败')
      }
    })
  },

// 用户点击是否授权之后的回调函数
  handleGetUserInfo(data){
    console.log(data, '用户点击了是否授权');
    // 判断用户点击的是否是‘允许’
    if(data.detail.rawData){
      // 如果用户点击的是‘允许’，需要：1、更新 button 是否显示，
      // 2、获取用户信息
      // 为实现1、2，需要执行 getUserInfo()
      this.getUserInfo();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})