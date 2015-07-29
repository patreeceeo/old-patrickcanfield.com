!(function (root) {

  var doc, gameStage, questionBox, answerBox;

  var question, questions = [
    {
      question: "What was the name of the hobbiest club\nat which the Apple Computer 1 was first\ndemonstrated? (1 word)",
      answer: "homebrew"
    },
    {
      question: "What is the name of the boundary around\na black hole inside which not even light\ncan escape? (2 words)",
      answer: "event horizon"
    }
  ];
  
  doc = root.document;

  function forEachInterval (coll, ms, cb) {
    var intervalId, index = 0, retval = {};
    intervalId = root.setInterval(function () {
      cb(coll[index]);
      index++;
      if(index == coll.length) {
        root.clearInterval(intervalId);
        retval.done();
      }
    }, ms);
    return retval;
  }

  function game () {
    // Hide everything else
    Array.prototype.slice.apply(doc.querySelectorAll("[x-game-rel=hide]")).forEach(function (el) {
      el.style.display = "none"; 
    });

    gameStage = doc.createElement("div");
    doc.querySelector("body").appendChild(gameStage);
    gameStage.className = "GameStage";

    questionBox = doc.createElement("pre");
    gameStage.appendChild(questionBox);
    questionBox.className = "MessageBox";

    answerBox = doc.createElement("div");
    gameStage.appendChild(answerBox);
    answerBox.className = "MessageBox";

    forEachInterval([
        "blue", 
        "orange", 
        "green", 
        "red", 
        "purple",
        "black"
      ], 300, function (color) {
        gameStage.style.backgroundColor = color;
    }).done = function () {
      question = questions[Math.floor(Math.random() * questions.length)];

      forEachInterval(question.question, 10, function (letter) {
        questionBox.innerHTML += letter;
      }).done = function () {
        var answerLine = doc.createElement("p");
        answerBox.appendChild(answerLine);

        var answerSpan = doc.createElement("span");
        answerLine.appendChild(answerSpan);
        answerSpan.innerHTML = "Answer:";

        var input = doc.createElement("input");
        answerBox.appendChild(input);
        input.maxLength=32;
        input.focus();
        var updateAnswerInterval = root.setInterval(function () {
          answerSpan.innerHTML = "Answer:" + input.value;
          input.focus(); 
        }, 60);

        var blinky = doc.createElement("span");
        answerLine.appendChild(blinky);
        var blinkyInterval = root.setInterval(function () {
          if(blinky.innerHTML === "_") {
            blinky.innerHTML = "";
          } else {
            blinky.innerHTML = "_";
          }
        }, 333);

        var button = doc.createElement("button");
        answerBox.appendChild(button);
        button.className = "BigRedButton";
        button.innerHTML = "Ok!";

        var answered = false;  
        function judgeAnswer() {
          if(!answered) {
            answered = true;
            var box = doc.createElement("div");
            box.className = "MessageBox";
            gameStage.appendChild(box);
            root.clearInterval(updateAnswerInterval);
            root.clearInterval(blinkyInterval);
            if(input.value.toLowerCase() === question.answer) {
              box.innerHTML = "Correct!";
            } else {
              box.innerHTML = "Incorrect. Please try again.";
              setTimeout(function () {
                gameStage.remove();
                game();
              }, 1000);
            }
          }
        }

        button.addEventListener("click", judgeAnswer);
        input.addEventListener("keyup", function (event) {
          if(event.keyCode === 13) {
            judgeAnswer();
          }
        });
      };
    };
  };

  root.addEventListener("load", function () {
    doc.querySelector("[x-game-rel=startbutton]").addEventListener("click", game);
  });

})(this);
