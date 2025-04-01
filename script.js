document.addEventListener("DOMContentLoaded", function () {
  console.log("Página cargada correctamente.");
  
  // Agregar una animación al título al cargar la página
  const title = document.querySelector("h1");
  title.style.opacity = "0";
  title.style.transform = "translateY(-20px)";

  setTimeout(() => {
    title.style.transition = "all 1s";
    title.style.opacity = "1";
    title.style.transform = "translateY(0)";
  }, 500);
});
