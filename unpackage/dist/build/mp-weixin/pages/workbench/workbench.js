(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/workbench/workbench"],{"3eb1":function(e,c,t){},5967:function(e,c,t){"use strict";t.r(c);var o=t("e6bb"),n=t.n(o);for(var i in o)"default"!==i&&function(e){t.d(c,e,function(){return o[e]})}(i);c["default"]=n.a},"78bc":function(e,c,t){"use strict";t.r(c);var o=t("9609"),n=t("5967");for(var i in n)"default"!==i&&function(e){t.d(c,e,function(){return n[e]})}(i);t("bfb4");var s,r=t("f0c5"),a=Object(r["a"])(n["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],s);c["default"]=a.exports},9609:function(e,c,t){"use strict";var o,n=function(){var e=this,c=e.$createElement,o=(e._self._c,t("9fc1")),n=t("0c6c"),i=t("98d0"),s=t("737a"),r=t("f40b"),a=t("5d7c"),l=t("d1a7"),u=t("4496");e.$mp.data=Object.assign({},{$root:{m0:o,m1:n,m2:i,m3:s,m4:r,m5:a,m6:l,m7:u}})},i=[];t.d(c,"b",function(){return n}),t.d(c,"c",function(){return i}),t.d(c,"a",function(){return o})},bfb4:function(e,c,t){"use strict";var o=t("3eb1"),n=t.n(o);n.a},c3f4:function(e,c,t){"use strict";(function(e){t("04ee"),t("921b");o(t("66fd"));var c=o(t("78bc"));function o(e){return e&&e.__esModule?e:{default:e}}e(c.default)}).call(this,t("543d")["createPage"])},e6bb:function(e,c,t){"use strict";(function(e){Object.defineProperty(c,"__esModule",{value:!0}),c.default=void 0;var t={data:function(){return{nurseInfo:{},noticeList:[],isOpenBle:!1,devicesList:[],deviceId:"67:95:69:F9:B3:C5",serviceId:"",primaryUUID:"",characteristicId:{writeId:"",notifyId:""}}},onLoad:function(){this.nurseInfo=e.getStorageSync("userInfo"),this.fetchNoticeList()},methods:{initBluetoothAdapter:function(){var c=this;e.openBluetoothAdapter({success:function(e){console.log("初始化蓝牙成功",e.errMsg),c.isOpenBle=!0,c.searchBluetoothDevice()},fail:function(e){console.log("初始化蓝牙失败，错误码: (".concat(e.errCode," || ").concat(e.errMsg,")"))}}),this.onBLEConnectionStateChange()},searchBluetoothDevice:function(){var c=this;setTimeout(function(){c.isOpenBle?(console.log("开始搜索附近蓝牙智能设备"),e.startBluetoothDevicesDiscovery({success:function(e){c.findBluetoothDevice()},fail:function(c){console.log("查找设备失败!"),e.showToast({icon:"none",title:"查找设备失败！",duration:3e3})}})):console.log("未初始化蓝牙适配器, isOpenBle:".concat(c.isOpenBle))},1e3)},findBluetoothDevice:function(){var c=this;console.log("监听寻找新设备"),e.onBluetoothDeviceFound(function(e){console.log("开始监听寻找到新设备的事件"),c.getBleDevices()})},getBleDevices:function(){var c=this;console.log("获取蓝牙设备"),e.getBluetoothDevices({success:function(e){console.log(e),console.log("获取蓝牙设备成功: ".concat(e.errMsg)),c.devicesList=e.devices;var t=!0,o=!1,n=void 0;try{for(var i,s=c.devicesList[Symbol.iterator]();!(t=(i=s.next()).done);t=!0){var r=i.value;if(console.log(r.deviceId),r.deviceId==c.deviceId){console.log("找到蓝牙设备".concat(r.deviceId,"，开始连接~~~~~")),setTimeout(function(){c.getConnectBlue()},1e3);break}}}catch(a){o=!0,n=a}finally{try{t||null==s.return||s.return()}finally{if(o)throw n}}},fail:function(e){console.log("获取蓝牙设备失败: ".concat(e.errMsg))}})},getConnectBlue:function(){var c=this;console.log("".concat(this.deviceId,"蓝牙设备连接中")),e.createBLEConnection({deviceId:this.deviceId,success:function(e){console.log("".concat(c.deviceId,"蓝牙设备连接成功")),c.getBLEDeviceServices(),c.stopDiscovery()},fail:function(t){console.log("蓝牙设备连接失败",t),e.closeBLEConnection({deviceId:c.deviceId,success:function(e){console.log("蓝牙设备连接断开, 正在重新连接"),c.getConnectBlue()}})}})},getBLEDeviceServices:function(){var c=this;console.log("正在获取蓝牙设备所有服务");var t=[];e.getBLEDeviceServices({deviceId:this.deviceId,success:function(e){t=e.services,console.log("获取蓝牙设备服务成功".concat(JSON.stringify(e.services)));var o=!0,n=!1,i=void 0;try{for(var s,r=t[Symbol.iterator]();!(o=(s=r.next()).done);o=!0){var a=s.value;if(console.log("service--".concat(a,"---serviceId-").concat(a.uuid)),-1!=a.uuid.indexOf(c.primaryUUID)){c.serviceId=a.uuid,console.log("设备的serviceId".concat(c.serviceId)),c.getBLEDeviceCharacteristics();break}}}catch(l){n=!0,i=l}finally{try{o||null==r.return||r.return()}finally{if(n)throw i}}c.getBLEDeviceCharacteristics()},fail:function(e){console.log("device services:",e.services)}})},getBLEDeviceCharacteristics:function(){var c=this;console.log("开始获取服务特征值");var t=[];e.getBLEDeviceCharacteristics({deviceId:this.deviceId,serviceId:this.serviceId,success:function(e){console.log("获取的".concat(c.serviceId,"服务的特征值").concat(JSON.stringify(e.characteristics))),t=e.characteristics;var o=!0,n=!1,i=void 0;try{for(var s,r=t[Symbol.iterator]();!(o=(s=r.next()).done);o=!0){var a=s.value;console.log("特征值".concat(JSON.stringify(a))),a.properties.notify&&(c.characteristicId.notifyId=a.uuid,console.log("notifyId值为：".concat(c.characteristicId.notifyId))),a.properties.write&&(c.characteristicId.writeId=a.uuid,console.log("writeId值为：".concat(c.characteristicId.writeId)))}}catch(l){n=!0,i=l}finally{try{o||null==r.return||r.return()}finally{if(n)throw i}}}})},notify:function(){var c=this;e.notifyBLECharacteristicValueChange({state:!0,deviceId:this.deviceId,serviceId:this.serviceId,characteristicId:this.characteristicId.notifyId,success:function(t){console.log("订阅特征值".concat(JSON.stringify(t))),e.onBLECharacteristicValueChange(function(e){console.log("监听低功耗蓝牙设备的特征值变化事件".concat(JSON.stringify(e))),console.log("".concat(e.characteristicId,"变化, 现在是{$JSON.stringify(res.value)}"));var t=c.ab2hex(e.value);console.log("value ---\x3e ".concat(t))})}})},stopDiscovery:function(){e.stopBluetoothDevicesDiscovery({success:function(e){console.log("停止搜索蓝牙设备: ".concat(e.errMsg))},fail:function(e){console.log("停止搜索蓝牙设备失败，错误码: ".concat(e.errCode))}})},onBLEConnectionStateChange:function(){var c=this;e.onBLEConnectionStateChange(function(t){console.log("蓝牙连接状态".concat(JSON.stringify(t))),t.connected||(console.log("断开低功耗蓝牙成功~~"),e.closeBLEConnection({deviceId:c.deviceId,success:function(e){console.log("关闭蓝牙模块")}}))})},ab2hex:function(e){var c=Array.prototype.map.call(new Uint8Array(e),function(e){return("00"+e.toString(16)).slice(-2)});return c.join("")},toNotice:function(c){e.navigateTo({url:"../notice/notice?id=".concat(c)})},fetchNoticeList:function(){var c=this;e.request({url:"https://ciai.le-cx.com/index.php/api/notice/noticeList",success:function(e){c.noticeList=e.data.data}})}}};c.default=t}).call(this,t("543d")["default"])}},[["c3f4","common/runtime","common/vendor"]]]);