!(function(root) {

  var doc, element, otherElement, elementInfo = {};
  
  doc = root.document;

  function updateOpacity () {
    var percentScroll = element.parentElement.scrollTop / element.scrollHeight
    element.style.opacity = "" + (
      1 - percentScroll
      );
  }

  root.addEventListener("load", function () {
    element = doc.querySelector("[x-fade-on-scroll]");
    updateOpacity();
    element.style.transition = "opacity 300ms linear";
    element.style.zIndex = "0";
    elementInfo.position = element.style.position;
    elementInfo.left = element.style.left;
    elementInfo.top = element.style.top;
    elementInfo.height = element.offsetHeight;
    elementInfo.width = element.offsetWidth;
    elementInfo.offsetLeft = element.offsetLeft;
    elementInfo.offsetTop = element.offsetTop;

    element.style.position = "fixed";
    element.style.left = 100 * (elementInfo.offsetLeft / root.innerWidth) + "%";
    element.style.top = 100 * (elementInfo.offsetTop / root.innerHeight) + "%";

    otherElement = doc.querySelector("[x-fade-on-scroll] + *");
    otherElement.style.position = "relative";
    otherElement.style.zIndex = "1";
    otherElement.style.top = (elementInfo.height + elementInfo.offsetTop) + "px";
  });

  root.addEventListener("scroll", function (eventInfo) {
    root.requestAnimationFrame(updateOpacity);
  });
  
})(this);
