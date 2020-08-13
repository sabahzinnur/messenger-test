function _getInstance(el) {
  const tooltipHtml = el.getElementsByClassName('tooltip');
  if (tooltipHtml.length) {
    return tooltipHtml[0];
  }
}

const Tooltip = {
  init(el, value) {
    el.onmouseover = function (event) {
      const currentTooltip = _getInstance(el);
      if (currentTooltip) {
        return;
      }
      const tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerHTML = value;
      el.append(tooltipElem);

      const coords = el.getBoundingClientRect();

      let left = coords.left + (el.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0;

      let top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) {
        top = coords.top + el.offsetHeight + 5;
      }

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
    };

    el.onmouseout = function (e) {
      const tooltipHtml = el.getElementsByClassName('tooltip');
      if (tooltipHtml.length) {
        el.removeChild(tooltipHtml[0]);
      }
    };
  },
  destroy(el) {
    const currentTooltip = _getInstance(el);
    if (currentTooltip) {
      el.removeChild(currentTooltip);
    }
  }
};

export default Tooltip;
