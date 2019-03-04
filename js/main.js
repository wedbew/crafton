"use strict";

var navWrapper = document.getElementById('nav-wrapper');
var nav = document.getElementById('main-nav');
var mobileNavIcon = document.getElementById('hamburger-button');
var closeMobileNav = document.getElementById('close-hamburger-button');
var mobileNav = document.getElementById('mobile-nav');
var pagination1 = document.getElementById('scroll-to-section1');
var pagination2 = document.getElementById('scroll-to-section2');
var pagination3 = document.getElementById('scroll-to-section3');
var pagination4 = document.getElementById('scroll-to-section4');
var dots = [pagination1, pagination2, pagination3, pagination4];
var images = ['img/bg-1.png', 'img/bg-2.png', 'img/bg-3.png'];
var mainImage = document.getElementById('main-image');
var mainImageWidth = mainImage.getBoundingClientRect().width;
var arrowRight = document.getElementById('arrow-right');
var arrowLeft = document.getElementById('arrow-left');
var addLightbox = document.getElementById('add-lightbox');
var lightbox = document.getElementById('lightbox');
var close = document.getElementById('close');
var form = document.getElementById('main-form');
var formName = document.getElementById('form-input__name');
var formSurname = document.getElementById('form-input__surname');
var formEmail = document.getElementById('form-input__email');
var formMessage = document.getElementById('form-input__message');
var formInputs = [formName, formSurname, formEmail, formMessage];
var formCheckbox = document.getElementById('checkbox');
var formCheckmark = document.getElementById('checkmark');
var emailVal = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var nameVal = /^[A-Za-z\s]+$/;
var header = document.getElementById('header');
var section1 = document.getElementById('section1');
var section2 = document.getElementById('section2');
var section3 = document.getElementById('section3');
var section4 = document.getElementById('section4');
var section5 = document.getElementById('section5'); // Open/Close mobile navigation

mobileNavIcon.addEventListener('click', function() {
    toggleClass(mobileNav, 'open-nav');
    toggleClass(mobileNavIcon, 'open-mobile__nav');
}); // Jquery toggle function equivalent

var toggleClass = function toggleClass(el, className) {
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);
        if (existingIndex >= 0) classes.splice(existingIndex, 1);
        else classes.push(className);
        el.className = classes.join(' ');
    }
}; // Change source of main image in slider


var changeIndexPlus = function changeIndexPlus() {
    var currentImage = mainImage.src;
    var url = currentImage.split('/');
    var src = url[4];
    var img = "img/".concat(src);
    var currentIndex = images.indexOf(img);

    if (currentIndex >= images.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex = currentIndex + 1;
    } // Add fade-in class

    mainImage.classList.add('fade-in'); // Remove fade-in class after .5s

    setTimeout(function() {
        return mainImage.classList.remove('fade-in');
    }, 500);
    mainImage.src = images[currentIndex];
}; // Change source of main image in slider


var changeIndexMinus = function changeIndexMinus() {
    var currentImage = mainImage.src;
    var url = currentImage.split('/');
    var src = url[4];
    var img = "img/".concat(src);
    var currentIndex = images.indexOf(img);

    if (currentIndex == 0) {
        currentIndex = images.length - 1;
    } else {
        currentIndex--;
    } // Add fade-in class


    mainImage.classList.add('fade-in'); // Remove fade-in class after .5s

    setTimeout(function() {
        return mainImage.classList.remove('fade-in');
    }, 500);
    mainImage.src = images[currentIndex];
}; // After clicking on of the arrows call function to change source of image


arrowRight.addEventListener('click', changeIndexPlus);
arrowLeft.addEventListener('click', changeIndexMinus); // Open modal 

var modal = function modal() {
    lightbox.style.display = 'flex';
    lightbox.classList.remove('fade-out');
    lightbox.classList.add('fade-in');
    closeModalByEscape();
}; // Close modal by pressing escape button


var closeModalByEscape = function closeModalByEscape() {
    window.addEventListener('keydown', function(e) {
        if (e.keyCode == 27) {
            removeLightbox();
        }
    });
}; // Close modal function


var removeLightbox = function removeLightbox() {
    lightbox.classList.add('fade-out');
    setTimeout(function() {
        lightbox.classList.remove('fade-in');
    }, 500);
    setTimeout(function() {
        lightbox.style.display = 'none';
    }, 500);
}; // After clicking on play button call function to open modal


addLightbox.addEventListener('click', modal); // Close modal after clicking whatever you want but not the player

lightbox.addEventListener('click', removeLightbox); // Close modal by cliking on 'x'

close.addEventListener('click', removeLightbox); // After detecting scrolling add background to navigation and decrease padding

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 0 && window.innerWidth) {
        navWrapper.classList.add('nav-scroll');
        nav.children[0].style.marginTop = "1em";
        nav.children[0].style.marginBottom = "1em";
    } else {
        navWrapper.classList.remove('nav-scroll');
        window.addEventListener('resize', function(element) {
            if (!window.innerWidth < 1200) {
                element.children[0].style.marginTop = "2.5em";
                element.children[0].style.marginBottom = "2.5em";
            }
        });
    }
}); // Add class to image with handshake to center it on the page, I know that this is not the most convenient way to do it

var alignImage = function alignImage() {
    if (window.innerWidth < 1200) {
        section2.children[0].children[0].classList.add('align-image__left');
    } else {
        section2.children[0].children[0].classList.remove('align-image__left');
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth < 1200) {
            section2.children[0].children[0].classList.add('align-image__left');
        } else {
            section2.children[0].children[0].classList.remove('align-image__left');
        }
    });
}; // Call function to align image


alignImage(); // Add margin top to form section. Value of margin is calculated from the height of each previous section and header

var addMarginTopToForm = function addMarginTopToForm() {
    var sections = [header, section1, section2, section3];
    var sectionsHeight = sections.map(function(section) {
        return section.getBoundingClientRect().height;
    });
    var marginTop = sectionsHeight.reduce(function(a, b) {
        return a + b;
    });
    section4.style.marginTop = "".concat(marginTop, "px");
    window.addEventListener('resize', function() {
        var sections = [header, section1, section2, section3];
        var sectionsHeight = sections.map(function(section) {
            return section.getBoundingClientRect().height;
        });
        var marginTop = sectionsHeight.reduce(function(a, b) {
            return a + b;
        });
        section4.style.marginTop = "".concat(marginTop, "px");
    });
}; // Call add margin top function


addMarginTopToForm(); // Change color of dots after scrolling 408px, to make it visible on white background

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 408) {
        var changeColor = dots.forEach(function(dot) {
            return dot.classList.add('dark-dots');
        });
    } else {
        dots.forEach(function(dot) {
            return dot.classList.remove('dark-dots');
        });
    }
}); // Native js function to smooth scrolling

var smoothScroll = function smoothScroll(el, section) {
    el.addEventListener('click', function() {
        activeDot(el);
        document.querySelector(section).scrollIntoView({
            behavior: 'smooth'
        });
    });
}; // Call smooth scroll after clicking on specific dot


smoothScroll(pagination1, '#section1');
smoothScroll(pagination2, '#section2');
smoothScroll(pagination3, '#section3');
smoothScroll(pagination4, '#section4'); // After detecting scroll add or remove yellow color to active dot

window.addEventListener('scroll', function() {
    if (window.pageYOffset < sectionHalfWidth(section1)) {
        removeActiveDot();
    } else if (window.pageYOffset >= sectionHalfWidth(section1) && window.pageYOffset < sectionHalfWidth(section2)) {
        activeDot(pagination1);
    } else if (window.pageYOffset >= sectionHalfWidth(section2) && window.pageYOffset < sectionHalfWidth(section3)) {
        activeDot(pagination2);
    } else if (window.pageYOffset >= sectionHalfWidth(section3) && window.pageYOffset < sectionHalfWidth(section4)) {
        activeDot(pagination3);
    } else if (window.pageYOffset >= sectionHalfWidth(section4)) {
        activeDot(pagination4);
    } else if (window.pageYOffset < sectionHalfWidth(section5)) {
        removeActiveDot();
    }
}); // Function that count the half of height of section

var sectionHalfWidth = function sectionHalfWidth(section) {
    return section.offsetTop - section.getBoundingClientRect().height / 2;
}; // Add yellow color only to specific dot and remove the color from all other dots


var activeDot = function activeDot(el) {
    var activeDots = dots.filter(function(dot) {
        return dot.classList.contains('active-dot');
    });
    activeDots.forEach(function(dot) {
        return dot.classList.remove('active-dot');
    });
    el.classList.add('active-dot');
}; // Remove yellow color of each dots


var removeActiveDot = function removeActiveDot() {
    var activeDots = dots.filter(function(dot) {
        return dot.classList.contains('active-dot');
    });
    activeDots.forEach(function(dot) {
        return dot.classList.remove('active-dot');
    });
}; // Add class input with value to form input which user added some value


var floatingLabels = function floatingLabels() {
    var inputChangeState = function inputChangeState(input) {
        if (input.value.length > 0) {
            input.classList.add('input-with__value');
        } else {
            input.classList.remove('input-with__value');
        }
    };

    formInputs.forEach(function(input) {
        inputChangeState(input);
        input.addEventListener('focusout', function() {
            inputChangeState(input);
        });
    });
}; // Call funcion that add class to input with some value


floatingLabels(); // After submitting the form check if each of the input is relevant to send data

form.addEventListener('submit', function(e) {
    // Array of empty inputs
    var emptyInput = formInputs.filter(function(input) {
        return input.value === "";
    });

    if (emptyInput.length > 0) {
        e.preventDefault(); // Add warning to each empty input

        emptyInput.forEach(function(element) {
            return element.classList.add('form-input__warning');
        });
    } // Check if checkbox is checked or not


    if (!formCheckbox.checked) {
        e.preventDefault(); // Add warning to unchecked input

        formCheckmark.classList.add('form-input__warning');
    } // Test email input from the set of available marks and combination of them


    var emailValidation = function emailValidation(email) {
        return emailVal.test(email);
    };

    var validationOfEmail = function validationOfEmail() {
        if (!emailValidation(formEmail.value)) {
            e.preventDefault(); // If email address is not relevant add warning to it

            formEmail.classList.add('form-input__warning');
            formEmail.style.color = "#ff3139";
        }
    }; // Test name input from set of availible marks


    var nameValidation = function nameValidation(name) {
        return nameVal.test(name);
    };

    var validationOfName = function validationOfName() {
        if (!nameValidation(formName.value)) {
            e.preventDefault(); // If name is not relevant add warning to it

            formName.classList.add('form-input__warning');
            formName.style.color = "#ff3139";
        }
    }; // Test surname input from set of availible marks


    var surnameValidation = function surnameValidation(surname) {
        return nameVal.test(surname);
    };

    var validationOfSurname = function validationOfSurname() {
        if (!surnameValidation(formSurname.value)) {
            e.preventDefault(); // If surname is not relevant add warning to it

            formSurname.classList.add('form-input__warning');
            formSurname.style.color = "#ff3139";
        }
    }; // Call functions that will check inputs


    validationOfEmail();
    validationOfName();
    validationOfSurname();
});