!(function (root) {

  var doc, gameStage;
  
  doc = root.document;

  root.addEventListener("load", function () {
    doc.querySelector("[x-game-control=start]").addEventListener("click", function () {
      gameStage = doc.createElement("div");

      doc.querySelector("body").appendChild(gameStage);

      gameStage.style.position = "fixed";
      gameStage.style.top = "0px";
      gameStage.style.left = "0px";
      gameStage.style.height = "100%";
      gameStage.style.width = "100%";

      var colorIndex = 0;
      var backgroundColors = [
        "black", 
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
