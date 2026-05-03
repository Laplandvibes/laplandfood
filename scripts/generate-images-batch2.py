"""
Batch 2 — per-card images for laplandfood pillar pages
+ regen of hero-tours.jpg (face-free, food-led).

Usage:  python scripts/generate-images-batch2.py [--only NAME]

26 new images + 1 replacement. Same brand prompt rules as batch 1.
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

NEGATIVES = (
    "no text, no logos, no watermarks, no UI elements, no overlay graphics, "
    "no stock-photo plastic look, no neon, no oversaturation, no obvious AI artefacts, "
    "no human faces"
)
STYLE = (
    "Editorial documentary food photography, soft Arctic daylight, "
    "low-saturation Nordic palette with warm wood and linen textures, "
    "shallow depth of field, natural shadows, cinematic but understated. "
    f"{NEGATIVES}."
)

# (filename, prompt, size)
IMAGES: list[tuple[str, str, str]] = [
    # === REPLACE hero-tours.jpg — face-free, food-led ===
    ("hero-tours.jpg",
     "Wide cinematic Arctic forest clearing scene at golden afternoon light, focus on a "
     "wood-fired kettle steaming over a small campfire, foraged mushrooms on a wooden "
     "board next to it, snow on the ground, mossy spruce trunks behind. Wool-clad arms "
     "and gloved hands at the side reaching toward the kettle but no faces visible, "
     "documentary feel. " + STYLE,
     "1536x1024"),

    # === LocalIngredients per-card (6) ===
    ("ingredient-reindeer.jpg",
     "Close-up of a wooden chopping board with a fillet of dark, lean smoked reindeer "
     "meat, sliced thin against the grain, beside a sprig of juniper. Cold daylight from "
     "the side, simple linen napkin in soft focus. " + STYLE,
     "1024x1024"),

    ("ingredient-berries.jpg",
     "Top-down still life of small black-blue Finnish bilberries piled in a small white "
     "ceramic bowl, beside a smaller bowl of bright red lingonberries, on a rough birch "
     "wood surface. Soft cool daylight. " + STYLE,
     "1024x1024"),

    ("ingredient-mushrooms.jpg",
     "A pair of fresh porcini mushrooms (cep) and one milkcap mushroom on a dark slate "
     "board, with a few pine needles and a small knife beside them. Cool overhead light. " + STYLE,
     "1024x1024"),

    ("ingredient-fish.jpg",
     "A whole fresh Arctic whitefish on a slab of ice with a sprig of dill, simple grey "
     "background. Cold north light, scales glistening, eye clear. " + STYLE,
     "1024x1024"),

    ("ingredient-herbs.jpg",
     "Sprigs of fresh meadowsweet flower and stinging nettle leaves arranged on rough "
     "linen, soft cool daylight. " + STYLE,
     "1024x1024"),

    ("ingredient-cloudberries.jpg",
     "A small handful of perfectly ripe golden-amber cloudberries in a wooden kuksa cup, "
     "on a moss surface, soft warm daylight. " + STYLE,
     "1024x1024"),

    # === TraditionalRecipes per-card (4) ===
    ("recipe-bidos.jpg",
     "Top-down close-up of a black cast-iron pot half full of bidos reindeer stew with "
     "potato and carrot chunks visible, a wooden spoon resting on the rim, fresh dill "
     "sprig on top. Steam rising. Warm low light. " + STYLE,
     "1024x1024"),

    ("recipe-gahkku.jpg",
     "A round freshly-baked Sami flatbread (gahkku) on a wooden cutting board, lightly "
     "dusted with flour, a small dish of butter beside it. Warm daylight. " + STYLE,
     "1024x1024"),

    ("recipe-fish-soup.jpg",
     "A white ceramic bowl of creamy Sápmi lake-fish chowder — chunks of whitefish, "
     "potato, carrot visible, cream broth, fresh dill on top. Top-down composition on "
     "linen. Warm soft light. " + STYLE,
     "1024x1024"),

    ("recipe-kissel.jpg",
     "Two glass dessert cups of dark berry kissel topped with a swirl of cream and "
     "fresh whole bilberries, on a wooden tray with a small bowl of lingonberries "
     "beside. Warm soft light. " + STYLE,
     "1024x1024"),

    # === ModernLapland per-card (4) ===
    ("dish-sous-vide-reindeer.jpg",
     "Fine-dining plate of pink-cooked sous-vide reindeer fillet sliced into three "
     "rounds, three dots of dark bilberry reduction, two foraged microgreens, beetroot "
     "crisp shard. Matte slate plate, top-down. " + STYLE,
     "1024x1024"),

    ("dish-whitefish.jpg",
     "Fine-dining plate of confit Arctic whitefish fillet, pale and tender, dressed "
     "with green wild herb oil and three edible flower petals. White ceramic plate, "
     "top-down. " + STYLE,
     "1024x1024"),

    ("dish-berry-tasting.jpg",
     "A row of three small fine-dining tasting bites featuring different berries: a "
     "lacto-fermented bilberry on a herb leaf, a cloudberry sphere on a dark spoon, a "
     "lingonberry granita in a tiny glass. Dark slate background, top-down. " + STYLE,
     "1024x1024"),

    ("dish-deconstructed-bidos.jpg",
     "Modernist plate: a single piece of slow-cooked reindeer beside a quenelle of "
     "potato puree, three small carrot batons, a sprinkle of bone-marrow dust, "
     "drizzled with a meat-jus reduction. Slate plate, dramatic dark backdrop. " + STYLE,
     "1024x1024"),

    # === ForagingGuide per-card (5) ===
    ("forage-bilberry.jpg",
     "Close-up of a low bilberry shrub in pine forest with dark blue-black ripe berries, "
     "dappled summer light through pine canopy. " + STYLE,
     "1024x1024"),

    ("forage-lingonberry.jpg",
     "Close-up of a small evergreen lingonberry shrub with shiny round leaves and a "
     "cluster of bright red berries on heathland moss. Golden afternoon light. " + STYLE,
     "1024x1024"),

    ("forage-cloudberry.jpg",
     "A single ripe amber cloudberry on its low bog plant with three-lobed leaves, "
     "soft warm midnight-sun light. Macro detail. " + STYLE,
     "1024x1024"),

    ("forage-mushrooms.jpg",
     "A pair of porcini mushrooms growing in a moss-floored spruce forest, dappled "
     "afternoon light, with a small wicker basket beside them. " + STYLE,
     "1024x1024"),

    ("forage-nettle.jpg",
     "Young fresh stinging nettle plants growing at a forest edge, with a leather-gloved "
     "hand reaching toward them with garden scissors. Cold spring daylight, no human "
     "face visible. " + STYLE,
     "1024x1024"),

    # === FoodTours per-card (3) ===
    ("tour-sami-culture.jpg",
     "Wide shot of a traditional Sami lavvu tipi at the edge of a snowy forest with "
     "smoke rising from the top, reindeer-hide rugs visible at the entrance, no people "
     "in frame. Cold blue-hour light. " + STYLE,
     "1536x1024"),

    ("tour-fine-dining.jpg",
     "Empty fine-dining restaurant table set for two: white linen, polished cutlery, "
     "two crystal wine glasses, single tall taper candle, wooden walls behind in soft "
     "focus. Pre-service warm low light. " + STYLE,
     "1536x1024"),

    ("tour-foraging.jpg",
     "Close-up of an open wicker basket on bog moss filled with freshly picked "
     "cloudberries, bilberries, and one fresh porcini mushroom on top. Soft warm "
     "midnight-sun light, low to the ground. " + STYLE,
     "1536x1024"),

    # === MichelinDining restaurant cards (3) ===
    ("restaurant-nili.jpg",
     "Interior view of an open-kitchen Lapland fine-dining restaurant: warm wood-panelled "
     "walls, hanging Edison-bulb pendant lights, exposed pass with a chef plating in "
     "the deep background (no face visible — back of head only). Warm low light, "
     "intimate atmosphere. " + STYLE,
     "1024x1024"),

    ("restaurant-aanaar.jpg",
     "Interior view of an intimate Lapland fine-dining restaurant beside a river window: "
     "small wooden tables set with linen, low candlelight, large window showing dark "
     "river and spruce forest beyond at blue-hour. No people. " + STYLE,
     "1024x1024"),

    ("restaurant-rakas.jpg",
     "Interior view of a glass-roofed fine-dining restaurant under a starry winter "
     "sky with a faint green aurora visible through the glass roof. Tables in warm low "
     "light, dark wooden interior, no people. " + STYLE,
     "1024x1024"),
]


def request_image(api_key: str, prompt: str, size: str) -> bytes:
    body = json.dumps({
        "model": MODEL, "prompt": prompt, "n": 1, "size": size, "quality": "high",
    }).encode("utf-8")
    req = urllib.request.Request(
        API_URL, data=body,
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=300) as resp:
        payload = json.loads(resp.read())
    return base64.b64decode(payload["data"][0]["b64_json"])


def save_jpeg(png_bytes: bytes, out_path: Path) -> None:
    img = Image.open(BytesIO(png_bytes)).convert("RGB")
    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, "JPEG", quality=85, optimize=True, progressive=True)


def generate_one(api_key: str, name: str, prompt: str, size: str, out_dir: Path) -> tuple[str, bool, str]:
    out_path = out_dir / name
    started = time.time()
    try:
        png = request_image(api_key, prompt, size)
        save_jpeg(png, out_path)
        kb = out_path.stat().st_size // 1024
        return name, True, f"{kb} kB in {time.time()-started:.1f} s"
    except Exception as e:
        return name, False, f"{type(e).__name__}: {e}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="Generate only this filename")
    args = ap.parse_args()

    repo_root = Path(__file__).resolve().parent.parent
    out_dir = repo_root / "public" / "images"

    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        print("ERROR: OPENAI_API_KEY not set", file=sys.stderr)
        return 2

    plan = [(n, p, s) for n, p, s in IMAGES if not args.only or args.only == n]

    out_dir.mkdir(parents=True, exist_ok=True)
    print(f"Generating {len(plan)} images via {MODEL} -> {out_dir}\n")
    failed: list[str] = []
    with cf.ThreadPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(generate_one, api_key, n, p, s, out_dir): n for n, p, s in plan}
        for fut in cf.as_completed(futures):
            name, ok, msg = fut.result()
            print(f"  {'OK' if ok else 'FAIL'}  {name:30s}  {msg}")
            if not ok:
                failed.append(name)

    if failed:
        print(f"\nFAILED: {', '.join(failed)}")
        return 1
    print("\nAll generated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
