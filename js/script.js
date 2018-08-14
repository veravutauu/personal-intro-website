var ANIMAT_DURATION_EACH_SECTION = 600;
var ANIMATED_DURATION = 500;

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

      //after leaving section 2
      if (origin.index == 0 && direction == 'down') {
        console.log("0 -> 1!");
        let el = $(".need-animate-move-up")
        animateMoveUpIfNeeded(el)
      } else if (origin.index == 1 && direction == 'up') {
        console.log("1 -> 0!");
      }
    }
  });
}

function animateMoveUpIfNeeded(el) {
  if (!el.hasClass('did-animate-move-up')) {
    el.animate({
      opacity: "1.0"
    }, ANIMAT_DURATION_EACH_SECTION)
    el.addClass('did-animate-move-up')
  }
}

function updateOnScroll() {
  let $sections = $(".need-animate-move-up")
  $.each($sections, function (indx, _el) {
    var el = $(_el)
    var topDivHeight = el.offset().top;
    var viewPortSize = $(window).height();

    var windowScrollTop = $(window).scrollTop();
    if (windowScrollTop > topDivHeight - viewPortSize + 44 &&
      !el.hasClass('did-animate-move-up')) {
      animateMoveUpIfNeeded(el)
    }
  })
}

function main() {
  $(window).scroll(updateOnScroll);
}

$(document).ready(function () {
  setupFullPage()
  main()
});