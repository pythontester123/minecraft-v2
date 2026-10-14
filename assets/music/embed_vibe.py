#!/usr/bin/env python3
"""Musiques « vibe » : convertit les musiques données par le joueur et les intègre au jeu.

Usage : python3 assets/music/embed_vibe.py [nouveaux fichiers audio ou vidéo…]

Chaque nouveau fichier est converti en MP3 (stéréo, ~130 kbit/s, volume ramené à -16 LUFS)
dans assets/music/vibe/, puis toutes les musiques de ce dossier sont intégrées dans
minecraft-v2.html (bloc <script id="vibe-data">). Nécessite ffmpeg.
"""
import base64, json, pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
VIBE = ROOT / 'assets' / 'music' / 'vibe'
HTML = ROOT / 'minecraft-v2.html'
TARGET = -16.0  # LUFS


def encode(src):
    out = VIBE / (re.sub(r'[^\w-]+', '_', pathlib.Path(src).stem).strip('_') + '.mp3')
    r = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', src, '-vn', '-af', 'loudnorm=print_format=json',
                        '-f', 'null', '-'], capture_output=True, text=True, check=True)
    m = json.loads(r.stderr[r.stderr.rindex('{'):])
    gain = min(TARGET - float(m['input_i']), -1.0 - float(m['input_tp']))  # sans dépasser -1 dBTP
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', src, '-vn', '-map_metadata', '-1', '-af', f'volume={gain:.2f}dB',
                    '-ac', '2', '-ar', '44100', '-c:a', 'libmp3lame', '-q:a', '5', str(out)], check=True)
    print(f'{out.name} : {float(m["input_i"]):.1f} LUFS, gain {gain:+.1f} dB, {out.stat().st_size // 1024} Ko')


def embed():
    tracks = [{'name': p.stem, 'data': base64.b64encode(p.read_bytes()).decode()} for p in sorted(VIBE.glob('*.mp3'))]
    block = ('<script id="vibe-data">// Musiques « vibe » (assets/music/vibe), créées par le joueur. '
             'Généré par assets/music/embed_vibe.py.\nconst VIBE_DATA=' + json.dumps(tracks, separators=(',', ':')) + ';\n</script>')
    html = HTML.read_text(encoding='utf-8')
    html, n = re.subn(r'<script id="vibe-data">.*?</script>', lambda _: block, html, count=1, flags=re.S)
    assert n == 1, 'bloc <script id="vibe-data"> introuvable'
    HTML.write_text(html, encoding='utf-8')
    print(f'{len(tracks)} musique(s) intégrée(s), minecraft-v2.html : {HTML.stat().st_size / 1e6:.1f} Mo')


if __name__ == '__main__':
    VIBE.mkdir(parents=True, exist_ok=True)
    for f in sys.argv[1:]:
        encode(f)
    embed()
