(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/collect-data/collect-data"],{3370:function(e,t,o){"use strict";var n,c=function(){var e=this,t=e.$createElement;e._self._c},i=[];o.d(t,"b",(function(){return c})),o.d(t,"c",(function(){return i})),o.d(t,"a",(function(){return n}))},a1ab:function(e,t,o){},a990:function(e,t,o){"use strict";o.r(t);var n=o("3370"),c=o("c650");for(var i in c)"default"!==i&&function(e){o.d(t,e,(function(){return c[e]}))}(i);o("caca");var s,r=o("f0c5"),a=Object(r["a"])(c["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);t["default"]=a.exports},c650:function(e,t,o){"use strict";o.r(t);var n=o("d4c9"),c=o.n(n);for(var i in n)"default"!==i&&function(e){o.d(t,e,(function(){return n[e]}))}(i);t["default"]=c.a},caca:function(e,t,o){"use strict";var n=o("a1ab"),c=o.n(n);c.a},d4c9:function(e,t,o){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=c(o("4795"));c(o("9591"));function c(e){return e&&e.__esModule?e:{default:e}}function i(e,t,o,n,c,i,s){try{var r=e[i](s),a=r.value}catch(u){return void o(u)}r.done?t(a):Promise.resolve(a).then(n,c)}function s(e){return function(){var t=this,o=arguments;return new Promise((function(n,c){var s=e.apply(t,o);function r(e){i(s,n,c,r,a,"next",e)}function a(e){i(s,n,c,r,a,"throw",e)}r(void 0)}))}}function r(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=a(e))){var t=0,o=function(){};return{s:o,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,c,i=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,c=e},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw c}}}}function a(e,t){if(e){if("string"===typeof e)return u(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);return"Object"===o&&e.constructor&&(o=e.constructor.name),"Map"===o||"Set"===o?Array.from(o):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?u(e,t):void 0}}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var l={data:function(){return{navTitles:["血压","血氧","血糖"],currentIndex:0,cWidth:"",cHeight:"",pixelRatio:1,patientList:[],patient:null,pid:"",connected:0,bp_devices:[],bp_connected:!1,bp_chs:[],bp_discoveryStarted:!1,bp_canWrite:!1,bp_deviceId:"",bp_serviceId:"",bp_characteristicId:"",blood_pressure:null,high_blood_pressure:0,low_blood_pressure:0,pressure_pulse_rate:0,bo_devices:[],bo_chs:[],bo_discoveryStarted:!1,bo_canWrite:!1,bo_deviceId:"",bo_serviceId:"",bo_characteristicId:"",blood_oxygen:0,oxygen_pulse_rate:0}},onLoad:function(e){e.patient_id&&(this.pid=e.patient_id,this.fetchPatientInfo(e.patient_id)),this.fetchPatientList()},watch:{patient:function(e,t){null!=t&&(this.bo_closeBluetoothAdapter(),this.connected=0)}},methods:{bindPickerChange:function(e){this.connected=0;var t,o=r(this.patientList);try{for(o.s();!(t=o.n()).done;){var n=t.value;n.id===Number(e.detail.value)+1&&(this.pid=n.id,this.fetchPatientInfo(n.id))}}catch(c){o.e(c)}finally{o.f()}},fetchPatientList:function(){var t=this;return s(n.default.mark((function o(){return n.default.wrap((function(o){while(1)switch(o.prev=o.next){case 0:return o.next=2,e.request({url:"https://ciai.le-cx.com/index.php/api/patient/patientList",success:function(e){t.patientList=e.data.data}});case 2:case"end":return o.stop()}}),o)})))()},fetchPatientInfo:function(t){var o=this;return s(n.default.mark((function c(){return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.request({url:"https://ciai.le-cx.com/index.php/api/patient/info?id=".concat(t),success:function(e){o.patient=e.data.data}});case 2:case"end":return n.stop()}}),c)})))()},switchTab:function(t){this.currentIndex=t,e.hideLoading()},getTimestamp:function(){var e=(new Date).getTime();return e},saveData:function(t){var o=this;return s(n.default.mark((function c(){return n.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(console.log("采集数据，connected",o.connected),2===o.connected||0===o.blood_oxygen&&0===o.high_blood_pressure){n.next=13;break}if(o.bo_closeBluetoothAdapter(),1!==t){n.next=8;break}return n.next=6,e.request({url:"https://ciai.le-cx.com/index.php/api/alarm/putHealthRow",data:{type:t,value:JSON.stringify(o.blood_pressure),patient_id:o.pid,pulse_rate:o.pressure_pulse_rate,timestamp:o.getTimestamp()},header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){e.showToast({title:"血压数据采集成功",icon:"none",duration:3e3}),console.log("血压数据存储成功",t)}});case 6:n.next=11;break;case 8:if(2!==t){n.next=11;break}return n.next=11,e.request({url:"https://ciai.le-cx.com/index.php/api/alarm/putHealthRow",data:{type:t,value:o.blood_oxygen,patient_id:o.pid,pulse_rate:o.pulse_rate,timestamp:o.getTimestamp()},header:{"content-type":"application/x-www-form-urlencoded"},method:"POST",success:function(t){e.showToast({title:"血氧数据采集成功",icon:"none",duration:3e3}),console.log("血氧数据存储成功",t)}});case 11:n.next=14;break;case 13:1===t?e.showToast({title:"请先连接血压计蓝牙",icon:"none",duration:3e3}):2===t?e.showToast({title:"请先连接血氧仪蓝牙",icon:"none",duration:3e3}):e.showToast({title:"请先连接血糖仪蓝牙",icon:"none",duration:3e3});case 14:case"end":return n.stop()}}),c)})))()},inArray:function(e,t,o){for(var n=0;n<e.length;n++)if(e[n][t]===o)return n;return-1},ab2hex:function(e){var t=Array.prototype.map.call(new Uint8Array(e),(function(e){return("00"+e.toString(16)).slice(-2)}));return t.join("")},bp_openBluetoothAdapter:function(){var t=this;this.bp_discoveryStarted=!1,console.log("初始化血压计蓝牙"),e.openBluetoothAdapter({success:function(e){console.log("openBluetoothAdapter success",e),t.bp_startBluetoothDevicesDiscovery()},fail:function(o){10001===o.errCode&&e.onBluetoothAdapterStateChange((function(e){console.log("onBluetoothAdapterStateChange",e),e.available&&t.bp_startBluetoothDevicesDiscovery()}))}})},bp_startBluetoothDevicesDiscovery:function(){var t=this;this.bp_discoveryStarted||(this.bp_discoveryStarted=!0,e.startBluetoothDevicesDiscovery({allowDuplicatesKey:!0,success:function(e){console.log("startBluetoothDevicesDiscovery success",e),t.bp_onBluetoothDeviceFound()}}))},bp_getBluetoothAdapterState:function(){var t=this;console.log("getBluetoothAdapterState"),e.getBluetoothAdapterState({success:function(e){console.log("getBluetoothAdapterState",e),e.discovering?t.bp_onBluetoothDeviceFound():e.available&&t.bp_startBluetoothDevicesDiscovery()}})},bp_onBluetoothDeviceFound:function(){var t=this;console.log("开始查找蓝牙设备"),e.onBluetoothDeviceFound((function(o){var n=o.devices;if(console.log("devices",n[0].name),"FSRKB_BT-001"==n[0].name){e.hideLoading();var c=n[0];t.bp_createBLEConnection(c)}else t.bp_stopBluetoothDevicesDiscovery(),e.showLoading({title:"正在连接蓝牙..."}),1===t.connected?e.hideLoading():setTimeout((function(){e.hideLoading()}),5e3)}))},bp_stopBluetoothDevicesDiscovery:function(){this.bp_discoveryStarted=!1,e.stopBluetoothDevicesDiscovery()},bp_createBLEConnection:function(t){var o=this;this.bp_stopBluetoothDevicesDiscovery(),console.log("开始连接蓝牙~~~");var n=t.deviceId;t.name;e.createBLEConnection({deviceId:n,success:function(e){console.log("连接血压计成功"),o.connected=1,o.bp_getBLEDeviceServices(n)}})},bp_getBLEDeviceServices:function(t){var o=this;console.log("获取血压计的所有服务"),e.getBLEDeviceServices({deviceId:t,success:function(e){for(var n=0;n<e.services.length;n++)if("0000FFF0-0000-1000-8000-00805F9B34FB"==e.services[n].uuid)return void o.bp_getBLEDeviceCharacteristics(t,e.services[n].uuid)}})},bp_getBLEDeviceCharacteristics:function(t,o){var n=this;console.log("获取血压计的特征值"),e.getBLEDeviceCharacteristics({deviceId:t,serviceId:o,success:function(c){for(var i=0;i<c.characteristics.length;i++){var s=c.characteristics[i];"0000FFF6-0000-1000-8000-00805F9B34FB"==s.uuid&&(n.bp_canWrite=!0,n.bp_deviceId=t,n.bp_serviceId=o,n.bp_characteristicId=s.uuid,n.bp_writeBLECharacteristicValue(),e.notifyBLECharacteristicValueChange({deviceId:t,serviceId:o,characteristicId:s.uuid,state:!0}))}},fail:function(e){console.error("getBLEDeviceCharacteristics",e)}}),e.onBLECharacteristicValueChange((function(t){var o=n.ab2hex(t.value);if("cc"==o.substr(6,2)&&2!=n.connected)if("00"==o.substr(10,2))switch(parseInt(o.substr(8,2),16)){case 1:console.log("传感器异常！"),e.closeBluetoothAdapter({success:function(){n.connected=2,e.showToast({title:"传感器异常！",icon:"none",duration:3e3})}});break;case 2:console.log("不足以检测心跳或血压！"),e.closeBluetoothAdapter({success:function(){n.connected=2,e.showToast({title:"不足以检测心跳或血压！",icon:"none",duration:3e3})}});break;case 3:console.log("异常测量结果！"),e.closeBluetoothAdapter({success:function(){n.connected=2,e.showToast({title:"异常测量结果！",icon:"none",duration:3e3})}});break;case 4:console.log("袖口太松或泄漏（10秒压力小于30毫米）"),e.closeBluetoothAdapter({success:function(){n.connected=2,e.showToast({title:"袖口太松或泄漏（10秒压力小于30毫米）！",icon:"none",duration:3e3})}});break;case 5:console.log("气管堵塞"),e.closeBluetoothAdapter({success:function(){n.connected=2,e.showToast({title:"气管堵塞！",icon:"none",duration:3e3})}});break;case 6:console.log("压力波动过大"),e.closeBluetoothAdapter({success:function(){n.connected=2,e.showToast({title:"压力波动过大！",icon:"none",duration:3e3})}});break;case 7:console.log("压力超过上限"),e.closeBluetoothAdapter({success:function(){n.connected=2,e.showToast({title:"压力超过上限！",icon:"none",duration:3e3})}});break;case 8:console.log("请查看标准数据是否异常"),e.closeBluetoothAdapter({success:function(){n.connected=2,e.showToast({title:"请查看标准数据是否异常！",icon:"none",duration:3e3})}});break}else e.hideLoading(),parseInt(o.substr(8,2),16)&&parseInt(o.substr(10,2),16)&&(n.high_blood_pressure=parseInt(o.substr(8,2),16),n.low_blood_pressure=parseInt(o.substr(10,2),16),n.blood_pressure={high_blood_pressure:n.high_blood_pressure,low_blood_pressure:n.low_blood_pressure},console.log("最终血压为:",n.blood_pressure,JSON.stringify(n.blood_pressure)),n.pressure_pulse_rate=parseInt(o.substr(12,2),16)),console.log("高压：",n.high_blood_pressure,"低压：",n.low_blood_pressure,"心率",parseInt(o.substr(12,2),16)),console.log("高压：",parseInt(o.substr(8,2),16),"低压：",parseInt(o.substr(10,2),16),"心率",parseInt(o.substr(12,2),16));else e.hideLoading(),console.log("当前压力：",parseInt(o.substr(10,2),16))}))},bp_writeBLECharacteristicValue:function(){for(var t=[190,176,1,192,54],o=new ArrayBuffer(5),n=new DataView(o),c=0;c<5;c++)n.setUint8(c,t[c]);console.log(o),e.writeBLECharacteristicValue({deviceId:this.bp_deviceId,serviceId:this.bp_serviceId,characteristicId:this.bp_characteristicId,value:o})},bp_closeBluetoothAdapter:function(){this.connected=2,this.bp_discoveryStarted=!1,e.closeBluetoothAdapter({success:function(){e.hideLoading(),console.log("关闭蓝牙设备")}})},bo_openBluetoothAdapter:function(){var t=this;this.bo_discoveryStarted=!1,console.log("初始化蓝牙模块，进行血氧仪连接"),e.openBluetoothAdapter({success:function(e){console.log("openBluetoothAdapter success",e),t.bo_startBluetoothDevicesDiscovery()},fail:function(t){10001===t.errCode&&(console.log("用户蓝牙未开启或者手机不支持蓝牙功能"),e.onBluetoothAdapterStateChange((function(e){console.log("onBluetoothAdapterStateChange监听手机蓝牙状态",e),e.available&&this.bo_startBluetoothDevicesDiscovery()})))}})},bo_startBluetoothDevicesDiscovery:function(){var t=this;console.log("this.bo_discoveryStarted",this.bo_discoveryStarted),this.bo_discoveryStarted||(this.bo_discoveryStarted=!0,e.startBluetoothDevicesDiscovery({success:function(e){console.log("startBluetoothDevicesDiscovery success",e),t.bo_onBluetoothDeviceFound()},fail:function(){e.showModal({titile:"提示",content:"未搜索到蓝牙设备"})}}))},bo_onBluetoothDeviceFound:function(){var t=this;e.onBluetoothDeviceFound((function(o){console.log("onBluetoothDeviceFound success",o);var n=o.devices;if("Samo4 pulse oximeter"==n[0].name){e.hideLoading();var c=n[0];t.bo_createBLEConnection(c)}else t.bo_stopBluetoothDevicesDiscovery(),e.showLoading({title:"正在连接蓝牙..."}),1===t.connected?e.hideLoading():setTimeout((function(){e.hideLoading()}),5e3)}))},bo_createBLEConnection:function(t){var o=this;this.bo_stopBluetoothDevicesDiscovery(),console.log("开始连接蓝牙~~~");var n=t.deviceId;t.name;e.createBLEConnection({deviceId:n,success:function(e){console.log("连接蓝牙成功"),o.connected=1,o.bo_getBLEDeviceServices(n)}})},bo_stopBluetoothDevicesDiscovery:function(){console.log("停止搜索蓝牙设备"),this.bo_discoveryStarted=!1,e.stopBluetoothDevicesDiscovery()},bo_getBLEDeviceServices:function(t){var o=this;console.log("获取血氧仪的所有服务"),e.getBLEDeviceServices({deviceId:t,success:function(e){for(var n=0;n<e.services.length;n++)if(console.log("血氧仪的所有服务",e.services[n]),"0000FFF0-0000-1000-8000-00805F9B34FB"==e.services[n].uuid)return void o.bo_getBLEDeviceCharacteristics(t,e.services[n].uuid)}})},bo_getBLEDeviceCharacteristics:function(t,o){var n=this;console.log("获取血氧仪的特征值"),e.getBLEDeviceCharacteristics({deviceId:t,serviceId:o,success:function(c){for(var i=0;i<c.characteristics.length;i++){var s=c.characteristics[i];console.log("血氧仪某个服务的特征值",s),"0000FFF4-0000-1000-8000-00805F9B34FB"==s.uuid&&(n.bo_canWrite=!0,n.bo_deviceId=t,n.bo_serviceId=o,n.bo_characteristicId=s.uuid,n.bo_writeBLECharacteristicValue(),e.notifyBLECharacteristicValueChange({deviceId:t,serviceId:o,characteristicId:s.uuid,state:!0}))}},fail:function(e){console.error("getBLEDeviceCharacteristics",e)}}),e.onBLECharacteristicValueChange((function(t){var o=n.ab2hex(t.value);1==o.substr(20,2)&&2!=n.connected?(console.log("未戴好！"),e.closeBluetoothAdapter({success:function(){n.connected=2,e.showToast({title:"请检查是否佩戴血氧仪",icon:"none",duration:3e3})}})):(e.hideLoading(),n.blood_oxygen=parseInt(o.substr(16,2),16),n.oxygen_pulse_rate=parseInt(o.substr(18,2),16),console.log("当前血氧饱和度: ".concat(n.blood_oxygen,",  脉率值").concat(n.oxygen_pulse_rate)))}))},bo_writeBLECharacteristicValue:function(){var t=new ArrayBuffer(1),o=new DataView(t);console.log("buffer是".concat(this.buffer,", dataView是").concat(this.dataView)),o.setUint8(0,0),e.writeBLECharacteristicValue({deviceId:this.bo_deviceId,serviceId:this.bo_serviceId,characteristicId:this.bo_characteristicId,value:t})},bo_closeBluetoothAdapter:function(){this.connected=2,this.bo_discoveryStarted=!1,e.closeBluetoothAdapter({success:function(){e.hideLoading(),console.log("关闭蓝牙设备")}})}}};t.default=l}).call(this,o("543d")["default"])},f68e:function(e,t,o){"use strict";(function(e){o("04ee"),o("921b");n(o("66fd"));var t=n(o("a990"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,o("543d")["createPage"])}},[["f68e","common/runtime","common/vendor"]]]);