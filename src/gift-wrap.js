function GiftWrap(message) {
  if (localStorage.getItem('gift-wrap:unwrapped'))
    return;

  function div(className, innerText) {
    var el = document.createElement('div');
    if(className) el.className = className;
    if (innerText) el.innerText = innerText;
    return el;
  }

  var e = {};

  e.container = div('gift-wrap');
  e.container.appendChild(e.paperLeft = div('paper left'));
  e.container.appendChild(e.paperRight = div('paper right'));
  e.container.appendChild(e.ribbonVertical = div('ribbon vertical'));
  e.container.appendChild(e.ribbonHorizontal = div('ribbon horizontal'));
  e.paperRight.appendChild(e.message = div('message', message));

  document.body.classList.add('gift-wrapped');
  document.body.appendChild(e.container);

  var t = [
    e.ribbonHorizontal,
    e.ribbonVertical,
    e.paperRight,
    e.paperLeft
  ];

  function handleClicks() {
    var el = t.shift();
    el.classList.add('next');

    el.onclick = function () {
      el.classList.remove('next');
      el.classList.add('clicked');
      el.onclick = null;

      if (t.length) {
        handleClicks();
      } else {
        setTimeout(function () {
          document.body.removeChild(e.container);
          document.body.classList.remove('gift-wrapped');
          localStorage.setItem('gift-wrap:unwrapped', true);
        }, 500);
      }
    }
  }

  handleClicks();
}