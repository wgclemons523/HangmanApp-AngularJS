var app = angular.module("HangmanApp",[]);
app.controller("GameController", ['$scope', '$timeout', function($scope, $timeout){
    
    var words = ["rat", "cat", "bat", "hat"];
    $scope.incorrectLettersChosen=[];
    $scope.correctLettersChosen=[];
    $scope.guesses = 6;
    $scope.displayWord="";
    $scope.input = {
        letter : ''
    }
var selectRandomWord = function(){
    var index = Math.round(Math.random() * words.length);
    return words[index];
}

var newGame = function(){
    $scope.incorrectLettersChosen = [];
    $scope.correctLettersChosen=[];
    $scope.guesses = 6;
    $scope.displayWord="";

    selectedWord = selectRandomWord();
    var tempDisplayWord = "";
    for (var i = 0; i < selectedWord.length; i++){
        tempDisplayWord +="*";
    }
    $scope.displayWord = tempDisplayWord;


}

$scope.letterChosen = function(){
    for(var i = 0; i < $scope.correctLettersChosen.length; i++){
        if($scope.correctLettersChosen[i].toLowerCase()==$scope.input.letter.toLowerCase()){
            $scope.input.letter = "";
            return;
        }
    }
    for(var i = 0; i < $scope.incorrectLettersChosen.length; i++){
        if($scope.incorrectLettersChosen[i].toLowerCase()==$scope.input.letter.toLowerCase()){
            $scope.input.letter = "";
            return;
        }
    }
    //changes starred marks to match correctly guessed letters
    var correct = false;
    for(var i = 0; i < selectedWord.length; i++){
        if(selectedWord[i].toLowerCase() == $scope.input.letter.toLowerCase()){
            $scope.displayWord = $scope.displayWord.slice(0,i) + $scope.input.letter.toLowerCase() + $scope.displayWord.slice(i + 1);
            correct = true;
        }
    }
    if(correct){
        $scope.correctLettersChosen.push($scope.input.letter.toLowerCase());
    } else {
        $scope.guesses--;
        $scope.incorrectLettersChosen.push($scope.input.letter.toLowerCase());
    }
    $scope.input.letter = "";
    if($scope.guesses == 0){
        $timeout(function(){
            newGame();
        }, 500);
    }
    if($scope.displayWord.indexOf("*") == -1){
        $timeout(function(){
            newGame();
        }, 500);
    }
}
newGame();
}]);
