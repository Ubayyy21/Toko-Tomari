// assets/js/script.js

// assets/js/script.js - VERSI DENGAN DEBUG

console.log("✅ JavaScript berjalan!");

// Function to update greeting based on time
function updateGreeting() {
    console.log("🕐 updateGreeting() dipanggil");
    
    const now = new Date();
    const hour = now.getHours();
    console.log("Jam sekarang:", hour);
    
    let greeting = "";
    
    if (hour >= 5 && hour < 12) {
        greeting = "Selamat Pagi!";
    } else if (hour >= 12 && hour < 15) {
        greeting = "Selamat Siang!";
    } else if (hour >= 15 && hour < 18) {
        greeting = "Selamat Sore!";
    } else {
        greeting = "Selamat Malam!";
    }
    
    console.log("Greeting:", greeting);
    
    // Update the greeting element
    const greetingElement = document.getElementById('greeting');
    console.log("Element greeting ditemukan:", greetingElement);
    
    if (greetingElement) {
        greetingElement.textContent = greeting + " ";
        console.log("✅ Greeting diupdate!");
    } else {
        console.error("❌ Element dengan id 'greeting' tidak ditemukan!");
        console.log("Cek HTML, apakah ada: <span id='greeting'></span>");
    }
}



// Function to handle contact form submission
function handleContactForm(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Harap lengkapi semua field!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Harap masukkan email yang valid!');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    alert(`Terima kasih ${name}! Pesan Anda telah berhasil dikirim. Kami akan membalas ke email ${email} segera.`);
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    return false;
}

// Function to initialize page
function initializePage() {
    // Update greeting on page load
    updateGreeting();
    
    // Add form submit handler if on contact page
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === '/' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Function to display current date and time
function displayDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const dateTimeString = now.toLocaleDateString('id-ID', options);
    const dateTimeElement = document.getElementById('datetime');
    
    if (dateTimeElement) {
        dateTimeElement.textContent = dateTimeString;
    }
}

// Function to handle image loading errors
function handleImageError(img) {
    // Replace broken image with placeholder
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZjlmYSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2Yzc1N2QiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIwLjM1ZW0iPlRva28gVG9tYXJpPC90ZXh0Pjwvc3ZnPg==';
    img.alt = 'Gambar tidak tersedia';
    img.classList.add('img-error');
}

// Function to add image error handlers
function setupImageErrorHandlers() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
}

// Function to update copyright year automatically
function updateCopyrightYear() {
    const yearElement = document.getElementById('copyright-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// Main initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    displayDateTime();
    setupImageErrorHandlers();
    updateCopyrightYear();
    
    // Update greeting every minute
    setInterval(updateGreeting, 60000);
    
    // Update date/time every minute
    setInterval(displayDateTime, 60000);
});

// Export functions for use in HTML (if needed)
window.updateGreeting = updateGreeting;
window.handleContactForm = handleContactForm;