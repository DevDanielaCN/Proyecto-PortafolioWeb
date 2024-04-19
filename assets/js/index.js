

$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    if (this.hash !== "") {

      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        window.location.hash = hash;
      });
    } 
  });
});

var menu = document.getElementById("menu-container");

var enlaces = menu.getElementsByClassName("enlace");
for (var i = 0; i < enlaces.length; i++){
    enlaces[i].addEventListener("click", function(){
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active"
    })
}
var section = document.querySelectorAll('section')
var navlinks = document.querySelectorAll('nav ul li a')
window.onscroll=()=>{
    section.forEach(sec=>{

        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')

        if(top > offset  && top < offset + height){
            navlinks.forEach(links =>{
                links.classList.remove("active");
                document.querySelector('header nav ul li a[href*='+id+']').classList.add("active");
            })
        }
    })
}