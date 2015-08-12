

!(function (angular, doc) {
  "use strict"; 

  angular.module("www", ["www.game"]);

  function GameController ($scope, $http, $interval, $timeout) {
    var gameStage, questionBox, answerBox;

    var question, questions = [
      {
        question: "What was the name of the hobbiest club\nat which the Apple Computer 1 was first\ndemoed? (1 word)",
        answer: "homebrew"
      },
      {
        question: "What is the name of the boundary around\na black hole inside which not even light\ncan escape? (2 words)",
        answer: "event horizon"
      },
      {
        question: "What was also banned in NYC around the\ntime of Prohibition because of its\nassociation with gambling? (1 word)",
        answer: "pinball"
      },
    ];
    
    function forEachInterval (coll, ms, cb) {
      var intervalId, index = 0, retval = {};
      intervalId = $interval(function () {
        cb(coll[index]);
        index++;
        if(index == coll.length) {
          $interval.cancel(intervalId);
          retval.done();
        }
      }, ms);
      return retval;
    }

    function shuffle (ary) {
      for(var index = 0; index < ary.length; index++) {
        var random1 = Math.floor(Math.random() * ary.length);
        var random2 = Math.floor(Math.random() * ary.length);
        var temp = ary[random1];
        ary[random1] = ary[random2];
        ary[random2] = temp;
      }
      return ary;
    }

    function scrambleWords (sentence) {
      var words = sentence.split(/\b/);
      return words.map(function (word) {
        if(word.length > 1) {
          return word[0] + shuffle(Array.prototype.slice.call(word, 1, word.length - 1)).join("") + word[word.length - 1];
        } else {
          return word;
        }
      }).join("");
    };

    $scope.play = function () {

      $scope.game = {
        playing: true
      };

      forEachInterval([
          "blue", 
          "orange", 
          "green", 
          "red", 
          "purple",
          "black"
        ], 300, function (color) {
          $scope.game.backgroundColor = color;
      }).done = function () {
        $scope.game.question = "";
        question = questions[Math.floor(Math.random() * questions.length)];

        forEachInterval(scrambleWords(question.question), 80, function (letter) {
          $scope.game.question += letter;
        }).done = function () {
          var updateAnswerInterval;
          var answered = false;  
          var input = doc.querySelector("input[x-rel=answer]");

          input.focus();
          input.value = "";
          updateAnswerInterval = $interval(function () {
            $scope.game.answer = "Answer:" + input.value;
            input.focus(); 
            if(input.value.length > 0) {
              $scope.game.showOkButton = true;
            } else {
              $scope.game.showOkButton = false;
            }
          }, 60);

          $scope.game.cursor = "_";
          var blinkyInterval = $interval(function () {
            if($scope.game.cursor === "_") {
              $scope.game.cursor = "";
            } else {
              $scope.game.cursor = "_";
            }
          }, 333);

          $scope.judgeAnswer = function judgeAnswer() {
            if(!answered) {
              answered = true;
              $interval.cancel(updateAnswerInterval);
              $interval.cancel(blinkyInterval);
              if(input.value.toLowerCase() === question.answer) {
                $http.get("/DS0LKX").success(function (result) {
                  $scope.game.feedback = "Correct! You may contact me at " + result.email;
                }).error(function () {
                 $scope.game.feedback = "You are correct, but there is an error in the program.";  
                });
              } else {
                $scope.game.feedback = "Incorrect. Please try again.";
                $timeout($scope.play, 1000);
              }
            }
          }

          input.addEventListener("keyup", function (event) {
            if(event.keyCode === 13) {
              $scope.judgeAnswer();
            }
          });
        };
      };
    };

  };

  angular.module("www.game", []).controller("GameController", GameController);

})(this.angular, this.document);
