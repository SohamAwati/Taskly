const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

// Firebase Authentication - Login
document.addEventListener("DOMContentLoaded", () => {
  // Sign In
  const signinBtn = document.getElementById("signin-btn");
  if (signinBtn) {
    signinBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.getElementById("signin-name").value;
      const password = document.getElementById("signin-password").value;

      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          alert("Login successful!");
          window.location.href = "ToDo.html"; // Redirect to dashboard
        })
        .catch((error) => {
          alert("Login failed: " + error.message);
        });
    });
  }

  // Sign Up
  const signupBtn = document.getElementById("signup-btn");
  if (signupBtn) {
    signupBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          alert("Account created successfully!");
          window.location.href = "ToDo.html"; // Redirect to dashboard
        })
        .catch((error) => {
          alert("Sign Up failed: " + error.message);
        });
    });
  }
});
