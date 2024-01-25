var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var bird = new Image();
var bg = new Image(); // Создание объекта
var fg = new Image(); // Создание объекта
var pipeUp = new Image(); // Создание объекта
var pipeBottom = new Image(); // Создание объекта

bird.src = "img/bi.png"; // Указание нужного изображения
bg.src = "img/background.png"; // Аналогично
fg.src = "img/fg.png"; // Аналогично
pipeUp.src = "img/pilUp.png"; // Аналогично
pipeBottom.src = "img/pildow.png"; // Аналогично

var pipe = [];

pipe[0] = {
    x: cvs.width * 0.7,
    y: 0
}

var gap = 90;
var x = 10;
var y = 150;
var gravity = 1.5;
var score = 0;


document.addEventListener("keydown", moveUp);
function moveUp(){
    y-=30;
}

pipeBottom.onload;
function draw() {
    ctx.drawImage(bg, 0, 0, 1200, 700);

    for (var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y );
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x --;

        if(pipe[i].x == 600) {
            pipe.push(
                {
                    x: cvs.width,
                    y: Math.floor((Math.random() * pipeUp.height)) - pipeUp.height
                }
            )
        }
        if (x + bird.width >= pipe[i].x && x <= pipe[i].x + pipeUp.width && (y < pipe[i].y + pipeUp.height || y + bird.height >= pipe[i].y + pipeUp.height + gap) || y + bird.height >= cvs.height - fg.height){
            localStorage.setItem('greeting', score);
            window.location.href = 'menu.html';
        }
        if (y < 0){
            y = 0;
        }
        if (pipe[i].x == 10){
            score ++;
        }
    }

   
    
    ctx.drawImage(fg, 0, canvas.height-fg.height, 1200, fg.width);
    ctx.drawImage(bird, x, y);
    y = y + gravity;

    ctx.fillStyle = "#999";
    ctx.font = "30px Ariel";
    ctx.fillText("Score: " + score, 10, cvs.height - 20);
    requestAnimationFrame(draw);

   }
   
   pipeBottom.onload = draw(); // Вызов функции из вне
