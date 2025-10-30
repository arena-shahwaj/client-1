// Form Management
      class FormManager {
        constructor() {
          this.enrollBtn = document.getElementById("enrollBtn");
          this.enrollForm = document.getElementById("enrollForm");
          this.loginForm = document.getElementById("loginForm");
          this.closeEnroll = document.getElementById("closeEnroll");
          this.closeLogin = document.getElementById("closeLogin");
          this.switchToLogin = document.getElementById("switchToLogin");
          this.switchToEnroll = document.getElementById("switchToEnroll");
          this.enrollFormElement = document.getElementById("enrollFormElement");
          this.loginFormElement = document.getElementById("loginFormElement");

          this.init();
        }

        init() {
          // Show enroll form on page load
          setTimeout(() => {
            this.showEnrollForm();
          }, 1000);

          // Event Listeners
          this.enrollBtn.addEventListener("click", () => this.showEnrollForm());
          this.closeEnroll.addEventListener("click", () =>
            this.hideEnrollForm()
          );
          this.closeLogin.addEventListener("click", () => this.hideLoginForm());
          this.switchToLogin.addEventListener("click", () =>
            this.showLoginForm()
          );
          this.switchToEnroll.addEventListener("click", () =>
            this.showEnrollForm()
          );

          // Form Submissions
          this.enrollFormElement.addEventListener("submit", (e) =>
            this.handleEnrollSubmit(e)
          );
          this.loginFormElement.addEventListener("submit", (e) =>
            this.handleLoginSubmit(e)
          );

          // Close on background click
          this.enrollForm.addEventListener("click", (e) => {
            if (e.target === this.enrollForm) this.hideEnrollForm();
          });

          this.loginForm.addEventListener("click", (e) => {
            if (e.target === this.loginForm) this.hideLoginForm();
          });
        }

        showEnrollForm() {
          this.hideAllForms();
          this.enrollForm.classList.add("active");
          document.body.style.overflow = "hidden";
        }

        hideEnrollForm() {
          this.enrollForm.classList.remove("active");
          document.body.style.overflow = "auto";
        }

        showLoginForm() {
          this.hideAllForms();
          this.loginForm.classList.add("active");
          document.body.style.overflow = "hidden";
        }

        hideLoginForm() {
          this.loginForm.classList.remove("active");
          document.body.style.overflow = "auto";
        }

        hideAllForms() {
          this.enrollForm.classList.remove("active");
          this.loginForm.classList.remove("active");
          document.body.style.overflow = "auto";
        }

        handleEnrollSubmit(e) {
          e.preventDefault();
          alert("Enrollment submitted successfully! We will contact you soon.");
          this.hideEnrollForm();
          this.enrollFormElement.reset();
        }

        handleLoginSubmit(e) {
          e.preventDefault();
          alert("Login successful! Welcome back.");
          this.hideLoginForm();
          this.loginFormElement.reset();
        }
      }

      // Video Slider
      class VideoSlider {
        constructor() {
          this.slides = document.querySelectorAll(".video-slide");
          this.slideContents = document.querySelectorAll(".slide-content");
          this.currentSlide = 0;
          this.slideInterval = null;
          this.init();
        }

        init() {
          this.startAutoSlide();
        }

        startAutoSlide() {
          this.slideInterval = setInterval(() => {
            this.nextSlide();
          }, 5000); // Change every 5 seconds
        }

        nextSlide() {
          // Hide current slide
          this.slides[this.currentSlide].classList.remove("active");
          this.slideContents[this.currentSlide].classList.remove("active");

          // Move to next slide
          this.currentSlide = (this.currentSlide + 1) % this.slides.length;

          // Show next slide
          setTimeout(() => {
            this.slides[this.currentSlide].classList.add("active");
            this.slideContents[this.currentSlide].classList.add("active");
          }, 100);
        }
      }

      // Initialize everything when DOM is loaded
      document.addEventListener("DOMContentLoaded", () => {
        new FormManager();
        new VideoSlider();

        // Initialize AOS
        AOS.init({
          duration: 1000,
          once: true,
          offset: 100,
          easing: "ease-out-cubic",
        });
      });
      //Mision section
      // Number counting animation for stats
      document.addEventListener("DOMContentLoaded", function () {
        const statNumbers = document.querySelectorAll(".stat-number");

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute("data-count"));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;

                const timer = setInterval(() => {
                  current += step;
                  if (current >= target) {
                    current = target;
                    clearInterval(timer);
                  }
                  statNumber.textContent = Math.floor(current);
                }, 16);

                observer.unobserve(statNumber);
              }
            });
          },
          { threshold: 0.5 }
        );

        statNumbers.forEach((stat) => {
          observer.observe(stat);
        });
      });

      // Simple JavaScript Text Animation
      class TextAnimator {
        constructor() {
          this.cards = document.querySelectorAll(".course-card");
          this.init();
        }

        init() {
          this.cards.forEach((card) => {
            card.addEventListener("mouseenter", this.animateText.bind(this));
            card.addEventListener("mouseleave", this.resetText.bind(this));
          });
        }

        animateText(e) {
          const card = e.currentTarget;
          const title = card.querySelector(".course-title");
          const description = card.querySelector(".course-description");

          // Animate title character by character
          this.animateCharacters(title);

          // Animate description word by word with spaces
          this.animateWordsWithSpaces(description);
        }

        animateCharacters(element) {
          const text = element.textContent;
          element.innerHTML = "";

          for (let i = 0; i < text.length; i++) {
            const char = document.createElement("span");
            char.className = "animate-char";
            char.textContent = text[i];
            char.style.transitionDelay = `${i * 0.05}s`;
            element.appendChild(char);
          }

          // Trigger animation
          setTimeout(() => {
            const chars = element.querySelectorAll(".animate-char");
            chars.forEach((char) => {
              char.style.opacity = "1";
              char.style.transform = "translateY(0)";
            });
          }, 50);
        }

        animateWordsWithSpaces(element) {
          const text = element.textContent;
          element.innerHTML = "";

          // Split text into words including spaces
          const words = text.split(/(\s+)/);

          words.forEach((word, index) => {
            if (word.trim() !== "" || word === " ") {
              const wordWrapper = document.createElement("span");
              wordWrapper.className = "word-wrapper";

              const wordSpan = document.createElement("span");
              wordSpan.className = "animate-word";
              wordSpan.textContent = word;
              wordSpan.style.transitionDelay = `${index * 0.1}s`;

              wordWrapper.appendChild(wordSpan);
              element.appendChild(wordWrapper);
            }
          });

          // Trigger animation
          setTimeout(() => {
            const words = element.querySelectorAll(".animate-word");
            words.forEach((word) => {
              word.style.opacity = "1";
              word.style.transform = "translateX(0)";
            });
          }, 200);
        }

        resetText(e) {
          const card = e.currentTarget;
          const title = card.querySelector(".course-title");
          const description = card.querySelector(".course-description");

          // Reset to original text
          const originalTitle = this.getOriginalText(title);
          const originalDescription = this.getOriginalText(description);

          title.innerHTML = originalTitle;
          description.innerHTML = originalDescription;
        }

        getOriginalText(element) {
          // Store original text in data attribute if not already stored
          if (!element.dataset.originalText) {
            element.dataset.originalText = element.textContent;
          }
          return element.dataset.originalText;
        }
      }

      // Initialize text animator when DOM is loaded
      document.addEventListener("DOMContentLoaded", () => {
        new TextAnimator();
      });