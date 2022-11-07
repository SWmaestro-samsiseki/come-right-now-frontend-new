function messageToNative(message: object | string | number | unknown): void {
  window.ReactNativeWebView.postMessage(JSON.stringify(message));
}

export { messageToNative };
