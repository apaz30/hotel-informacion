/**
 * script.js - Funcionalidades para la página de información de huéspedes
 * @version 1.1.0
 * @license MIT
 * @author Wyndham Garden Quito - Alejandro Paz
 */

document.addEventListener("DOMContentLoaded", function() {
  console.log("Página cargada correctamente - Wyndham Garden Quito");
  
  // Configuración inicial de animaciones
  initAnimations();
  
  // Configuración de eventos interactivos
  setupInteractivity();
  
  // Carga diferida de recursos
  loadLazyResources();
  
  // Analytics (si es necesario)
  setupAnalytics();
});

/**
 * Inicializa las animaciones de la página
 */
function initAnimations() {
  // Animación del título principal
  const title = document.querySelector("h1");
  if (title) {
    title.style.opacity = "0";
    title.style.transform = "translateY(-20px)";
    title.style.transition = "all 1s ease-out";
    
    requestAnimationFrame(() => {
      title.style.opacity = "1";
      title.style.transform = "translateY(0)";
    });
  }

  // Animación escalonada para las cards
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.5s ease-out ${0.1 * index}s`;
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 500 + (index * 100));
  });

  // Efecto hover para el logo
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.transform = 'scale(1.05) rotate(-5deg)';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1) rotate(0)';
    });
  }
}

/**
 * Configura los eventos interactivos de la página
 */
function setupInteractivity() {
  // Smooth scrolling para los enlaces del menú
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
        
        // Resaltar la sección objetivo
        highlightSection(targetElement);
      }
    });
  });

  // Efectos para las cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    });
    
    // Click en cards para expandir (opcional)
    card.addEventListener('click', function() {
      this.classList.toggle('expanded');
    });
  });

  // Copiar contraseña WiFi al hacer clic
  const wifiPassword = document.querySelector('#conectividad li:nth-child(2)');
  if (wifiPassword) {
    wifiPassword.style.cursor = 'pointer';
    wifiPassword.addEventListener('click', function() {
      const password = 'WyndhamVip@25';
      navigator.clipboard.writeText(password).then(() => {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Contraseña copiada!';
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      });
    });
  }
}

/**
 * Resalta la sección al hacer scroll
 * @param {HTMLElement} section - Elemento de la sección a resaltar
 */
function highlightSection(section) {
  document.querySelectorAll('.card').forEach(card => {
    card.style.borderLeft = 'none';
  });
  
  section.style.borderLeft = `4px solid var(--accent-color)`;
  setTimeout(() => {
    section.style.borderLeft = 'none';
  }, 2000);
}

/**
 * Carga recursos de forma diferida
 */
function loadLazyResources() {
  // Puedes añadir aquí la carga diferida de imágenes o iframes
  const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
  
  if ('IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove('lazy');
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
}

/**
 * Configuración básica de analytics (opcional)
 */
function setupAnalytics() {
  // Ejemplo: Puedes integrar Google Analytics aquí
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'TU-ID-DE-ANALYTICS'); // Reemplaza con tu ID real
  
  // Eventos de seguimiento
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
      gtag('event', 'click', {
        'event_category': 'External Link',
        'event_label': this.href
      });
    });
  });
}

/**
 * Detección de características del navegador
 */
function checkBrowserFeatures() {
  // Verifica si el navegador soporta las características necesarias
  const features = {
    'IntersectionObserver': 'IntersectionObserver' in window,
    'ClipboardAPI': 'clipboard' in navigator,
    'CSSVariables': window.CSS && CSS.supports('color', 'var(--fake-var)')
  };
  
  if (!features.CSSVariables) {
    console.warn('Tu navegador tiene soporte limitado para algunas características de diseño');
  }
}

// Inicializar la verificación de características
checkBrowserFeatures();
