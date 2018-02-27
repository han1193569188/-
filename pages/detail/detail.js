// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company:{},
    markers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'fav',
      success: res=> {
        res.data.forEach(val=>{
          if (val.id == options.id||1650) {
            this.setData({
              company:val,
              markers:[{
                longitude:val.longitude,
                latitude:val.latitude,
                id:val.id,
                iconPath : "/img/icon.png",
                width : 28,
                height : 30,
                callout : {
                  display: "ALWAYS",
                  padding: 5,
                  content: val.companyShortName,
                  bgColor: "#262626",
                  color: "#fff"
                }
              }]
            })
          }
        })
        
      },
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