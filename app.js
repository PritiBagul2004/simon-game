let gameseq = [];
let userseq = [];
let started = false;
let level = 0;

let btns = ["yellow", "red", "purple", "green"];
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("game is started");
        started = true;
        levelup();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            // Move to next level after short delay
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! and your Score was <b>${level}</b> <br>Press any key to restart.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
          document.querySelector("body").style.backgroundColor="white";
        },150)
        reset();
    }
}

function levelup() {
    userseq = []; // ✅ Clear user's sequence for new level
    level++;
    h2.innerText = `Level ${level}`;

    let rndInd = Math.floor(Math.random() * 4); // should be 4 not 3
    let rndcolor = btns[rndInd];
    let rndbtn = document.querySelector(`.${rndcolor}`);
    gameseq.push(rndcolor);
    console.log(gameseq);
    gameflash(rndbtn);
}

function btnpress() {
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (let btn of allbtn) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
