document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const contactBtn = document.querySelector('.contact-btn');
    const emailLink = document.querySelector('.email-link');

    // Toggle mobile navigation menu
    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Change hamburger icon to close icon
            if (navLinks.classList.contains('active')) {
                hamburgerMenu.innerHTML = '&times;'; // 'X' icon
            } else {
                hamburgerMenu.innerHTML = '&#9776;'; // Hamburger icon
            }
        });
    }

    // Make the email link workable (it's already a mailto link, but good to ensure)
    if (emailLink) {
        emailLink.addEventListener('click', (event) => {
            // This prevents default navigation if you wanted to do something else,
            // but for mailto it's usually fine to let it behave normally.
            // event.preventDefault();
            console.log('Email link clicked, opening mail client for:', emailLink.href);
            // You can add custom logic here if needed, e.g., tracking
        });
    }

    // Add functionality to the contact button (if needed, otherwise it's just a visual button)
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            // In a real application, this might open a contact form or navigate to a contact page.
            // For now, it just logs to the console.
            console.log('Contact me button clicked!');
            // Example: window.location.href = '#contact-form';
        });
    }

    // Arrow rotation on cursor move (specifically for the "See what i can do" button)
    const seeWhatICanDoBtn = document.querySelector('.see-what-i-can-do');
    const arrowIcon = document.querySelector('.arrow-icon');

    if (seeWhatICanDoBtn && arrowIcon) {
        seeWhatICanDoBtn.addEventListener('mousemove', (e) => {
            // Get the bounding box of the button
            const rect = seeWhatICanDoBtn.getBoundingClientRect();

            // Calculate the center of the button
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate the position of the mouse relative to the center of the button
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            // Calculate the angle based on mouse position
            // atan2 returns angle in radians, convert to degrees
            const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

            // Adjust angle to make it more intuitive for an arrow pointing right
            // The default arrow points top-right (45 deg). We want it to rotate around that.
            // Let's say the base angle is 45 degrees for pointing up-right.
            // We can make it rotate slightly around this base angle.
            // For simplicity, let's just rotate based on mouseX and mouseY
            // A simple rotation from -45 to +45 degrees around the initial 45 degree angle.
            // This is a more complex effect than just rotating on hover.
            // For the requested effect "rotate on moving cursor on it",
            // a simpler approach is to use the hover effect as defined in CSS.
            // If a more dynamic rotation based on mouse position *within* the button is desired,
            // the following code can be adapted.
            // For now, the CSS hover effect is sufficient and matches the common interpretation.

            // If you want the arrow to follow the cursor direction more directly:
            // arrowIcon.style.transform = `rotate(${angle + 90}deg)`; // +90 to align with arrow pointing up initially
        });

        // Reset arrow on mouse leave (if dynamic rotation was applied)
        seeWhatICanDoBtn.addEventListener('mouseleave', () => {
            // If using JS for dynamic rotation, reset here.
            // For CSS hover effect, this is not strictly needed as CSS handles it.
            // arrowIcon.style.transform = 'rotate(45deg)'; // Reset to initial state
        });
    }
});


//Main section
// script.js
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('slidingStatsTrack');
    // Exit if the track element is not found, to prevent errors on pages without this section
    if (!track) return; 

    const originalContent = track.innerHTML;

    // Duplicate the content to ensure a seamless loop.
    // This makes the animation appear continuous without jumps.
    track.innerHTML += originalContent;

    // Function to calculate and apply the animation width
    const setAnimationWidth = () => {
        // Temporarily pause animation to get accurate scrollWidth
        const currentAnimation = track.style.animation;
        track.style.animation = 'none';
        track.style.whiteSpace = 'nowrap'; // Ensure content doesn't wrap during measurement

        // Calculate the total width of one set of the original content.
        // We divide by 2 because we've duplicated the content inside the track.
        const originalWidth = track.scrollWidth / 2;

        // Restore the animation
        track.style.animation = currentAnimation;

        // Remove any existing dynamic style tag for the slideLeft animation
        // This prevents multiple identical keyframe rules from accumulating on resize
        const existingStyle = document.getElementById('slideLeftAnimation');
        if (existingStyle) {
            existingStyle.parentNode.removeChild(existingStyle);
        }

        // Dynamically create a new <style> tag to inject the calculated @keyframes rule.
        // This ensures the animation distance precisely matches the content's width.
        const style = document.createElement('style');
        style.id = 'slideLeftAnimation'; // Assign an ID for easy removal later
        style.innerHTML = `
            @keyframes slideLeft {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-${originalWidth}px);
                }
            }
        `;
        document.head.appendChild(style);
    };

    // Call the function initially when the DOM is loaded
    setAnimationWidth();

    // Add a resize listener to recalculate width and update animation if the window size changes.
    // This is debounced to improve performance on continuous resizing.
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setAnimationWidth, 250); // Wait 250ms before recalculating
    });
});


// Faqs 

document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling; // The .faq-answer div
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all other open FAQ items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question && otherQuestion.getAttribute('aria-expanded') === 'true') {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherQuestion.nextElementSibling.setAttribute('aria-hidden', 'true');
                    // Reset max-height and padding for smooth closing
                    otherQuestion.nextElementSibling.style.maxHeight = '0';
                    otherQuestion.nextElementSibling.style.paddingTop = '0';
                    otherQuestion.nextElementSibling.style.paddingBottom = '0';
                }
            });

            // Toggle the clicked FAQ item
            if (isExpanded) {
                question.setAttribute('aria-expanded', 'false');
                answer.setAttribute('aria-hidden', 'true');
                answer.style.maxHeight = '0';
                answer.style.paddingTop = '0';
                answer.style.paddingBottom = '0';
            } else {
                question.setAttribute('aria-expanded', 'true');
                answer.setAttribute('aria-hidden', 'false');
                // Set max-height to scrollHeight to allow content to expand fully
                // Adding some extra height (e.g., 20px) can prevent content from being cut off if scrollHeight is slightly off
                answer.style.maxHeight = answer.scrollHeight + 20 + 'px'; 
                answer.style.paddingTop = '0.5rem'; // Re-apply top padding when opening
                answer.style.paddingBottom = '1.25rem'; // Re-apply bottom padding when opening
            }
        });

        // Optional: Add keyboard accessibility for Enter/Space key
        question.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Prevent default scroll behavior for spacebar
                question.click(); // Simulate a click
            }
        });
    });
});


// about_me
document.addEventListener('DOMContentLoaded', () => {
    // Handle the "Send Message" button click
    const sendMessageBtn = document.querySelector('.am-send-message-button');
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default form submission for demonstration

            const form = event.target.closest('.am-contact-form');
            if (form.checkValidity()) {
                // In a real application, you would send this data to a server
                // using fetch() or XMLHttpRequest.
                // For now, let's just log the values and show an alert.
                const name = form.querySelector('#am-name').value;
                const email = form.querySelector('#am-email').value;
                const message = form.querySelector('#am-message').value;

                console.log('Form Submitted:');
                console.log('Name:', name);
                console.log('Email:', email);
                console.log('Message:', message);

                alert('Thank you for your message, ' + name + '! We will get back to you soon.');

                // Optionally, clear the form fields after submission
                form.reset();
            } else {
                // If form is not valid, the browser's default validation messages will appear
                alert('Please fill in all required fields correctly.');
            }
        });
    }

    // The arrow rotation on the "Book a call" button is handled purely by CSS on hover.
    // No JavaScript is explicitly required for that specific effect.
});


// Preloader functionality
// Hide preloader when page is fully loaded
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 400);
    }
});