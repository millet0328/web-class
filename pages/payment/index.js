// pages/payment/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    day: "00",
    hour: "00",
    min: "00",
    sec: "00"
  },
  // 打开规则
  ruleOpenHandle() {
    wx.showModal({
      title: '活动规则',
      content: '1.每个微信24小时内只能砍一次价格',
    });
  },
  // 获取砍价信息
  getDetail(id) {
    app.ajax({
        method: "GET",
        url: "/xcx/kj.php",
        data: {
          id
        }
      })
      .then((result) => {
        this.setData({
          detail: result.data
        });
        let maxDate = this.data.detail.time;
        setInterval(() => {
          let now = new Date();
          this.dateformat(maxDate - now);
        }, 1000);
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getDetail(options.id);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  // 时间格式化输出，将时间戳转为 倒计时时间
  dateformat(msc) {
    var second = msc / 1000; //总的秒数
    // 天数位
    var day = Math.floor(second / 3600 / 24);
    var dayStr = day.toString();
    if (dayStr.length == 1) dayStr = '0' + dayStr;

    // 小时位
    var hr = Math.floor(second / 3600); //直接转为小时 没有天 超过1天为24小时以上
    var hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    // 分钟位
    var min = Math.floor(second / 60 % 60);
    var minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    // 秒位
    var sec = Math.floor(second % 60);
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;

    this.setData({
      day: dayStr,
      hour: hrStr,
      min: minStr,
      sec: secStr,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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
    return {
      title: '我的网课，需要兄弟来助力，一起来砍价免费拿',
    }
  }
})