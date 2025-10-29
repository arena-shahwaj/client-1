  // Initialize AOS
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      });

      // Form Handling
      const enrollBtn = document.getElementById("enrollBtn");
      const enrollForm = document.getElementById("enrollForm");
      const loginForm = document.getElementById("loginForm");
      const closeEnroll = document.getElementById("closeEnroll");
      const closeLogin = document.getElementById("closeLogin");
      const switchToLogin = document.getElementById("switchToLogin");
      const switchToEnroll = document.getElementById("switchToEnroll");

      // Open enroll form
      enrollBtn.addEventListener("click", () => {
        enrollForm.classList.add("active");
      });

      // Close enroll form
      closeEnroll.addEventListener("click", () => {
        enrollForm.classList.remove("active");
      });

      // Close login form
      closeLogin.addEventListener("click", () => {
        loginForm.classList.remove("active");
      });

      // Switch to login form
      switchToLogin.addEventListener("click", () => {
        enrollForm.classList.remove("active");
        loginForm.classList.add("active");
      });

      // Switch to enroll form
      switchToEnroll.addEventListener("click", () => {
        loginForm.classList.remove("active");
        enrollForm.classList.add("active");
      });

      // Close forms when clicking outside
      window.addEventListener("click", (e) => {
        if (e.target === enrollForm) {
          enrollForm.classList.remove("active");
        }
        if (e.target === loginForm) {
          loginForm.classList.remove("active");
        }
      });

      // Video Slider
      const videoSlides = document.querySelectorAll(".video-slide");
      let currentSlide = 0;

      function showSlide(n) {
        videoSlides[currentSlide].classList.remove("active");
        currentSlide = (n + videoSlides.length) % videoSlides.length;
        videoSlides[currentSlide].classList.add("active");
      }

      function nextSlide() {
        showSlide(currentSlide + 1);
      }

      // Change slide every 4 seconds
      setInterval(nextSlide, 4000);

      // Auto open enroll form when page loads
      window.addEventListener("load", () => {
        setTimeout(() => {
          enrollForm.classList.add("active");
        }, 1000);
      });
 