/*Define variables*/
    var welcome = document.querySelector("#introduction");
    var startBtn = document.querySelector("#start_button");
    var introPage =document.querySelector("#intro_page");
    
    var questionPage = document.querySelector("#question_page");
    var askQuestion = document.querySelector("#ask_question");
    
    var reactButtons = document.querySelectorAll(".choices");
    var answerBtn1 = document.querySelector("#answer_btn1");
    var answerBtn2 = document.querySelector("#answer_btn2");
    var answerBtn3 = document.querySelector("#answer_btn3");
    var answerBtn4 = document.querySelector("#answer_btn4");
    
    var checkLine = document.querySelector("#check_line");
    var scoreBoard = document.querySelector("#submit_page");
    var finalScore = document.querySelector("#final_score");
    var userInitial =document.querySelector("#initial");
    
    var submitBtn =document.querySelector("#submit_btn");
    var highScorePage =document.querySelector("#highscore_page");
    var scoreRecord =document.querySelector("#score_record");
    var scoreCheck =document.querySelector("#score_check");
    var finish =document.querySelector("#finish");
    
    var backBtn =document.querySelector("#back_btn");
    var clearBtn=document.querySelector("#clear_btn");
    
        //Define questions (Object)
    var questionSource = [
        {
            question: "Questions 1 : Which HTML tag is used to define a table?",
            choices: ["a. <table> ", "b. <tables> ", "c. <th>", "d. <tr>"],
            answer: "a"
        },
        {
            question: "Questions 2 : The tag for table data is? ",
            choices: ["a. <tr>", "b. <td>", "c. <th>", "d. none"],
            answer: "b"
        },
        {
            question: "Questions 3 : The tag for the table rows is?",
            choices: ["a. <tr> ", "b. <td>", "c. <th>", "d. none"],
            answer: "a"
        },
        {
            question: "Questions 4 : Which tag defines a paragraph?",
            choices: ["a. <p>", "b. <pre>", "c. <a>", "d. <h1>"],
            answer: "a"
        },
        {
            question: "Questions 5 : The first index of an array is ____.",
            choices: ["a. 0", "b. 1", "c. 8", "d. any"],
            answer: "a"
        },
        {
            question: "Questions 6 : CSS stands for...",
            choices: ["a. Computer Styled Sections", "b. Cascading Style Sheets", "c. Crazy Solid Shapes", "d. None of the above"],
            answer: "b"
        },
    ];
        //Set other variables
    
    var timeLeft = document.getElementById("timer");
    
    var secondsLeft = 60;
    var questionNumber = 0;
    var totalScore = 0;
    var questionCount = 1;
    /*Functions*/
        //WHEN I click the start button, THEN a timer starts(The setInterval() Method)
    function countdown() {
            
            var timerInterval = setInterval(function () {
    
              secondsLeft--;
              timeLeft.textContent = "Time left: " + secondsLeft + " s";
        
                if (secondsLeft <= 0){
                    clearInterval(timerInterval);
                    timeLeft.textContent = "Time is up!"; 
                    // if time is up, show on score board content instead of "all done!"
                    finish.textContent = "Time is up!";
                    gameOver();
    
                } else  if(questionCount >= questionSource.length +1) {
                    clearInterval(timerInterval);
                    gameOver();
                    } 
        }, 1000);
    }
    
        //Click the button to start the quiz
    function startQuiz () {
            introPage.style.display = "none";
            questionPage.style.display = "block";
            questionNumber = 0
            countdown();
            showQuestion(questionNumber);
          
    }
        //present the questions and answers
    function showQuestion (n) {
            askQuestion.textContent = questionSource[n].question;
            answerBtn1.textContent = questionSource[n].choices[0];
            answerBtn2.textContent = questionSource[n].choices[1];
            answerBtn3.textContent = questionSource[n].choices[2];
            answerBtn4.textContent = questionSource[n].choices[3];
            questionNumber = n;
        }
    
        //WHEN I answer a question,Show if answer is correct or wrong 
    function checkAnswer(event) {
        event.preventDefault();
        //make it display
        checkLine.style.display = "block";
        setTimeout(function () {
            checkLine.style.display = 'none';
        }, 1000);
    
        // answer check
        if (questionSource[questionNumber].answer == event.target.value) {
            checkLine.textContent = "Correct!"; 
            totalScore = totalScore + 1;
    
        } else {
            secondsLeft = secondsLeft - 10;
            checkLine.textContent = "Wrong! The correct answer is " + questionSource[questionNumber].answer + " .";
        }
             //THEN I am presented with another question
        if (questionNumber < questionSource.length -1 ) {
        // call showQuestions to bring in next question when any reactBtn is clicked
            showQuestion(questionNumber +1);
        } else {
        gameOver();
    }
    questionCount++;
    }
        //WHEN all questions are answered or the timer reaches 0, Game is over
    function gameOver() {
    
            questionPage.style.display = "none";
            scoreBoard.style.display = "block";
            console.log(scoreBoard);
            // show final score
            finalScore.textContent = "Your final score is :" + totalScore ;
            // clearInterval(timerInterval);  
            timeLeft.style.display = "none"; 
    };
    
    // get current score and initials from local storage
    function getScore () {
        var currentList =localStorage.getItem("ScoreList");
        if (currentList !== null ){
            freshList = JSON.parse(currentList);
            return freshList;
        } else {
            freshList = [];
        }
        return freshList;
    };
    
    
    // render score to the score board
    function renderScore () {
        scoreRecord.innerHTML = "";
        scoreRecord.style.display ="block";
        var highScores = sort();   
        // Slice the high score array to only show the top five high scores. 
        var topFive = highScores.slice(0,5);
        for (var i = 0; i < topFive.length; i++) {
            var item = topFive[i];
        // Show the score list on score board
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
        }
    };
    
    // sort score and ranking the highscore list
    function sort () {
        var unsortedList = getScore();
        if (getScore == null ){
            return;
        } else{
        unsortedList.sort(function(a,b){
            return b.score - a.score;
        })
        return unsortedList;
    }};
    
    // push new score and initial to the local storage
    function addItem (n) {
        var addedList = getScore();
        addedList.push(n);
        localStorage.setItem("ScoreList", JSON.stringify(addedList));
    };
    
    function saveScore () {
        var scoreItem ={
            user: userInitial.value,
            score: totalScore
        }
        addItem(scoreItem);
        renderScore();
    }
    
    /* Add event listeners*/
    // startbtn to start the quiz
    startBtn.addEventListener("click", startQuiz);
    
    //click any choices button, go to the next question
    reactButtons.forEach(function(click){
    
        click.addEventListener("click", checkAnswer);
    });
    
    //save information and go to next page
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        saveScore();
    });
    
    // check highscore ranking list
    scoreCheck.addEventListener("click", function(event) {
        event.preventDefault();
        scoreBoard.style.display = "none";
        introPage.style.display = "none";
        highScorePage.style.display = "block";
        questionPage.style.display ="none";
        renderScore();
    });
    
    //go back to main page
    backBtn.addEventListener("click",function(event){
            event.preventDefault();
            scoreBoard.style.display = "none";
            introPage.style.display = "block";
            highScorePage.style.display = "none";
            questionPage.style.display ="none";
            location.reload();
    });
    
    //clear local storage and clear page shows
    clearBtn.addEventListener("click",function(event) {
        event.preventDefault();
        localStorage.clear();
        renderScore();
    });
    
    