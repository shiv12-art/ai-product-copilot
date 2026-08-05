export function generateUUID(): string {
  // Generate a simple UUID v4-like string
  // Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function generateShortId(): string {
  // Generate a short ID: gen_xxxxxxxx
  return 'gen_' + Math.random().toString(36).substring(2, 10)
}
