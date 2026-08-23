"""Cloudberry-syvasivun kuvat (P5, 2026-08-24) — gpt-image-1, talon promptisaannot.

Kolme kuvaa /cloudberry-sivulle. Saannot (lv_permanent_rules + per-site-muisti):
  - ei ihmiskasvoja, ei ihmisia, ei kasia (AI-kadet epakanonisia)
  - ei painettavia pintoja: teksti estetaan SOMMITTELULLA, ei negatiivipromptilla
    (sister-bars-oppi 23.8.: hillo kulhossa, EI purkissa jossa olisi etiketti)
  - editorial documentary, soft Arctic daylight, low-saturation Nordic palette
  - hero 1536x1024 (teksti istuu vasemmalle -> marjat oikealle alas),
    osiokuvat 1024x1024
Tallennus: JPEG q=85 progressive + WebP q=82 (+ AVIF jos Pillow osaa).
"""
from __future__ import annotations
import base64, json, os, sys, urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image

API_URL = "https://api.openai.com/v1/images/generations"
MODEL = "gpt-image-1"

STYLE = (
    "Editorial documentary photography, soft diffused Arctic daylight, "
    "low-saturation Nordic palette, understated and natural. "
    "No people, no human faces, no hands, no text, no logos, no watermarks, no signage."
)

IMAGES = [
    {
        "name": "hero-cloudberry",
        "size": "1536x1024",
        "prompt": (
            "Wide photograph of an open Lapland peat bog in late July: low cloudberry plants "
            "with ripe amber-orange berries filling the foreground on the lower right, tufts of "
            "white cottongrass scattered across the mire, a still dark bog pool reflecting pale "
            "overcast sky on the left, a thin line of low pines on the far horizon. The left half "
            "of the frame stays open and calm so a headline could sit over it. Shallow depth of "
            "field toward the horizon. " + STYLE
        ),
    },
    {
        "name": "cloudberry-ripeness",
        "size": "1024x1024",
        "prompt": (
            "Close-up photograph of wild cloudberry plants on a Lapland bog: one fully ripe soft "
            "amber-orange cloudberry and one unripe firm red cloudberry on separate low stems, "
            "pleated three-lobed green leaves, sphagnum moss below, tiny drops of morning dew, "
            "shallow depth of field with a softly blurred bog background. " + STYLE
        ),
    },
    {
        "name": "cloudberry-jam-cheese",
        "size": "1024x1024",
        "prompt": (
            "Food photograph on a worn wooden table by a window in soft northern daylight: a "
            "ceramic plate of golden pan-toasted Finnish bread cheese wedges topped with warm "
            "amber cloudberry jam with whole berries visible, next to it a small plain glass bowl "
            "of the same jam with a spoon resting in it, a folded linen cloth beside the plate, "
            "background in deep soft focus. Every container is plain glass or ceramic with no "
            "labels, no packaging, no printed surfaces anywhere. " + STYLE
        ),
    },
]

OUT = Path(__file__).resolve().parent.parent / "public" / "images"


def gen(entry: dict, api_key: str) -> None:
    body = json.dumps({
        "model": MODEL, "prompt": entry["prompt"], "size": entry["size"],
        "quality": "high", "n": 1,
    }).encode()
    req = urllib.request.Request(
        API_URL, data=body,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST")
    with urllib.request.urlopen(req, timeout=600) as resp:
        data = json.loads(resp.read())
    img = Image.open(BytesIO(base64.b64decode(data["data"][0]["b64_json"]))).convert("RGB")
    jpg = OUT / f"{entry['name']}.jpg"
    img.save(jpg, "JPEG", quality=85, progressive=True, optimize=True)
    print(f"saved {jpg} {img.size} {jpg.stat().st_size//1024} kB", flush=True)
    webp = OUT / f"{entry['name']}.webp"
    img.save(webp, "WEBP", quality=82, method=6)
    print(f"saved {webp} {webp.stat().st_size//1024} kB", flush=True)
    try:
        avif = OUT / f"{entry['name']}.avif"
        img.save(avif, "AVIF", quality=60)
        print(f"saved {avif} {avif.stat().st_size//1024} kB", flush=True)
    except Exception as e:  # Pillow ilman avif-tukea: webp+jpg riittavat
        print(f"avif skip ({entry['name']}): {e}", flush=True)


def main() -> int:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("ERROR: OPENAI_API_KEY not set", file=sys.stderr)
        return 2
    only = sys.argv[1] if len(sys.argv) > 1 else None
    for entry in IMAGES:
        if only and entry["name"] != only:
            continue
        gen(entry, api_key)
    return 0


if __name__ == "__main__":
    sys.exit(main())
