// pages/movie/movie.js
// 这是教程中的 api，由于不是 https，所以不能在正式环境中使用
const MOVIE_URL = 'http://t.yushu.im/v2/movie/top250';
const NEW_MOVIE_URL = 'https://douban.uieee.com/v2/movie/top250';
// 将 app 实例取到 appDatas，修改 appDatas 可同步修改 app 实例
let appDatas = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      header: {
        'Content-Type': 'application/text'
      },
      // url: MOVIE_URL,
      url: NEW_MOVIE_URL,
      success: (data)=>{
        console.log(data, 'new api');
        this.setData({
          movieArr: data.data.subjects
        });
        appDatas.data.movieArr = data.data.subjects;
      }
    })
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