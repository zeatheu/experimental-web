document.addEventListener('DOMContentLoaded', () => {
    const pageContent = document.getElementById('page-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const currentYearSpan = document.getElementById('current-year');

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Function to load page content
    const loadPage = async (page) => {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to the current link
        const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Update URL hash
        window.location.hash = page;

        try {
            const response = await fetch(`pages/${page}.html`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();
            pageContent.innerHTML = content;

            // If it's the products page, add hypothetical cart functionality listeners
            if (page === 'products') {
                attachProductListeners();
            }
             // If it's the contact page, add form listener
            if (page === 'contact') {
                attachContactFormListener();
            }

        } catch (error) {
            console.error("Could not load page:", error);
            pageContent.innerHTML = `<div class="container"><p>Sorry, the content could not be loaded. Please try again later.</p></div>`;
        } finally {
            // Close mobile menu after navigation (if open)
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
             // Scroll to top of the page content after loading
             window.scrollTo({ top: pageContent.offsetTop - header.offsetHeight, behavior: 'smooth' });
        }
    };

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor link behavior
            const page = link.getAttribute('data-page');
            loadPage(page);
        });
    });

    // Hamburger menu toggle
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Initial page load based on hash or default to home
    const initialPage = window.location.hash.substring(1) || 'home';
    loadPage(initialPage);

    // --- Placeholder E-commerce functionality ---
    function attachProductListeners() {
        const productButtons = document.querySelectorAll('.btn-add-to-cart');
        productButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productName = e.target.closest('.product-card').querySelector('h3').textContent;
                alert(`"${productName}" added to cart! (Demo - Not functional)`);
                // In a real app, you'd update a cart state here
            });
        });
    }

        // --- Placeholder Contact Form functionality ---
    function attachContactFormListener() {
        const contactForm = document.getElementById('contact-form');
        if(contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Prevent actual form submission
                alert('Thank you for your message! (Demo - Form not connected)');
                // In a real app, you'd send this data to a server
                contactForm.reset(); // Clear the form
            });
        }
    }

});