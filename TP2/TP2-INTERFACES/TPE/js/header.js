
const menuHamburguesa = document.getElementById("menu-hamburguesa");
const menuDesplegable = document.querySelector(".menu-desplegable");

menuHamburguesa.addEventListener("click", ()=>{
  menuDesplegable.classList.toggle("menu-desplegable-cerrado");
});