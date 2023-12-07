const boxs=document.querySelectorAll(".box")
const gameInfo=document.querySelector(".game-info")
const newGameBtn=document.querySelector(".btn")
const bx=document.querySelector(".btnx")
const bo=document.querySelector(".btno")

let currentplayer;
let gameGrid;

const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


function initGame(){
    
    currentplayer="X"
    gameGrid=["","","","","","","","",""]
    newGameBtn.classList.remove("active")
    
    boxs.forEach((box,index)=>{
        box.textContent=""
        boxs[index].style.pointerEvents="all"
        box.classList=`box box${index+1}`

    })
    gameInfo.innerText=`Current Player - ${currentplayer}`
    
    
}

initGame()

function checkgameOver(){
    let answer="";

    winningPosition.forEach((position)=>{
        
        // all 3 boxes are should not be empty and all 3 boxes should be same value

        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" ||gameGrid[position[2]] !=="" ) &&
        (gameGrid[position[0]] === gameGrid[position[1]])  &&( gameGrid[position[1]] === gameGrid[position[2]])){
            
            // checking winner is x or o 
            if(gameGrid[position[0]] ==="X"){
                answer="X"
            }
            else{
                answer="O"
            }
            boxs.forEach((box,index)=>{
                
                boxs[index].style.pointerEvents="none"
            })
            boxs[position[0]].classList.add("win");
            boxs[position[1]].classList.add("win");
            boxs[position[2]].classList.add("win");
        }
    })

    //this line code execute when winner is found 
    if(answer!==""){
        gameInfo.innerText=`Winner Player - ${answer}`
        newGameBtn.classList.add("active")
        return
    }

    // this code runs when the match is draw or tie

    let fillcount=0;
    gameGrid.forEach((box)=>{
        if(box !==""){
            fillcount++;
        }

    })

    if(fillcount===9){
        gameInfo.innerHTML="Game Tied !"
        newGameBtn.classList.add("active")
    }
}

function handleWin(index){
    if(gameGrid[index]===""){
        boxs[index].innerText=currentplayer;
        gameGrid[index]=currentplayer
        boxs[index].style.pointerEvents="none"
        console.log(gameGrid);

        //swap turn function
        swapTurn() 
        // check win function
        checkgameOver()
    }

}

function swapTurn() {
    if(currentplayer==="X"){
        currentplayer="O"
    }
    else{
        currentplayer="X"
    }
    gameInfo.innerText=`Current Player ${currentplayer}`
    
}



boxs.forEach((box,index)=>{
    box.addEventListener("click",function(){
        handleWin(index)
    })
})



newGameBtn.addEventListener("click",initGame)













