document.addEventListener('DOMContentLoaded',()=>
{
// qui la logica da eseguire quando è stata caricata la pagina

// prendo l'oggetto con id grid
const grid=document.querySelector('.grid');

const doodler=document.createElement('div');

let isGameover=false;
let score =0
let doodlerLeftSpace=50
let doodlerBottomSpace=120
let platformCount=5
let platforms=[]

let isJumping=true;
let isGoingLeft=false;
let isGoingRight=false;
let leftTImerId
let rightTimerId
let upTimerId
let downTimerId
const gravity=0.9;
const speed =3;

class Platform{
    constructor(newPlatBottom){
        this.left=Math.random()*277 ; // 277 è la differenza tra la larghezza dello sfondo e la larghezza della piattaforma
        this.bottom=newPlatBottom;
        this.visual=document.createElement('div');

        const visual =this.visual;
        visual.classList.add('platform');
        visual.style.left=this.left+'px';
        visual.style.bottom=this.bottom+'px';
        grid.appendChild(visual);
    }
}

function createPlatforms(){

    for (let i=0;i<platformCount;i++){
        let platgap=600/platformCount;
        let newPlatBottom=80+platgap*i;
        let newPlatform= new Platform(newPlatBottom);
        platforms.push(newPlatform);
        }
        console.log(platforms);
}



function movePlatforms()
{    
    if (doodlerBottomSpace>100)
    {
        platforms.forEach(platform=>{
            platform.bottom-=4;
            let visual= platform.visual;
            visual.style.bottom=platform.bottom+'px';
           

            if (platform.bottom<10){
               let firstPlatform=platforms[0].visual;
               firstPlatform.classList.remove('platform');
               platforms.shift();               
               score++;

               let newPlatform= new Platform(600);
               platforms.push(newPlatform);
            }
        })
    }
}

function createDoodler(){    
    grid.appendChild(doodler);
    doodler.classList.add('doodler');
    doodlerLeftSpace=platforms[0].left;
    doodler.style.left=doodlerLeftSpace+'px';
    doodler.style.bottom=doodlerBottomSpace+'px';
    console.log(doodlerBottomSpace);
}

function fall()
{
    isJumping=false;
    clearTimeout(upTimerId);
    downTimerId=setInterval(function(){
        doodlerBottomSpace-=.8;
        doodler.style.bottom=doodlerBottomSpace+'px';
        if (doodlerBottomSpace<=0)
        {
           gameOver();
        }
        // console.log(doodlerBottomSpace);
       
    });
}

fall();

function gameOver(){
      isGameover=true;
    while (grid.firstChild)
    {
        grid.removeChild(grid.firstChild);
    }
    grid.innerHTML=score
    clearInterval(downTimerId);
}

function start()
{
    if (!isGameover )
        { 
            createPlatforms();
            createDoodler();
            setInterval(movePlatforms,30);
           
        }
}

start();


}
)