'use client'

export const getDeviceType = (): string => {
  const width = window.innerWidth;
  const userAgent = navigator.userAgent.toLowerCase();

  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const isMobile = /android|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/.test(userAgent);
  const isTablet = /ipad|android(?!.*mobile)|tablet/.test(userAgent);

  let deviceType: string;

  switch (true) {
    case isMobile:
      deviceType = "Mobile";
      break;
    case isTablet:
      deviceType = "Tablet";
      break;
    case width >= 768 && width <= 1024 && hasTouch:
      deviceType = "Tablet";
      break;
    case width > 1024 && !hasTouch:
      deviceType = "Desktop";
      break;
    default:
      deviceType = "Desktop";
      break;
  }

  return deviceType;
}

export const deviceType = getDeviceType();