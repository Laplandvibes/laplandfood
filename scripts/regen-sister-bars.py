"""Kertaluontoinen: sister-bars.jpg uusiksi ILMAN tekstipintoja.

Vanha kuva (10.8.) stensiloi taustalaatikoihin keksityt panimonimet
"LAPIN PANIMO" ja "ARCTIC BREW" 8x luettavina (IMAGE-TEXT-AUDIT-2026-08-17).
Negatiiviprompti EI esta tekstia — vain sommittelu estaa (lv_permanent_rules
6.5): tassa promptissa ei ole yhtaan painettavaa pintaa (ei laatikoita,
pulloetiketteja, kellareita, kROOLeja), ja tausta on syvassa epatarkkuudessa.
"""
from __future__ import annotations
import base64, json, os, sys, urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image

API_URL = "https://api.openai.com/v1/images/generations"
MODEL = "gpt-image-1"

PROMPT = (
    "Close-up editorial photograph of a worn wooden bar counter in a small Lapland pub: "
    "two glasses of craft beer, one amber and one dark stout, standing on the bare wood, "
    "a folded linen cloth beside them, warm low tungsten light from the left, "
    "background completely out of focus with only soft warm bokeh of candle flames and "
    "window twilight, shallow depth of field. "
    "There must be no printable surfaces anywhere: no crates, no boxes, no bottles, "
    "no labels, no signage, no chalkboards, no coasters with print, no packaging, "
    "no taps with badges. Editorial documentary photography, low-saturation Nordic "
    "palette with warm wood textures, cinematic but understated. "
    "No text, no logos, no watermarks, no human faces, no people."
)

def main() -> int:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("ERROR: OPENAI_API_KEY not set", file=sys.stderr)
        return 2
    body = json.dumps({
        "model": MODEL, "prompt": PROMPT, "size": "1536x1024",
        "quality": "high", "n": 1,
    }).encode()
    req = urllib.request.Request(
        API_URL, data=body,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST")
    with urllib.request.urlopen(req, timeout=300) as resp:
        data = json.loads(resp.read())
    b64 = data["data"][0]["b64_json"]
    img = Image.open(BytesIO(base64.b64decode(b64))).convert("RGB")
    out = Path(__file__).resolve().parent.parent / "public" / "images" / "sister-bars.jpg"
    img.save(out, "JPEG", quality=85, progressive=True, optimize=True)
    print(f"saved {out} {img.size}")
    return 0

if __name__ == "__main__":
    sys.exit(main())
