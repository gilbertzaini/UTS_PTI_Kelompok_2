let count = 0;
let turn = 0;
let playerName = [];
let x = 0;

function add(){
    if(count < 12){
    let nama = document.getElementById("player").value;
    
    if(count == 0){
        list = document.createElement("b");
        list.className += "text-center";
        listText = document.createTextNode("Player List");
        list.appendChild(listText);
        
        tempat = document.getElementById("list");
        tempat.appendChild(list);
    } 

    bullet = document.createElement("li");
    if(nama.length == 0){
        bulletText = document.createTextNode("Player " + (count+1).toString());
        nama = "Player " + (count+1).toString();
    } else {
        bulletText = document.createTextNode(nama);
    }
    bullet.appendChild(bulletText);

    playerName.push({name: nama})
    localStorage.setItem('listPlayer', JSON.stringify(playerName));
    
    let sisip = document.getElementById("ulList");
    sisip.appendChild(bullet);
    count++;

    playerNo();

    } else {
        alert("Max number of players reached");
    }
}

function spawnTulang(){
    bark = document.getElementById("bark");
    bark.pause();
    const jsn = JSON.parse(localStorage.getItem("listPlayer"));
    spawner = document.getElementById("spawn");

    if(jsn.length < 3){
        x = 3;
    } else if(jsn.length < 9) {
        x = 5;
    } else x = 6;
    
    for(let i = 0; i < x; i++){
        baris = document.createElement("div");
        baris.className += "row";
        for(let j = 0; j < x; j++){
            btn = document.createElement("button");
            btnImg = document.createElement("img");
            btn.setAttribute("onclick", "playerTurn(); bonePicked(); this.disabled = true; this.style.opacity = 0;");
            btnImg.setAttribute("src", "img/bone.png");
            btn.appendChild(btnImg);
            btn.className += "bone col";
            baris.appendChild(btn);    
        }
        spawner.appendChild(baris);  
    }

    for(let i = 0; i < jsn.length; i++){
        bomb();
    }
    startTimer();
}

function playerTurn(){
    clearInterval(timer);
    
    const jsn = JSON.parse(localStorage.getItem("listPlayer"));
    document.getElementById("turn").innerHTML = "Turn: " + jsn[turn].name;
    if(turn == jsn.length-1) turn = 0;
    else turn++;

    startTimer();
}

function bomb(){
    spawner = document.getElementById("spawn").children;
    let i = Math.floor(Math.random()*x);
    let j = Math.floor(Math.random()*x);
    row = spawner[i].children;
    bom = row[j];
    bom.setAttribute("onclick", " bonePicked();lose();");
}

function bonePicked(){
    picked = document.getElementById("picked");
    picked.play();
}

function endButton(){
    spawnButton = document.getElementById("end");

    againLink = document.createElement('a');
    againLink.href = "game.html";  
    again = document.createElement("button");
    again.className += "mx-2 my-3 rounded-2"
    againText = document.createTextNode("Play Again");
    againLink.appendChild(again);
    again.appendChild(againText);
    
    homeLink = document.createElement('a');
    homeLink.href = "index.html";
    home = document.createElement("button");
    homeText = document.createTextNode("Back to Home");
    home.className += "mx-2 my-3 rounded-2";
    home.setAttribute("href", "index.html");
    home.appendChild(homeText);
    homeLink.appendChild(home);

    spawnButton.appendChild(againLink);
    spawnButton.appendChild(homeLink);
}

function lose(){
    bangun();

    document.getElementById("endMessage").innerHTML = "Oh no! You wake him up";
    endButton();
    document.getElementById("timer").innerHTML = "Time Left: --:--";

    spawner = document.getElementById("spawn");
    field = document.getElementById("gameField");
    field.removeChild(spawner);
}

function startTimer(){
    var timeleft = 10;
    var tempat = document.getElementById("timer");
    var timer = setInterval(function(){
    if(timeleft == 0){
        tempat.innerHTML = "Waktu Habis!";
        for(let i = 0; i < 3; i++){
            tempat.innerHTML = "Next Turn!";
        }
        clearInterval(timer);   
        playerTurn();
    } else {
      if(timeleft > 9)
        tempat.innerHTML = "Time Left: 00:" + timeleft;
      else
        tempat.innerHTML = "Time Left: 00:0" + timeleft;
    }
    timeleft --;
    }, 1000)
}

function darkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
}
