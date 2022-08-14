/**
 * Bundle of: vue3-dndrop
 * Generated: 2022-08-14
 * Version: 0.0.3
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vue3Dndrop = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

  var containerInstance = 'dndrop-container-instance';
  var wrapperClass = 'dndrop-draggable-wrapper';
  var animationClass = 'animated';
  var translationValue = '__dndrop_draggable_translation_value';
  var visibilityValue = '__dndrop_draggable_visibility_value';
  var ghostClass = 'dndrop-ghost';

  var containerClass = 'dndrop-container';

  var extraSizeForInsertion = 'dndrop-extra-size-for-insertion';
  var stretcherElementClass = 'dndrop-stretcher-element';
  var stretcherElementInstance = 'dndrop-stretcher-instance';

  var disableTouchActions = 'dndrop-disable-touch-action';
  var noUserSelectClass = 'dndrop-no-user-select';

  var preventAutoScrollClass = 'dndrop-prevent-auto-scroll-class';

  var dropPlaceholderDefaultClass = 'dndrop-drop-preview-default-class';
  var dropPlaceholderInnerClass = 'dndrop-drop-preview-inner-class';
  var dropPlaceholderWrapperClass = 'dndrop-drop-preview-constant-class';
  var dropPlaceholderFlexContainerClass = 'dndrop-drop-preview-flex-container-class';

  var defaultOptions = {
    groupName: undefined,
    behaviour: 'move', // move | copy
    orientation: 'vertical', // vertical | horizontal
    getChildPayload: undefined,
    animationDuration: 250,
    autoScrollEnabled: true,
    shouldAcceptDrop: undefined,
    shouldAnimateDrop: undefined,
  };

  var removeChildAt = function (parent, index) {
    return parent.removeChild(parent.children[index]);
  };

  var addChildAt = function (parent, child, index) {
    if (index >= parent.children.length) {
      parent.appendChild(child);
    } else {
      parent.insertBefore(child, parent.children[index]);
    }
  };

  function domDropHandler (ref) {
    ref.element;
    var draggables = ref.draggables;

    return function (dropResult, onDrop) {
      var removedIndex = dropResult.removedIndex;
      var addedIndex = dropResult.addedIndex;
      var element = dropResult.element;
      var removedWrapper = null;
      if (removedIndex !== null) {
        removedWrapper = removeChildAt(element, removedIndex);
        draggables.splice(removedIndex, 1);
      }

      if (addedIndex !== null) {
        var wrapper = window.document.createElement('div');
        wrapper.className = 'dndrop-draggable-wrapper';
        wrapper.appendChild(
          removedWrapper && removedWrapper.firstElementChild
            ? removedWrapper.firstElementChild
            : element
        );
        addChildAt(element, wrapper, addedIndex);
        if (addedIndex >= draggables.length) {
          draggables.push(wrapper);
        } else {
          draggables.splice(addedIndex, 0, wrapper);
        }
      }

      if (onDrop) {
        onDrop(dropResult);
      }
    };
  }

  function reactDropHandler () {
    var handler = function () {
      return function (dropResult, onDrop) {
        if (onDrop) {
          onDrop(dropResult);
        }
      };
    };

    return {
      handler: handler,
    };
  }

  /* eslint-disable no-useless-call */
  var getIntersection = function (rect1, rect2) {
    return {
      left: Math.max(rect1.left, rect2.left),
      top: Math.max(rect1.top, rect2.top),
      right: Math.min(rect1.right, rect2.right),
      bottom: Math.min(rect1.bottom, rect2.bottom),
    };
  };

  var ScrollAxis$1 = {
    x: 'x',
    y: 'y',
    xy: 'xy'
  };

  var getIntersectionOnAxis = function (rect1, rect2, axis) {
    if (axis === 'x') {
      return {
        left: Math.max(rect1.left, rect2.left),
        top: rect1.top,
        right: Math.min(rect1.right, rect2.right),
        bottom: rect1.bottom,
      };
    } else {
      return {
        left: rect1.left,
        top: Math.max(rect1.top, rect2.top),
        right: rect1.right,
        bottom: Math.min(rect1.bottom, rect2.bottom),
      };
    }
  };
  var getContainerRect = function (element) {
    var _rect = element.getBoundingClientRect();
    var rect = {
      left: _rect.left,
      right: _rect.right,
      top: _rect.top,
      bottom: _rect.bottom,
    };
    if (hasBiggerChild(element, 'x') && !isScrollingOrHidden(element, 'x')) {
      var width = rect.right - rect.left;
      rect.right = rect.right + element.scrollWidth - width;
    }
    if (hasBiggerChild(element, 'y') && !isScrollingOrHidden(element, 'y')) {
      var height = rect.bottom - rect.top;
      rect.bottom = rect.bottom + element.scrollHeight - height;
    }
    return rect;
  };
  var getScrollingAxis = function (element) {
    var style = window.getComputedStyle(element);
    var overflow = style.overflow;
    var general = overflow === 'auto' || overflow === 'scroll';
    if (general) { return ScrollAxis$1.xy; }
    var overFlowX = style['overflow-x'];
    var xScroll = overFlowX === 'auto' || overFlowX === 'scroll';
    var overFlowY = style['overflow-y'];
    var yScroll = overFlowY === 'auto' || overFlowY === 'scroll';
    if (xScroll && yScroll) { return ScrollAxis$1.xy; }
    if (xScroll) { return ScrollAxis$1.x; }
    if (yScroll) { return ScrollAxis$1.y; }
    return null;
  };
  var isScrolling = function (element, axis) {
    var style = window.getComputedStyle(element);
    var overflow = style.overflow;
    var overFlowAxis = style[("overflow-" + axis)];
    var general = overflow === 'auto' || overflow === 'scroll';
    var dimensionScroll = overFlowAxis === 'auto' || overFlowAxis === 'scroll';
    return general || dimensionScroll;
  };
  var isScrollingOrHidden = function (element, axis) {
    var style = window.getComputedStyle(element);
    var overflow = style.overflow;
    var overFlowAxis = style[("overflow-" + axis)];
    var general = overflow === 'auto' || overflow === 'scroll' || overflow === 'hidden';
    var dimensionScroll = overFlowAxis === 'auto' || overFlowAxis === 'scroll' || overFlowAxis === 'hidden';
    return general || dimensionScroll;
  };
  var hasBiggerChild = function (element, axis) {
    if (axis === 'x') {
      return element.scrollWidth > element.clientWidth;
    } else {
      return element.scrollHeight > element.clientHeight;
    }
  };
  var getVisibleRect = function (element, elementRect) {
    var currentElement = element;
    var rect = elementRect || getContainerRect(element);
    currentElement = element.parentElement;
    while (currentElement) {
      if (hasBiggerChild(currentElement, 'x') && isScrollingOrHidden(currentElement, 'x')) {
        rect = getIntersectionOnAxis(rect, currentElement.getBoundingClientRect(), 'x');
      }
      if (hasBiggerChild(currentElement, 'y') && isScrollingOrHidden(currentElement, 'y')) {
        rect = getIntersectionOnAxis(rect, currentElement.getBoundingClientRect(), 'y');
      }
      currentElement = currentElement.parentElement;
    }
    return rect;
  };
  var getParentRelevantContainerElement = function (element, relevantContainers) {
    var current = element;
    while (current) {
      if (current[containerInstance]) {
        var container = current[containerInstance];
        if (relevantContainers.some(function (p) { return p === container; })) {
          return container;
        }
      }
      current = current.parentElement;
    }
    return null;
  };
  var listenScrollParent = function (element, clb) {
    var scrollers = [];
    setScrollers();
    function setScrollers () {
      var currentElement = element;
      while (currentElement) {
        if (isScrolling(currentElement, 'x') || isScrolling(currentElement, 'y')) {
          scrollers.push(currentElement);
        }
        currentElement = currentElement.parentElement;
      }
    }
    function dispose () {
      stop();
      scrollers = null;
    }
    function start () {
      if (scrollers) {
        scrollers.forEach(function (p) { return p.addEventListener('scroll', clb); });
        window.addEventListener('scroll', clb);
      }
    }
    function stop () {
      if (scrollers) {
        scrollers.forEach(function (p) { return p.removeEventListener('scroll', clb); });
        window.removeEventListener('scroll', clb);
      }
    }
    return {
      dispose: dispose,
      start: start,
      stop: stop
    };
  };
  var getParent = function (element, selector) {
    var current = element;
    while (current) {
      if (current.matches(selector)) {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  };
  var hasClass = function (element, cls) {
    return (element.className
      .split(' ')
      .map(function (p) { return p; })
      .indexOf(cls) > -1);
  };
  var addClass = function (element, cls) {
    if (element) {
      var classes = element.className.split(' ').filter(function (p) { return p; });
      if (classes.indexOf(cls) === -1) {
        classes.unshift(cls);
        element.className = classes.join(' ');
      }
    }
  };
  var removeClass = function (element, cls) {
    if (element) {
      var classes = element.className.split(' ').filter(function (p) { return p && p !== cls; });
      element.className = classes.join(' ');
    }
  };
  var debounce = function (fn, delay, immediate) {
    var timer = null;
    return function () {
      var params = [], len = arguments.length;
      while ( len-- ) params[ len ] = arguments[ len ];

      if (timer) {
        clearTimeout(timer);
      }
      if (immediate && !timer) {
        fn.call.apply(fn, [ null ].concat( params ));
      } else {
        timer = setTimeout(function () {
          timer = null;
          fn.call.apply(fn, [ null ].concat( params ));
        }, delay);
      }
    };
  };
  var isMobile$1 = function () {
    if (typeof window !== 'undefined') {
      if (window.navigator.userAgent.match(/Android/i) ||
              window.navigator.userAgent.match(/webOS/i) ||
              window.navigator.userAgent.match(/iPhone/i) ||
              window.navigator.userAgent.match(/iPad/i) ||
              window.navigator.userAgent.match(/iPod/i) ||
              window.navigator.userAgent.match(/BlackBerry/i) ||
              window.navigator.userAgent.match(/Windows Phone/i)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
  var clearSelection = function () {
    if (window.getSelection) {
      // @ts-ignore: Object is possibly 'null'.
      if (window.getSelection().empty) {
        // Chrome
        // @ts-ignore: Object is possibly 'null'.
        window.getSelection().empty();
        // @ts-ignore: Object is possibly 'null'.
      } else if (window.getSelection().removeAllRanges) {
        // Firefox
        // @ts-ignore: Object is possibly 'null'.
        window.getSelection().removeAllRanges();
      }
    } else if (window.document.selection) {
      // IE?
      window.document.selection.empty();
    }
  };
  var getElementCursor = function (element) {
    if (element) {
      var style = window.getComputedStyle(element);
      if (style) {
        return style.cursor;
      }
    }
    return null;
  };
  function isVisible (rect) {
    return !(rect.bottom <= rect.top || rect.right <= rect.left);
  }

  /* eslint-disable no-undef */
  var horizontalMap = {
    size: 'offsetWidth',
    distanceToParent: 'offsetLeft',
    translate: 'transform',
    begin: 'left',
    end: 'right',
    dragPosition: 'x',
    scrollSize: 'scrollWidth',
    offsetSize: 'offsetWidth',
    scrollValue: 'scrollLeft',
    scale: 'scaleX',
    setSize: 'width',
    setters: {
      translate: function (val) { return ("translate3d(" + val + "px, 0, 0)"); }
    }
  };
  var verticalMap = {
    size: 'offsetHeight',
    distanceToParent: 'offsetTop',
    translate: 'transform',
    begin: 'top',
    end: 'bottom',
    dragPosition: 'y',
    scrollSize: 'scrollHeight',
    offsetSize: 'offsetHeight',
    scrollValue: 'scrollTop',
    scale: 'scaleY',
    setSize: 'height',
    setters: {
      translate: function (val) { return ("translate3d(0," + val + "px, 0)"); }
    }
  };
  function orientationDependentProps (map) {
    function get (obj, prop) {
      var mappedProp = map[prop];
      return obj[mappedProp || prop];
    }
    function set (obj, prop, value) {
      obj[map[prop]] = map.setters[prop] ? map.setters[prop](value) : value;
    }
    return { get: get, set: set };
  }
  function layoutManager (containerElement, orientation, _animationDuration) {
    containerElement[extraSizeForInsertion] = 0;
    var map = orientation === 'horizontal' ? horizontalMap : verticalMap;
    var propMapper = orientationDependentProps(map);
    var values = {
      translation: 0
    };
    window.addEventListener('resize', function () {
      invalidateContainerRectangles(containerElement);
    });
    setTimeout(function () {
      invalidate();
    }, 10);
    function invalidate () {
      invalidateContainerRectangles(containerElement);
      invalidateContainerScale(containerElement);
    }
    function invalidateContainerRectangles (containerElement) {
      values.rect = getContainerRect(containerElement);
      var visibleRect = getVisibleRect(containerElement, values.rect);
      if (isVisible(visibleRect)) {
        values.lastVisibleRect = values.visibleRect;
      }
      values.visibleRect = visibleRect;
    }
    function invalidateContainerScale (containerElement) {
      var rect = containerElement.getBoundingClientRect();
      values.scaleX = containerElement.offsetWidth ? ((rect.right - rect.left) / containerElement.offsetWidth) : 1;
      values.scaleY = containerElement.offsetHeight ? ((rect.bottom - rect.top) / containerElement.offsetHeight) : 1;
    }
    function getContainerRectangles () {
      return {
        rect: values.rect,
        visibleRect: values.visibleRect,
        lastVisibleRect: values.lastVisibleRect
      };
    }
    function getBeginEndOfDOMRect (rect) {
      return {
        begin: propMapper.get(rect, 'begin'),
        end: propMapper.get(rect, 'end')
      };
    }
    function getBeginEndOfContainer () {
      var begin = propMapper.get(values.rect, 'begin') + values.translation;
      var end = propMapper.get(values.rect, 'end') + values.translation;
      return { begin: begin, end: end };
    }
    function getBeginEndOfContainerVisibleRect () {
      var begin = propMapper.get(values.visibleRect, 'begin') + values.translation;
      var end = propMapper.get(values.visibleRect, 'end') + values.translation;
      return { begin: begin, end: end };
    }
    function getSize (element) {
      var htmlElement = element;
      if (htmlElement.tagName) {
        var rect = htmlElement.getBoundingClientRect();
        return orientation === 'vertical' ? rect.bottom - rect.top : rect.right - rect.left;
      }
      return propMapper.get(element, 'size') * propMapper.get(values, 'scale');
    }
    function getDistanceToOffsetParent (element) {
      var distance = propMapper.get(element, 'distanceToParent') + (element[translationValue] || 0);
      return distance * propMapper.get(values, 'scale');
    }
    function getBeginEnd (element) {
      var begin = getDistanceToOffsetParent(element) + (propMapper.get(values.rect, 'begin') + values.translation) - propMapper.get(containerElement, 'scrollValue');
      return {
        begin: begin,
        end: begin + getSize(element) * propMapper.get(values, 'scale')
      };
    }
    function setSize (element, size) {
      propMapper.set(element, 'setSize', size);
    }
    function getAxisValue (position) {
      return propMapper.get(position, 'dragPosition');
    }
    function setTranslation (element, translation) {
      if (!translation) {
        element.style.removeProperty('transform');
      } else {
        propMapper.set(element.style, 'translate', translation);
      }
      element[translationValue] = translation;
    }
    function getTranslation (element) {
      return element[translationValue];
    }
    function setVisibility (element, isVisible) {
      if (element[visibilityValue] === undefined || element[visibilityValue] !== isVisible) {
        if (isVisible) {
          element.style.removeProperty('visibility');
        } else {
          element.style.visibility = 'hidden';
        }
        element[visibilityValue] = isVisible;
      }
    }
    function isVisible$1 (element) {
      return element[visibilityValue] === undefined || element[visibilityValue];
    }
    function isInVisibleRect (x, y) {
      var ref = values.visibleRect;
      var left = ref.left;
      var top = ref.top;
      var right = ref.right;
      var bottom = ref.bottom;
      // if there is no wrapper in rect size will be 0 and wont accept any drop
      // so make sure at least there is 30px difference
      if (bottom - top < 2) {
        bottom = top + 30;
      }
      var containerRect = values.rect;
      if (orientation === 'vertical') {
        return x > containerRect.left && x < containerRect.right && y > top && y < bottom;
      } else {
        return x > left && x < right && y > containerRect.top && y < containerRect.bottom;
      }
    }
    function getTopLeftOfElementBegin (begin) {
      var top = 0;
      var left = 0;
      if (orientation === 'horizontal') {
        left = begin;
        top = values.rect.top;
      } else {
        left = values.rect.left;
        top = begin;
      }
      return {
        top: top, left: left
      };
    }
    function getScrollSize (element) {
      return propMapper.get(element, 'scrollSize');
    }
    function getScrollValue (element) {
      return propMapper.get(element, 'scrollValue');
    }
    function setScrollValue (element, val) {
      return propMapper.set(element, 'scrollValue', val);
    }
    function getPosition (position) {
      return getAxisValue(position);
    }
    function invalidateRects () {
      invalidateContainerRectangles(containerElement);
    }
    function setBegin (style, value) {
      propMapper.set(style, 'begin', value);
    }
    return {
      getSize: getSize,
      getContainerRectangles: getContainerRectangles,
      getBeginEndOfDOMRect: getBeginEndOfDOMRect,
      getBeginEndOfContainer: getBeginEndOfContainer,
      getBeginEndOfContainerVisibleRect: getBeginEndOfContainerVisibleRect,
      getBeginEnd: getBeginEnd,
      getAxisValue: getAxisValue,
      setTranslation: setTranslation,
      getTranslation: getTranslation,
      setVisibility: setVisibility,
      isVisible: isVisible$1,
      isInVisibleRect: isInVisibleRect,
      setSize: setSize,
      getTopLeftOfElementBegin: getTopLeftOfElementBegin,
      getScrollSize: getScrollSize,
      getScrollValue: getScrollValue,
      setScrollValue: setScrollValue,
      invalidate: invalidate,
      invalidateRects: invalidateRects,
      getPosition: getPosition,
      setBegin: setBegin,
    };
  }

  /* eslint-disable no-lone-blocks */
  var maxSpeed = 1500; // px/s

  var ScrollAxis = {
    x: 'x',
    y: 'y',
    xy: 'xy'
  };
  function getScrollParams (position, axis, rect) {
    var left = rect.left;
    var right = rect.right;
    var top = rect.top;
    var bottom = rect.bottom;
    var x = position.x;
    var y = position.y;
    if (x < left || x > right || y < top || y > bottom) {
      return null;
    }
    var begin;
    var end;
    var pos;
    if (axis === 'x') {
      begin = left;
      end = right;
      pos = x;
    } else {
      begin = top;
      end = bottom;
      pos = y;
    }
    var scrollerSize = end - begin;
    var moveDistance = scrollerSize > 400 ? 100 : scrollerSize / 4;
    if (end - pos < moveDistance) {
      return {
        direction: 'end',
        speedFactor: (moveDistance - (end - pos)) / moveDistance
      };
    } else if (pos - begin < moveDistance) {
      return {
        direction: 'begin',
        speedFactor: (moveDistance - (pos - begin)) / moveDistance
      };
    }
    return null;
  }
  function addScrollValue (element, axis, value) {
    if (element) {
      if (element !== window) {
        if (axis === 'x') {
          element.scrollLeft += value;
        } else {
          element.scrollTop += value;
        }
      } else {
        if (axis === 'x') {
          element.scrollBy(value, 0);
        } else {
          element.scrollBy(0, value);
        }
      }
    }
  }
  var createAnimator = function (element, axis) {
    if ( axis === void 0 ) axis = 'y';

    var request = null;
    var startTime = null;
    var direction = null;
    var speed = null;
    function animate (_direction, _speed) {
      direction = _direction;
      speed = _speed;
      start();
    }
    function start () {
      if (request === null) {
        request = requestAnimationFrame(function (timestamp) {
          if (startTime === null) {
            startTime = timestamp;
          }
          var timeDiff = timestamp - startTime;
          startTime = timestamp;
          var distanceDiff = (timeDiff / 1000) * speed;
          distanceDiff = direction === 'begin' ? (0 - distanceDiff) : distanceDiff;
          addScrollValue(element, axis, distanceDiff);
          request = null;
          start();
        });
      }
    }
    function stop () {
      if (request !== null) {
        cancelAnimationFrame(request);
        request = null;
      }
      startTime = null;
    }
    return {
      animate: animate,
      stop: stop
    };
  };
  function rectangleGetter (element) {
    return function () {
      return getVisibleRect(element, element.getBoundingClientRect());
    };
  }
  function getScrollerAnimator (container) {
    var scrollerAnimators = [];
    var current = container.element;
    while (current) {
      var scrollingAxis = getScrollingAxis(current);
      if (scrollingAxis && !hasClass(current, preventAutoScrollClass)) {
        var axisAnimations = {};
        switch (scrollingAxis) {
          case ScrollAxis.xy:
            {
              axisAnimations.x = {
                animator: createAnimator(current, 'x'),
              };
              axisAnimations.y = {
                animator: createAnimator(current, 'y'),
              };
            }
            break;
          case ScrollAxis.x:
            {
              axisAnimations.x = {
                animator: createAnimator(current, 'x'),
              };
            }
            break;
          case ScrollAxis.y:
            {
              axisAnimations.y = {
                animator: createAnimator(current, 'y'),
              };
            }
            break;
        }
        scrollerAnimators.push({
          axisAnimations: axisAnimations,
          getRect: rectangleGetter(current),
          scrollerElement: current,
        });
      }
      current = current.parentElement;
    }
    return scrollerAnimators;
  }
  function setScrollParams (animatorInfos, position) {
    animatorInfos.forEach(function (animator) {
      var axisAnimations = animator.axisAnimations;
      var getRect = animator.getRect;
      var rect = getRect();
      if (axisAnimations.x) {
        axisAnimations.x.scrollParams = getScrollParams(position, 'x', rect);
        animator.cachedRect = rect;
      }
      if (axisAnimations.y) {
        axisAnimations.y.scrollParams = getScrollParams(position, 'y', rect);
        animator.cachedRect = rect;
      }
    });
  }
  function getTopmostScrollAnimator (animatorInfos, position) {
    var current = document.elementFromPoint(position.x, position.y);
    while (current) {
      var scrollAnimator = animatorInfos.find(function (p) { return p.scrollerElement === current; });
      if (scrollAnimator) {
        return scrollAnimator;
      }
      current = current.parentElement;
    }
    return null;
  }
  function dragScroller (containers, maxScrollSpeed) {
    if ( maxScrollSpeed === void 0 ) maxScrollSpeed = maxSpeed;

    var animatorInfos = containers.reduce(function (acc, container) {
      var filteredAnimators = getScrollerAnimator(container).filter(function (p) {
        return !acc.find(function (q) { return q.scrollerElement === p.scrollerElement; });
      });
      return acc.concat( filteredAnimators);
    }, []);
    return function (ref) {
      var draggableInfo = ref.draggableInfo;
      var reset = ref.reset;

      if (reset) {
        animatorInfos.forEach(function (p) {
          p.axisAnimations.x && p.axisAnimations.x.animator.stop();
          p.axisAnimations.y && p.axisAnimations.y.animator.stop();
        });
        return;
      }
      if (draggableInfo) {
        setScrollParams(animatorInfos, draggableInfo.mousePosition);
        animatorInfos.forEach(function (animator) {
          var ref = animator.axisAnimations;
          var x = ref.x;
          var y = ref.y;
          if (x) {
            if (x.scrollParams) {
              var ref$1 = x.scrollParams;
              var direction = ref$1.direction;
              var speedFactor = ref$1.speedFactor;
              x.animator.animate(direction, speedFactor * maxScrollSpeed);
            } else {
              x.animator.stop();
            }
          }
          if (y) {
            if (y.scrollParams) {
              var ref$2 = y.scrollParams;
              var direction$1 = ref$2.direction;
              var speedFactor$1 = ref$2.speedFactor;
              y.animator.animate(direction$1, speedFactor$1 * maxScrollSpeed);
            } else {
              y.animator.stop();
            }
          }
        });
        var overlappingAnimators = animatorInfos.filter(function (p) { return p.cachedRect; });
        if (overlappingAnimators.length && overlappingAnimators.length > 1) {
          // stop animations except topmost
          var topScrollerAnimator = getTopmostScrollAnimator(overlappingAnimators, draggableInfo.mousePosition);
          if (topScrollerAnimator) {
            overlappingAnimators.forEach(function (p) {
              if (p !== topScrollerAnimator) {
                p.axisAnimations.x && p.axisAnimations.x.animator.stop();
                p.axisAnimations.y && p.axisAnimations.y.animator.stop();
              }
            });
          }
        }
      }
    };
  }

  /* eslint-disable no-void */
  /* eslint-disable no-empty */
  /* eslint-disable no-extend-native */
  function applyPolyfills () {
    (function (constructor) {
      if (constructor && constructor.prototype && !constructor.prototype.matches) {
        constructor.prototype.matches =
                  constructor.prototype.matchesSelector ||
                      constructor.prototype.mozMatchesSelector ||
                      constructor.prototype.msMatchesSelector ||
                      constructor.prototype.oMatchesSelector ||
                      constructor.prototype.webkitMatchesSelector ||
                      function (s) {
                        var matches = (this.document || this.ownerDocument).querySelectorAll(s); var i = matches.length;
                        while (--i >= 0 && matches.item(i) !== this) { }
                        return i > -1;
                      };
      }
    })(Element);
    // Production steps of ECMA-262, Edition 5, 15.4.4.17
    // Reference: http://es5.github.io/#x15.4.4.17
    if (!Array.prototype.some) {
      Array.prototype.some = function (fun /*, thisArg */) {
        if (this == null) {
          throw new TypeError('Array.prototype.some called on null or undefined');
        }
        if (typeof fun !== 'function') {
          throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
          if (i in t && fun.call(thisArg, t[i], i, t)) {
            return true;
          }
        }
        return false;
      };
    }
  }
  if (typeof window !== 'undefined') {
    applyPolyfills();
  }

  var verticalWrapperClass = {
    overflow: 'hidden',
    display: 'block'
  };
  var horizontalWrapperClass = {
    height: '100%',
    display: 'table-cell',
    'vertical-align': 'top',
  };
  var stretcherElementHorizontalClass = {
    display: 'inline-block'
  };
  var css = {};
  css[("." + containerClass)] = {
      position: 'relative',
      'min-height': '30px',
      'min-width': '30px'
    };
  css[("." + containerClass + ".horizontal")] = {
      display: 'table',
    };
  css[("." + containerClass + ".horizontal > ." + stretcherElementClass)] = stretcherElementHorizontalClass;
  css[("." + containerClass + ".horizontal > ." + wrapperClass)] = horizontalWrapperClass;
  css[("." + containerClass + ".vertical > ." + wrapperClass)] = verticalWrapperClass;
  css[("." + wrapperClass)] = {
      'box-sizing': 'border-box'
    };
  css[("." + wrapperClass + ".horizontal")] = horizontalWrapperClass;
  css[("." + wrapperClass + ".vertical")] = verticalWrapperClass;
  css[("." + wrapperClass + ".animated")] = {
      transition: 'transform ease',
    };
  css[("." + ghostClass)] = {
      'box-sizing': 'border-box',
      // 'background-color': 'transparent',
      // '-webkit-font-smoothing': 'subpixel-antialiased'
    };
  css[("." + ghostClass + ".animated")] = {
      transition: 'all ease-in-out'
    };
  css[("." + ghostClass + " *")] = {
      'pointer-events': 'none'
    };
  css[("." + disableTouchActions + " *")] = {
      'touch-action': 'none',
      '-ms-touch-action': 'none'
    };
  css[("." + noUserSelectClass)] = {
      '-webkit-touch-callout': 'none',
      '-webkit-user-select': 'none',
      '-khtml-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      'user-select': 'none'
    };
  css[("." + dropPlaceholderInnerClass)] = {
      flex: '1'
    };
  css[("." + containerClass + ".horizontal > ." + dropPlaceholderWrapperClass)] = {
      height: '100%',
      overflow: 'hidden',
      display: 'table-cell',
      'vertical-align': 'top',
    };
  css[("." + containerClass + ".vertical > ." + dropPlaceholderWrapperClass)] = {
      overflow: 'hidden',
      display: 'block',
      width: '100%',
    };
  css[("." + dropPlaceholderFlexContainerClass)] = {
      width: '100%',
      height: '100%',
      display: 'flex',
      'justify-content': 'stretch',
      'align-items': 'stretch'
    };
  css[("." + dropPlaceholderDefaultClass)] = {
      'background-color': 'rgba(150, 150, 150, 0.1)',
      border: '1px solid #ccc',
    };
  function convertToCssString (css) {
    return Object.keys(css).reduce(function (styleString, propName) {
      var propValue = css[propName];
      if (typeof (propValue) === 'object') {
        return ("" + styleString + propName + "{" + (convertToCssString(propValue)) + "}");
      }
      return ("" + styleString + propName + ":" + propValue + ";");
    }, '');
  }
  function addStyleToHead () {
    if (typeof (window) !== 'undefined') {
      var head = window.document.head || window.document.getElementsByTagName('head')[0];
      var style = window.document.createElement('style');
      style.id = 'dndrop-style-definitions';
      var cssString = convertToCssString(css);
      style.type = 'text/css';
      if (style.styleSheet) {
        style.styleSheet.cssText = cssString;
      } else {
        style.appendChild(window.document.createTextNode(cssString));
      }
      head.appendChild(style);
    }
  }
  function addCursorStyleToBody (cursor) {
    if (cursor && typeof (window) !== 'undefined') {
      var head = window.document.head || window.document.getElementsByTagName('head')[0];
      var style = window.document.createElement('style');
      var cssString = convertToCssString({
        'body *': {
          cursor: (cursor + " !important")
        }
      });
      style.type = 'text/css';
      if (style.styleSheet) {
        style.styleSheet.cssText = cssString;
      } else {
        style.appendChild(window.document.createTextNode(cssString));
      }
      head.appendChild(style);
      return style;
    }
    return null;
  }
  function removeStyle (styleElement) {
    if (styleElement && typeof (window) !== 'undefined') {
      var head = window.document.head || window.document.getElementsByTagName('head')[0];
      head.removeChild(styleElement);
    }
  }

  var grabEvents = ['mousedown', 'touchstart'];
  var moveEvents = ['mousemove', 'touchmove'];
  var releaseEvents = ['mouseup', 'touchend'];
  var dragListeningContainers = null;
  var grabbedElement = null;
  var ghostInfo = null;
  var draggableInfo = null;
  var containers = [];
  var isDragging = false;
  var isCanceling = false;
  var dropAnimationStarted = false;
  var missedDrag = false;
  var handleDrag = null;
  var handleScroll = null;
  var sourceContainerLockAxis = null;
  var cursorStyleElement = null;
  var containerRectableWatcher = watchRectangles();
  var isMobile = isMobile$1();
  function addGrabListeners () {
    grabEvents.forEach(function (e) {
      window.document.addEventListener(e, onMouseDown, { passive: false });
    });
  }

  function removeGrabListeners () {
    grabEvents.forEach(function (e) {
      window.document.removeEventListener(e, onMouseDown, { passive: false });
    });
  }
  function addMoveListeners () {
    moveEvents.forEach(function (e) {
      window.document.addEventListener(e, onMouseMove, { passive: false });
    });
  }
  function removeMoveListeners () {
    moveEvents.forEach(function (e) {
      window.document.removeEventListener(e, onMouseMove, { passive: false });
    });
  }
  function addReleaseListeners () {
    releaseEvents.forEach(function (e) {
      window.document.addEventListener(e, onMouseUp, { passive: false });
    });
  }
  function removeReleaseListeners () {
    releaseEvents.forEach(function (e) {
      window.document.removeEventListener(e, onMouseUp, { passive: false });
    });
  }
  function getGhostParent () {
    if (draggableInfo && draggableInfo.ghostParent) {
      return draggableInfo.ghostParent;
    }
    if (grabbedElement) {
      return grabbedElement.parentElement || window.document.body;
    } else {
      return window.document.body;
    }
  }
  function getGhostElement (wrapperElement, ref, container, cursor) {
    var x = ref.x;
    var y = ref.y;

    var wrapperRect = wrapperElement.getBoundingClientRect();
    var left = wrapperRect.left;
    var top = wrapperRect.top;
    var right = wrapperRect.right;
    var bottom = wrapperRect.bottom;
    var wrapperVisibleRect = getIntersection(container.layout.getContainerRectangles().visibleRect, wrapperRect);
    var midX = wrapperVisibleRect.left + (wrapperVisibleRect.right - wrapperVisibleRect.left) / 2;
    var midY = wrapperVisibleRect.top + (wrapperVisibleRect.bottom - wrapperVisibleRect.top) / 2;
    var ghost = wrapperElement.cloneNode(true);
    ghost.style.zIndex = '1000';
    ghost.style.boxSizing = 'border-box';
    ghost.style.position = 'fixed';
    ghost.style.top = '0px';
    ghost.style.left = '0px';
    ghost.style.transform = 'none';
    ghost.style.removeProperty('transform');
    if (container.shouldUseTransformForGhost()) {
      ghost.style.transform = "translate3d(" + left + "px, " + top + "px, 0)";
    } else {
      ghost.style.top = top + "px";
      ghost.style.left = left + "px";
    }
    ghost.style.width = (right - left) + 'px';
    ghost.style.height = (bottom - top) + 'px';
    ghost.style.overflow = 'visible';
    ghost.style.transition = null;
    ghost.style.removeProperty('transition');
    ghost.style.pointerEvents = 'none';
    ghost.style.userSelect = 'none';
    if (container.getOptions().dragClass) {
      setTimeout(function () {
        addClass(ghost.firstElementChild, container.getOptions().dragClass);
        var dragCursor = window.getComputedStyle(ghost.firstElementChild).cursor;
        cursorStyleElement = addCursorStyleToBody(dragCursor);
      });
    } else {
      cursorStyleElement = addCursorStyleToBody(cursor);
    }
    addClass(ghost, container.getOptions().orientation || 'vertical');
    addClass(ghost, ghostClass);
    return {
      ghost: ghost,
      centerDelta: { x: midX - x, y: midY - y },
      positionDelta: { left: left - x, top: top - y },
      topLeft: {
        x: left,
        y: top
      }
    };
  }
  function getDraggableInfo (draggableElement) {
    var container = containers.filter(function (p) { return draggableElement.parentElement === p.element; })[0];
    var draggableIndex = container.draggables.indexOf(draggableElement);
    var getGhostParent = container.getOptions().getGhostParent;
    var draggableRect = draggableElement.getBoundingClientRect();
    return {
      container: container,
      element: draggableElement,
      size: {
        offsetHeight: draggableRect.bottom - draggableRect.top,
        offsetWidth: draggableRect.right - draggableRect.left,
      },
      elementIndex: draggableIndex,
      payload: container.getOptions().getChildPayload ? container.getOptions().getChildPayload(draggableIndex) : undefined,
      targetElement: null,
      position: { x: 0, y: 0 },
      groupName: container.getOptions().groupName,
      ghostParent: getGhostParent ? getGhostParent() : null,
      invalidateShadow: null,
      mousePosition: null,
      relevantContainers: null
    };
  }
  function handleDropAnimation (callback) {
    function endDrop () {
      removeClass(ghostInfo.ghost, 'animated');
      ghostInfo.ghost.style.transitionDuration = null;
      getGhostParent().removeChild(ghostInfo.ghost);
      callback();
    }
    function animateGhostToPosition (ref, duration, dropClass) {
      var top = ref.top;
      var left = ref.left;

      addClass(ghostInfo.ghost, 'animated');
      if (dropClass) {
        addClass(ghostInfo.ghost.firstElementChild, dropClass);
      }
      ghostInfo.topLeft.x = left;
      ghostInfo.topLeft.y = top;
      translateGhost(duration);
      setTimeout(function () {
        endDrop();
      }, duration + 20);
    }
    function shouldAnimateDrop (options) {
      return options.shouldAnimateDrop
        ? options.shouldAnimateDrop(draggableInfo.container.getOptions(), draggableInfo.payload)
        : true;
    }
    function disappearAnimation (duration, clb) {
      addClass(ghostInfo.ghost, 'animated');
      translateGhost(duration, 0.9, true);
      // ghostInfo.ghost.style.transitionDuration = duration + 'ms';
      // ghostInfo.ghost.style.opacity = '0';
      // ghostInfo.ghost.style.transform = 'scale(0.90)';
      setTimeout(function () {
        clb();
      }, duration + 20);
    }
    if (draggableInfo.targetElement) {
      var container = containers.filter(function (p) { return p.element === draggableInfo.targetElement; })[0];
      if (shouldAnimateDrop(container.getOptions())) {
        var dragResult = container.getDragResult();
        animateGhostToPosition(dragResult.shadowBeginEnd.rect, Math.max(150, container.getOptions().animationDuration / 2), container.getOptions().dropClass);
      } else {
        endDrop();
      }
    } else {
      var container$1 = containers.filter(function (p) { return p === draggableInfo.container; })[0];
      if (container$1) {
        var ref = container$1.getOptions();
        var behaviour = ref.behaviour;
        var removeOnDropOut = ref.removeOnDropOut;
        if ((behaviour === 'move' || behaviour === 'contain') && (isCanceling || !removeOnDropOut) && container$1.getDragResult()) {
          var rectangles = container$1.layout.getContainerRectangles();
          // container is hidden somehow
          // move ghost back to last seen position
          if (!isVisible(rectangles.visibleRect) && isVisible(rectangles.lastVisibleRect)) {
            animateGhostToPosition({
              top: rectangles.lastVisibleRect.top,
              left: rectangles.lastVisibleRect.left
            }, container$1.getOptions().animationDuration, container$1.getOptions().dropClass);
          } else {
            var ref$1 = container$1.getDragResult();
            var removedIndex = ref$1.removedIndex;
            var elementSize = ref$1.elementSize;
            var layout = container$1.layout;
            // drag ghost to back
            container$1.getTranslateCalculator({
              dragResult: {
                removedIndex: removedIndex,
                addedIndex: removedIndex,
                elementSize: elementSize,
                pos: undefined,
                shadowBeginEnd: undefined,
              },
            });
            var prevDraggableEnd = removedIndex > 0
              ? layout.getBeginEnd(container$1.draggables[removedIndex - 1]).end
              : layout.getBeginEndOfContainer().begin;
            animateGhostToPosition(layout.getTopLeftOfElementBegin(prevDraggableEnd), container$1.getOptions().animationDuration, container$1.getOptions().dropClass);
          }
        } else {
          disappearAnimation(container$1.getOptions().animationDuration, endDrop);
        }
      } else {
        // container is disposed due to removal
        disappearAnimation(defaultOptions.animationDuration, endDrop);
      }
    }
  }
  var handleDragStartConditions = (function handleDragStartConditions () {
    var startEvent;
    var delay;
    var clb;
    var timer = null;
    var moveThreshold = 1;
    var maxMoveInDelay = 5;
    function onMove (event) {
      var ref = getPointerEvent(event);
      var currentX = ref.clientX;
      var currentY = ref.clientY;
      if (!delay) {
        if (Math.abs(startEvent.clientX - currentX) > moveThreshold || Math.abs(startEvent.clientY - currentY) > moveThreshold) {
          return callCallback();
        }
      } else {
        if (Math.abs(startEvent.clientX - currentX) > maxMoveInDelay || Math.abs(startEvent.clientY - currentY) > maxMoveInDelay) {
          deregisterEvent();
        }
      }
    }
    function onUp () {
      deregisterEvent();
    }
    function onHTMLDrag () {
      deregisterEvent();
    }
    function registerEvents () {
      if (delay) {
        timer = setTimeout(callCallback, delay);
      }
      moveEvents.forEach(function (e) { return window.document.addEventListener(e, onMove); }, {
        passive: false,
      });
      releaseEvents.forEach(function (e) { return window.document.addEventListener(e, onUp); }, {
        passive: false,
      });
      window.document.addEventListener('drag', onHTMLDrag, {
        passive: false,
      });
    }
    function deregisterEvent () {
      clearTimeout(timer);
      moveEvents.forEach(function (e) { return window.document.removeEventListener(e, onMove); }, {
        passive: false,
      });
      releaseEvents.forEach(function (e) { return window.document.removeEventListener(e, onUp); }, {
        passive: false,
      });
      window.document.removeEventListener('drag', onHTMLDrag, {
        passive: false,
      });
    }
    function callCallback () {
      clearTimeout(timer);
      deregisterEvent();
      clb();
    }
    return function (_startEvent, _delay, _clb) {
      startEvent = getPointerEvent(_startEvent);
      delay = typeof _delay === 'number' ? _delay : isMobile ? 200 : 0;
      clb = _clb;
      registerEvents();
    };
  })();
  function onMouseDown (event) {
    var e = getPointerEvent(event);
    if (!isDragging && (e.button === undefined || e.button === 0)) {
      grabbedElement = getParent(e.target, '.' + wrapperClass);
      if (grabbedElement) {
        var containerElement = getParent(grabbedElement, '.' + containerClass);
        var container = containers.filter(function (p) { return p.element === containerElement; })[0];
        var dragHandleSelector = container.getOptions().dragHandleSelector;
        var nonDragAreaSelector = container.getOptions().nonDragAreaSelector;
        var startDrag = true;
        if (dragHandleSelector && !getParent(e.target, dragHandleSelector)) {
          startDrag = false;
        }
        if (nonDragAreaSelector && getParent(e.target, nonDragAreaSelector)) {
          startDrag = false;
        }
        if (startDrag) {
          container.layout.invalidate();
          addClass(window.document.body, disableTouchActions);
          addClass(window.document.body, noUserSelectClass);
          var onMouseUp = function () {
            removeClass(window.document.body, disableTouchActions);
            removeClass(window.document.body, noUserSelectClass);
            window.document.removeEventListener('mouseup', onMouseUp);
            window.document.removeEventListener('touchend', onMouseUp);
          };
          window.document.addEventListener('mouseup', onMouseUp);
          window.document.addEventListener('touchend', onMouseUp);
          handleDragStartConditions(e, container.getOptions().dragBeginDelay, function () {
            clearSelection();
            initiateDrag(e, getElementCursor(event.target));
            addMoveListeners();
            addReleaseListeners();
          });
        }
      }
    }
  }
  function handleMouseMoveForContainer (ref, orientation) {
    var clientX = ref.clientX;
    var clientY = ref.clientY;
    if ( orientation === void 0 ) orientation = 'vertical';

    var beginEnd = draggableInfo.container.layout.getBeginEndOfContainerVisibleRect();
    var mousePos;
    var axis;
    var leftTop;
    var size;
    if (orientation === 'vertical') {
      mousePos = clientY;
      axis = 'y';
      leftTop = 'top';
      size = draggableInfo.size.offsetHeight;
    } else {
      mousePos = clientX;
      axis = 'x';
      leftTop = 'left';
      size = draggableInfo.size.offsetWidth;
    }
    var beginBoundary = beginEnd.begin;
    var endBoundary = beginEnd.end - size;
    var positionInBoundary = Math.max(beginBoundary, Math.min(endBoundary, (mousePos + ghostInfo.positionDelta[leftTop])));
    ghostInfo.topLeft[axis] = positionInBoundary;
    draggableInfo.position[axis] = Math.max(beginEnd.begin, Math.min(beginEnd.end, (mousePos + ghostInfo.centerDelta[axis])));
    draggableInfo.mousePosition[axis] = Math.max(beginEnd.begin, Math.min(beginEnd.end, mousePos));
    if (draggableInfo.position[axis] < (beginEnd.begin + (size / 2))) {
      draggableInfo.position[axis] = beginEnd.begin + 2;
    }
    if (draggableInfo.position[axis] > (beginEnd.end - (size / 2))) {
      draggableInfo.position[axis] = beginEnd.end - 2;
    }
  }
  function onMouseMove (event) {
    event.preventDefault();
    var e = getPointerEvent(event);
    if (!draggableInfo) {
      initiateDrag(e, getElementCursor(event.target));
    } else {
      var containerOptions = draggableInfo.container.getOptions();
      var isContainDrag = containerOptions.behaviour === 'contain';
      if (isContainDrag) {
        handleMouseMoveForContainer(e, containerOptions.orientation);
      } else if (sourceContainerLockAxis) {
        if (sourceContainerLockAxis === 'y') {
          ghostInfo.topLeft.y = e.clientY + ghostInfo.positionDelta.top;
          draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
          draggableInfo.mousePosition.y = e.clientY;
        } else if (sourceContainerLockAxis === 'x') {
          ghostInfo.topLeft.x = e.clientX + ghostInfo.positionDelta.left;
          draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
          draggableInfo.mousePosition.x = e.clientX;
        }
      } else {
        ghostInfo.topLeft.x = e.clientX + ghostInfo.positionDelta.left;
        ghostInfo.topLeft.y = e.clientY + ghostInfo.positionDelta.top;
        draggableInfo.position.x = e.clientX + ghostInfo.centerDelta.x;
        draggableInfo.position.y = e.clientY + ghostInfo.centerDelta.y;
        draggableInfo.mousePosition.x = e.clientX;
        draggableInfo.mousePosition.y = e.clientY;
      }
      translateGhost();
      if (!handleDrag(draggableInfo)) {
        missedDrag = true;
      } else {
        missedDrag = false;
      }
      if (missedDrag) {
        debouncedHandleMissedDragFrame();
      }
    }
  }
  var debouncedHandleMissedDragFrame = debounce(handleMissedDragFrame, 20, false);
  function handleMissedDragFrame () {
    if (missedDrag) {
      missedDrag = false;
      handleDragImmediate(draggableInfo, dragListeningContainers);
    }
  }
  function onMouseUp () {
    removeMoveListeners();
    removeReleaseListeners();
    if (handleScroll && typeof handleScroll === 'function') { handleScroll({ reset: true }); }
    if (cursorStyleElement) {
      removeStyle(cursorStyleElement);
      cursorStyleElement = null;
    }
    if (draggableInfo) {
      containerRectableWatcher.stop();
      handleMissedDragFrame();
      dropAnimationStarted = true;
      handleDropAnimation(function () {
        isDragging = false;
        fireOnDragStartEnd(false);
        var containers = dragListeningContainers || [];
        var containerToCallDrop = containers.shift();
        while (containerToCallDrop !== undefined) {
          containerToCallDrop.handleDrop(draggableInfo);
          containerToCallDrop = containers.shift();
        }
        dragListeningContainers = null;
        grabbedElement = null;
        ghostInfo = null;
        draggableInfo = null;
        sourceContainerLockAxis = null;
        handleDrag = null;
        dropAnimationStarted = false;
      });
    }
  }
  function getPointerEvent (e) {
    return e.touches ? e.touches[0] : e;
  }
  function handleDragImmediate (draggableInfo, dragListeningContainers) {
    var containerBoxChanged = false;
    dragListeningContainers.forEach(function (p) {
      var dragResult = p.handleDrag(draggableInfo);
      containerBoxChanged = !!dragResult.containerBoxChanged || false;
      dragResult.containerBoxChanged = false;
    });
    if (containerBoxChanged) {
      containerBoxChanged = false;
      requestAnimationFrame(function () {
        containers.forEach(function (p) {
          p.layout.invalidateRects();
          p.onTranslated();
        });
      });
    }
  }
  function dragHandler (dragListeningContainers) {
    var targetContainers = dragListeningContainers;
    var animationFrame = null;
    return function (draggableInfo) {
      if (animationFrame === null && isDragging && !dropAnimationStarted) {
        animationFrame = requestAnimationFrame(function () {
          if (isDragging && !dropAnimationStarted) {
            handleDragImmediate(draggableInfo, targetContainers);
            handleScroll({ draggableInfo: draggableInfo });
          }
          animationFrame = null;
        });
        return true;
      }
      return false;
    };
  }
  function getScrollHandler (container, dragListeningContainers) {
    if (container.getOptions().autoScrollEnabled) {
      return dragScroller(dragListeningContainers, container.getScrollMaxSpeed());
    } else {
      return function (props) { return null; };
    }
  }
  function fireOnDragStartEnd (isStart) {
    var container = draggableInfo.container;
    var payload = draggableInfo.payload;
    containers.forEach(function (p) {
      if (container.getOptions().fireRelatedEventsOnly && p !== container) { return; }
      var ref = p.getOptions();
      var onDragStart = ref.onDragStart;
      var onDragEnd = ref.onDragEnd;
      var fn = isStart ? onDragStart : onDragEnd;
      if (fn) {
        var options = {
          isSource: p === container,
          payload: payload,
          willAcceptDrop: false
        };
        if (p.isDragRelevant(container, payload)) {
          options.willAcceptDrop = true;
        }
        fn(options);
      }
    });
  }
  function initiateDrag (position, cursor) {
    if (grabbedElement !== null) {
      if (grabbedElement.classList.contains('dndrop-not-draggable')) { return; }
      isDragging = true;
      var container = (containers.filter(function (p) { return grabbedElement.parentElement === p.element; })[0]);
      container.setDraggables();
      sourceContainerLockAxis = container.getOptions().lockAxis ? container.getOptions().lockAxis.toLowerCase() : null;
      draggableInfo = getDraggableInfo(grabbedElement);
      ghostInfo = getGhostElement(grabbedElement, { x: position.clientX, y: position.clientY }, draggableInfo.container, cursor);
      draggableInfo.position = {
        x: position.clientX + ghostInfo.centerDelta.x,
        y: position.clientY + ghostInfo.centerDelta.y,
      };
      draggableInfo.mousePosition = {
        x: position.clientX,
        y: position.clientY,
      };
      dragListeningContainers = containers.filter(function (p) { return p.isDragRelevant(container, draggableInfo.payload); });
      draggableInfo.relevantContainers = dragListeningContainers;
      handleDrag = dragHandler(dragListeningContainers);
      if (handleScroll && typeof handleScroll === 'function') {
        handleScroll({ reset: true, draggableInfo: undefined });
      }
      handleScroll = getScrollHandler(container, dragListeningContainers);
      dragListeningContainers.forEach(function (p) { return p.prepareDrag(p, dragListeningContainers); });
      fireOnDragStartEnd(true);
      handleDrag(draggableInfo);
      getGhostParent().appendChild(ghostInfo.ghost);
      containerRectableWatcher.start();
    }
  }
  var ghostAnimationFrame = null;
  function translateGhost (translateDuration, scale, fadeOut) {
    if ( translateDuration === void 0 ) translateDuration = 0;
    if ( scale === void 0 ) scale = 1;
    if ( fadeOut === void 0 ) fadeOut = false;

    var ghost = ghostInfo.ghost;
    var ghostInfo_topLeft = ghostInfo.topLeft;
    var x = ghostInfo_topLeft.x;
    var y = ghostInfo_topLeft.y;
    var useTransform = draggableInfo.container ? draggableInfo.container.shouldUseTransformForGhost() : true;
    var transformString = useTransform ? ("translate3d(" + x + "px," + y + "px, 0)") : null;
    if (scale !== 1) {
      transformString = transformString ? (transformString + " scale(" + scale + ")") : ("scale(" + scale + ")");
    }
    if (translateDuration > 0) {
      ghostInfo.ghost.style.transitionDuration = translateDuration + 'ms';
      requestAnimationFrame(function () {
        transformString && (ghost.style.transform = transformString);
        if (!useTransform) {
          ghost.style.left = x + 'px';
          ghost.style.top = y + 'px';
        }
        ghostAnimationFrame = null;
        if (fadeOut) {
          ghost.style.opacity = '0';
        }
      });
      return;
    }
    if (ghostAnimationFrame === null) {
      ghostAnimationFrame = requestAnimationFrame(function () {
        transformString && (ghost.style.transform = transformString);
        if (!useTransform) {
          ghost.style.left = x + 'px';
          ghost.style.top = y + 'px';
        }
        ghostAnimationFrame = null;
        if (fadeOut) {
          ghost.style.opacity = '0';
        }
      });
    }
  }
  function registerContainer (container) {
    containers.push(container);
    if (isDragging && draggableInfo) {
      if (container.isDragRelevant(draggableInfo.container, draggableInfo.payload)) {
        dragListeningContainers.push(container);
        container.prepareDrag(container, dragListeningContainers);
        if (handleScroll && typeof handleScroll === 'function') {
          handleScroll({ reset: true, draggableInfo: undefined });
        }
        handleScroll = getScrollHandler(container, dragListeningContainers);
        handleDrag = dragHandler(dragListeningContainers);
        container.handleDrag(draggableInfo);
      }
    }
  }
  function unregisterContainer (container) {
    containers.splice(containers.indexOf(container), 1);
    if (isDragging && draggableInfo) {
      if (draggableInfo.container === container) {
        container.fireRemoveElement();
      }
      if (draggableInfo.targetElement === container.element) {
        draggableInfo.targetElement = null;
      }
      var indexInDragListeners = dragListeningContainers.indexOf(container);
      if (indexInDragListeners > -1) {
        dragListeningContainers.splice(indexInDragListeners, 1);
        if (handleScroll && typeof handleScroll === 'function') {
          handleScroll({ reset: true, draggableInfo: undefined });
        }
        handleScroll = getScrollHandler(container, dragListeningContainers);
        handleDrag = dragHandler(dragListeningContainers);
      }
    }
  }
  function watchRectangles () {
    var animationHandle = null;
    var isStarted = false;
    function _start () {
      animationHandle = requestAnimationFrame(function () {
        dragListeningContainers.forEach(function (p) { return p.layout.invalidateRects(); });
        setTimeout(function () {
          if (animationHandle !== null) { _start(); }
        }, 50);
      });
    }
    function stop () {
      if (animationHandle !== null) {
        cancelAnimationFrame(animationHandle);
        animationHandle = null;
      }
      isStarted = false;
    }
    return {
      start: function () {
        if (!isStarted) {
          isStarted = true;
          _start();
        }
      },
      stop: stop
    };
  }
  function cancelDrag () {
    if (isDragging && !isCanceling && !dropAnimationStarted) {
      isCanceling = true;
      missedDrag = false;
      var outOfBoundsDraggableInfo = Object.assign({}, draggableInfo, {
        targetElement: null,
        position: { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER },
        mousePosition: { x: Number.MAX_SAFE_INTEGER, y: Number.MAX_SAFE_INTEGER },
      });
      dragListeningContainers.forEach(function (container) {
        container.handleDrag(outOfBoundsDraggableInfo);
      });
      if (draggableInfo) {
        draggableInfo.targetElement = null;
        draggableInfo.cancelDrop = true;
        onMouseUp();
        isCanceling = false;
      }
    }
  }
  function Mediator () {
    return {
      init: function () {
        if (typeof window !== 'undefined') {
          addGrabListeners();
        }
      },
      dispose: function () {
        if (typeof window !== 'undefined') {
          removeGrabListeners();
        }
      },
      register: function (container) {
        registerContainer(container);
      },
      unregister: function (container) {
        unregisterContainer(container);
      },
      isDragging: function () {
        return isDragging;
      },
      cancelDrag: cancelDrag,
    };
  }
  if (typeof window !== 'undefined') {
    addStyleToHead();
  }
  var Mediator$1 = Mediator();

  function setAnimation (
    element,
    add,
    animationDuration
  ) {
    if ( animationDuration === void 0 ) animationDuration = defaultOptions.animationDuration;

    if (add) {
      addClass(element, animationClass);
      element.style.transitionDuration = animationDuration + 'ms';
    } else {
      removeClass(element, animationClass);
      element.style.removeProperty('transition-duration');
    }
  }

  function isDragRelevant (ref) {
    var element = ref.element;
    var getOptions = ref.getOptions;

    return function (sourceContainer, payload) {
      var options = getOptions();

      var sourceOptions = sourceContainer.getOptions();
      if (options.behaviour === 'copy') { return false; }

      var parentWrapper = getParent(element, '.' + wrapperClass);
      if (parentWrapper === sourceContainer.element) {
        return false;
      }

      if (sourceContainer.element === element) { return true; }
      if (
        sourceOptions.groupName &&
        sourceOptions.groupName === options.groupName
      ) {
        return true;
      }

      if (options.shouldAcceptDrop) {
        return options.shouldAcceptDrop(sourceContainer.getOptions(), payload);
      }

      return false;
    };
  }

  function wrapChild$1 (child) {
    if (smoothDnD.wrapChild) {
      var div = window.document.createElement('div');
      div.className = "" + wrapperClass;
      child.parentElement.insertBefore(div, child);
      div.appendChild(child);
      return div;
    }

    return child;
  }

  function wrapChildren (element) {
    var draggables = [];
    Array.prototype.forEach.call(element.children, function (child) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        var wrapper = child;
        if (!hasClass(child, wrapperClass)) {
          wrapper = wrapChild$1(child);
        }
        wrapper[translationValue] = 0;
        draggables.push(wrapper);
      } else {
        element.removeChild(child);
      }
    });
    return draggables;
  }

  function unwrapChildren (element) {
    if (smoothDnD.wrapChild) {
      Array.prototype.forEach.call(element.children, function (child) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (hasClass(child, wrapperClass)) {
            element.insertBefore(child.firstElementChild, child);
            element.removeChild(child);
          }
        }
      });
    }
  }

  function findDraggebleAtPos (ref) {
    var layout = ref.layout;

    var find = function (
      draggables,
      pos,
      startIndex,
      endIndex,
      withRespectToMiddlePoints
    ) {
      if ( withRespectToMiddlePoints === void 0 ) withRespectToMiddlePoints = false;

      if (endIndex < startIndex) {
        return startIndex;
      }
      // binary serach draggable
      if (startIndex === endIndex) {
        var ref = layout.getBeginEnd(draggables[startIndex]);
        var begin = ref.begin;
        var end = ref.end;
        // mouse pos is inside draggable
        // now decide which index to return
        // if (pos > begin && pos <= end) {
        if (withRespectToMiddlePoints) {
          return pos < (end + begin) / 2 ? startIndex : startIndex + 1;
        } else {
          return startIndex;
        }
        // } else {
        //   return null;
        // }
      } else {
        var middleIndex = Math.floor((endIndex + startIndex) / 2);
        var ref$1 = layout.getBeginEnd(draggables[middleIndex]);
        var begin$1 = ref$1.begin;
        var end$1 = ref$1.end;
        if (pos < begin$1) {
          return find(
            draggables,
            pos,
            startIndex,
            middleIndex - 1,
            withRespectToMiddlePoints
          );
        } else if (pos > end$1) {
          return find(
            draggables,
            pos,
            middleIndex + 1,
            endIndex,
            withRespectToMiddlePoints
          );
        } else {
          if (withRespectToMiddlePoints) {
            return pos < (end$1 + begin$1) / 2 ? middleIndex : middleIndex + 1;
          } else {
            return middleIndex;
          }
        }
      }
    };

    return function (draggables, pos, withRespectToMiddlePoints) {
      if ( withRespectToMiddlePoints === void 0 ) withRespectToMiddlePoints = false;

      return find(
        draggables,
        pos,
        0,
        draggables.length - 1,
        withRespectToMiddlePoints
      );
    };
  }

  function resetDraggables (ref) {
    var element = ref.element;
    var draggables = ref.draggables;
    var layout = ref.layout;

    return function () {
      draggables.forEach(function (p) {
        setAnimation(p, false);
        layout.setTranslation(p, 0);
        layout.setVisibility(p, true);
      });

      if (element[stretcherElementInstance]) {
        element[stretcherElementInstance].parentNode.removeChild(
          element[stretcherElementInstance]
        );
        element[stretcherElementInstance] = null;
      }
    };
  }

  function setTargetContainer (draggableInfo, element, set) {
    if ( set === void 0 ) set = true;

    if (element && set) {
      draggableInfo.targetElement = element;
    } else {
      if (draggableInfo.targetElement === element) {
        draggableInfo.targetElement = null;
      }
    }
  }

  function handleDrop (ref) {
    var element = ref.element;
    var draggables = ref.draggables;
    var layout = ref.layout;
    var getOptions = ref.getOptions;

    var draggablesReset = resetDraggables({
      element: element,
      draggables: draggables,
      layout: layout,
      getOptions: getOptions,
    });
    var dropHandler = (smoothDnD.dropHandler || domDropHandler)({
      element: element,
      draggables: draggables,
      layout: layout,
      getOptions: getOptions,
    });
    return function (
      draggableInfo,
      ref,
      forDispose
    ) {
      var addedIndex = ref.addedIndex;
      var removedIndex = ref.removedIndex;
      if ( forDispose === void 0 ) forDispose = false;

      draggablesReset();
      // if drop zone is valid => complete drag, else emit dropNotAllowed and everything will be reverted by draggablesReset()
      if (draggableInfo && !draggableInfo.cancelDrop) {
        if (
          draggableInfo.targetElement ||
          getOptions().removeOnDropOut ||
          forDispose
        ) {
          var indexNotNull = function (index) { return index !== null; };

          var actualAddIndex =
            indexNotNull(addedIndex)
              ? indexNotNull(removedIndex) && removedIndex < addedIndex
                ? addedIndex - 1
                : addedIndex
              : null;

          var payload = draggableInfo.payload;
          var element = draggableInfo.element;

          var dropHandlerParams = {
            removedIndex: removedIndex,
            addedIndex: actualAddIndex,
            payload: payload,
            element: element.firstElementChild || element,
          };
          var shouldHandleDrop =
            !draggableInfo.container.getOptions().fireRelatedEventsOnly ||
            indexNotNull(removedIndex) ||
            indexNotNull(actualAddIndex);
          if (shouldHandleDrop) {
            dropHandler(dropHandlerParams, getOptions().onDrop);
          }
        } else if (getOptions().dropNotAllowed) {
          var payload$1 = draggableInfo.payload;
          var container = draggableInfo.container;
          return getOptions().dropNotAllowed({ payload: payload$1, container: container });
        }
      }
    };
  }

  function getContainerProps (element, getOptions) {
    var draggables = wrapChildren(element);
    var options = getOptions();
    // set flex classes before layout is inited for scroll listener
    addClass(element, (containerClass + " " + (options.orientation)));
    var layout = layoutManager(
      element,
      options.orientation,
      options.animationDuration
    );
    return {
      element: element,
      draggables: draggables,
      getOptions: getOptions,
      layout: layout,
    };
  }

  function getRemovedItem (ref) {
    var element = ref.element;
    var getOptions = ref.getOptions;

    var prevRemovedIndex = null;
    return function (ref) {
      var draggableInfo = ref.draggableInfo;

      var removedIndex = prevRemovedIndex;
      if (
        prevRemovedIndex == null &&
        draggableInfo.container.element === element &&
        getOptions().behaviour !== 'copy'
      ) {
        removedIndex = prevRemovedIndex = draggableInfo.elementIndex;
      }

      return { removedIndex: removedIndex };
    };
  }

  function setRemovedItemVisibilty (ref) {
    var draggables = ref.draggables;
    var layout = ref.layout;

    return function (ref) {
      var dragResult = ref.dragResult;

      if (dragResult.removedIndex !== null) {
        layout.setVisibility(draggables[dragResult.removedIndex], false);
      }
    };
  }

  function getPosition (ref) {
    var element = ref.element;
    var layout = ref.layout;

    return function (ref) {
      var draggableInfo = ref.draggableInfo;

      var hitElement = document.elementFromPoint(
        draggableInfo.position.x,
        draggableInfo.position.y
      );

      // TODO: if center is out of bounds use mouse position for hittest
      // if (!hitElement) {
      //   hitElement = document.elementFromPoint(draggableInfo.mousePosition.x, draggableInfo.mousePosition.y);
      // }

      if (hitElement) {
        var container = getParentRelevantContainerElement(
          hitElement,
          draggableInfo.relevantContainers
        );
        if (container && container.element === element) {
          return {
            pos: layout.getPosition(draggableInfo.position),
          };
        }
      }

      return {
        pos: null,
      };
    };
  }

  function getElementSize (ref) {
    var layout = ref.layout;

    var elementSize = null;
    return function (ref) {
      var draggableInfo = ref.draggableInfo;
      var dragResult = ref.dragResult;

      if (dragResult.pos === null) {
        return (elementSize = null);
      } else {
        elementSize = elementSize || layout.getSize(draggableInfo.size);
      }
      return { elementSize: elementSize };
    };
  }

  function handleTargetContainer (ref) {
    var element = ref.element;

    return function (ref) {
      var draggableInfo = ref.draggableInfo;
      var dragResult = ref.dragResult;

      setTargetContainer(draggableInfo, element, !!dragResult.pos);
    };
  }

  function getDragInsertionIndex (ref) {
    var draggables = ref.draggables;
    var layout = ref.layout;

    var findDraggable = findDraggebleAtPos({ layout: layout });
    return function (ref) {
      var ref_dragResult = ref.dragResult;
      var shadowBeginEnd = ref_dragResult.shadowBeginEnd;
      var pos = ref_dragResult.pos;

      if (!shadowBeginEnd) {
        var index = findDraggable(draggables, pos, true);
        return index !== null ? index : draggables.length;
      } else {
        if (
          shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment <= pos &&
          shadowBeginEnd.end >= pos
        ) {
          // position inside ghost
          return null;
        }
      }

      if (pos < shadowBeginEnd.begin + shadowBeginEnd.beginAdjustment) {
        return findDraggable(draggables, pos);
      } else if (pos > shadowBeginEnd.end) {
        return findDraggable(draggables, pos) + 1;
      } else {
        return draggables.length;
      }
    };
  }

  function getDragInsertionIndexForDropZone () {
    return function (ref) {
      var pos = ref.dragResult.pos;

      return pos !== null ? { addedIndex: 0 } : { addedIndex: null };
    };
  }

  function getShadowBeginEndForDropZone (ref) {
    var layout = ref.layout;

    var prevAddedIndex = null;
    return function (ref) {
      var addedIndex = ref.dragResult.addedIndex;

      if (addedIndex !== prevAddedIndex) {
        prevAddedIndex = addedIndex;
        var ref$1 = layout.getBeginEndOfContainer();
        var begin = ref$1.begin;
        return {
          shadowBeginEnd: {
            rect: layout.getTopLeftOfElementBegin(begin),
          },
        };
      }

      return null;
    };
  }

  function drawDropPlaceholder (ref) {
    var layout = ref.layout;
    var element = ref.element;
    var getOptions = ref.getOptions;

    var prevAddedIndex = null;
    return function (ref) {
      var ref_dragResult = ref.dragResult;
      var elementSize = ref_dragResult.elementSize;
      var shadowBeginEnd = ref_dragResult.shadowBeginEnd;
      var addedIndex = ref_dragResult.addedIndex;
      var dropPlaceholderContainer = ref_dragResult.dropPlaceholderContainer;

      var options = getOptions();
      if (options.dropPlaceholder) {
        var ref$1 =
          typeof options.dropPlaceholder === 'boolean'
            ? {}
            : options.dropPlaceholder;
        var animationDuration = ref$1.animationDuration;
        var className = ref$1.className;
        var showOnTop = ref$1.showOnTop;
        if (addedIndex !== null) {
          if (!dropPlaceholderContainer) {
            var innerElement = document.createElement('div');
            var flex = document.createElement('div');
            flex.className = dropPlaceholderFlexContainerClass;
            innerElement.className = dropPlaceholderInnerClass + " " + (className || dropPlaceholderDefaultClass);
            dropPlaceholderContainer = document.createElement('div');
            dropPlaceholderContainer.className = "" + dropPlaceholderWrapperClass;
            dropPlaceholderContainer.style.position = 'absolute';

            if (animationDuration !== undefined) {
              dropPlaceholderContainer.style.transition = "all " + animationDuration + "ms ease";
            }

            dropPlaceholderContainer.appendChild(flex);
            flex.appendChild(innerElement);
            layout.setSize(dropPlaceholderContainer.style, elementSize + 'px');

            dropPlaceholderContainer.style.pointerEvents = 'none';

            if (showOnTop) {
              element.appendChild(dropPlaceholderContainer);
            } else {
              element.insertBefore(
                dropPlaceholderContainer,
                element.firstElementChild
              );
            }
          }

          if (prevAddedIndex !== addedIndex && shadowBeginEnd.dropArea) {
            layout.setBegin(
              dropPlaceholderContainer.style,
              shadowBeginEnd.dropArea.begin -
                layout.getBeginEndOfContainer().begin +
                'px'
            );
          }
          prevAddedIndex = addedIndex;

          return {
            dropPlaceholderContainer: dropPlaceholderContainer,
          };
        } else {
          if (dropPlaceholderContainer && prevAddedIndex !== null) {
            element.removeChild(dropPlaceholderContainer);
          }
          prevAddedIndex = null;

          return {
            dropPlaceholderContainer: undefined,
          };
        }
      }

      return null;
    };
  }

  function invalidateShadowBeginEndIfNeeded (params) {
    var shadowBoundsGetter = getShadowBeginEnd(params);
    return function (ref) {
      var draggableInfo = ref.draggableInfo;
      var dragResult = ref.dragResult;

      if (draggableInfo.invalidateShadow) {
        return shadowBoundsGetter({ draggableInfo: draggableInfo, dragResult: dragResult });
      }
      return null;
    };
  }

  function getNextAddedIndex (params) {
    var getIndexForPos = getDragInsertionIndex(params);
    return function (ref) {
      var dragResult = ref.dragResult;

      var index = null;
      if (dragResult.pos !== null) {
        index = getIndexForPos({ dragResult: dragResult });
        if (index === null) {
          index = dragResult.addedIndex;
        }
      }
      return {
        addedIndex: index,
      };
    };
  }

  function resetShadowAdjustment () {
    var lastAddedIndex = null;
    return function (ref) {
      var ref_dragResult = ref.dragResult;
      var addedIndex = ref_dragResult.addedIndex;
      var shadowBeginEnd = ref_dragResult.shadowBeginEnd;

      if (
        addedIndex !== lastAddedIndex &&
        lastAddedIndex !== null &&
        shadowBeginEnd
      ) {
        shadowBeginEnd.beginAdjustment = 0;
      }
      lastAddedIndex = addedIndex;
    };
  }

  function handleInsertionSizeChange (ref) {
    var element = ref.element;
    var draggables = ref.draggables;
    var layout = ref.layout;
    var getOptions = ref.getOptions;

    var strectherElement = null;
    return function (ref) {
      var ref_dragResult = ref.dragResult;
      var addedIndex = ref_dragResult.addedIndex;
      var removedIndex = ref_dragResult.removedIndex;
      var elementSize = ref_dragResult.elementSize;

      if (removedIndex === null) {
        if (addedIndex !== null) {
          if (!strectherElement) {
            var containerBeginEnd = layout.getBeginEndOfContainer();
            containerBeginEnd.end =
              containerBeginEnd.begin + layout.getSize(element);
            var hasScrollBar =
              layout.getScrollSize(element) > layout.getSize(element);
            var containerEnd = hasScrollBar
              ? containerBeginEnd.begin +
                layout.getScrollSize(element) -
                layout.getScrollValue(element)
              : containerBeginEnd.end;
            var lastDraggableEnd =
              draggables.length > 0
                ? layout.getBeginEnd(draggables[draggables.length - 1]).end -
                  draggables[draggables.length - 1][translationValue]
                : containerBeginEnd.begin;
            if (lastDraggableEnd + elementSize > containerEnd) {
              strectherElement = window.document.createElement('div');
              strectherElement.className =
                stretcherElementClass + ' ' + getOptions().orientation;
              var stretcherSize =
                draggables.length > 0
                  ? elementSize + lastDraggableEnd - containerEnd
                  : elementSize;
              layout.setSize(strectherElement.style, (stretcherSize + "px"));
              element.appendChild(strectherElement);
              element[stretcherElementInstance] = strectherElement;
              return {
                containerBoxChanged: true,
              };
            }
          }
        } else {
          if (strectherElement) {
            layout.setTranslation(strectherElement, 0);
            var toRemove = strectherElement;
            strectherElement = null;
            element.removeChild(toRemove);
            element[stretcherElementInstance] = null;
            return {
              containerBoxChanged: true,
            };
          }
        }
      }

      return undefined;
    };
  }

  function calculateTranslations (ref) {
    var draggables = ref.draggables;
    var layout = ref.layout;

    var prevAddedIndex = null;
    var prevRemovedIndex = null;
    return function (ref) {
      var ref_dragResult = ref.dragResult;
      var addedIndex = ref_dragResult.addedIndex;
      var removedIndex = ref_dragResult.removedIndex;
      var elementSize = ref_dragResult.elementSize;

      if (addedIndex !== prevAddedIndex || removedIndex !== prevRemovedIndex) {
        for (var index = 0; index < draggables.length; index++) {
          if (index !== removedIndex) {
            var draggable = draggables[index];
            var translate = 0;
            if (removedIndex !== null && removedIndex < index) {
              translate -= elementSize;
            }
            if (addedIndex !== null && addedIndex <= index) {
              translate += elementSize;
            }
            layout.setTranslation(draggable, translate);
          }
        }

        prevAddedIndex = addedIndex;
        prevRemovedIndex = removedIndex;

        return { addedIndex: addedIndex, removedIndex: removedIndex };
      }

      return undefined;
    };
  }

  function getShadowBeginEnd (ref) {
    var draggables = ref.draggables;
    var layout = ref.layout;

    var prevAddedIndex = null;
    return function (ref) {
      var draggableInfo = ref.draggableInfo;
      var dragResult = ref.dragResult;

      var addedIndex = dragResult.addedIndex;
      var removedIndex = dragResult.removedIndex;
      var elementSize = dragResult.elementSize;
      var pos = dragResult.pos;
      var shadowBeginEnd = dragResult.shadowBeginEnd;
      if (pos !== null) {
        if (
          addedIndex !== null &&
          (draggableInfo.invalidateShadow || addedIndex !== prevAddedIndex)
        ) {
          // if (prevAddedIndex) prevAddedIndex = addedIndex;
          var beforeIndex = addedIndex - 1;
          var begin = Number.MIN_SAFE_INTEGER;
          var dropAreaBegin = 0;
          var dropAreaEnd = 0;
          var afterBounds = null;
          var beforeBounds = null;
          if (beforeIndex === removedIndex) {
            beforeIndex--;
          }
          if (beforeIndex > -1) {
            var beforeSize = layout.getSize(draggables[beforeIndex]);
            beforeBounds = layout.getBeginEnd(draggables[beforeIndex]);
            if (elementSize < beforeSize) {
              var threshold = (beforeSize - elementSize) / 2;
              begin = beforeBounds.end - threshold;
            } else {
              begin = beforeBounds.end;
            }
            dropAreaBegin = beforeBounds.end;
          } else {
            beforeBounds = { end: layout.getBeginEndOfContainer().begin };
            dropAreaBegin = layout.getBeginEndOfContainer().begin;
          }

          var end = Number.MAX_SAFE_INTEGER;
          var afterIndex = addedIndex;
          if (afterIndex === removedIndex) {
            afterIndex++;
          }
          if (afterIndex < draggables.length) {
            var afterSize = layout.getSize(draggables[afterIndex]);
            afterBounds = layout.getBeginEnd(draggables[afterIndex]);

            if (elementSize < afterSize) {
              var threshold$1 = (afterSize - elementSize) / 2;
              end = afterBounds.begin + threshold$1;
            } else {
              end = afterBounds.begin;
            }
            dropAreaEnd = afterBounds.begin;
          } else {
            afterBounds = { begin: layout.getContainerRectangles().rect.end };
            dropAreaEnd =
              layout.getContainerRectangles().rect.end -
              layout.getContainerRectangles().rect.begin;
          }

          var shadowRectTopLeft =
            beforeBounds && afterBounds
              ? layout.getTopLeftOfElementBegin(beforeBounds.end)
              : null;

          prevAddedIndex = addedIndex;
          return {
            shadowBeginEnd: {
              dropArea: {
                begin: dropAreaBegin,
                end: dropAreaEnd,
              },
              begin: begin,
              end: end,
              rect: shadowRectTopLeft,
              beginAdjustment: shadowBeginEnd
                ? shadowBeginEnd.beginAdjustment
                : 0,
            },
          };
        } else {
          return null;
        }
      } else {
        prevAddedIndex = null;
        return {
          shadowBeginEnd: null,
        };
      }
    };
  }

  function handleFirstInsertShadowAdjustment () {
    var lastAddedIndex = null;
    return function (ref) {
      var ref_dragResult = ref.dragResult;
      var pos = ref_dragResult.pos;
      var addedIndex = ref_dragResult.addedIndex;
      var shadowBeginEnd = ref_dragResult.shadowBeginEnd;

      if (pos !== null) {
        if (addedIndex != null && lastAddedIndex === null) {
          if (pos < shadowBeginEnd.begin) {
            var beginAdjustment = pos - shadowBeginEnd.begin - 5;
            shadowBeginEnd.beginAdjustment = beginAdjustment;
          }
          lastAddedIndex = addedIndex;
        }
      } else {
        lastAddedIndex = null;
      }
    };
  }

  function fireDragEnterLeaveEvents (ref) {
    var getOptions = ref.getOptions;

    var wasDragIn = false;
    var options = getOptions();
    return function (ref) {
      var pos = ref.dragResult.pos;

      var isDragIn = !!pos;
      if (isDragIn !== wasDragIn) {
        wasDragIn = isDragIn;
        if (isDragIn) {
          options.onDragEnter && options.onDragEnter();
        } else {
          options.onDragLeave && options.onDragLeave();
        }
      }

      return undefined;
    };
  }

  function fireOnDropReady (ref) {
    var getOptions = ref.getOptions;

    var lastAddedIndex = null;
    var options = getOptions();
    return function (ref) {
      var ref_dragResult = ref.dragResult;
      var addedIndex = ref_dragResult.addedIndex;
      var removedIndex = ref_dragResult.removedIndex;
      var ref_draggableInfo = ref.draggableInfo;
      var payload = ref_draggableInfo.payload;
      var element = ref_draggableInfo.element;

      if (
        options.onDropReady &&
        addedIndex !== null &&
        lastAddedIndex !== addedIndex
      ) {
        lastAddedIndex = addedIndex;
        var adjustedAddedIndex = addedIndex;

        if (removedIndex !== null && addedIndex > removedIndex) {
          adjustedAddedIndex--;
        }

        options.onDropReady({
          addedIndex: adjustedAddedIndex,
          removedIndex: removedIndex,
          payload: payload,
          element: element ? (element.firstElementChild || element) : undefined,
        });
      }
    };
  }

  function getDragHandler (params) {
    if (params.getOptions().behaviour === 'drop-zone') {
      // sorting is disabled in container, addedIndex will always be 0 if dropped in
      return compose(params)(
        getRemovedItem,
        setRemovedItemVisibilty,
        getPosition,
        getElementSize,
        handleTargetContainer,
        getDragInsertionIndexForDropZone,
        getShadowBeginEndForDropZone,
        fireDragEnterLeaveEvents,
        fireOnDropReady
      );
    } else {
      return compose(params)(
        getRemovedItem,
        setRemovedItemVisibilty,
        getPosition,
        getElementSize,
        handleTargetContainer,
        invalidateShadowBeginEndIfNeeded,
        getNextAddedIndex,
        resetShadowAdjustment,
        handleInsertionSizeChange,
        calculateTranslations,
        getShadowBeginEnd,
        drawDropPlaceholder,
        handleFirstInsertShadowAdjustment,
        fireDragEnterLeaveEvents,
        fireOnDropReady
      );
    }
  }

  function getDefaultDragResult () {
    return {
      addedIndex: null,
      removedIndex: null,
      elementSize: null,
      pos: null,
      shadowBeginEnd: null,
    };
  }

  function compose (params) {
    return function () {
      var functions = [], len = arguments.length;
      while ( len-- ) functions[ len ] = arguments[ len ];

      var hydratedFunctions = functions.map(function (p) { return p(params); });
      var result = null;
      return function (draggableInfo) {
        result = hydratedFunctions.reduce(function (dragResult, fn) {
          return Object.assign(dragResult, fn({ draggableInfo: draggableInfo, dragResult: dragResult }));
        }, result || getDefaultDragResult());
        return result;
      };
    };
  }

  // Container definition begin
  function Container$1 (element) {
    return function (options) {
      var containerOptions = Object.assign({}, defaultOptions, options);
      var dragResult = null;
      var lastDraggableInfo = null;
      var props = getContainerProps(element, getOptions);
      var dragHandler = getDragHandler(props);
      var dropHandler = handleDrop(props);
      var scrollListener = listenScrollParent(element, onScroll);

      function processLastDraggableInfo () {
        if (lastDraggableInfo !== null) {
          lastDraggableInfo.invalidateShadow = true;
          dragResult = dragHandler(lastDraggableInfo);
          lastDraggableInfo.invalidateShadow = false;
        }
      }

      function setDraggables (draggables, element) {
        var newDraggables = wrapChildren(element);
        for (var i = 0; i < newDraggables.length; i++) {
          draggables[i] = newDraggables[i];
        }

        for (var i$1 = 0; i$1 < draggables.length - newDraggables.length; i$1++) {
          draggables.pop();
        }
      }

      function prepareDrag (container, relevantContainers) {
        var element = container.element;
        var draggables = props.draggables;
        setDraggables(draggables, element);
        container.layout.invalidateRects();
        draggables.forEach(function (p) { return setAnimation(p, true, getOptions().animationDuration); }
        );
        scrollListener.start();
      }

      function onScroll () {
        props.layout.invalidateRects();
        processLastDraggableInfo();
      }

      function dispose (container) {
        scrollListener.dispose();
        unwrapChildren(container.element);
      }

      function setOptions (options, merge) {
        if ( merge === void 0 ) merge = true;

        if (merge === false) {
          containerOptions = Object.assign({}, defaultOptions, options);
        } else {
          containerOptions = Object.assign(
            {},
            defaultOptions,
            containerOptions,
            options
          );
        }
      }

      function getOptions () {
        return containerOptions;
      }

      var container = {
        element: element,
        draggables: props.draggables,
        isDragRelevant: isDragRelevant(props),
        layout: props.layout,
        dispose: dispose,
        prepareDrag: prepareDrag,
        handleDrag: function handleDrag (draggableInfo) {
          lastDraggableInfo = draggableInfo;
          dragResult = dragHandler(draggableInfo);
          return dragResult;
        },
        handleDrop: function handleDrop (draggableInfo) {
          scrollListener.stop();
          if (dragResult && dragResult.dropPlaceholderContainer) {
            element.removeChild(dragResult.dropPlaceholderContainer);
          }
          lastDraggableInfo = null;
          dragHandler = getDragHandler(props);
          dropHandler(draggableInfo, dragResult);
          dragResult = null;
        },
        fireRemoveElement: function fireRemoveElement () {
          // will be called when container is disposed while dragging so ignore addedIndex
          dropHandler(
            lastDraggableInfo,
            Object.assign({}, dragResult, { addedIndex: null }),
            true
          );
          dragResult = null;
        },
        getDragResult: function getDragResult () {
          return dragResult;
        },
        getTranslateCalculator: function getTranslateCalculator (dragresult) {
          return calculateTranslations(props)(dragresult);
        },
        onTranslated: function () {
          processLastDraggableInfo();
        },
        setDraggables: function () {
          setDraggables(props.draggables, element);
        },
        getScrollMaxSpeed: function getScrollMaxSpeed () {
          return smoothDnD.maxScrollSpeed;
        },
        shouldUseTransformForGhost: function shouldUseTransformForGhost () {
          return smoothDnD.useTransformForGhost === true;
        },
        getOptions: getOptions,
        setOptions: setOptions,
      };

      return container;
    };
  }

  // exported part of container
  var smoothDnD = function (element, options) {
    var containerIniter = Container$1(element);
    var container = containerIniter(options);
    element[containerInstance] = container;
    Mediator$1.init();
    Mediator$1.register(container);
    return {
      dispose: function dispose () {
        Mediator$1.unregister(container);
        container.dispose(container);
        Mediator$1.destroy();
      },
      setOptions: function setOptions (options, merge) {
        container.setOptions(options, merge);
      },
    };
  };

  // wrap all draggables by default
  // in react,vue,angular this value will be set to false
  smoothDnD.wrapChild = true;
  smoothDnD.cancelDrag = function () {
    Mediator$1.cancelDrag();
  };

  smoothDnD.isDragging = function () {
    return Mediator$1.isDragging();
  };

  var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  function getTagProps (ctx, tagClasses) {
    var tag = ctx.$props.tag;
    if (tag) {
      if (typeof tag === 'string') {
        var result = { value: tag };
        if (tagClasses) {
          result.props = { class: tagClasses };
        }
        return result;
      } else if (typeof tag === 'object') {
        var result$1 = { value: tag.value || 'div', props: tag.props || {} };

        if (tagClasses) {
          if (result$1.props.class) {
            if (isArray(result$1.props.class)) {
              result$1.props.class.push(tagClasses);
            } else {
              result$1.props.class = [tagClasses, result$1.props.class];
            }
          } else {
            result$1.props.class = tagClasses;
          }
        }

        return result$1;
      }
    }
    return { value: 'div' };
  }

  function validateTagProp (tag) {
    if (tag) {
      if (typeof tag === 'string') { return true; }
      if (typeof tag === 'object') {
        if (
          typeof tag.value === 'string' ||
          typeof tag.value === 'function' ||
          typeof tag.value === 'object'
        ) {
          return true;
        }
      }
      return false;
    }
    return true;
  }

  /* eslint-disable curly */
  smoothDnD.dropHandler = reactDropHandler().handler;
  smoothDnD.wrapChild = false;

  var eventEmitterMap = {
    // eslint-disable-next-line quote-props
    drop: 'onDrop',
    'drag-end': 'onDragEnd',
    'drag-start': 'onDragStart',
    'drag-enter': 'onDragEnter',
    'drag-leave': 'onDragLeave',
    'drop-ready': 'onDropReady',
    'drop-not-allowed': 'dropNotAllowed'
  };

  function getContainerOptions (props, context) {
    var options = Object.keys(props).reduce(function (result, key) {
      var optionName = key;
      var prop = props[optionName];

      if (prop !== undefined) {
        if (typeof prop === 'function') {
          if (eventEmitterMap[optionName]) {
            result[eventEmitterMap[optionName]] = function (params) {
              context.$emit(optionName, params);
            };
          } else {
            result[optionName] = function () {
              var params = [], len = arguments.length;
              while ( len-- ) params[ len ] = arguments[ len ];

              return prop.apply(void 0, params);
            };
          }
        } else {
          result[optionName] = prop;
        }
      }

      return result;
    }, {});

    return options;
  }

  var mapOptions = function (context) {
    var props = Object.assign({}, context.$props, context.$attrs);
    return getContainerOptions(props, context);
  };

  var Container = {
    name: 'Container',
    mounted: function mounted () {
      this.containerElement = this.$refs.container || this.$el;
      this.container = smoothDnD(this.containerElement, mapOptions(this));
    },
    updated: function updated () {
      if (
        this.$refs.container !== this.containerElement &&
        this.$el !== this.containerElement
      ) {
        if (this.container) {
          this.container.dispose();
        }
        this.containerElement = this.$refs.container || this.$el;
        this.container = smoothDnD(this.containerElement, mapOptions(this));
        return;
      }

      this.container.setOptions(mapOptions(this));
    },
    destroyed: function destroyed () {
      if (this.container) {
        this.container.dispose();
      }
    },
    props: {
      behaviour: String,
      groupName: String,
      orientation: String,
      dragHandleSelector: String,
      nonDragAreaSelector: String,
      dragBeginDelay: Number,
      animationDuration: Number,
      autoScrollEnabled: { type: Boolean, default: true },
      lockAxis: String,
      dragClass: String,
      dropClass: String,
      removeOnDropOut: { type: Boolean, default: false },
      'drag-start': Function,
      'drag-end': Function,
      drop: Function,
      getChildPayload: Function,
      shouldAnimateDrop: Function,
      fireRelatedEventsOnly: { type: Boolean, default: false },
      shouldAcceptDrop: Function,
      'drag-enter': Function,
      'drag-leave': Function,
      tag: {
        validator: validateTagProp,
        default: 'div',
      },
      getGhostParent: Function,
      'drop-ready': Function,
      dropPlaceholder: [Object, Boolean],
    },
    render: function () {
      var tagProps = getTagProps(this);
      return vue.h(
        tagProps.value,
        Object.assign({}, { ref: 'container' }, tagProps.props),
        this.$slots.default()
      );
    },
  };

  var wrapChild = function (createElement, ctx) {
    var tagProps = getTagProps(ctx, [
      'dndrop-draggable-wrapper',
      ctx.dragNotAllowed ? 'dndrop-not-draggable' : '' ]);
    return createElement(
      tagProps.value,
      Object.assign({}, tagProps.props),
      ctx.$slots.default()
    );
  };

  var Draggable = {
    name: 'Draggable',
    props: {
      tag: {
        validator: validateTagProp,
        default: 'div',
      },
      dragNotAllowed: {
        type: Boolean,
        default: false,
      },
    },
    render: function () {
      return wrapChild(vue.h, this);
    }
  };

  exports.Container = Container;
  exports.Draggable = Draggable;
  exports.smoothDnD = smoothDnD;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
