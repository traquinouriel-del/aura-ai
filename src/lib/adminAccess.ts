const ADMIN_EMAILS = ['traquinouriel@gmail.com'];
const ADMIN_PHONES = ['+244923000000'];

export function isAdminEmail(email: string | null | undefined): boolean {
  return !!email && ADMIN_EMAILS.includes(email.toLowerCase());
}

export function isAdminPhone(phone: string | null | undefined): boolean {
  return !!phone && ADMIN_PHONES.includes(phone.replace(/\s/g, ''));
}

export function isAdmin(email: string | null | undefined, phone: string | null | undefined): boolean {
  return isAdminEmail(email) || isAdminPhone(phone);
}
