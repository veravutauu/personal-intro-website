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
      switch (destination.index) {
        case 1:
          willMoveToSection1()
          break
        case 2:
          willMoveToSection2()
          break
        case 3:
          willMoveToSection3()
          break
        default:
          break
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

function willMoveToSection3() {
  if (visitedSections.has(3)) {
    return;
  }
  visitedSections.add(3)

  $("#section-3 .need-animate-flight-ticket").each(function (indx, el) {
    animateFlightTicketIfNeeded($(el))
  })
}

function animateFlightTicketIfNeeded(el) {
  if (!el.hasClass('did-animate-flight-ticket')) {
    // Animate moving flight ticket into screen
    el.addClass('did-animate-flight-ticket')

    // Animate wiggling
    delay(function () {
      el.addClass('wiggle-infinitely')
    }, 1200)
  }
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function updateGrid(gridContainerId, baseGridItemClass) {
  const gridContainerSelectorId = '#' + gridContainerId
  const baseGridItemSelectorClass = '.' + baseGridItemClass

  var container = $(gridContainerSelectorId)

  if (container.length <= 0) {
    console.error('No grid container with selector ' + gridContainerSelectorId + ' found.')
    return
  }

  var ncols = 7;
  // var gridSize = style.getPropertyValue('--gridSize')
  var gridSize = Math.ceil($(window).width() / ncols)
  const MAX_GRID_SIZE = 100
  if (gridSize > MAX_GRID_SIZE) {
    gridSize = MAX_GRID_SIZE
    ncols = Math.ceil($(window).width() / gridSize)
  }
  // var nrows = style.getPropertyValue('--rows')
  var nrows = Math.ceil($(window).height() / gridSize)
  var totalN = ncols * nrows

  container.css({
    width: '100vw',
    display: 'grid',
    'grid-template-rows': (gridSize + 'px ').repeat(nrows),
    'grid-template-columns': (gridSize + 'px ').repeat(ncols),
    'grid-gap': '0px',
    overflow: 'hidden',
  })

  // Clear all items
  $(baseGridItemSelectorClass).remove();

  for (let i = 0; i < totalN; i++) {
    let cssContent = {
      width: gridSize,
      height: gridSize,
      'min-height': gridSize,
    }
    if (i < ncols) {
      cssContent['border-top'] = '1px dashed #000000';
    }
    if (i % ncols == 0) {
      cssContent['border-left'] = '1px dashed #000000';
    }
    const el = $('<div/>', {
      'class': baseGridItemClass,
      'id': baseGridItemClass + '-' + i,
      'css': cssContent
    })
    // el.hover(function () {
    //   $(this).css('background-color', getRandomColor())
    // }, function () {
    //   $(this).css('background-color', 'transparent');
    // })
    el.appendTo(container)
  }
}

var resizeTimeout;
var throttlePeriod = 500;

function main() {
  // $(window).scroll(onScroll);
  $(window).resize(function () {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        updateGrid('grid-section-container', 'base-grid-item');
        updateGrid('inner-grid', 'inner-base-grid-item');
        resizeTimeout = null;
      }, throttlePeriod)
    }
  });
}


$(document).ready(function () {
  setupFullPage()
  updateGrid('grid-section-container', 'base-grid-item');
  updateGrid('inner-grid', 'inner-base-grid-item');
  main()
});