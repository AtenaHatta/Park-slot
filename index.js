let slot_frame = document.getElementById("slot-frame");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let start_btn = document.getElementById("start-btn");
let stop_btn = document.getElementsByClassName("stop-btn");
let numberOfbtn = document.querySelectorAll(".stop-btn").length;

let sec = 100;           //spin speed (0.1sec)
let stopReelFlag = [];   //flag of stopping slot
let reelCounts = [];     //image position
let slotFrameHeigth;     
let slotReelsHeight;     //whole reel(image)'s size
let slotReelItemHeight;  //each reel(image)'s size
let slotReelStartHeight; //initial value of image


//=============================================================================
//slot
//=============================================================================
//function of Dictionary (ex. Array = [left(0), middle(1), middle(2), right(3)])
let Slot = {
   init: function(){    //initial value
    stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] =  stopReelFlag[3] = false;
    reelCounts[0] = reelCounts[1] = reelCounts[2]  =  reelCounts[3] = 0;
  },

   start: function(){   //click event
     Slot.init();
     for(let index = 0; index < 4; index++){
      Slot.animation(index);  //let work all slots
     }
   },

   stop: function(i){   //click event of stop button
     stopReelFlag[i] = true;  //get out of loop(animate)
     if(stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2] && stopReelFlag[3]){
      start_btn.removeAttribute("disabled"); //let start-button work
     }
   },

   //-------------------------------------
   // Image position inside of slot
   //-------------------------------------
   resetLocationInfo: function(){  //set up start position
     slotFrameHeigth = slot_frame.offsetHeight;
     //offsetHeight = height + padding(up & down) + border(up & down)
     //slotFrameHeight:502 *CSS(height:500px, border1+1=2px)
     slotReelsHeight = reels[0].offsetHeight;
     slotReelItemHeight = reel[0].offsetHeight;
     slotReelStartHeight = -slotReelsHeight; //2700
     slotReelStartHeight = slotReelStartHeight + slotFrameHeigth 
                           - (slotFrameHeigth / 2) + slotReelItemHeight * 3 / 2; //initial value of image→center
     for(let i = 0; i < reels.length; i++){
      reels[i].style.top = String(slotReelStartHeight) + "px";
     }
   },

   //-------------------------------------
   // slot animation
   //-------------------------------------
   animation: function(index){  //animation of slot
      if(reelCounts[index] >= 30){  //image amount 8
        reelCounts[index] = 0;
      }
      console.log(index)
      $('.reels').eq(index).animate({
        'top': slotReelStartHeight + (reelCounts[index] * slotReelItemHeight) 
      },{
        duration: sec, //reel speed
        easing: 'linear', // always same speed
        complete: function(){
          if(stopReelFlag[index]){ //stopReelFlag[index] loops until "true"
            return;
          }
          reelCounts[index]++;
          Slot.animation(index);
        }
      });
   },
};

//=============================================================================
// button
//=============================================================================
 
//-------------------------------------
// button animation
//-------------------------------------
 window.onload = function(){
  Slot.init()
  Slot.resetLocationInfo();
  start_btn.addEventListener("click", function(e){
    e.target.setAttribute("disabled", true) //start button is disabled
    Slot.start();
     for(let i = 0; i < stop_btn.length; i++){
      stop_btn[i].removeAttribute("disabled"); //stop button works
    } 
   });
   for(let i = 0; i < stop_btn.length; i++){
    stop_btn[i].addEventListener("click", function(e){
      Slot.stop(e.target.getAttribute('data-val')); //which button do you stop
    })
  }
};

//-------------------------------------
// button audio
//-------------------------------------
for(let i = 0; i<numberOfbtn; i++){

document.querySelectorAll(".stop-btn")[i].addEventListener("click", function(){

  let buttonInnerHTML = this.innerHTML;

  switch(buttonInnerHTML){
    case "1":
      let audio1 = new Audio('audio/eikogo1.mp3');
      audio1.play();
      break;

    case "2":
      let audio2 = new Audio('audio/eikogo2.mp3');
      audio2.play();
      break;

    case "3":
      let audio3 = new Audio('audio/eikogo3.mp3');
      audio3.play();
      break;
      
    case "4":
      let audio4 = new Audio('audio/eikogo4.mp3');
      audio4.play();
      break;
      default: console.log(buttonInnerHTML);
  }
 });
}




