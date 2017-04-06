app.controller('trappistController', ['$scope', '$http', '$sce', function($scope, $http, $sce){

$scope.score = 0;
$scope.activeQuestion = -1;
$scope.activeQuestionAnswered = 0;
$scope.percentage = 0;




$http.get('quiz_data.json').then(function (quizData) {
	$scope.myQuestions = quizData.data;
	$scope.questionLength= $scope.myQuestions.length;
     $scope.totalQuestions =$scope.questionLength;
})
.catch (function(error){
	console.log("For fucks sake");

});
$scope.selected =function(qIndex , aIndex){
	console.log("bado tuko: "+ qIndex + ''+ aIndex );
	var questionState = $scope.myQuestions[qIndex].questionState;
     
     $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

     if(questionState !='answered'){
     	$scope.myQuestions[qIndex].selected =aIndex;
     	var correctAnswer = $scope.myQuestions[qIndex].correct;
          $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

          console.log(correctAnswer);


     	if(aIndex === correctAnswer){
     		$scope.myQuestions[qIndex].correctness ='correct';
     		$scope.score +=1;
               console.log($scope.myQuestions[qIndex].correctness );

     	}
     	else{
     	$scope.myQuestions[qIndex].correctness ='incorrect';
          console.log($scope.myQuestions[qIndex].correctness );

        }
     	$scope.myQuestions[qIndex].questionState ='answered';

          $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(1);
     	
     }

}
$scope.isSelected = function (qIndex, aIndex){
     return $scope.myQuestions[qIndex].selected === aIndex;
      console.log( $scope.myQuestions[qIndex].selected +" "+ aIndex)

}
$scope.isCorrect = function (qIndex, aIndex){
     return $scope.myQuestions[qIndex].correctAnswer === aIndex;
     console.log( $scope.myQuestions[qIndex].correctAnswer +" "+ aIndex)

}

$scope.nextQuestion = function(){
     return $scope.activeQuestion +=1;
} 

$scope.createShareLink = function(percentage){
     var url = 'http://trapistone.mk';
     var emailLink = '<a class= "btn email" href="mailto:?subject= Try to beat my quiz score!&amp;body= I scored ' +percentage+' % on this quiz on Trappist-1. Try beat my Score at '+url+'">email a friend <span> <img src="/images/socialmedia/mail_grey.svg" height="25" width="25"></span></a>'
     var twitterLink ='<a class= "btn twitter" href="https://twitter.com/intent/tweet?text=I scored '+percentage+' percent on this Trapist-1 quiz. Try beat my score at '+url+'" target="_blank">Tweet your friends</a>'
     // I scored a '+percentage+' % on this quiz about Trappist-1. Try to beat my score at&amp; '+url+' #trappist-1." target= "_blank">Tweet your friends<span><img src="/images/socialmedia/twitter_circle_gray.svg" height="25" width="25"></span></a>'
     var newMarkUp = emailLink + twitterLink;

     
     return $sce.trustAsHtml(newMarkUp);


}

}]);