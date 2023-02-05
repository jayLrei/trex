var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

// ctx.fillStyle = 'green'
// ctx.fillRect(10,10,100,100)

var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw(){
        ctx.fillStyle = 'green';
        // ctx.fillRect(this.x, this.y , this.width, this.height);
        ctx.drawImage(img2, this.x, this.y)

    }
}

var img1 = new Image();
img1.src = 'cactus.jpeg';
var img2 = new Image();
img2.src = 'dino.jpeg';

class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        // ctx.fillRect(this.x, this.y , this.width, this.height);
        ctx.drawImage(img1, this.x, this.y)
    }
}

var timer = 0;
var cactus여러개 = [];
var JumpTimer = 0;
var Animation;

function 프레임마다실행할함수(){
    //이거 쓰면 밑에 있는게 프레임마다 실행됨
    Animation = requestAnimationFrame(프레임마다실행할함수);
    timer++;
    //canvas 지우는 함수
    ctx.clearRect(0,0, canvas.width, canvas.height)
    
    //120프레임마다 장애물을 설치
    // if(timer%120===0){
    //     var cactus = new Cactus();
    //     var cactus = new Cactus();
    //     cactus.draw();
    // }

    //120프레임마다 장애물 여러개 설치
    if(timer % 200===0){
        var cactus = new Cactus();
        cactus여러개.push(cactus);
    }

    cactus여러개.forEach((a, i, o)=>{
        //x좌표가 0 미만이면 장애물 제거하기
        if(a.x<0){
            o.splice(i,1)
        }
        a.x--;
        a.draw();

        Collison(dino,a);

    })

    //스페이스바 누르면 점프
    if(Jumping == true){
        dino.y -=2;
        JumpTimer++;
        console.log(JumpTimer)
    }

    if(JumpTimer > 70){
        Jumping = false; 
    }
    if(Jumping == false ){
        if(dino.y < 200){
            dino.y+=2;
            JumpTimer = 0;
        }
    }
    dino.draw();

}

프레임마다실행할함수();

//충돌

function Collison(dino,cactus){
    var xDifference = cactus.x - (dino.x + dino.width);
    // console.log(xDifference);
    var yDifference = cactus.y - (dino.y + dino.height);

    if(xDifference < 0 && yDifference < 0){
        //캔버스 정리
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(Animation)
        alert('한강. 천둥에게 잡히다..')
    }
}

//스페이스바 누르면 점프 
var Jumping = false;
document.addEventListener('keydown',function(e){
    if(e.code === 'Space'){
        Jumping = true;
    }
})