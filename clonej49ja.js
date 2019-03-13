function generateRandomNumber() {
    let randomNumber=[] 
    while (randomNumber.length <= 5) {
        let value = Math.floor(Math.random() * 49) + 1;
        if(randomNumber.indexOf(value)<0){
            randomNumber.push(value);
        }
    }
    return randomNumber
}

// THE DISPLAY DIVs
var displayDivs = $(".color-divs");
var displayDivs = document.querySelectorAll(".color-divs");
var divNumbers = document.querySelectorAll(".div-numbers");
var yourNumbersInput = document.querySelectorAll(".your-numbers");
var yourStakeInput = document.getElementById("your-stake");
var stakeBtn = document.getElementById("stake")
var feedback = document.getElementById("feedback");
var urNumDisplay = document.getElementById("your-num-disp");
var matchedNum = document.getElementById("matched-num");
var yourNumbers = ["", "", "", "", "", ""];
var yourStake = "";
var time_in_minutes = 2;


var colorRed = {
        num: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43, 46],
        color: "#CA2A2C"
};
var colorYellow = {
    num: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47],
    color: "#E68417"
};

var colorBlue = {
    num: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48],
    color: "#3E88C5"
};

var colorBlack = {
    num: [49],
    color: "#000000"
};


// THE STAKE BUTTON's Functionality
stakeBtn.addEventListener("click", function(){
    if(yourNumbersInput[0].value && yourNumbersInput[1].value && yourNumbersInput[2].value && yourNumbersInput[3].value&&yourNumbersInput[4].value&&yourNumbersInput[5].value ){
        yourNumbers = [];
        yourNumbersInput.forEach((num) => {
            yourNumbers.push(parseInt(num.value));
            num.value = "";
        });
        yourStake = yourStakeInput.value;
        yourStakeInput.value = "";
        urNumDisplay.innerHTML ="Your numbers are:";
        matchedNum.innerHTML = "Your matched numbers are:";
        feedback.innerHTML = "<h5>You just staked <span class = \"feedbackstake\"> " + yourStake + " naira</span>, kindly wait for the next draw for your result. Good luck</h5>"
        $(".your-numbers").each(function(){
            $(this).attr("disabled","");
        });
        $("#your-stake").attr("disabled","");
        $(this).addClass("disabled");
    } else {
        feedback.textContent = "Fill up all fields before you can stake";
    }
    
        
    
});

// THE FUNCTION HANDING THE DISPLAY FADE-IN DIVS
function intervalFunc() {

    countDown(); // start countdown anytime IntervalFunc is called
    var sixRandomNumber  = generateRandomNumber(); 
    let i = 0;
    // Code to remove the disabled class added to the inputs when we clicked the stake button
    $(".your-numbers").each(function(){
        $(this).removeAttr("disabled");
    });
    $("#your-stake").removeAttr("disabled");
    $("#stake").removeClass("disabled");
    //the running codes.
    if(yourNumbers == ["", "", "", "", "", ""] || yourStake == ""){
        feedback.textContent = "kindly make your predictions above"
    };
    let inter = setInterval(function(){
        if (i >= sixRandomNumber.length){
            i = 0;
            clearInterval(inter);
        }else if (i < sixRandomNumber.length){
            displayDivs[i].textContent = sixRandomNumber[i];
            if (colorRed.num.includes(parseInt(displayDivs[i].textContent))) {
                displayDivs[i].style.backgroundColor = colorRed.color;
                $(".color-divs").eq(i).fadeIn(6000);
            }
            if (colorYellow.num.includes(parseInt(displayDivs[i].textContent))) {
                displayDivs[i].style.backgroundColor = colorYellow.color;
                $(".color-divs").eq(i).fadeIn(6000);
            }
            if (colorBlue.num.includes(parseInt(displayDivs[i].textContent))) {
                displayDivs[i].style.backgroundColor = colorBlue.color;
                $(".color-divs").eq(i).fadeIn(6000);
            }
            if (colorBlack.num.includes(parseInt(displayDivs[i].textContent))) {
                displayDivs[i].style.backgroundColor = colorBlack.color;
                $(".color-divs").eq(i).fadeIn(5000);
            }
            i++;
        }
        
    }, 4000)
    
    // To fade out the Divs
    setTimeout(function(){
        $(".color-divs").each(function(){
            $(this).fadeOut(5000);    
        });
        feedback.textContent = "";
        urNumDisplay.textContent = "";
        matchedNum.textContent = "";
    },(time_in_minutes-0.3)*60*1000);

    (function calWinning(){  // This function compares your inputed numbers and the computer's number and determine your result.
        let wonNumbers = [];
        let wonPrice;
        yourNumbers.forEach(num => {
            if(sixRandomNumber.includes(num)){
                wonNumbers.push(num);
            }
        });
        urNumDisplay.innerHTML ="Your numbers are: <span style='color: white; font-size: 2rem;'>" + yourNumbers[0] + " " + yourNumbers[1] + " " + yourNumbers[2] + " " + yourNumbers[3] + " " + yourNumbers[4] + " " + yourNumbers[5] + "</span>";
        matchedNum.innerHTML = "Your matched numbers are: <span style='color: white; font-size: 2rem;'>" + wonNumbers + "</span>";
        if(yourNumbers == ["", "", "", "", "", ""] || yourStake == ""){
            feedback.textContent = "kindly make your predictions above"
        }else if(wonNumbers.length == 0){
            feedback.textContent = "You didn't get any of the numbers correct. You didn't win anything. Better luck next time";
        }else if (wonNumbers.length == 1){
            feedback.textContent = "You only got one number correct. You didnt win anything. Better luck next time";
        }else if (wonNumbers.length == 2){
            wonPrice = 500 * yourStake;
            feedback.innerHTML = "<h4>Congratulations! you have won 2Direct which has 500 odds, your winning is <span class=\"feedbackstake\">" + wonPrice + "</span></h4>";
        }else if (wonNumbers.length == 3){
            wonPrice = 4000 * yourStake;
            feedback.innerHTML = "<h4>Congratulations! you have won 2Direct which has 4000 odds, your winning is <span class=\"feedbackstake\">" + wonPrice + "</span></h4>";
        }else if (wonNumbers.length == 4){
            wonPrice = 10000 * stake;
            feedback.innerHTML = "<h4>Congratulations! you have won 2Direct which has 10000 odds, your winning is <span class=\"feedbackstake\">" + wonPrice + "</span></h4>"
        }else if(wonNumbers.length == 5){
            wonPrice = 20000 * stake;
            feedback.innerHTML = "<h4>Congratulations! you have won the JACKPOT!!!!. Your winning is <span class=\"feedbackstake\">" + wonPrice + "</span></h4>";
        }
            
    })();

    yourNumbers = ["", "", "", "", "", ""];
}

intervalFunc(); // TO RUN IT INSTANTLY SO AS TO ESCAPE DELAY
setInterval(intervalFunc, time_in_minutes*60*1000);


// COUNTDOWN DIV FUNCTION 
function countDown(){
    
    var current_time = Date.parse(new Date());
    var deadline = new Date(current_time + time_in_minutes*60*1000);
    function time_remaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
    }
    function run_clock(id,endtime){
        var clock = document.querySelectorAll("."+id);
        function update_clock(){
            var t = time_remaining(endtime);
            clock[0].textContent = t.minutes;
            if (clock[0].textContent.length < 2){
                clock[0].textContent = "0" + t.minutes;
            }
            clock[1].textContent = t.seconds;
            if (clock[1].textContent.length < 2){
                clock[1].textContent = "0" + t.seconds;
            }
            if(t.total<=0){ clearInterval(timeinterval); }
            if(clock[0].textContent == "00" && clock[1].textContent <= 15){
                clock[0].style.color = "red";
                clock[1].style.color = "red";
            } else{
                clock[0].style.color = "white";
                clock[1].style.color = "white";
            }
        }
        update_clock(); // run function once at first to avoid delay
        var timeinterval = setInterval(update_clock,1000);
    }
    run_clock('clockdiv',deadline);
} 

// code handinging the forecast section. check html for forecast section  to understand.
divNumbers.forEach((div) => {
    if (colorRed.num.includes(parseInt(div.textContent))) {
        div.style.backgroundColor = colorRed.color;

    }
     if (colorYellow.num.includes(parseInt(div.textContent))) {
        div.style.backgroundColor = colorYellow.color;
    }
    if (colorBlue.num.includes(parseInt(div.textContent))) {
        div.style.backgroundColor = colorBlue.color;
    }
    if (colorBlack.num.includes(parseInt(div.textContent))) {
        div.style.backgroundColor = colorBlack.color;
    }
});




