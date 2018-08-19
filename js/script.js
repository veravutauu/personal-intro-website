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
        case 4:
          willMoveToSection4()
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

function animateWebdevAppearIfNeeded(el, duration, delay_duration) {
  if (!el.hasClass('did-animate-appear')) {
    el.addClass('did-animate-appear')
    el.delay(delay_duration).animate({
      'opacity': 1
    });
  }
}

function willMoveToSection4() {
  if (visitedSections.has(4)) {
    return;
  }
  visitedSections.add(4)
  $('#section-4 .need-animate-appear').each(function (indx, el) {
    animateWebdevAppearIfNeeded($(el), 600, 300 + 500 * indx)
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function prepareGridContainer(gridContainerId, isMobile = false) {
  const gridContainerSelectorId = '#' + gridContainerId
  var container = $(gridContainerSelectorId)

  if (container.length <= 0) {
    console.error('No grid container with selector ' + gridContainerSelectorId + ' found.')
    return
  }
  const ncols = isMobile ? 6 : 8;
  const nrows = isMobile ? 16 : 5;
  const availableWidth = container.width();
  var gridSize = Math.ceil(availableWidth / ncols);
  container.css({
    width: '100%',
    display: 'grid',
    'grid-template-rows': (gridSize + 'px ').repeat(nrows),
    'grid-template-columns': (gridSize + 'px ').repeat(ncols),
    'grid-gap': '0px',
  })
  return container
}

function drawGrid(gridContainerId, baseGridItemClass, isMobile = false) {
  const gridContainerSelectorId = '#' + gridContainerId
  const baseGridItemSelectorClass = '.' + baseGridItemClass

  var container = $(gridContainerSelectorId)

  if (container.length <= 0) {
    console.error('No grid container with selector ' + gridContainerSelectorId + ' found.')
    return
  }

  const ncols = isMobile ? 6 : 8;
  const nrows = isMobile ? 16 : 5;

  const MAX_GRID_SIZE = 160;
  const availableWidth = container.width();
  const availableHeight = $(window).height();
  var gridSize = Math.ceil(availableWidth / ncols);
  // if (gridSize > MAX_GRID_SIZE) {
  //   gridSize = MAX_GRID_SIZE
  //   ncols = Math.ceil(availableWidth / gridSize)
  // }
  // var nrows = style.getPropertyValue('--rows')
  // var nrows = Math.ceil(availableHeight / gridSize)
  var totalN = ncols * nrows

  container.css({
    width: '100%',
    display: 'grid',
    'grid-template-rows': (gridSize + 'px ').repeat(nrows),
    'grid-template-columns': (gridSize + 'px ').repeat(ncols),
    'grid-gap': '0px',
  })

  // Clear all items
  $(baseGridItemSelectorClass).remove();

  const gridLineStyle = '1px solid #ddd'

  for (let i = 0; i < totalN; i++) {
    let cssContent = {
      width: gridSize,
      height: gridSize,
      'min-height': gridSize,
      'border-right': gridLineStyle,
      'border-bottom': gridLineStyle
    }
    // Draw closing border for the first row and frist column.
    if (i < ncols) {
      cssContent['border-top'] = gridLineStyle;
    }
    if (i % ncols == 0) {
      cssContent['border-left'] = gridLineStyle;
    }
    const el = $('<div/>', {
      'class': baseGridItemClass,
      'id': baseGridItemClass + '-' + i,
      'css': cssContent
    })
    el.appendTo(container)
  }
}

var resizeTimeout;
var throttlePeriod = 200;
var currentlyMobile = true;

function main() {
  // $(window).scroll(onScroll);
  $(window).resize(function () {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        const isMobile = $(window).width() <= 700
        drawGrid('grid-section-container', 'base-grid-item', isMobile);
        prepareGridContainer('inner-grid', isMobile)
        if (isMobile != currentlyMobile) {
          arrangeImagesInGrid('inner-grid', isMobile, true)
        }
        // arrangeImagesInGrid('inner-grid', isMobile, true)
        // arrangeImagesInGrid('inner-grid')
        resizeTimeout = null;
        currentlyMobile = isMobile
      }, throttlePeriod)
    }
  });
}

function arrangeImagesInGrid(gridContainerId, isMobile = false, clear = false) {
  const gridContainerSelectorId = '#' + gridContainerId
  const container = $(gridContainerSelectorId)
  const nimgs = 8
  let imageLayouts;
  if (isMobile) {
    imageLayouts = Array.from(new Array(nimgs), (_, k) => k + 1).map(i => {
      // 1 3 3 5 5 7
      const r0 = 2 * i - 1
      const r1 = 2 * i + 1
      if (i % 2 == 0) {
        // left
        return [r0, r1, 2, 4]
      } else {
        // right
        return [r0, r1, 4, 6]
      }
    }).map(nums => nums.map(String))
  } else {
    imageLayouts = [
      [1, 3, 2, 4],
      [1, 2, 6, 7],
      [2, 3, 8, 9],
      [3, 4, 4, 5],
      [3, 4, 7, 8],
      [5, 6, 3, 4],
      [5, 6, 5, 6],
      [4, 6, 7, 9]
    ].map(nums => nums.map(String))
  }

  if (clear) {
    $('.inner-base-grid-item').remove();
  }

  for (let ind = 0; ind < nimgs; ind++) {
    const layout = imageLayouts[ind]
    let r0, r1, c0, c1;
    [r0, r1, c0, c1] = layout
    const element = $('<div/>', {
      'id': 'grid-image-item-' + ind,
      'class': 'inner-base-grid-item',
      'css': {
        'grid-row-start': r0,
        'grid-row-end': r1,
        'grid-column-start': c0,
        'grid-column-end': c1,
        'background-color': 'green',
      }
    })

    element.append($('<img>', {
      src: '/img/grid-imgs/grid-img-' + ind + '.png',
      alt: 'grid-img-' + ind
    }))

    element.appendTo(container)
  }

  const totalN = 40;
  for (let ind = 0; ind < totalN - nimgs; ind++) {
    const el = $('<div/>', {
      'class': 'inner-base-grid-item',
      'css': {

      }
    })

    el.appendTo(container)
  }
}


$(document).ready(function () {
  setupFullPage()
  const isMobile = $(window).width() <= 700
  currentlyMobile = isMobile
  drawGrid('grid-section-container', 'base-grid-item', isMobile);
  prepareGridContainer('inner-grid', isMobile)
  arrangeImagesInGrid('inner-grid', isMobile)
  main()
});