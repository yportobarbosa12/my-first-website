// =========================================================
// script.js: all the interactivity for the mini-site
// =========================================================

// 1. MENU TOGGLE (phones): the Menu button shows and hides the links
var menuButton = document.getElementById("menu-toggle");
var menu = document.getElementById("main-menu");

if (menuButton && menu) {
  menuButton.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.textContent = isOpen ? "Close" : "Menu";
  });
}

// 2. REVEAL QUICK FACTS (Home page): button shows or hides the list
var factsButton = document.getElementById("facts-button");
var factsList = document.getElementById("facts-list");

if (factsButton && factsList) {
  factsButton.addEventListener("click", function () {
    var isHidden = factsList.hasAttribute("hidden");
    if (isHidden) {
      factsList.removeAttribute("hidden");
    } else {
      factsList.setAttribute("hidden", "");
    }
    factsButton.setAttribute("aria-expanded", isHidden);
    factsButton.textContent = isHidden ? "Hide quick facts" : "Show quick facts";
  });
}

// 3. CONTACT FORM VALIDATION (Contact page)
var form = document.getElementById("contact-form");

if (form) {
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var messageInput = document.getElementById("message");
  var successBox = document.getElementById("form-success");

  // Shows or clears the error text under a field
  function setError(input, text) {
    var errorBox = document.getElementById(input.id + "-error");
    errorBox.textContent = text;
    if (text) {
      input.classList.add("invalid");
      input.setAttribute("aria-invalid", "true");
    } else {
      input.classList.remove("invalid");
      input.removeAttribute("aria-invalid");
    }
    return text === "";
  }

  function checkName() {
    return setError(nameInput, nameInput.value.trim() === "" ? "Please enter your name." : "");
  }

  function checkEmail() {
    var value = emailInput.value.trim();
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var text = "";
    if (value === "") {
      text = "Please enter your email.";
    } else if (!pattern.test(value)) {
      text = "Please enter a valid email, like name@example.com.";
    }
    return setError(emailInput, text);
  }

  function checkMessage() {
    var text = "";
    if (messageInput.value.trim().length < 10) {
      text = "Please write a message with at least 10 characters.";
    }
    return setError(messageInput, text);
  }

  // Feedback as soon as someone leaves a field
  nameInput.addEventListener("blur", checkName);
  emailInput.addEventListener("blur", checkEmail);
  messageInput.addEventListener("blur", checkMessage);

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // keeps the page from reloading
    var nameOk = checkName();
    var emailOk = checkEmail();
    var messageOk = checkMessage();

    if (nameOk && emailOk && messageOk) {
      successBox.textContent = "Thank you, " + nameInput.value.trim() + "! Your message was received.";
      successBox.removeAttribute("hidden");
      form.reset();
    } else {
      successBox.setAttribute("hidden", "");
      // sends the keyboard focus to the first field with a problem
      var firstBad = form.querySelector(".invalid");
      if (firstBad) { firstBad.focus(); }
    }
  });
}
