let supported: boolean | undefined;

/** Whether this browser can create a WebGL context (checked once). */
export function hasWebGL() {
  if (supported === undefined) {
    try {
      const c = document.createElement("canvas");
      supported = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      supported = false;
    }
  }
  return supported;
}
