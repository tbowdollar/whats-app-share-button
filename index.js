function _init_() {
  "use strict";
  console.log('---> START');
  var root = document.getElementById('root');
  var container = document.getElementsByClassName('container')[0];
  var url = 'http://localhost:3001/api/campaigns';
  var wrapper = `<div class="container flex"></div>`;
  var btn = function(btnurl) {
    return `<div><a href="${btnurl}">Share on whats app</a></div>`;
  };
  var template = function(props) {
    return `<div id="item"><div class="image"><a href="${props.url}"><img src="${props.imageurl}" /></a></div><div class="info">${props.title}<br/><br/>${props.price}<br /><br/>${props.btn}</div></div>`;
  }

  function Fetch_it() {
    "use strict";
    this.get = function(url, next) {
      if (!url) {
        return false
      }
      var req = new XMLHttpRequest();
      req.responseType = 'JSON';
      req.overrideMimeType('application/json');
      req.open('GET', url, true);
      req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(req.response);
        next(res);
      }
    };
      req.send(null);
    }
  }

  function render(elements) {
    elements.parent.insertAdjacentHTML('afterbegin',elements.child);
  }

  var fetch = new Fetch_it();
  fetch.get(url, function(res) {
    console.log('---> RESPONSE');
    for (var i = 0; i < res.length; i++) {
      var btnurl = '';
      var props = {
        url: 1,
        imageurl: 1,
        title: res[i]['campaignName'],
        price: 1,
        btn: btn(btnurl)
      };
      var elements = {
        parent: root,
        child: template(props)
      };
      render(elements);
    }

  });
}
window.addEventListener('load', function() {
  _init_();
});
