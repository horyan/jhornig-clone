const topSliderConfig = {
  visible: 1,
  scroll: 1,
  num: document.querySelectorAll('#top .banner-img').length,
  imgs: document.querySelectorAll('#top .banner-img'),
  left: document.getElementById('a-prev'),
  right: document.getElementById('a-next'),
  cnt: 1,
  dir: ''
};
const bottomSliderConfig = {
  visible: 3,
  scroll: 3,
  num: document.querySelectorAll('#bottom .img-temp').length,
  imgs: document.querySelectorAll('#bottom .img-temp'),
  left: document.getElementById('left-btn-bottom'),
  right: document.getElementById('right-btn-bottom'),
  cnt: 1,
  dir: ''
};

function initSlider(slider){
  for (let i = 0; i < slider.num; ++i){
    slider.imgs[i].style.width = `calc(100%/${slider.visible})`;
    if (i>0){
      slider.imgs[i].style.left = `calc(100%/${slider.visible/i})`;
    }
  }
  slider.left.addEventListener('click', slideLeft.bind(slider));
  slider.right.addEventListener('click', slideRight.bind(slider));
}

function slideRight(){
  /*
    TODO: prepare wrapping
  */
  if (this.dir === 'left'){
    this.cnt -= 2;
    shift = 100*-1*this.cnt;
    for (let i = 0; i < this.num; ++i){
      this.imgs[i].style.transform = `translateX(${this.scroll*shift}%)`;
    }
    this.cnt++;
  } else /*dir==='' || dir==='right'*/ {
    shift = 100*this.cnt;
    for (let i = 0; i < this.num; ++i){
      this.imgs[i].style.transform = `translateX(${this.scroll*shift}%)`;
    }
    this.cnt++;
    this.dir = 'right';
  }
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

initSlider(topSliderConfig);
initSlider(bottomSliderConfig);