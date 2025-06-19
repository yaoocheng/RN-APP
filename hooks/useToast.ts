import Toast from 'react-native-toast-message';

export interface ToastOptions {
  text1?: string;
  text2?: string;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
}

export const useToast = () => {
  const showSuccess = (message: string, options?: ToastOptions) => {
    Toast.show({
      type: 'success',
      text1: 'success',
      text2: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 60,
      ...options,
    });
  };

  const showError = (message: string, options?: ToastOptions) => {
    Toast.show({
      type: 'error',
      text1: 'error',
      text2: message,
      position: 'top',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 60,
      ...options,
    });
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    Toast.show({
      type: 'info',
      text1: 'info',
      text2: message,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 60,
      ...options,
    });
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    Toast.show({
      type: 'error', // react-native-toast-message 没有 warning 类型，使用 error
      text1: 'error',
      text2: message,
      position: 'top',
      visibilityTime: 3500,
      autoHide: true,
      topOffset: 60,
      ...options,
    });
  };

  const showCustom = (type: string, text1: string, text2?: string, options?: ToastOptions) => {
    Toast.show({
      type,
      text1,
      text2,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 60,
      ...options,
    });
  };

  const hide = () => {
    Toast.hide();
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showCustom,
    hide,
  };
};

export default useToast;