"""
Batch-generate the 14 LaplandFood brand images via OpenAI gpt-image-1.

Saves PNG → JPG (Pillow recompress, q=85, progressive) into public/images/.
OG image is also generated landscape and cropped to 1200×630 social spec.

Usage:  python scripts/generate-images.py [--dry-run] [--only NAME]

Env:    OPENAI_API_KEY required.
"""

from __future__ import annotations
import argparse, base64, concurrent.futures as cf, json, os, sys, time, urllib.request
from io import BytesIO
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("ERROR: Pillow not installed. pip install Pillow", file=sys.stderr)
    sys.exit(2)

API_URL = "https://api.openai.com/v1/images/generations"
MODEL = "gpt-image-1"

# Brand-correct visual rule for every image:
#   - editorial / documentary feel, NOT stock photo
#   - LaplandVibes Finland-blue + warm-light editorial palette
#   - subject-led, ingredient-forward, real materials & textures
#   - cold Arctic light, soft shadows, low-saturation snow tones
#   - photographed on natural surfaces (wood, slate, linen) when relevant
#   - no AI-typical "everything everywhere" composition; keep one subject
#   - no text, no logos, no watermarks
NEGATIVES = (
    "no text, no logos, no watermarks, no UI elements, no overlay graphics, "
    "no stock-photo plastic look, no neon, no oversaturation, no obvious AI artefacts"
)
STYLE = (
    "Editorial documentary food photography, soft Arctic daylight, "
    "low-saturation Nordic palette with warm wood and linen textures, "
    "shallow depth of field, natural shadows, cinematic but understated. "
    "Composition leaves room for a dark gradient overlay at top and bottom. "
    f"{NEGATIVES}."
)

# (output filename, prompt, size)  — sizes supported by gpt-image-1: 1024x1024, 1024x1536, 1536x1024
IMAGES: list[tuple[str, str, str]] = [
    # === HOME HERO ===
    ("hero-main.jpg",
     "Wide cinematic shot of a black cast-iron pot of slow-cooked Lapland reindeer stew "
     "steaming over an open campfire at Arctic blue-hour dusk. Dark spruce trees behind, "
     "fresh snow on the ground catching the last cold light. The pot is centred low in "
     "the frame leaving the upper third sky to breathe. " + STYLE,
     "1536x1024"),

    # === SUBPAGE HEROES (6) ===
    ("hero-ingredients.jpg",
     "Top-down editorial still life of foraged Lapland ingredients arranged on rough birch "
     "wood: orange cloudberries in a small ceramic bowl, dark blue bilberries, scarlet "
     "lingonberries, a sliver of smoked reindeer, a pair of porcini mushrooms, a sprig of "
     "fresh dill. Soft cool daylight from the side, linen napkin in the corner. " + STYLE,
     "1536x1024"),

    ("hero-recipes.jpg",
     "Close-up of a heavy cast-iron pot full of bidos reindeer stew at the edge of a "
     "wood-fired campfire on packed snow. Steam rising. Hand of a Sami cook in a dark wool "
     "jumper visible at the side stirring with a wooden spoon. Cold golden firelight, blue "
     "twilight beyond the trees. " + STYLE,
     "1536x1024"),

    ("hero-modern.jpg",
     "Fine-dining tasting plate from a modern Lapland restaurant: pink sous-vide reindeer "
     "fillet, foraged microgreens and edible flowers, a smear of bilberry reduction, beetroot "
     "crisps, on a hand-thrown matte slate plate. Cool overhead daylight from a glass roof, "
     "linen tablecloth in soft focus. New-Nordic minimalism. " + STYLE,
     "1536x1024"),

    ("hero-foraging.jpg",
     "Hand of a forager picking a perfectly ripe amber cloudberry from a low arctic bog "
     "plant. Background: bog mosses, low ferns, soft warm light from a low midnight-sun "
     "horizon at midnight in July. Shallow depth of field, the cloudberry is sharply in "
     "focus. Real human skin and weathered fingernails, not glossy. " + STYLE,
     "1536x1024"),

    ("hero-michelin.jpg",
     "An empty fine-dining table set for one in a contemporary Nordic restaurant: white "
     "linen tablecloth, polished steel cutlery, a single tall taper candle, a foraged sprig "
     "of pine on a bone-china plate. Dark wooden walls behind, warm low candlelight. The "
     "atmosphere of a Michelin-recommended room before service starts. " + STYLE,
     "1536x1024"),

    ("hero-tours.jpg",
     "Small group of travellers gathered around a wood-fired kettle on a snowy Lapland "
     "forest clearing at golden afternoon light, learning to cook foraged mushrooms with a "
     "Finnish guide in a thick wool sweater. Steam, smoke from the fire, mossy spruce "
     "trunks. Documentary feel, like a quiet Sunday-supplement photograph. " + STYLE,
     "1536x1024"),

    # === HOME PILLAR CARDS (6) — square ===
    ("card-ingredients.jpg",
     "A wooden tray of foraged Lapland ingredients in soft natural daylight: bilberries, "
     "lingonberries, a single porcini mushroom, a sprig of dill. Tight composition, dark "
     "wood surface, no extras. " + STYLE,
     "1024x1024"),

    ("card-recipes.jpg",
     "An old enamel cast-iron pot of bidos reindeer stew, steaming, on a wooden table, "
     "shot from above. A wooden spoon resting on the rim. Warm low light. " + STYLE,
     "1024x1024"),

    ("card-modern.jpg",
     "A single modern fine-dining plate: pink-cooked reindeer slice, three dots of "
     "bilberry reduction, two foraged microgreens, on a matte slate plate. Top-down. " + STYLE,
     "1024x1024"),

    ("card-foraging.jpg",
     "A wicker basket holding freshly picked amber cloudberries on bog moss in soft "
     "midnight-sun light. Top-down composition. " + STYLE,
     "1024x1024"),

    ("card-michelin.jpg",
     "A starched white linen tablecloth corner with polished cutlery and a single "
     "taper-candle flame in low warm light, dark restaurant walls behind in soft focus. " + STYLE,
     "1024x1024"),

    ("card-tours.jpg",
     "A small Finnish kuksa wooden cup full of cloudberry tea steaming on a snowy log "
     "next to a dying campfire. Top-down. " + STYLE,
     "1024x1024"),
]

# OG image is generated landscape then cropped to the social-spec 1200×630.
OG_IMAGE = (
    "og-default.png",
    "Cinematic landscape photograph of a black cast-iron pot of bidos reindeer stew "
    "steaming over a Lapland campfire at blue-hour dusk, fresh snow ground, dark spruce "
    "horizon. Composition designed for a 1200x630 social card with a dark gradient overlay "
    "at the bottom for a title. " + STYLE,
    "1536x1024",
)


def request_image(api_key: str, prompt: str, size: str) -> bytes:
    body = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "n": 1,
        "size": size,
        "quality": "high",
    }).encode("utf-8")
    req = urllib.request.Request(
        API_URL,
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        payload = json.loads(resp.read())
    b64 = payload["data"][0]["b64_json"]
    return base64.b64decode(b64)


def save_jpeg(png_bytes: bytes, out_path: Path, *, max_quality: int = 85) -> None:
    img = Image.open(BytesIO(png_bytes)).convert("RGB")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "JPEG", quality=max_quality, optimize=True, progressive=True)


def save_og(png_bytes: bytes, out_dir: Path) -> None:
    img = Image.open(BytesIO(png_bytes)).convert("RGB")
    target_w, target_h = 1200, 630
    iw, ih = img.size
    scale = max(target_w / iw, target_h / ih)
    new = img.resize((int(iw * scale), int(ih * scale)), Image.LANCZOS)
    nw, nh = new.size
    left = (nw - target_w) // 2
    top = (nh - target_h) // 2
    cropped = new.crop((left, top, left + target_w, top + target_h))
    out_dir.mkdir(parents=True, exist_ok=True)
    cropped.save(out_dir / "og-default.jpg", "JPEG", quality=85, optimize=True, progressive=True)


def generate_one(api_key: str, name: str, prompt: str, size: str, out_dir: Path) -> tuple[str, bool, str]:
    out_path = out_dir / name
    started = time.time()
    try:
        png_bytes = request_image(api_key, prompt, size)
        save_jpeg(png_bytes, out_path)
        size_kb = out_path.stat().st_size // 1024
        return name, True, f"{size_kb} kB in {time.time()-started:.1f} s"
    except Exception as e:
        return name, False, f"{type(e).__name__}: {e}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="Print prompts without calling API")
    ap.add_argument("--only", help="Generate only this filename (e.g. hero-main.jpg)")
    ap.add_argument("--out", default=None, help="Output dir; defaults to ../public/images")
    args = ap.parse_args()

    repo_root = Path(__file__).resolve().parent.parent
    out_dir = Path(args.out) if args.out else repo_root / "public" / "images"
    public_root = repo_root / "public"

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key and not args.dry_run:
        print("ERROR: OPENAI_API_KEY not set", file=sys.stderr)
        return 2

    plan = [(n, p, s) for n, p, s in IMAGES if not args.only or args.only == n]

    if args.dry_run:
        for name, prompt, size in plan:
            print(f"\n— {name} ({size}) —\n{prompt}")
        if not args.only or args.only == OG_IMAGE[0]:
            print(f"\n— {OG_IMAGE[0]} ({OG_IMAGE[2]}) [→ og-default.jpg 1200×630] —\n{OG_IMAGE[1]}")
        return 0

    out_dir.mkdir(parents=True, exist_ok=True)
    public_root.mkdir(parents=True, exist_ok=True)

    print(f"Generating {len(plan)} images via {MODEL} → {out_dir}\n")
    failed: list[str] = []
    with cf.ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(generate_one, api_key, n, p, s, out_dir): n for n, p, s in plan}
        for fut in cf.as_completed(futures):
            name, ok, msg = fut.result()
            print(f"  {'✓' if ok else '✗'}  {name:30s}  {msg}")
            if not ok:
                failed.append(name)

    # OG image (cropped to 1200x630 into public/og-default.jpg)
    if not args.only or args.only == OG_IMAGE[0]:
        try:
            print(f"\nGenerating OG image (1200×630 social spec)…")
            png = request_image(api_key, OG_IMAGE[1], OG_IMAGE[2])
            save_og(png, public_root)
            sz = (public_root / "og-default.jpg").stat().st_size // 1024
            print(f"  ✓  og-default.jpg               {sz} kB")
        except Exception as e:
            print(f"  ✗  og-default.jpg               {type(e).__name__}: {e}")
            failed.append("og-default.jpg")

    if failed:
        print(f"\nFAILED: {', '.join(failed)}")
        return 1
    print("\nAll generated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
