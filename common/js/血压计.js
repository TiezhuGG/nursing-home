const app = getApp()

function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

Page({
  data: {
    devices: [],
    connected: false,
    chs: [],
  },
  openBluetoothAdapter() {
    wx.openBluetoothAdapter({
      success: (res) => {
        //console.log('openBluetoothAdapter success', res)
        this.startBluetoothDevicesDiscovery()
      },
      fail: (res) => {
        if (res.errCode === 10001) {
          wx.onBluetoothAdapterStateChange(function (res) {
           // console.log('onBluetoothAdapterStateChange', res)
            if (res.available) {
              this.startBluetoothDevicesDiscovery()
            }
          })
        }
      }
    })
  },
  getBluetoothAdapterState() {
    wx.getBluetoothAdapterState({
      success: (res) => {
       // console.log('getBluetoothAdapterState', res)
        if (res.discovering) {
          this.onBluetoothDeviceFound()
        } else if (res.available) {
          this.startBluetoothDevicesDiscovery()
        }
      }
    })
  },
  startBluetoothDevicesDiscovery() {
    if (this._discoveryStarted) {
      return
    }
    this._discoveryStarted = true
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true,
      success: (res) => {
       // console.log('startBluetoothDevicesDiscovery success', res)
        this.onBluetoothDeviceFound()
      },
    })
  },
  stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery()
  },
  onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound((res) => {
      var devices = res.devices
      if (devices[0].name == 'FSRKB_BT_001') {
        let e = devices[0]
        this.createBLEConnection(e)
      } 
    })
  },
  createBLEConnection(e) {
    // const ds = e.currentTarget.dataset
    const deviceId = e.deviceId
    const name = e.name
    wx.createBLEConnection({
      deviceId,
      success: (res) => {
        this.setData({
          connected: true,
          name,
          deviceId,
        })
        this.getBLEDeviceServices(deviceId)
      }
    })
    this.stopBluetoothDevicesDiscovery()
  },
  closeBLEConnection() {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId
    })
    this.setData({
      connected: false,
      chs: [],
      canWrite: false,
    })
  },
  getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].uuid == '0000FFF0-0000-1000-8000-00805F9B34FB') {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
            return
          }
        }
      }
    })
  },
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        // console.log('getBLEDeviceCharacteristics success', res.characteristics)
        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i]
          if (item.uuid == '0000FFF6-0000-1000-8000-00805F9B34FB') {
            this.setData({
              canWrite: true
            })
            this._deviceId = deviceId
            this._serviceId = serviceId
            this._characteristicId = item.uuid
            this.writeBLECharacteristicValue()

            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            })
          }
        }
      },
      fail(res) {
        console.error('getBLEDeviceCharacteristics', res)
      }
    })
    // 操作之前先监听，保证第一时间获取数据
    wx.onBLECharacteristicValueChange((characteristic) => {
      let vale = ab2hex(characteristic.value)
      if(vale.substr(6,2) == 'cc') {		//判断是否测量结束，结束则进入
        if(vale.substr(10,2)== '00') {			//判断是否错误，错误则进入
          switch (parseInt(vale.substr(8, 2), 16)) {
            case 1:
            console.log('传感器异常！')
            break

            case 2:
            console.log('不足以检测心跳或血压！')
            break

            case 3:
            console.log('异常测量结果！')
            break

            case 4:
              console.log('袖口太松或泄漏（10秒压力小于30毫米）')
            break

            case 5:
            console.log('气管堵塞')
            break

            case 6:
            console.log('压力波动过大')
            break

            case 7:
            console.log('压力超过上限')
            break

            case 8:
            console.log('请查看标准数据是否异常')
            break
          }
        }
        else {		//输出测量结果
          console.log('高压：', parseInt(vale.substr(8, 2), 16), '低压：', parseInt(vale.substr(10, 2), 16), '心率', parseInt(vale.substr(12, 2), 16))
        }
      }
      else {		//输出当前压力值
        console.log('当前压力：',parseInt(vale.substr(10, 2), 16))
      }
    })
  },
  writeBLECharacteristicValue() {
    let sz = [0xBE, 0xB0, 0x01, 0xc0, 0x36]
    let buffer = new ArrayBuffer(5)
    let dataView = new DataView(buffer)

    for(let i=0;i<5;i++) {
      dataView.setUint8(i, sz[i])
    } 
    console.log(buffer)
    wx.writeBLECharacteristicValue({
      deviceId: this._deviceId,
      serviceId: this._serviceId,
      characteristicId: this._characteristicId,
      value: buffer,
    })
  },
  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter()
    this._discoveryStarted = false
  },
})
