// pages/map/map.js
var position=require("../../util/lat.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    p: {},
    pn:2,
    markers:[],
    controls:[
      {
        id:1,
        position:{
          left:15,
          top:20,
          width:60,
          height:24
        },
        iconPath:"/img/more.png",
        clickable: true
      }
    ]
  },
  bindmarker:function(){

  },
  bindcontrol:function(){
    wx.showLoading({
      title: 'loading',
    })
    this.setData({
    })
    
    wx.request({
      url: 'http://localhost:8080/markers?city=' + (this.data.p.name)+'&pn='                      +this.data.pn,
      success:res=>{
        wx.hideLoading();
        if(!res.data.length){
          wx.showToast({
            title: '没有更多了',
            icon:"none",
            duration: 1000
          })
        }else{
          wx.showToast({
            title: '新增' + res.data.length+'条数据',
            icon:"success",
            duration:1000
          })

          this.setData({
            pn: this.data.pn + 1,
            markers: this.data.markers.concat(this.datachuli(res.data))
          })
        }
      },
      fail:()=>{
        wx.showToast({
          title: '加载失败',
          icon:'none',
          duration:1000
        })
      }
    })
  },
  bindcallout:function(e){
    let arr=[];
    this.data.markers.forEach(v=>{
      if(v.id==e.markerId){
        arr.unshift(v);
        wx.getStorage({
          key: 'fav',
          success: function(res) {
            let mark=1;
            res.data.forEach(val=>{
              if(val.id==v.id){
                mark=0;
              }
            })
            if(mark){
              res.data.unshift(v)
              wx.setStorage({
                key: 'fav',
                data: res.data,
                success: () => {
                  wx.showToast({
                    title: '收藏成功',
                    icon: "success",
                    duration: 1000
                  })
                }
              })
            } else {
              wx.showToast({
                title: '该公司收藏过了',
                icon: "none",
                duration: 1000
              })
            }
            
          },
          fail:function(){
            wx.setStorage({
              key: 'fav',
              data: arr,
            })
          }
        })
        
      }
    })
  },
  datachuli:function(arr){
    arr.forEach(v=>{
      v.iconPath = "/img/icon.png",
        v.width = 28,
        v.height = 30,
        v.callout = {
          display: "BYCLICK",
          padding: 5,
          content: [v.companyShortName, v.salary, v.secondType, v.formatCreateTime]                       .join("\n"),
          bgColor: "#262626",
          color: "#fff"
        },
        v.label = {
          content: v.salary,
          bgColor: "#262626",
          color: "#fff",
          padding: 3,
          borderRadius: 5
        }
    })
    return arr;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let t = position[options.name];
    t.name = options.name
    this.setData({
      p: t
    })
    wx.showLoading({
      title: 'loading',
    })
    wx.request({
      url: 'http://localhost:8080/markers?city='+(options.name),
      success:res=>{
        wx.hideLoading();
        this.setData({
          markers:this.datachuli(res.data)
        })
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 1000
        })
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