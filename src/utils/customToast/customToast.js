import {  toast,Bounce } from 'react-toastify';
const showToast = (message, type = 'success', options = {}) => {
    const toastOptions = {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
      ...options, // Merge with custom options
    };
  
    if (type === 'error') {
      toast.error(message, toastOptions);
    } else {
      toast.success(message, toastOptions);
    }
  };
  
  const ErrorToast = (message, options) => showToast(message, 'error', options);
  const SuccessToast = (message, options) => showToast(message, 'success', options);

  export {ErrorToast,SuccessToast }
  