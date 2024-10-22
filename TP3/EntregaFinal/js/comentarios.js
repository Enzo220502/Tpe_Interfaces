document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.botones-like').forEach(like => {
    like.addEventListener('click', () => {
        // Cambiamos el src dependiendo de la imagen actual
        if (like.src.includes('img/comentarios/like.png')) {
          like.src = 'img/comentarios/like-activo.png'; // Cambia a la nueva imagen 1
        } else if (like.src.includes('img/comentarios/like-activo.png')) {
          like.src = 'img/comentarios/like.png'; // Cambia a la nueva imagen 3
        }
    });
  });
  document.querySelectorAll('.botones-dislike').forEach(dislike => {
    dislike.addEventListener('click', () => {
        // Cambiamos el src dependiendo de la imagen actual
        if (dislike.src.includes('img/comentarios/dislike.png')) {
          dislike.src = 'img/comentarios/dislike-activo.png'; // Cambia a la nueva imagen 1
        } else if (dislike.src.includes('img/comentarios/dislike-activo.png')) {
          dislike.src = 'img/comentarios/dislike.png'; // Cambia a la nueva imagen 3
        }
    });
  });
});