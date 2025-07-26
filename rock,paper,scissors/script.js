const losesound = new Audio("audio/lose.wav");
const winsound = new Audio("audio/win.mp3");

let usermark=0;
let computmark=0;

const choices=document.querySelectorAll(".ch")

const userscorepara=document.querySelector("#userscore")
const compscorepara=document.querySelector("#compscore")

choices.forEach((choice)=>{
    choice.addEventListener("click",()=>{
        const userchoice=choice.getAttribute("id")
        playgame(userchoice)
    });
});

const gencompchoice=()=>{
    let options=["Rock","Paper","Scissors"];
    const randindex=Math.floor(Math.random()*3)
    return options[randindex]
};

const playgame=(userchoice)=>{
    const compchoice=gencompchoice();

    if(userchoice===compchoice)
    {
        drawgame()
    }
    else
    {
        let userwin=true;
        if(userchoice==="Rock")
        {
            if(compchoice==="Paper")
                userwin=false

            if(compchoice==="Scissors")
                userwin=true

        }
        else if(userchoice==="Paper")
        {
            if(compchoice==="Rock")
                userwin=false

            if(compchoice==="Scissors")
                userwin=true
        }
        else 
        {
            if(compchoice==="Paper")
                userwin=true

            if(compchoice==="Rock")
                userwin=false
        }
        showwinner(userwin,userchoice,compchoice);
    }
};

const drawgame=()=>{
    msg.innerText="Its a Draw. Play again"
    msg.style.backgroundColor="#081b31"
}

const showwinner=(userwin,userchoice,compchoice)=>{
    if(userwin)
    {
        winsound.currentTime=0;
        winsound.play();
        msg.innerText=`You Win! ${userchoice} beats ${compchoice}`
        msg.style.backgroundColor="green"
        usermark++;
        userscorepara.innerText=usermark
    }
    else
    {
        losesound.currentTime=0;
        losesound.play();
        msg.innerText=`You Lose! ${compchoice} beats ${userchoice}`
        msg.style.backgroundColor="red"
        computmark++;
        compscorepara.innerText=computmark;
    }

}