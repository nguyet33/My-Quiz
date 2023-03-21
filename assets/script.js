var timer = document.getElementById("time");
var question= document.getElementById('question1');
var answer1= document.getElementById('answer1');
var answer2= document.getElementById('answer2');
var answer3= document.getElementById('answer3');
var answer4= document.getElementById('answer4');
var startButton = document.querySelector("#startbtn");
var container = document.querySelector(".container");
var score1= document.getElementById('Score');
var indicator=document.getElementById('indicator');
var highButton = document.getElementById('highscore');
var form = document.getElementById('form');
var inputVal = document.getElementById('get-value');
var submButton= document.getElementById('submitbutton');
var highscoreDisplay= document.getElementById('highscore-display');
var mainE1=document.querySelector("main");
var highbool = false
var getFinalList = localStorage.getItem("highscore");
var parFinalList = JSON.parse((getFinalList)) || [];
var finalList = parFinalList;
var score=0;
var Timeleft=100;
var count = 0;


var questionList=["1+1",
                "What is my name?",
                "3+3",
                "What is my Last Name?",
                "What state am I from?",
                "What State is biggest in Size?",
                "How Many States are there in America?",
                "What is cynophobia?",
                "What is the Rarest M&M color?",
                "What was the first soft drink in space?",
                "Which is the only edible food that never goes bad?",
                "Which Country Invent Ice Cream?"];
var answerList=[[2,4,5,6],
                ["Thien","Jason","Nhan","Jackie"],
                [3,6,5,10],
                ["Nguyen","Nguyen","Duong","Le"],
                ["Texas","California","Oregon","Washington"],
                ["Texas","Alaska","California","Washington"],
                [50,51,49,52],
                ["Fear of Birds","Fear of Insects","Fear of Dogs","Fear of Cats"],
                ["Blue","Purple","Brown","White"],
                ["Coca Cola","Pepsi","Fanta","RootBeer"],
                ["Crackers","Caramel","Honey","Raisins"],
                ["France","America","China","Japan"]];
var correctList=[0,2,1,0,3,1,0,2,2,0,2,2];



//When button is pressed it removes the button and calls the startquiz function
function clickStart(){
    startButton.parentNode.removeChild(startButton);
    startquiz();
}

// Adds the flex box and changes to first question
function startquiz(){ 
    score=0;
    score1.textContent=score;
    Timeleft=100;
    clearInterval(timerInterval);
    var timerInterval = setInterval(function(){
        if(Timeleft < 0){
            timer.textContent = "Time: 0";
            clearInterval(timerInterval);
            if(count<questionList.length);
                gameOver();
            }else{timer.textContent = "Time: " + Timeleft;}
        Timeleft--;  
    }, 500);
    highbool=false;
    question.classList.add("box");
    answer1.classList.add("box");
    answer2.classList.add("box");
    answer3.classList.add("box");
    answer4.classList.add("box");
    question.textContent= questionList[0];
    answer1.textContent=answerList[0][0];
    answer2.textContent=answerList[0][1];
    answer3.textContent=answerList[0][2];
    answer4.textContent=answerList[0][3];
    count=0;
    if(container.style.display==="none"){
        container.style.display="inline";
        highscoreDisplay.textContent="";
        mainE1.removeChild(createButton);
    }
    container.addEventListener("click", questions);
}

//Changes the question to the next
function changeQuestion(){
    if(count>=questionList.length){
        gameOver();
    }else{
        question.textContent= questionList[count];
        answer1.textContent=answerList[count][0];
        answer2.textContent=answerList[count][1];
        answer3.textContent=answerList[count][2];
        answer4.textContent=answerList[count][3]; 
    }
}

// Checks to see if the select answer is right or wrong and Add to score if correct and subtract time if incorrect
function questions(event){
    var element = event.target;
    clickBtn= element.getAttribute("data-number");
        if(clickBtn==null){
            return;
        }else if(clickBtn==correctList[count]){
            count++
            score++;
            score1.textContent=score;
            indicator.textContent="correct";
            changeQuestion();
            
        }else{
            Timeleft= Timeleft - 10;
            count++
            indicator.textContent="Wrong"
            changeQuestion(); 
        }
}

//Change Text to Display Gameover
function gameOver(){
    container.style.display="none";
    form.style.display="inline";
    Timeleft=0;
}

//creats a button but doesnt append it yet.
var createButton=document.createElement("Button");

// show high score
function showHighscore(){
  
    highscoreDisplay.textContent="";
    // var createButton=document.createElement("Button");
    createButton.setAttribute("class","button2");
    createButton.textContent="restart";
    mainE1.appendChild(createButton);

    // createButton.addEventListener('click', startquiz());
    if(!highbool){
        form.style.display="none";
        container.style.display="none";
        startButton.style.display="none";
        highbool=true;
        for(i=0;i<finalList.length; i++){
        var li = document.createElement("li");
        li.textContent=((finalList[i].Name)+": \xa0\xa0\xa0\xa0"+(finalList[i].scoreCount));
        highscoreDisplay.appendChild(li);
        }
    }else if(count>=questionList.length){
        container.style.display="none";
        startButton.style.display="inline";
        highbool=false;
        mainE1.removeChild(createButton);
    
    }else{
        container.style.display="inline";
        startButton.style.display="inline";
     
        highbool=false;
        mainE1.removeChild(createButton);
    }
}

// Submit highscore
function submitbutton(){
    var saveScore = {
        Name: inputVal.value,
        scoreCount: score
    }
    // if(finalList==null)
    finalList.push(saveScore);
    var finalList2 = JSON.stringify(finalList);
    localStorage.setItem("highscore",finalList2);
    inputVal.value="";
    container.style.display="inline";
    form.style.display="none";
    showHighscore();
};





//event listener for submit button
submButton.addEventListener('click', submitbutton);
//event listener for highscore button
highButton.addEventListener("click", showHighscore);
//event listener for the start button
startButton.addEventListener("click", clickStart);
//event listener for restart button
createButton.addEventListener("click", startquiz);











