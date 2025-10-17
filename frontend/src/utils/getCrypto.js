export function getCrypto() {
  try {
    return window.crypto;
  } catch {
    return crypto;
  }
}

export async function hashPassword(value)
{
    const compatibleCrypto = getCrypto();

    const salt = 10

    const passwordEncode = new TextEncoder().encode(value);
    const byteHash = await compatibleCrypto.subtle.digest("SHA-512", passwordEncode)

    const arrayHash = Array.from(new Uint8Array(byteHash));
    const hashedValue = arrayHash
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .toLocaleLowerCase();

    return hashedValue
}
