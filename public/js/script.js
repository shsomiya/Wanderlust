
// Enable Bootstrap form validation
(() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();


  let carousel = document.getElementById("carousel");

window.addEventListener("scroll", function () {
  let scrollTop = window.scrollY;

  if (scrollTop > 100) {
    carousel.classList.add("sticky-carousel");
  } else {
    carousel.classList.remove("sticky-carousel");
  }
});


let searchbar = document.getElementById("searchbar");

window.addEventListener("scroll",function(){
  let scrollTop = this.window.scrollY;

  if(scrollTop>100){
    searchbar.classList.add("searchBarRow");
  }else{
    searchbar.classList.remove("searchBarRow");
  }
});


let taxes = document.getElementById("taxes");
taxes.addEventListener("click",()=>{
  let taxInfo = document.getElementsByClassName("tax-info");
  for(let info of taxInfo){
    if(info.style.display != "inline"){
      info.style.display = "inline"
    }else{
      info.style.display = "none"
    }
  }
})






    