// pages/detail/detail.js
let datas = require('../../datas/list-data.js');
// 获取小程序 App 的实例（同时获取 App 实例中的数据）
let appDatas = getApp();
console.log( appDatas, 'appDatas' );

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    index: null,
    isCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    // 获取参数值
    let index = options.index;
    // this.detailObj = datas.list_data[index];
    // console.log(this.detailObj);
    this.setData({
      detailObj: datas.list_data[index],
      index
    });
    // 根据缓存判断当前页面是否被收藏
    let collectedPage = wx.getStorageSync('isCollected');
    console.log(collectedPage, '页面的收藏状态');
    // 在缓存中初始化空对象
    if (!collectedPage){
      wx.setStorageSync('isCollected', {});
    }
    if (collectedPage[index]){
      this.setData({
        isCollected: true 
      })
    };
    // 监听音乐播放
    wx.onBackgroundAudioPlay(()=>{
      console.log('音乐播放');
      // 此处使用了箭头函数，因此在函数中依然可以使用 this.setData 来修改 isMusicPlay 的值
      this.setData({
        isMusicPlay: true
      });
      // 修改 appDatas 中的数据
      appDatas.data.isPlay = true;
      appDatas.data.pageIndex = this.data.index;
    });
    // 监听音乐暂停
    wx.onBackgroundAudioPause(()=>{
      console.log('音乐暂停');
      this.setData({
        isMusicPlay: false
      });
      // 修改 appDatas 中的数据
      appDatas.data.isPlay = false;
    });
    // 如果当前页面正处于播放音乐状态，则进行如下操作
    if ((appDatas.data.isPlay) && (appDatas.data.pageIndex == this.data.index)){
      this.setData({
        isMusicPlay: true
      });
    }
  },

  handleCollection(){
    let isCollected2 = !this.data.isCollected;
    this.setData({
      isCollected: isCollected2
    });
    // 提醒用户
    let title2 = this.data.isCollected?'收藏成功':'取消收藏';
    wx.showToast({
      title: title2,
      icon: 'success'
    })
    // 缓存数据到本地
    let index = this.data.index;
    wx.getStorage({
      key: 'isCollected',
      success: function (storagedData) {
        // 如果不在缓存中初始化空对象，第一次点击收藏时 storagedData 无数据，无法 console.log(storagedData)，可能是 wx.getStorage 没有成功，回调函数 success 无法执行
        console.log(storagedData, typeof storagedData, '读取缓存');
        // storagedData 是本次点击之前缓存的数据
        let obj = storagedData.data;
        // 将 obj 更新为本次点击之后的缓存的数据（如在一个页面连续点击多次收藏按钮，则更新后替换之前的数据，如在一个新的页面点击收藏按钮，则更新后在 obj 中新加入一个键值对）
        obj[index] = isCollected2;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {
            console.log('缓存成功');
          }
        })
      },
    })
    
  },

  // 处理音乐播放事件
  handleMusicPlay(){
    let isMusicPlay2 = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay: isMusicPlay2
    });
    // 控制音乐播放
    if (isMusicPlay2){
      // 播放音乐
      let {dataUrl, title} = this.data.detailObj.music;
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }else{
      // 暂停音乐
      wx.pauseBackgroundAudio();
    }
  },
  // 分享事件
  handleShare(){
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈', '分享给好友', '分享到火星'
      ]
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