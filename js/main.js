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
  index: 0
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
  index: 0
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
    slider.imgs[i].style.width = `calc(100%/${slider.visible})`;
    if (i>0){
      slider.imgs[i].style.left = `calc(100%/${slider.visible/i})`;
    }
  }
  slider.left.addEventListener('click', slideRight.bind(slider));
  slider.right.addEventListener('click', slideLeft.bind(slider));
}

function resizeBottomSlider(){
  for (let i = 0; i < bottomSliderConfig.num; ++i){
    bottomSliderConfig.imgs[i].style.width = `calc(100%/${bottomSliderConfig.visible})`;
    if (i>0){
      bottomSliderConfig.imgs[i].style.left = `calc(100%/${bottomSliderConfig.visible/i})`;
    }
  }
}

/* TODO: re-implement. prep wraparound, animate indices, update index
// this.imgs[i].style.transition = 'unset' or 'all .5s ease'
function slideRight(){
  // case: this.visible === 1, this.num === 2*2 
  // [a0, a1, b0, b1]
  //  0   1   2   3
  //  index 0 displayed initially
  // TODO: calculate indices to prepare depending on current index, prepare index, calculate indices to animate, animate, update current index
  

  /*for (let i = this.num-1, j = 1; i >= this.num/2; --i, ++j){
    this.imgs[i].style.left = `calc(-100%/${this.visible/j}`;
  }

  if (this.dir === 'left'){
    this.cnt -= 2;
    shift = 100*-1*this.cnt;
    for (let i = 0; i < this.num; ++i){
      this.imgs[i].style.transform = `translateX(${this.scroll*shift}%)`;
    }
    this.cnt++;
  } else /*dir==='' || dir==='right'*/ /*{
    shift = 100*this.cnt;
    for (let i = 0; i < this.num; ++i){
      this.imgs[i].style.transform = `translateX(${this.scroll*shift}%)`;
    }
    this.cnt++;
    this.dir = 'right';
  }*/
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
