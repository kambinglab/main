export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const CAS_SERVICE_URL = `${SITE_URL}/login/verify`;
export const CAS_LOGIN_URL = `https://sso.ui.ac.id/cas2/login?service=${CAS_SERVICE_URL}`;
export const CAS_VALIDATE_URL = "https://sso.ui.ac.id/cas2/serviceValidate";
