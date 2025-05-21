const slider = document.getElementById("slider");
const leftBtn = document.querySelector(".arrow-left");
const rightBtn = document.querySelector(".arrow-right");

let scrollAmount = 0;
const scrollPerClick = 350;

leftBtn.onclick = () => {
    //scrollAmount = scrollAmount - scrollPerClick;
    slider.scrollBy({ left: -scrollPerClick, behavior: "smooth" })
}
rightBtn.onclick = () => {
   // alert('a')
   // scrollAmount = scrollAmount + scrollPerClick;
    slider.scrollBy({ left: scrollPerClick, behavior: "smooth" })
}