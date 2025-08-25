function isPartiallyInView(elem) {
  var docViewTop = $(window).scrollTop(),
    docViewBottom = docViewTop + $(window).height(),
    elemTop = $(elem).offset().top,
    elemBottom = elemTop + $(elem).height();

  return elemBottom >= docViewTop && elemTop <= docViewBottom;
}

$(window).on("scroll", function () {
  $(".slider-section").each(function () {
    $(this).toggleClass("in-view", isPartiallyInView(this));
  });
});

// brightness and opacity
$(window).on("scroll resize", function () {
  var $sliderContent = $(".slider-content");
  var $slideImgText = $(".slide-img-text");

  var contentTop = $sliderContent.offset().top;
  var windowHeight = $(window).height();
  var scrollTop = $(window).scrollTop();

  var distanceFromTop = contentTop - scrollTop;
  var progress = 1 - distanceFromTop / windowHeight;
  progress = Math.max(0, Math.min(progress, 1));

  if (scrollTop === 0) {
    progress = 0;
  }

  var translateY = (1 - progress) * -32;
  var brightness = 100 - 30 * progress;

  if ($(window).width() <= 767) {
    var brightness = 100 - 20 * progress;
    var translateY = (1 - progress) * -36;
  }

  $slideImgText.css("transform", "translateY(" + translateY + "vh)");
  $(".sm-1 img.brightness").css("filter", "brightness(" + brightness + "%)");
  $(".text-1").css("opacity", progress);

  //boxShadow
  if ($(window).width() <= 480) {
    var blur = 2004 - progress * (2004 - 200);
    var opacity = 0.28 - progress * (0.28 - 0.07);
    var boxShadow = `40px 60px ${blur}px rgba(0, 0, 0, ${opacity})`;

    $(".slider-img.sm-1 img").css("box-shadow", boxShadow);
  }
});

$(".dot-1").css("opacity", 1);

//Slider Section
$(window).on("scroll resize", function () {
  var $sliderSection = $(".slider-section");
  if (!$sliderSection.hasClass("in-view")) return;

  var scrollTop = $(window).scrollTop();
  var sectionTop = $sliderSection.offset().top;
  var sectionHeight = $sliderSection.height();
  var windowHeight = $(window).height();
  var progress = (scrollTop - sectionTop) / (sectionHeight - windowHeight);
  var totalSteps = 3;
  var stepSize = 1 / (totalSteps - 1);
  var currentStep = Math.round(progress / stepSize) + 1;

  if (currentStep < 1) currentStep = 1;
  if (currentStep > totalSteps) currentStep = totalSteps;

  if (sectionTop <= $(window).scrollTop()) {
    var stepStartScroll =
      sectionTop + (currentStep - 1) * (sectionHeight / totalSteps);
    var stepEndScroll = sectionTop + currentStep * (sectionHeight / totalSteps);
    var stepProgress =
      (scrollTop - stepStartScroll) / (stepEndScroll - stepStartScroll);
    stepProgress = Math.max(0, Math.min(stepProgress, 1));

    var textOpacity;

    $(".slider-text").css("opacity", "0");

    //for step 1
    if (currentStep === 1 && stepProgress < 0.8) {
      textOpacity = 1;
      $(".text-" + currentStep).css("opacity", textOpacity);
    } else if (currentStep === 1 && stepProgress > 0.8 && stepProgress <= 1) {
      textOpacity = Math.min(0.8, Math.max(0.3, 1 - stepProgress));
      $(".text-" + currentStep).css("opacity", textOpacity);
    }

    //except first step
    else if (currentStep != 1 && stepProgress < 0.1) {
      textOpacity = Math.min(0.8, Math.max(0.3, 1 - stepProgress));
      if (currentStep === totalSteps) {
        $(".text-" + currentStep).css("opacity", textOpacity);
      } else {
        $(".text-" + (currentStep - 1)).css("opacity", textOpacity);
      }
      $(".text-" + currentStep).css("opacity", 0);
    }

    //only last step
    else if (
      currentStep === totalSteps &&
      stepProgress > 0.1 &&
      stepProgress <= 1
    ) {
      if (stepProgress > 0.1 && stepProgress <= 0.2) {
        $(".text-" + currentStep).css("opacity", 0.3);
      } else if (stepProgress > 0.2 && stepProgress <= 0.25) {
        $(".text-" + currentStep).css("opacity", 0.4);
      } else if (stepProgress > 0.25 && stepProgress <= 0.3) {
        $(".text-" + currentStep).css("opacity", 0.5);
      } else if (stepProgress > 0.3 && stepProgress <= 0.35) {
        $(".text-" + currentStep).css("opacity", 0.6);
      } else if (stepProgress > 0.35 && stepProgress <= 0.45) {
        $(".text-" + currentStep).css("opacity", 0.8);
      } else {
        $(".text-" + currentStep).css("opacity", 1);
      }
    }

    //except first and last text
    else if (currentStep != 1 && currentStep != totalSteps) {
      $(".text-" + (currentStep + 1)).css("opacity", 0);
      $(".text-" + (currentStep - 1)).css("opacity", 0);

      // Fade in current text
      if (stepProgress > 0.1 && stepProgress <= 0.3) {
        $(".text-" + currentStep).css("opacity", 0);
      } else if (stepProgress > 0.3 && stepProgress <= 0.35) {
        $(".text-" + currentStep).css("opacity", 0.3);
      } else if (stepProgress > 0.35 && stepProgress <= 0.4) {
        $(".text-" + currentStep).css("opacity", 0.4);
      } else if (stepProgress > 0.4 && stepProgress <= 0.45) {
        $(".text-" + currentStep).css("opacity", 0.6);
      } else if (stepProgress > 0.45 && stepProgress <= 0.5) {
        $(".text-" + currentStep).css("opacity", 0.8);
      } else if (stepProgress > 0.5 && stepProgress <= 0.8) {
        $(".text-" + currentStep).css("opacity", 1);
      } else if (stepProgress > 0.8) {
        if ($(window).width() <= 767) {
          //for mobile
          if (stepProgress > 0.8 && stepProgress <= 0.84) {
            $(".text-" + currentStep).css("opacity", 0.8);
          } else if (stepProgress > 0.84 && stepProgress <= 0.9) {
            $(".text-" + currentStep).css("opacity", 0.6);
          } else if (stepProgress > 0.9 && stepProgress <= 0.94) {
            $(".text-" + currentStep).css("opacity", 0.3);
          } else {
            $(".text-" + currentStep).css("opacity", 0);
          }
        } else {
          //for desktop
          let textOpacity = Math.min(0.6, Math.max(0.3, 1 - stepProgress));
          $(".text-" + currentStep).css("opacity", textOpacity);
        }
      }
    }

    // Image and Background Opacity Logic (remains the same)
    $(".slider-img").css("opacity", 0);
    $(".slider-bg:not(.bg-1)").css("opacity", 0);
    $(".dot").css("opacity", 0.3);

    let currentImage = $(".sm-" + currentStep);
    let nextImage = $(".sm-" + (currentStep + 1));
    let currentBg = $(".bg-" + currentStep);
    let nextBg = $(".bg-" + (currentStep + 1));
    let currentDot = $(".dot-" + currentStep);
    let nextDot = $(".dot-" + (currentStep + 1));

    if (currentImage.length && currentBg.length && currentDot.length) {
      if (stepProgress <= 0.2) {
        if (currentStep === totalSteps) {
          // At final step — keep fully visible, no fade-out
          currentImage.css("opacity", 1);
          currentBg.css("opacity", 1);
          currentDot.css("opacity", 1);
        } else {
          currentImage.css("opacity", stepProgress * 5);
          currentBg.css("opacity", stepProgress * 5);

          if (currentStep < 2) {
            currentDot.css("opacity", 1);
          } else {
            currentDot.css("opacity", 0.3 + stepProgress * 3.5);
          }

          if (
            currentStep > 1 &&
            $(".sm-" + (currentStep - 1)).length &&
            $(".bg-" + (currentStep - 1)).length &&
            $(".dot-" + (currentStep - 1)).length
          ) {
            $(".sm-" + (currentStep - 1)).css(
              "opacity",
              Math.max(0, 1 - stepProgress * 5)
            );
            $(".bg-" + (currentStep - 1)).css(
              "opacity",
              Math.max(0, 1 - stepProgress * 5)
            );
            $(".dot-" + (currentStep - 1)).css(
              "opacity",
              Math.max(0.3, 1 - stepProgress * 3.5)
            );
          }
        }
      } else if (stepProgress > 0.2 && stepProgress <= 0.8) {
        currentImage.css("opacity", 1);
        currentBg.css("opacity", 1);
        currentDot.css("opacity", 1);
      } else if (stepProgress > 0.8) {
        if (currentStep === totalSteps) {
          // At final step — keep fully visible, no fade-out
          currentImage.css("opacity", 1);
          currentBg.css("opacity", 1);
          currentDot.css("opacity", 1);
        } else {
          currentImage.css(
            "opacity",
            Math.max(0, 1 - (stepProgress - 0.8) * 5)
          );
          currentBg.css("opacity", Math.max(0, 1 - (stepProgress - 0.8) * 5));
          currentDot.css(
            "opacity",
            Math.max(0.3, 1 - (stepProgress - 0.8) * 3.5)
          );

          if (nextImage.length && nextBg.length && nextDot.length) {
            nextImage.css("opacity", (stepProgress - 0.8) * 5);
            nextBg.css("opacity", (stepProgress - 0.8) * 5);
            nextDot.css("opacity", 0.3 + (stepProgress - 0.8) * 3.5);
          }
        }
      }
    }
  }
});

//Carousel
$(document).ready(function () {
  const $slide = $(".carousel-slide");
  const $footer = $(".footer-section");
  const wrapperWidth = $(".carousel-wrapper").outerWidth();
  let $items = $slide.children();
  let left = 0;
  let animationStarted = false;

  function getScrollSpeed() {
    const width = $(window).width();
    if (width >= 1950) return 2;
    if (width >= 1200) return 1.4;
    if (width >= 768) return 1.2;
    return 0.8;
  }

  let scrollSpeed = getScrollSpeed();

  function fillCarousel() {
    $slide.append($items.clone());
    let currentWidth = $slide.outerWidth(true);
    while (currentWidth < wrapperWidth * 30) {
      $slide.append($items.clone());
      currentWidth = $slide.outerWidth(true);
    }
  }

  function scrollLogos() {
    if (!animationStarted) return;
    left -= scrollSpeed;
    if (Math.abs(left) >= $slide.width() / 2) {
      left = 0;
    }
    $slide.css("left", left + "px");
    requestAnimationFrame(scrollLogos);
  }

  function isFooterInView() {
    const footerTop = $footer.offset().top;
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    return footerTop < scrollTop + windowHeight;
  }

  fillCarousel();

  $(window).on("scroll resize", function () {
    if (!animationStarted && isFooterInView()) {
      animationStarted = true;
      scrollLogos();
    }
  });

  if (isFooterInView() && !animationStarted) {
    animationStarted = true;
    scrollLogos();
  }
});
