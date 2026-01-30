// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  loader.style.transition = 'opacity 0.5s';
  setTimeout(()=>loader.style.display='none',500);
});

// Buttons
function sayHi(){ alert("Welcome to My Mini WebPage 🚀"); }
function changeTheme(){ document.body.classList.toggle("pink"); }
function go(url){ window.location.href = url; }