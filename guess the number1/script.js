var randomnumber = Math.floor(Math.random() * 100) + 1;
var attempts = 0;

var inputnumber = document.querySelector(".inputnumber");
var guessbutton = document.querySelector(".button");
var messagedisplay = document.querySelector(".message");
var attemptsnumber = document.querySelector("#attemptsnumber");
var previousguesses = document.querySelector(".guessvalues");
var restartButton = document.querySelector('.restartbutton');
const winsound = document.querySelector(".winsound");
const losesound = document.querySelector(".losesound");

winsound.volume = 1;
losesound.volume = 1;

function takeinput()
{
        guessbutton.addEventListener("click", () => {
        const guess = Number(inputnumber.value);
        output(guess);
    });
}

function output(guess) {
    if (guess < 1 || guess > 100 || isNaN(guess)) 
    {
        losesound.play();
        messagedisplay.innerText = "Please enter a number between 1 and 100";
        messagedisplay.style.color = "#ff0000";
        console.log("wrong input");
    } 
    else 
    {
        attempts++;
        attemptsnumber.innerText = attempts;
        console.log(guess)

        if(attempts===7)
        {
            losesound.play();
            messagedisplay.innerText = `U couldn't guess! It was ${randomnumber}`;
            messagedisplay.style.color = "#4338ca";
            inputnumber.disabled = true;
            guessbutton.disabled = true;
            return;
        }

        if (guess === randomnumber) 
        {
            winsound.play();
            messagedisplay.innerText = "Correct! You guessed it!";
            messagedisplay.style.color = "#059669";
            messagedisplay.style.fontSize = "1.5rem";
            inputnumber.disabled = true;
            guessbutton.disabled = true;
            console.log("correct");
        } 
        else if (guess > randomnumber) 
        {
            losesound.play();
            messagedisplay.innerText = "Too high! Try again.";
            messagedisplay.style.color = "#1d4ed8";
            console.log("high");
        } 
        else 
        {
            losesound.play();
            messagedisplay.innerText = "Too low! Try again.";
            messagedisplay.style.color = "#b45309";
            console.log("low");
        }

        const span=document.createElement("span");
        span.innerText=guess;
        if (guess<randomnumber) 
            span.classList.add("low");
        if (guess>randomnumber) 
            span.classList.add("high");
        if (guess===randomnumber) 
            span.classList.add("correct");
        previousguesses.appendChild(span);
    }
}

restartButton.addEventListener("click",()=>{
    attempts=0;
    attemptsnumber.innerText = attempts;
    previousguesses.innerText="";
    inputnumber.disabled = false;
    guessbutton.disabled = false;
    inputnumber.value="";
    messagedisplay.innerText = "";
    messagedisplay.style.fontSize = "1rem";

    randomnumber = Math.floor(Math.random() * 100) + 1;
})

takeinput();
