import Vue from 'vue';
// 监听前端异常事件
window.addEventListener('error', e => errorHandler(e), true);

// 异常收集处理函数
const errorHandler = (e, t) => {
  console.log(e);
  let basicInfo = {
    // 概要信息
    general: {
      time: new Date(),
      proName: document.title,
      proUrl: window.location.href
    },
    // 错误堆栈信息
    stack: '',
    // 错误信息
    error: {},
    // 设备信息
    device: _AgentInfo._init()
  };
  // 收集【接口请求错误】
  if (e.errType === 'ajax') {
  } else {
    if (t) {
      basicInfo.stack = e.stack;
      basicInfo.error.message = e.message;
    } else {
      // 收集【非接口请求错误】
      if (e.target.localName) {
        // img[src]：图片请求链接错误监控
        if (e.target.localName === 'img') {
          basicInfo.error.message = 'Image Not Found: ' + e.target.src;
        }
      } else {
        // 收集【运行时js错误】
        let {message, filename, lineno, colno, error} = e;
        basicInfo.stack = error.stack;
        basicInfo.error = {message, filename, lineno, colno};
      }
    }
  }

  //打印收集到的错误数据
  console.log(basicInfo);

  // 发送请求
  Vue.axios
    .post('/api/saveError', basicInfo)
    .then(({data}) => console.log(data));
};

/*
获取设备信息
返回值： {
            browser: '浏览器名称',
            browserV: '浏览器版本',
            system: '操作系统',
            device: '设备：pc或mobile',
        }
*/
const _AgentInfo = {
  deviceType: '', // pc or mobile
  OSname: '', // windows, Android, linux and so on...
  browserName: '', //  chrome, safari, firefox, IE and so on...
  browserVer: '', //  browser version， important if in IE environment.
  adaptType: 0, // A type value, Adapt to the screen due to width
  _init: function() {
    _AgentInfo.setDeviceAndOS();
    _AgentInfo.setBrowser();
    return {
      browser: _AgentInfo.browserName,
      browserV: _AgentInfo.browserVer,
      system: _AgentInfo.OSname,
      device: _AgentInfo.deviceType
    };
  },
  setDeviceAndOS: function() {
    var name = 'unknown';
    if (window.navigator.userAgent.indexOf('Android') != -1) {
      name = 'Android';
    } else if (window.navigator.userAgent.indexOf('iPhone') != -1) {
      name = 'iPhone';
    } else if (window.navigator.userAgent.indexOf('SymbianOS') != -1) {
      name = 'SymbianOS';
    } else if (window.navigator.userAgent.indexOf('Windows Phone') != -1) {
      name = 'Windows Phone';
    } else if (window.navigator.userAgent.indexOf('iPad') != -1) {
      name = 'iPad';
    } else if (window.navigator.userAgent.indexOf('iPod') != -1) {
      name = 'iPod';
    }
    if (name != 'unknown') {
      _AgentInfo.OSname = name;
      _AgentInfo.deviceType = 'mobile';
      return;
    }
    if (window.navigator.userAgent.indexOf('Windows NT 10.0') != -1) {
      name = 'Windows 10';
    } else if (window.navigator.userAgent.indexOf('Windows NT 6.2') != -1) {
      name = 'Windows 8';
    } else if (window.navigator.userAgent.indexOf('Windows NT 6.1') != -1) {
      name = 'Windows 7';
    } else if (window.navigator.userAgent.indexOf('Windows NT 6.0') != -1) {
      name = 'Windows Vista';
    } else if (window.navigator.userAgent.indexOf('Windows NT 5.1') != -1) {
      name = 'Windows XP';
    } else if (window.navigator.userAgent.indexOf('Windows NT 5.0') != -1) {
      name = 'Windows 2000';
    } else if (window.navigator.userAgent.indexOf('Mac') != -1) {
      name = 'Mac/iOS';
    } else if (window.navigator.userAgent.indexOf('X11') != -1) {
      name = 'UNIX';
    } else if (window.navigator.userAgent.indexOf('Linux') != -1) {
      name = 'Linux';
    }
    _AgentInfo.OSname = name;
    _AgentInfo.deviceType = 'pc';
  },
  setBrowser: function() {
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;
    if ((verOffset = nAgt.indexOf('Opera')) != -1) {
      // In Opera, the true version is after "Opera" or after "Version"
      browserName = 'Opera';
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    } else if (nAgt.indexOf('Trident') != -1) {
      // ( ver >= ie7) In MSIE, the true version is after "MSIE" in userAgent
      if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
        fullVersion = nAgt.substring(verOffset + 5);
      } else {
        fullVersion = '11.0';
      }
      if (fullVersion == 5) {
        fullVersion = '11.0';
      }
      browserName = 'IE';
    } else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
      // In Chrome, the true version is after "Chrome"
      browserName = 'Chrome';
      fullVersion = nAgt.substring(verOffset + 7);
    } else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
      // In Safari, the true version is after "Safari" or after "Version"
      browserName = 'Safari';
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    } else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
      // In Firefox, the true version is after "Firefox"
      browserName = 'Firefox';
      fullVersion = nAgt.substring(verOffset + 8);
    } else if (
      (nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))
    ) {
      // In most other browsers, "name/version" is at the end of userAgent
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
      }
    }
    if ((ix = fullVersion.indexOf(';')) != -1)
      // trim the fullVersion string at semicolon/space if present
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(' ')) != -1)
      fullVersion = fullVersion.substring(0, ix);
    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }
    _AgentInfo.browserName = browserName;
    _AgentInfo.browserVer = fullVersion;
  },
  isMobile: function() {
    if (_AgentInfo.deviceType == 'mobile') {
      return true;
    }
    return false;
  },
  setAdaptType() {
    // A type value, Adapt to the screen due to width. For convenient
    if (screen.width <= 374) {
      _AgentInfo.adaptType = 0;
    } else if (screen.width <= 413) {
      _AgentInfo.adaptType = 1;
    } else {
      _AgentInfo.adaptType = 2;
    }
  }
};

// 将【异常处理函数】注册为vue插件，之后可以通过 vue.errorHandler(params)或this.errorHandler(params)主动调用
const install = Vue => {
  if (install.installed) return;
  install.installed = true;
  Object.defineProperties(Vue.prototype, {
    errorHandler: {
      get() {
        return errorHandler;
      }
    }
  });
};

export default {install};
