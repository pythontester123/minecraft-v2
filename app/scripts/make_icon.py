"""Dessine l'icône de l'application (bloc d'herbe en 3D isométrique) à partir des
textures Pixel Perfection CE du jeu (CC BY-SA 4.0, voir assets/LICENSES.md).
Sorties : app/build/icon.ico (16 à 256 px) et app/build/icon.png (512 px).
Usage : python3 app/scripts/make_icon.py   (nécessite Pillow)"""
import json, os
from PIL import Image, ImageFilter

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
TEX = os.path.join(ROOT, 'assets', 'textures')
OUT = os.path.join(ROOT, 'app', 'build')
GRASS = (121, 192, 90)          # teinte de l'herbe (plaines)

idx = json.load(open(os.path.join(TEX, 'sheet_index.json')))
sheet = Image.open(os.path.join(TEX, 'pixel_perfection_sheet.png')).convert('RGBA')
def cell(name):
    i = idx['index'][name]; c = idx['cols']
    return sheet.crop(((i % c) * 16, (i // c) * 16, (i % c) * 16 + 16, (i // c) * 16 + 16))

def tinted(img, everywhere):
    """Les pixels gris de l'herbe sont multipliés par la teinte (comme dans le jeu)."""
    out = img.copy(); px = out.load()
    for y in range(16):
        for x in range(16):
            r, g, b, a = px[x, y]
            if everywhere or (r and g / r > 0.85):
                k = 1.18
                px[x, y] = (min(255, int(r * GRASS[0] / 255 * k)), min(255, int(g * GRASS[1] / 255 * k)), min(255, int(b * GRASS[2] / 255 * k)), 255)
            else:
                px[x, y] = (r, g, b, 255)
    return out

top = tinted(cell('grass_top'), True)
side = tinted(cell('grass_side'), False)

def render(S):
    """Cube isométrique, chaque texel reste un parallélogramme net (échantillonnage au plus proche)."""
    img = Image.new('RGBA', (S, S), (0, 0, 0, 0)); px = img.load()
    m = S * 0.05; w = (S - 2 * m) / 1.06; h = w * 0.5     # largeur du cube, hauteur du losange du dessus
    H = w * 0.56                                           # hauteur des faces latérales
    x0 = (S - w) / 2; T = (S / 2, m); L = (x0, m + h / 2); R = (x0 + w, m + h / 2); C = (S / 2, m + h)
    faces = [  # origine, axe u, axe v, texture, luminosité
        (T, (R[0] - T[0], R[1] - T[1]), (L[0] - T[0], L[1] - T[1]), top, 1.0),
        (L, (C[0] - L[0], C[1] - L[1]), (0, H), side, 0.80),
        (C, (R[0] - C[0], R[1] - C[1]), (0, H), side, 0.62),
    ]
    for O, U, V, tex, lum in faces:
        det = U[0] * V[1] - U[1] * V[0]; tp = tex.load()
        for y in range(S):
            for x in range(S):
                dx = x + 0.5 - O[0]; dy = y + 0.5 - O[1]
                u = (dx * V[1] - dy * V[0]) / det; v = (U[0] * dy - U[1] * dx) / det
                if 0 <= u < 1 and 0 <= v < 1:
                    r, g, b, a = tp[min(15, int(u * 16)), min(15, int(v * 16))]
                    px[x, y] = (int(r * lum), int(g * lum), int(b * lum), 255)
    # légère ombre portée pour détacher l'icône du fond
    sh = Image.new('RGBA', (S, S), (0, 0, 0, 0)); a = img.split()[3].point(lambda v: 90 if v else 0)
    sh.putalpha(a); sh = sh.transform((S, S), Image.AFFINE, (1, 0, -S * 0.015, 0, 1, -S * 0.03)).filter(ImageFilter.GaussianBlur(S * 0.02))
    return Image.alpha_composite(sh, img)

big = render(512)
big.save(os.path.join(OUT, 'icon.png'))
sizes = [256, 128, 64, 48, 32, 24, 16]
imgs = [render(s) if s >= 128 else big.resize((s, s), Image.LANCZOS) for s in sizes]
imgs[0].save(os.path.join(OUT, 'icon.ico'), format='ICO', sizes=[(s, s) for s in sizes], append_images=imgs[1:])
print('icônes écrites dans', OUT)
