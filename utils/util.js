function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function parseURL(url) {
   var a = document.createElement('a');
   a.href = url;
   return {
     source: url,
     protocol: a.protocol.replace(':', ''),
     host: a.hostname,
     port: a.port,
     query: a.search,
     params: (function () {
      var ret = {},
        seg = a.search.replace(/^\?/, '').split('&'),
        len = seg.length, i = 0, s;
      for (; i < len; i++) {
        if (!seg[i]) { continue; }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
     })(),
     file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
     hash: a.hash.replace('#', ''),
     path: a.pathname.replace(/^([^\/])/, '/$1'),
     relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
     segments: a.pathname.replace(/^\//, '').split('/')
   };
}    


module.exports = {
  formatTime: formatTime,
  parseURL: parseURL
}
