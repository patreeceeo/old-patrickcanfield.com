!(function (root) {

  var doc, gameStage;
  
  doc = root.document;

  root.addEventListener("load", function () {
    doc.querySelector("[x-game-rel=startbutton]").addEventListener("click", function () {
      // Hide everything else
      Array.prototype.slice.apply(doc.querySelectorAll("[x-game-rel=hide]")).forEach(function (el) {
        el.style.display = "none"; 
      });

      gameStage = doc.createElement("div");

      doc.querySelector("body").appendChild(gameStage);

      gameStage.style.position = "fixed";
      gameStage.style.top = "0px";
      gameStage.style.left = "0px";
      gameStage.style.height = "100%";
      gameStage.style.width = "100%";

      var colorIndex = 0;
      var backgroundColors = [
        "blue", 
        "orange", 
        "green", 
        "red", 
        "purple",
        "black"
      ]
      var interval = setInterval(function () {
        gameStage.style.backgroundColor = backgroundColors[colorIndex];
        colorIndex++;
        if(colorIndex == backgroundColors.length) {
          clearInterval(interval);
        }
      }, 300);
    });
  });

})(this);
