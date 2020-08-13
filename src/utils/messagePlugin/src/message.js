function _createToast(options) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.style.backgroundColor = options.type === 'error' ? '#e09393' : '#87cb87';
  toast.insertAdjacentHTML('afterbegin', `
    <div class="toast-body">
      ${options.message || ''}
    </div>
  `);
  document.body.appendChild(toast);
  return toast;
}

const Message = function(message, type = 'message') {
  const toast = _createToast({message, type});
  setTimeout(() => {
    toast.classList.add('show');
  }, 1);
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
  setTimeout(() => {
    toast.parentNode.removeChild(toast);
  }, 3000);
};

export default Message;
