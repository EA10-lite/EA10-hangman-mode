let generatedStr, dashedStr = [], listOFGeneratedStr = [];

const hangmanProp = {
    alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    intro:document.querySelector("#intro"),
    game:document.querySelector("#game"),
    letterBox:document.querySelector("#letterBox"),
    imgBox:document.querySelector("#imgBox"),
    guessBox:document.querySelector("#guessBox"),
    makeTemplate(){
        document.querySelector("#game").innerHTML = `
            <div id="imgBox"></div>
            <div id="guessBox"></div>
            <div id="letterBox"></div>
        `
    },
    makeKeyBoard(){
        const alphabet = this.alphabet;
        document.querySelector("#letterBox").innerHTML = "";
        alphabet.forEach((letter,idx)=>{
            const btn = document.createElement("button");
            btn.classList.add("letter");
            btn.innerText = letter;
            document.querySelector("#letterBox").appendChild(btn);
        })
    },
}

const display = ({intro,game})=>{
    intro.style.display = "none";
    game.style.display = "block";
    // game.classList.add("game-display");
}

function hints(){
    const hintText = document.createElement("p")
    hintText.innerHTML = `Hint : Guess the  <strong id="hint"> </strong>`
    document.querySelector("#game").prepend(hintText);
    document.querySelector("#hint").innerText = categoryStr[categoryIndex];
};

function getStr(){
    const listOfStrs = category[categoryIndex];
    return listOfStrs[Math.floor(Math.random() * listOfStrs.length)];  
};

const displayLogic = (guess) => {
    if(guess){
        const guessBox = document.querySelector("#guessBox");
        guessBox.innerHTML = "";
        for(let i=0;i<guess.length;i++){
            const p = document.createElement("p");
            p.innerText = guess[i];
            p.classList.add("guess");
            if(p.innerText === " "){
                console.log(p)
                p.classList.add("space");
            }
            guessBox.appendChild(p);
        }
    }
};

function displayImg(){
    const imgBox = document.querySelector("#imgBox");
    img = document.createElement("img");
    img.setAttribute("src","empty-gallowspaper.png");
    imgBox.appendChild(img);
};

function generateStr(){
    // Get the random string and then use it to display a string of dashes with same lenght;
    generatedStr = getStr().toUpperCase();
    listOFGeneratedStr.push(generatedStr);
    for(let i=0;i<generatedStr.length;i++){
        dashedStr.push("-")
    }
    displayLogic(dashedStr);
};

function changeImg(idx){
    const imgBox = document.querySelector("#imgBox");
    el = imgBox.querySelector("img");
    el.setAttribute("src",`${allHangManImages[idx]}`)   
};

function disableAllBtns(){
    const allBtns = document.querySelectorAll(".letter");
    for(let btn of allBtns){
        btn.setAttribute("disabled","disabled");
    }
};

const gameover = () =>{
    const imgBox = document.querySelector("#imgBox");
    imgBox.querySelector("img").setAttribute("src","you-losepaper.png");
    disableAllBtns();
    youLose();
};

function youLose(){
    const eachGuess = document.querySelectorAll(".guess");
    for(let i = 0;i<generatedStr.length;i++){
        setTimeout(()=>{
            eachGuess[i].innerText = generatedStr[i];
        },1000)
    }
    setTimeout(()=>{
        const backBtn = document.createElement("button");
        backBtn.classList.add("back");
        backBtn.innerText = "BACK"
        document.querySelector("body").appendChild(backBtn);
    },2000)
}

function updateWinning(){
    const imgBox = document.querySelector("#imgBox");
    disableAllBtns();
    setTimeout(()=>{
        imgBox.querySelector("img").setAttribute("src","you-winpaper.png")
        setTimeout(()=>{
            const nextBtn = document.createElement("button");
            nextBtn.classList.add("next");
            nextBtn.innerText = "NEXT"
            document.querySelector("body").appendChild(nextBtn);
        },2000)
    },1000)  
};

const createGameLogic = () => {
    const btns = document.querySelectorAll(".letter");
    for(let btn of btns){
        btn.addEventListener("click",function(e){
            const p = document.querySelectorAll(".guess");
            let text = e.target.innerText;

            // CONDITION LOGIC
            // 1- check if the user's choice occurs and if  there are multiple occurence of the user's choice
            if(generatedStr.includes(text) && !dashedStr.includes(text)){
                let startIdx = 0;
                let index;
                let indices = [];
                let result = dashedStr.join("");
                while((index = generatedStr.indexOf(text,startIdx)) > -1){
                    indices.push(index);
                    startIdx = index + 1;
                };
                for(let i of indices){
                    dashedStr[i] = result[i].replace("-",text);
                    p[i].innerText = dashedStr[i];
                }
                e.target.setAttribute("disabled","disabled")
            }

            // 2- check if the user's choice is a wrong one and update the number of missed choice;

            else if(!generatedStr.includes(text)){
                wrongChoice+=1;
                if(wrongChoice < 5){
                    changeImg(wrongChoice);
                }
                else {
                    gameover();
                }
            }
            // update winning
            if(generatedStr === dashedStr.join("")){
                updateWinning();
            }

        })
    }
};

const nextStage = () => {
    const btn = document.querySelector('.next');
    btn.addEventListener("click",(e)=>{
        
    });
};

const playBtn = document.querySelector("#playBtn");

const events = ()=>{
    setTimeout(()=>{
        display(hangmanProp)

        setTimeout(()=>{

            hangmanProp.makeTemplate();

            setTimeout(()=>{

                displayImg();
                generateStr();

                setTimeout(()=>{

                    hints();
                    hangmanProp.makeKeyBoard();

                    setTimeout(()=>{

                        createGameLogic();

                    },1500)
                },1200)
            },900)
        },600)
    },300)
};

playBtn.addEventListener("click",events)
