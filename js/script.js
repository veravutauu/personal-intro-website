var ANIMAT_DURATION_EACH_SECTION = 600;
var ANIMATED_DURATION = 500;

var didMoveUpToSection = 0

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
      if (direction == 'down') {
        switch (origin.index) {
          case 0:
            willMoveToSection1()
            break;
          case 1:
            willMoveToSection2()
            break;
          default:
            break;
        }
      }
    }
  });
}

function willMoveToSection1() {
  if (didMoveUpToSection >= 1) {
    return
  }
  didMoveUpToSection = 1
  // console.log("Will move to section 1")
  $("#section-1 .need-animate-move-up").each(function (indx, el) {
    animateMoveUpIfNeeded($(el))
  })
}

function willMoveToSection2() {
  if (didMoveUpToSection >= 2) {
    return
  }
  didMoveUpToSection = 2
  // console.log("Will move to section 2")
  $(".need-animate-move-up").each(function (indx, el) {
    $(el).css('transition-duration', '0.5s');
    window.setTimeout(() => {
      console.log('move up ', indx)
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