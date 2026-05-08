"""Batch 6 — About-page sister-site mood images (3) + intro lead inline."""

from __future__ import annotations
import argparse, base64, concurrent.futures as cf, json, os, sys, time, urllib.request
from io import BytesIO
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow not installed", file=sys.stderr); sys.exit(2)

API_URL = "https://api.openai.com/v1/images/generations"
MODEL = "gpt-image-1"

NEGATIVES = (
    "no text, no logos, no watermarks, no UI elements, no overlay graphics, "
    "no stock-photo plastic look, no neon, no oversaturation, no obvious AI artefacts, "
    "no human faces, no people in foreground"
)
STYLE = (
    "Editorial documentary photography, soft Arctic daylight or warm low candlelight, "
    "low-saturation Nordic palette with warm wood and linen textures, "
    "cinematic but understated. " + NEGATIVES + "."
)

IMAGES: list[tuple[str, str, str]] = [
    ("network-dining.jpg",
     "Close-up of a small fine-dining table set for two in a Lapland restaurant: white linen "
     "tablecloth, polished cutlery, single tall taper candle, two crystal wine glasses already "
     "filled, warm low candlelight, dark wood walls in soft focus. Pre-service moment. " + STYLE,
     "1024x1024"),

    ("network-bars.jpg",
     "Close-up of a wooden bar counter in a Lapland pub: a single glass of dark amber craft "
     "beer with foam, a small bowl of pretzels beside it, low warm tungsten lighting, dark "
     "wood-panel back wall in soft focus, edge of a stack of bar coasters visible. " + STYLE,
     "1024x1024"),

    ("network-nightlife.jpg",
     "Interior of a small Lapland late-night bar or live-music venue: dim warm lights, a row "
     "of three glass bulbs over a wooden counter, a slight haze of dim atmosphere, no people, "
     "polar-night blue twilight bleeding through a far window. " + STYLE,
     "1024x1024"),
]


def request_image(api_key, prompt, size):
    body = json.dumps({"model": MODEL, "prompt": prompt, "n": 1, "size": size, "quality": "high"}).encode("utf-8")
    req = urllib.request.Request(API_URL, data=body,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=300) as resp:
        return base64.b64decode(json.loads(resp.read())["data"][0]["b64_json"])


def save_jpeg(png_bytes, out_path):
    img = Image.open(BytesIO(png_bytes)).convert("RGB")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "JPEG", quality=85, optimize=True, progressive=True)


def generate_one(api_key, name, prompt, size, out_dir):
    started = time.time()
    try:
        save_jpeg(request_image(api_key, prompt, size), out_dir / name)
        return name, True, f"{(out_dir/name).stat().st_size//1024} kB in {time.time()-started:.1f} s"
    except Exception as e:
        return name, False, f"{type(e).__name__}: {e}"


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--only"); args = ap.parse_args()
    out_dir = Path(__file__).resolve().parent.parent / "public" / "images"
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key: print("ERROR: OPENAI_API_KEY not set", file=sys.stderr); return 2
    plan = [(n, p, s) for n, p, s in IMAGES if not args.only or args.only == n]
    out_dir.mkdir(parents=True, exist_ok=True)
    print(f"Generating {len(plan)} images via {MODEL} -> {out_dir}\n")
    failed = []
    with cf.ThreadPoolExecutor(max_workers=3) as pool:
        futures = {pool.submit(generate_one, api_key, n, p, s, out_dir): n for n, p, s in plan}
        for fut in cf.as_completed(futures):
            name, ok, msg = fut.result()
            print(f"  {'OK' if ok else 'FAIL'}  {name:30s}  {msg}")
            if not ok: failed.append(name)
    if failed: print(f"\nFAILED: {', '.join(failed)}"); return 1
    print("\nAll generated."); return 0


if __name__ == "__main__":
    sys.exit(main())
