function _init_() {
  "use strict";
  console.log('---> START');
  var root = document.getElementById('root');
  var container = document.getElementsByClassName('container')[0];
  //var url = 'http://localhost:3001/api/campaigns';
  var url = 'http://www.ebay.com/rps/feed/v1.1/ebay-au';
  var wrapper = `<div class="container flex"></div>`;
  var os = {
    ios: navigator.userAgent.match(/iPhone|iPad|iPod/i),
    android: navigator.userAgent.match(/Android/i),
    mac: navigator.userAgent.match(/Macintosh/i),
	ms: navigator.userAgent(/Windows/i)
  };
  var btn = function(btnurl) {
    if(os.ios || os.android || os.mac || os.ms) {
    return `<div><a href="${btnurl}">Share on whats app</a></div>`;
    }
    return `<div><a href="${btnurl}">Buy Now →</a></div>`;;
  };
  var item = function(props) {
    return `<div class="item"><div class="image"><a href="${props.url}"><img src="${props.imageurl}" /></a></div><div class="info">${props.title}<br/><br/>${props.price}<br /><br/>${props.btn}</div></div>`;
  };

  function Fetch_it() {
    this.get = function(url, next) {
      if (!url) {
        return false;
      }
      var req = new XMLHttpRequest();
      //req.responseType = 'JSON';
      //req.overrideMimeType('application/json');
      req.open('GET', url, true);
      req.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        //var res = JSON.parse(req.response);
        var res = req.responseXML;
        next(res);
      }
    };
      req.send(null);
    }
  }

  function render(elements) {
    elements.parent.insertAdjacentHTML('afterbegin',elements.child);
  }

  function handleResponse(res) {
    for (var i = 0; i < 4; i++) {
      var btnurl = res.getElementsByTagName('url')[i].textContent;
      if(os.ios || os.android || os.mac || os.ms) {
        btnurl = 'whatsapp://send?text=' + res.getElementsByTagName('url')[i].textContent;
      }
      var props = {
        url: res.getElementsByTagName('url')[i].textContent,
        imageurl: res.getElementsByTagName('image225')[i].textContent,
        title: res.getElementsByTagName('title')[i].textContent,
        price: res.getElementsByTagName('price')[i].textContent,
        btn: btn(btnurl)
      };
      var elements = {
        parent: root,
        child: item(props)
      };
      render(elements);
    }
  }

  var fetch = new Fetch_it();

  fetch.get(url, function(res) {
    handleResponse(res);
  });
}
window.addEventListener('load', function() {
  _init_();
});
