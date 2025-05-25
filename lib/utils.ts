export const hexToRGB = (hex: string) => {
    let alpha = false,
        h = hex.slice(hex.startsWith("#") ? 1 : 0);

    if (h.length === 3)
        h = [...h].map((x) => x + x).join("");
    else if (h.length === 8)
        alpha = true;

    let n = parseInt(h, 16);

    return {
        r: (n >>> (alpha ? 24 : 16)),
        g: ((n & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)),
        b: ((n & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)),
        a: alpha ? n & 0x000000ff : 1
    }
};