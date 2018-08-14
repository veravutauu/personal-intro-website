var ANIMAT_DURATION_EACH_SECTION = 600;
var ANIMATED_DURATION = 500;

var visitedSections = new Set();

function setupFullPage() {
  $('#fullpage').fullpage({
    //options here
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    autoScrolling: true,
    scrollHorizontally: true,
    navigation: true,
    navigationPosition: 'right',
    showActiveTooltip: true,
    responsiveWidth: 700,
    onLeave: function (origin, destination, direction) {
      var leavingSection = this;
      console.log('dest', destination.index)
      switch (destination.index) {
        case 2:
          willMoveToSection2()
          break;
        case 1:
          willMoveToSection1()
          break;
        default:
          break;
      }
    }
  });
}

function willMoveToSection1() {
  if (visitedSections.has(1)) {
    return
  }
  visitedSections.add(1)
  // console.log("Will move to section 1")
  $("#section-1 .need-animate-move-up").each(function (indx, el) {
    animateMoveUpIfNeeded($(el))
  })
}

function delay(callback, ms) {
  window.setTimeout(() => {
    callback()
  }, ms);
}

function willMoveToSection2() {
  if (visitedSections.has(2)) {
    return
  }
  visitedSections.add(2)
  // console.log("Will move to section 2")
  $("#section-2 .need-animate-move-up").each(function (indx, el) {
    $(el).css('transition-duration', '0.5s');
    delay(() => {
      animateMoveUpIfNeeded($(el));
    }, indx * 300);
  })
}

function animateMoveUpIfNeeded(el) {
  if (!el.hasClass('did-animate-move-up')) {
    // el.animate({
    //   opacity: "1.0"
    // }, ANIMAT_DURATION_EACH_SECTION)
    el.addClass('did-animate-move-up')
  }
}

function updateOnScroll() {
  let $sections = $(".section")
  $.each($sections, function (indx, _el) {
    var el = $(_el)
    var topDivHeight = el.offset().top;
    var viewPortSize = $(window).height();

    var windowScrollTop = $(window).scrollTop();
    if (windowScrollTop > topDivHeight - viewPortSize + 44) {
      switch (indx) {
        case 1:
          willMoveToSection1()
          break;
        case 2:
          willMoveToSection2()
          break;
        default:
          break;
      }
    }
  })
}

function main() {
  // $(window).scroll(updateOnScroll);
}

$(document).ready(function () {
  setupFullPage()
  main()
});