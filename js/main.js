(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner(0);

  // Fixed Navbar
  $(window).scroll(function () {
    if ($(window).width() < 992) {
      if ($(this).scrollTop() > 55) {
        $(".fixed-top").addClass("shadow");
      } else {
        $(".fixed-top").removeClass("shadow");
      }
    } else {
      if ($(this).scrollTop() > 55) {
        $(".fixed-top").addClass("shadow").css("top", -55);
      } else {
        $(".fixed-top").removeClass("shadow").css("top", 0);
      }
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 2000,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 2,
      },
    },
  });

  // Featured listings carousel (previously vegetable carousel)
  $(".vegetable-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="bi bi-arrow-left"></i>',
      '<i class="bi bi-arrow-right"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });

  // Modal Video
  $(document).ready(function () {
    var $videoSrc;
    $(".btn-play").click(function () {
      $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);

    $("#videoModal").on("shown.bs.modal", function (e) {
      $("#video").attr(
        "src",
        $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
      );
    });

    $("#videoModal").on("hide.bs.modal", function (e) {
      $("#video").attr("src", $videoSrc);
    });
  });

  // Counter animation
  function counterAnimation() {
    $(".counter").each(function () {
      var $this = $(this).find("h1");
      var countTo = $this.data("target"); // Read from data-target
      var currentVal = $this.text(); // Store original text (e.g., 1.2M+)
      var isPercentage = currentVal.includes("%");
      var isMillions = currentVal.includes("M");
      var isThousands = currentVal.includes("K");

      $({ countNum: 0 }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 2500, // Slightly longer duration
          easing: "swing", // Smoother easing
          step: function () {
            let num = Math.floor(this.countNum);
            let displayNum = num.toLocaleString("es-ES"); // Format number
            if (isPercentage) {
              $this.text(num + "%");
            } else if (isMillions && num >= 1000000) {
              $this.text((num / 1000000).toFixed(1) + "M+");
            } else if (isThousands && num >= 1000) {
              $this.text((num / 1000).toFixed(0) + "K+");
            } else {
              $this.text(displayNum + (currentVal.includes("+") ? "+" : "")); // Add + back if it was there
            }
          },
          complete: function () {
            // Ensure final value matches original format
            let num = this.countNum;
            let displayNum = parseFloat(num).toLocaleString("es-ES");
            if (isPercentage) {
              $this.text(num + "%");
            } else if (isMillions) {
              $this.text((num / 1000000).toFixed(1) + "M+");
            } else if (isThousands) {
              $this.text((num / 1000).toFixed(0) + "K+");
            } else {
              $this.text(displayNum + (currentVal.includes("+") ? "+" : ""));
            }
          },
        }
      );
    });
  }

  // Only trigger counter animation when element is in viewport
  let counterAnimated = false; // Flag to prevent re-animation
  $(window).scroll(function () {
    if ($(".counter").length && !counterAnimated) {
      var scrollTop = $(window).scrollTop();
      var elementOffset = $(".counter").first().offset().top;
      var distance = elementOffset - scrollTop;
      var windowHeight = $(window).height();

      if (distance < windowHeight - 100) {
        counterAnimation();
        counterAnimated = true; // Set flag
        // $(window).off('scroll'); // We might want other scroll events
      }
    }
  });

  // Search functionality
  $(".btn-search").click(function () {
    $("#searchModal").modal("show");
  });

  // Category filter animation
  $(".nav-pills .nav-link").on("click", function () {
    $(".nav-pills .nav-link").removeClass("active");
    $(this).addClass("active");
  });

  // Product Quantity
  $(".quantity button").on("click", function () {
    var button = $(this);
    var oldValue = button.parent().parent().find("input").val();
    if (button.hasClass("btn-plus")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    button.parent().parent().find("input").val(newVal);
  });
})(jQuery);
