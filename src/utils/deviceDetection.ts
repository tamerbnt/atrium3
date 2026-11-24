/**
 * Device and performance capabilities detector
 */

export interface DeviceProfile {
  isLowEnd: boolean;
  prefersReducedMotion: boolean;
  isMobile: boolean;
  hasWebGL: boolean;
  isSoftwareGl: boolean;
  recommendedMode: '3d' | 'fallback';
  reason: string;
}

let cachedWebGLProbe: { hasWebGL: boolean; isSoftwareGl: boolean } | null = null;

export function probeWebGLCapabilities(): { hasWebGL: boolean; isSoftwareGl: boolean } {
  if (cachedWebGLProbe) return cachedWebGLProbe;
  if (typeof document === 'undefined') {
    return { hasWebGL: true, isSoftwareGl: false };
  }

  let hasWebGL = true;
  let isSoftwareGl = false;

  try {
    const canvas = document.createElement('canvas');
    const gl = (
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    ) as WebGLRenderingContext | WebGL2RenderingContext | null;

    if (!gl) {
      hasWebGL = false;
      isSoftwareGl = true;
    } else {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param) || '');
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    }
  } catch {
    hasWebGL = true;
    isSoftwareGl = false;
  }

  cachedWebGLProbe = { hasWebGL, isSoftwareGl };
  return cachedWebGLProbe;
}

export function detectDeviceCapabilities(): DeviceProfile {
  if (typeof window === 'undefined') {
    return {
      isLowEnd: false,
      prefersReducedMotion: false,
      isMobile: false,
      hasWebGL: true,
      isSoftwareGl: false,
      recommendedMode: '3d',
      reason: 'Server-side rendering default',
    };
  }

  // 1. Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Mobile detection (includes phones, tablets, and responsive testing viewports < 1024px)
  // When window width is >= 1024px, always treat as desktop so resizing or DevTools testing doesn't stick
  const isMobile = window.innerWidth < 1024;

  // 3. Cached WebGL & Software-GL probe (zero context leak across resizes)
  const { hasWebGL, isSoftwareGl } = probeWebGLCapabilities();

  // 4. Low-end hardware detection
  let isLowEnd = false;
  let reason = 'Optimal hardware configuration';

  if (!hasWebGL) {
    isLowEnd = true;
    reason = 'No WebGL hardware acceleration found';
  } else if (prefersReducedMotion) {
    reason = 'User prefers reduced motion';
  }

  // Default to 3D mode for all visitors; fallback is only used if WebGL is completely unavailable
  const recommendedMode = hasWebGL ? '3d' : 'fallback';

  return {
    isLowEnd,
    prefersReducedMotion,
    isMobile,
    hasWebGL,
    isSoftwareGl,
    recommendedMode,
    reason,
  };
}
