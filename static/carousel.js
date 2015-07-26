!(function (root) {
  var doc, items, index;

  doc = root.document;

  root.addEventListener("load", function () {
    items = doc.querySelectorAll("[x-carousel] *");
   
    for(index = 1; index < items.length; index++) {
      items[index].style.display = "none";
    }

    index = 0;
    root.setInterval(function () {
      items[index].style.display = "none";
      index++; 
      console.log(index);
      if(index >= items.length) {
        index = 0;
      }
      items[index].style.display = "inline-block";
    }, 1500);
  });
})(this);
