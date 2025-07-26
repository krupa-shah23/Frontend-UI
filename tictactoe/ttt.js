let winSound = new Audio("win.wav");
let drawSound = new Audio("draw.wav");
let xo = new Audio("xo.mp3");

let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newbtn=document.querySelector("#new");
let msgc=document.querySelector(".msgc");
let msg=document.querySelector("#msg")

let count=0;

let turno=true;

let winp=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turno)
            {
                xo.play();
                box.innerText="O"
                turno=false;
            } 
        else
            {
                xo.play();
                box.innerText="X"
                turno=true
            }   
        box.disabled=true    
        count++;
        chkwinner();

    });
});


const disablebox=()=>{
    for(let box of boxes)
    {
        box.disabled=true;
    }
}

const enablebox=()=>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
}

const showwin=(winner)=>{
    msg.innerText=`Congo, Winner is ${winner}`;
    winSound.play();
    msgc.classList.remove("hide");
    msgc.style.animation = "none";
    void msgc.offsetWidth;
    msgc.style.animation = "pop 2s ease-out";

    disablebox();
};

const chkwinner=()=>{
    for(p of winp)
    {
        let pos1=boxes[p[0]].innerText;
        let pos2=boxes[p[1]].innerText;
        let pos3=boxes[p[2]].innerText;

    if(pos1!="" && pos2!="" && pos3!="")
        {
            if(pos1===pos2 && pos2===pos3) 
            {
                console.log("winner",pos1)
                showwin(pos1);
                return;
            }
        }
    }
    if(count==9)
        showdraw();
};

const resetg=()=>{
    count=0;
    turno=true;
    enablebox();
    msg.innerText="";
    msgc.classList.add("hide");
};

const showdraw=()=>{
    msg.innerText="It's a Draw"
    drawSound.play();
    msgc.classList.remove("hide");
    msgc.style.animation = "none";
    void msgc.offsetWidth;
    msgc.style.animation = "pop 2s ease-out";

    disablebox();
};

newbtn.addEventListener("click",resetg);

reset.addEventListener("click",resetg);