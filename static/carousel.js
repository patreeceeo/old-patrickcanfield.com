!(function (root) {
  var doc, items, index, intervalId;

  doc = root.document;

  root.addEventListener("load", function () {
    function startCarousel () {
      intervalId = root.setInterval(function () {
        items[index].style.display = "none";
        index++; 
        if(index >= items.length) {
          index = 0;
        }
        items[index].style.display = "inline-block";
      }, 1500);
    }
    function stopCarousel () {
      clearInterval(intervalId);
    }

    items = doc.querySelectorAll("[x-carousel] *");
   
    for(index = 1; index < items.length; index++) {
      items[index].style.display = "none";

      items[index].addEventListener("mouseover", stopCarousel);
      items[index].addEventListener("mouseout", startCarousel);
    }

    index = 0;
    startCarousel();
  });
})(this);
