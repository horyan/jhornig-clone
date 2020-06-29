const topSliderConfig = {
  id: 'top',
  visible: 1,
  scroll: 1,
  num: document.querySelectorAll('#top .banner-img').length,
  imgs: document.querySelectorAll('#top .banner-img'),
  left: document.getElementById('a-prev'),
  right: document.getElementById('a-next'),
  cnt: 1,
  dir: '',
  index: 0,
  lastIndex: 0
};

const bottomSliderConfig = {
  id: 'bottom-slider',
  visible: 3,
  scroll: 3,
  num: document.querySelectorAll('#bottom .img-temp').length,
  imgs: document.querySelectorAll('#bottom .img-temp'),
  left: document.getElementById('left-btn-bottom'),
  right: document.getElementById('right-btn-bottom'),
  cnt: 1,
  dir: '',
  index: 0,
  lastIndex: 0
};

function duplicateSlides(sliderId){
  let sliderRef = $(`#${sliderId}`);
  sliderRef.append(sliderRef.html());
}

function checkWidth(){
  if (window.innerWidth <= 850){
    bottomSliderConfig.visible = 1;
    bottomSliderConfig.scroll = 1;
  } else {
    bottomSliderConfig.visible = 3;
    bottomSliderConfig.scroll = 3;
  }
    resizeBottomSlider();
}

function initSlider(slider){
  // duplicate slides for looping
  duplicateSlides(slider.id);
  slider.num *= 2;
  slider.imgs = document.querySelectorAll(`#${slider.id} > div`);

  for (let i = 0; i < slider.num; ++i){
    slider.imgs[i].style.width = `${100/slider.visible}%`;
    if (i>0){
      slider.imgs[i].style.left = `${100/slider.visible/i}%`;
    }
  }
  slider.left.addEventListener('click', prepRight.bind(slider));
  slider.right.addEventListener('click', slideLeft.bind(slider));
}

function resizeBottomSlider(){
  for (let i = 0; i < bottomSliderConfig.num; ++i){
    bottomSliderConfig.imgs[i].style.width = `${100/bottomSliderConfig.visible}%)`;
    if (i>0){
      bottomSliderConfig.imgs[i].style.left = `${100/(bottomSliderConfig.visible/i)}%`;
    } else {
      bottomSliderConfig.imgs[i].style.left = "0%"
    }
  }
}


function prepRight(){

  var indicesToAnimate = [];
  var newIndex = this.index - this.scroll; // 0 - 3 = -3 
  var absIndex = 0;


  for (var i = 0; i < this.scroll * 2; ++i){
    var tIndex = newIndex + i;

    if (tIndex < 0) { 
      tIndex = (this.imgs.length - 1) - Math.abs(tIndex % this.imgs.length); 
      console.log(`Wraparound - absolute index: ${tIndex}`);
    }

    if (i < this.scroll) {
      var posToMove = `-${(100/this.scroll) * (this.scroll -i)}%`
      console.log(`moving index: ${absIndex + i} to ${posToMove}`)
      this.imgs[tIndex].style.left = posToMove;
    }

    indicesToAnimate.push(tIndex);
  }


  // Animate slides

  console.log(`animating:${indicesToAnimate}`)

  for (let i = 0; i < indicesToAnimate.length; ++i){
    var newLoc = `${parseInt(this.imgs[indicesToAnimate[i]].style.left) + 100}%`;
    console.log(`animating:${indicesToAnimate[i]} to newloc ${newLoc}`)

    this.imgs[indicesToAnimate[i]].style.left = newLoc;
  }

  this.index = newIndex;


}


function slideRight(){
  this.imgs[this.lastIndex].style.transition = 'all .5 ease';
  // first left click proof of concept
  // prep duped numToScroll slides
  for (; this.index <= this.scroll; this.index++){
    this.imgs[this.num - this.index - 1].style.left = 
    `calc(${100*Math.ceil(this.num - this.index - 1)% this.scroll}%)`;
  }
  // move curent visible slides
  // animate prepped slides
}

function slideLeft(){
  if (this.dir === 'right'){
    this.cnt -= 2;
    shift = 100*this.cnt;
    for (let i = 0; i < this.num; ++i){
      this.imgs[i].style.transform = `translateX(${this.scroll*shift}%)`;
    }
    this.cnt++;
  } else /*dir==='' || dir==='left'*/ {
    shift = 100*this.cnt;
    if (this.dir==='left' && this.cnt < 0){
      shift = 100*-1*this.cnt;
      for (let i = 0; i < this.num; ++i){
        this.imgs[i].style.transform = `translateX(${this.scroll*shift}%)`;
      }
    } else {
      for (let i = 0; i < this.num; ++i){
        this.imgs[i].style.transform = `translateX(-${this.scroll*shift}%)`;
      }
    }
    this.cnt++;
    this.dir = 'left';
  }
}

window.onload = checkWidth; /*TODO: hide checkWidth-if mob-transition*/
window.onresize = checkWidth;
initSlider(topSliderConfig);
initSlider(bottomSliderConfig);
