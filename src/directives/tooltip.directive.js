import Tooltip from '../utils/tooltipPlugin';

export default {
  bind(el, {value}) {
    Tooltip.init(el, value);
  },
  unbind(el) {
    Tooltip.destroy(el);
  }
};
