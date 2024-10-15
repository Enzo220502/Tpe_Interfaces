
const menuHamburguesa = document.getElementById("menu-hamburguesa");
const menuDesplegable = document.querySelector(".menu-desplegable");


menuHamburguesa.addEventListener("click", ()=>{
  menuDesplegable.classList.toggle("menu-desplegable-cerrado");
});

const carritoPopOver = document.querySelector(".carrito-compras-bloque");
const btnPopOverCarrito = document.getElementById("pop-over-carrito");
const cerrarCarrito = document.getElementById("ico-cerrar-carrito");
const contenido = document.querySelector(".contenido");

btnPopOverCarrito.addEventListener("click", () =>{
  carritoPopOver.classList.toggle("ocultar");
  if(contenido.style.backgroundColor == 'rgba(0, 0, 0, 0.5)'){
    contenido.style.backgroundColor = 'rgba(0,0,0,0)';
  }else{
    contenido.style.backgroundColor = 'rgba(0,0,0,0.5)';
  }
});

cerrarCarrito.addEventListener("click", ()=>{
  carritoPopOver.classList.toggle("ocultar");
  contenido.style.backgroundColor = "rgba(0,0,0,0)";
});

const btnPopOverUsuario = document.getElementById("pop-over-usuario");
const panelUsuario = document.querySelector(".panel-usuario-bloque");

btnPopOverUsuario.addEventListener("click",()=>{
  panelUsuario.classList.toggle("ocultar");
})