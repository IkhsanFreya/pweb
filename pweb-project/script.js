// Mobile Menu Functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Zakat Calculator Functionality
const calculatorForm = document.querySelector('.calc-form');
const calcTabs = document.querySelectorAll('.calc-tab');
const monthlyIncome = document.querySelector('input[placeholder="Rp 0"]');
const additionalIncome = document.querySelectorAll('input[placeholder="Rp 0"]')[1];
const calculateBtn = document.querySelector('.calculate-btn');

// Switch between calculator tabs
calcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        calcTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});

// Calculate Zakat
calculateBtn.addEventListener('click', () => {
    const monthly = parseFloat(monthlyIncome.value) || 0;
    const additional = parseFloat(additionalIncome.value) || 0;
    const totalIncome = monthly + additional;
    const nisab = 85 * 700000; // Approximate gold value
    const zakatAmount = totalIncome * 0.025;

    if (totalIncome >= nisab) {
        alert(`Zakat yang harus dibayarkan: Rp ${zakatAmount.toLocaleString('id-ID')}`);
    } else {
        alert('Penghasilan Anda belum mencapai nisab (belum wajib zakat)');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.program-card, .stat-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Progress Bar Animation
const updateProgress = () => {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(progress => {
        const width = progress.style.width;
        progress.style.width = '0';
        setTimeout(() => {
            progress.style.width = width;
        }, 500);
    });
};

document.addEventListener('DOMContentLoaded', updateProgress);

// Number Counter Animation
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.stat-item h3');
    numbers.forEach(number => {
        const target = parseInt(number.innerText.replace(/\D/g, ''));
        let count = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const updateCount = () => {
            if (count < target) {
                count += increment;
                number.innerText = Math.ceil(count).toLocaleString() + '+';
                requestAnimationFrame(updateCount);
            } else {
                number.innerText = target.toLocaleString() + '+';
            }
        };

        updateCount();
    });
};

document.addEventListener('DOMContentLoaded', animateNumbers);

// Scroll animation for statistics
document.addEventListener('DOMContentLoaded', function() {
    const statistics = document.querySelector('.statistics');
    const statItems = document.querySelectorAll('.stat-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statistics.classList.add('visible');
                
                // Animate each stat item with delay
                statItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200); // 200ms delay between each item
                });

                // Animate numbers
                statItems.forEach(item => {
                    const numberElement = item.querySelector('h3');
                    const finalNumber = numberElement.innerText;
                    
                    if (finalNumber.includes('M')) {
                        animateNumber(numberElement, 0, parseInt(finalNumber), 'M');
                    } else if (finalNumber.includes('+')) {
                        animateNumber(numberElement, 0, parseInt(finalNumber), '+');
                    }
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(statistics);
});

function animateNumber(element, start, end, suffix) {
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Get program parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const program = urlParams.get('program');

// If we're on the donation page and have a program parameter
if (window.location.pathname.includes('donate.html') && program) {
    // You can use this to pre-fill or customize the donation form
    const programTitles = {
        'banjir': 'Bantuan Ustadz Qodir',
        'eid': 'Baju Hari Raya Anak Yatim',
        'bencana': 'NU Peduli Bencana Banjir'
    };

    // Update page title or content based on program
    if (programTitles[program]) {
        document.querySelector('.campaign-details h1').textContent = programTitles[program];
    }
}


function toggleDropdown() {
    const dropdown = document.getElementById('paymentDropdown');
    dropdown.classList.toggle('show-dropdown');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('paymentDropdown');
    const button = document.querySelector('.donate-btn');
    
    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove('show-dropdown');
    }
});
