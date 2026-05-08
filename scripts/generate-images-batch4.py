"""
Batch 4 — 8 Helsinki Michelin-room interior shots + About hero.

Each Helsinki interior is given a distinct visual key so the 8 cards don't
converge into a single mood. No human faces (brand rule).
"""

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
    "Editorial documentary interior photography, soft natural daylight or low warm "
    "candlelight, low-saturation Nordic palette, cinematic but understated. "
    f"{NEGATIVES}."
)

IMAGES: list[tuple[str, str, str]] = [
    # 8 Helsinki Michelin-room interiors — each card gets a distinct visual key
    ("hki-olo.jpg",
     "Interior of a long-standing Helsinki fine-dining restaurant on Pohjoisesplanadi: "
     "polished oak parquet, classic Nordic chairs, white linen tablecloths, brass pendant "
     "lights low over each table. Empty before service. Pre-dinner blue-hour light bleeding "
     "in from a tall window onto the harbour. Composition centred on a single set table. "
     + STYLE,
     "1024x1024"),

    ("hki-palace.jpg",
     "Interior of a 10th-floor Helsinki harbourfront restaurant with floor-to-ceiling "
     "windows showing Eteläranta harbour at golden hour: anchored ferries in the distance, "
     "warm late-afternoon light flooding the room, mid-century modern chairs, a single "
     "polished steel cutlery setting on a linen-covered table in the foreground. " + STYLE,
     "1024x1024"),

    ("hki-demo.jpg",
     "Interior of a small intimate Helsinki tasting-menu restaurant: warm wood-panel walls, "
     "compact 8-table room, exposed brass pendant lights, a single wooden table with two "
     "place settings in the foreground, open pass to a small kitchen visible deep in the "
     "background. Pre-service warm low light. " + STYLE,
     "1024x1024"),

    ("hki-gron.jpg",
     "Interior of a plant-forward Helsinki tasting-menu room: bright airy whitewashed walls "
     "with one large potted herb planter visible against the back wall, blond-wood tables, "
     "rattan-and-oak chairs, natural daylight from a tall window. A single plate dressed with "
     "vegetables and edible flowers in soft focus on a foreground table. " + STYLE,
     "1024x1024"),

    ("hki-inari.jpg",
     "Interior of a small Sami-influenced fine-dining room in Helsinki: dark wood-panel walls, "
     "muted earthy tones, traditional reindeer-hide draped over the back of a single chair "
     "as a discreet motif, low warm candlelight, a hand-thrown ceramic plate set on a linen "
     "tablecloth in the foreground. Serene minimalism. " + STYLE,
     "1024x1024"),

    ("hki-ora.jpg",
     "Interior of a residential-feel Nordic restaurant on a quiet Eira side street: high "
     "ceilings, exposed-beam ceiling, sage-green walls, a single long communal wooden table "
     "in the foreground with linen napkins, a vase of foraged herbs, late afternoon "
     "neighbourhood light through tall windows. Intimate warm atmosphere. " + STYLE,
     "1024x1024"),

    ("hki-finnjavel.jpg",
     "Interior of a theatrical modern-Finnish restaurant in Helsinki: bold deep-blue "
     "lacquered walls, dramatic black wrought-iron pendant lights low over every table, "
     "polished black tabletops, a single plate with a deconstructed Finnish classic in the "
     "foreground. Energetic atmosphere, deeper saturation than the others. " + STYLE,
     "1024x1024"),

    ("hki-ultima.jpg",
     "Interior of a futuristic sustainability-focused Helsinki tasting-menu restaurant: "
     "the back wall is a vertical farm with hydroponic planters glowing soft green, blond-wood "
     "communal table in the foreground, brushed-steel detailing, a single plate of fresh-cut "
     "microgreens in soft focus. Daylight from above. Clean, slightly clinical. " + STYLE,
     "1024x1024"),

    # About hero
    ("hero-about.jpg",
     "Editorial worktable scene of a Lapland food writer: a wooden desk in soft cool "
     "Arctic daylight from a window, an open notebook, a stack of cookbooks, a small "
     "ceramic bowl of bilberries, a steaming mug, a wooden cutting board. No people, no "
     "faces. Documentary feel. " + STYLE,
     "1536x1024"),
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
    with cf.ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(generate_one, api_key, n, p, s, out_dir): n for n, p, s in plan}
        for fut in cf.as_completed(futures):
            name, ok, msg = fut.result()
            print(f"  {'OK' if ok else 'FAIL'}  {name:30s}  {msg}")
            if not ok: failed.append(name)
    if failed: print(f"\nFAILED: {', '.join(failed)}"); return 1
    print("\nAll generated."); return 0


if __name__ == "__main__":
    sys.exit(main())
