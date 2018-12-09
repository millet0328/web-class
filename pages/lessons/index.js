// pages/index/index.js
let app = getApp();
Page({
   /**
    * 页面的初始数据
    */
   data: {
      lessons: [],
      authModalShow: '', // 是否显示授权modal
   },
   // 获取课程列表
   getLessons() {
      app.ajax({
         method: "POST",
         url: "/xcx/json.php",
         data: {
            hqzy: 1
         }
      }).then((result) => {
         this.setData({
            lessons: result.lessons
         });
      });
   },
   // 获取用户授权
   authHandle(e) {
      this.encryptedData(e.detail).then((result) => {
         wx.setStorageSync("unionId", result);
         this.setData({
            authModalShow: false
         });
      })
   },
   // 发送给后台换取unionId
   encryptedData(data) {
      return app.ajax({
         method: "POST",
         url: "/xcx/uid/",
         data: {
            sessionKey: wx.getStorageSync("session_key"),
            encryptedData: data.encryptedData,
            iv: data.iv,
         }
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      this.getLessons();
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function() {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function() {
      // 监测用户授权
      wx.getSetting({
         success: res => {
            if (!res.authSetting['scope.userInfo']) {
               this.setData({
                  authModalShow: true
               });
               return false;
            }
            if (res.authSetting['scope.userInfo']) {
               // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
               wx.getUserInfo({
                  success: res => {
                     // 可以将 res 发送给后台解码出 unionId
                     this.encryptedData(res).then((result) => {
                        wx.setStorageSync("unionId", result);
                     })
                  }
               })
            }
         }
      })
   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function() {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function() {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function() {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function() {

   }
})