"""Batch 5 — bring visual life to text-heavy pillar sections.

21 images: 8 Sami seasons + 4 cooking methods + 5 New Nordic techniques
+ 3 LocalIngredients deep-dive leads + 1 TraditionalRecipes intro lead.
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
    "Editorial documentary photography, soft Arctic daylight, low-saturation Nordic "
    "palette with warm wood and linen textures, cinematic but understated. " + NEGATIVES + "."
)

IMAGES: list[tuple[str, str, str]] = [
    # === EIGHT SAMI SEASONS (8) — TraditionalRecipes ===
    ("season-dalvi.jpg",
     "Polar-night Lapland forest in deepest winter: a small Sami timber cabin with a single warm "
     "yellow window glow, deep snow, dark spruce silhouettes, faint pink-blue twilight at 11 AM. "
     "A single line of smoke rising from the chimney. " + STYLE,
     "1024x1024"),
    ("season-giddadalvi.jpg",
     "Late-March Arctic lake at midday: bright low sun reflecting off a flat snow-covered ice "
     "surface, ice-fishing hole drilled in the foreground with a small wooden stool beside it, a "
     "thermos and a fishing rod resting against it. Long shadows, brilliant cold light. " + STYLE,
     "1024x1024"),
    ("season-gidda.jpg",
     "May Lapland spring: melting snow patches between birch trees, the first tender green nettle "
     "shoots and birch leaves emerging from forest-floor moss, water dripping. Cool crisp daylight. "
     + STYLE,
     "1024x1024"),
    ("season-giddageassi.jpg",
     "June Arctic Lapland: bright open mountain pasture with low Arctic flowers (cotton grass, "
     "alpine forget-me-not), pale-blue sky, low sun never setting at 1 AM, soft amber light "
     "warming the foreground. " + STYLE,
     "1024x1024"),
    ("season-geassi.jpg",
     "Midnight-sun cloudberry bog in early July: amber sky, low golden horizon light, ripe "
     "golden cloudberries dotted across the bog mosses, the sun visible just above the horizon "
     "at midnight. " + STYLE,
     "1024x1024"),
    ("season-cakcageassi.jpg",
     "Mid-August Lapland forest at golden hour: low spruce woodland, a wicker basket on the "
     "moss filled with ripe dark blue bilberries and one porcini mushroom, dappled afternoon "
     "sunlight, no human visible. " + STYLE,
     "1024x1024"),
    ("season-cakca.jpg",
     "Mid-October Lapland tundra at dawn: a herd of free-roaming reindeer in the distance "
     "across a yellowed grass plateau, first frost on the foreground heather, low warm sun "
     "from the side, breath-cold air. " + STYLE,
     "1024x1024"),
    ("season-cakcadalvi.jpg",
     "Early-November Lapland bog at twilight: thin first snow lying on dark heather and "
     "cranberry vines, last red lingonberries glowing dark against the snow, blue-grey sky, "
     "long shadows from low sun. " + STYLE,
     "1024x1024"),

    # === FOUR COOKING METHODS (4) — TraditionalRecipes ===
    ("cook-open-fire.jpg",
     "Close-up of a slab of reindeer meat searing directly over open flames on a wrought-iron "
     "grate at a Lapland campfire. Embers, sparks rising, blue twilight beyond. Deep warm "
     "amber tones. " + STYLE,
     "1024x1024"),
    ("cook-earth-oven.jpg",
     "A smoke-blackened pit dug into Lapland ground filled with hot stones, a wrapped bundle "
     "of meat in birch leaves nestled in the centre, glowing embers around the edges. Top-down "
     "rustic composition on dark soil. " + STYLE,
     "1024x1024"),
    ("cook-hot-stones.jpg",
     "A round flat unleavened Sami flatbread baking on a hot flat slate stone next to a "
     "campfire, crusting at the edges, faint flour dusting visible. Warm low light. " + STYLE,
     "1024x1024"),
    ("cook-smoking.jpg",
     "Interior of a small wooden Lapland smokehouse: thin strips of cured reindeer hanging "
     "from a wooden rod above a low smouldering fire, blue smoke filling the dim space, single "
     "shaft of daylight from a small high window. " + STYLE,
     "1024x1024"),

    # === FIVE NEW NORDIC TECHNIQUES (5) — ModernLapland ===
    ("tech-lacto.jpg",
     "Top-down still life of three glass mason jars on rough linen, each containing a different "
     "lacto-fermented Lapland ingredient: dark bilberries, sliced root vegetables, dill flowers. "
     "Soft cool overhead daylight. " + STYLE,
     "1024x1024"),
    ("tech-sous-vide.jpg",
     "Close-up of a vacuum-sealed bag containing a thick reindeer fillet submerged in a clear "
     "warm-water bath, the meat pink and visible through the plastic, a precision thermometer "
     "probe in the foreground. Clinical fine-dining-kitchen feel. " + STYLE,
     "1024x1024"),
    ("tech-cold-curing.jpg",
     "Top-down still life of a side of cold-cured Arctic char on a wooden board, sprinkled with "
     "salt, sugar, and chopped fresh dill, a thin slice already cut and lying beside it. " + STYLE,
     "1024x1024"),
    ("tech-foraged-garnish.jpg",
     "Close-up macro of a fine-dining plate finishing touch: tweezers placing a single tiny wood "
     "sorrel leaf onto a slate plate, a few edible violet petals already arranged, soft warm "
     "kitchen light. " + STYLE,
     "1024x1024"),
    ("tech-whole-ingredient.jpg",
     "Top-down chef's mise-en-place still life of a fully utilised reindeer breakdown: small "
     "bowls of ground bone-marrow dust, rendered fat, slow-braised shoulder, smoked fillet, "
     "broth, on rough linen. Documentary cooking-magazine feel. " + STYLE,
     "1024x1024"),

    # === DEEP-DIVE LEAD IMAGES (3) — LocalIngredients ===
    ("lead-reindeer.jpg",
     "Wide cinematic shot of a herd of free-roaming Sami-herded reindeer moving across a snowy "
     "Lapland tundra plateau at golden afternoon light, distant low spruces on the horizon, no "
     "humans in shot. Sense of vast unfenced space. " + STYLE,
     "1536x1024"),
    ("lead-cloudberry.jpg",
     "Wide cinematic landscape of a Lapland cloudberry bog under midnight-sun amber light: low "
     "horizon glow, scattered ripe golden cloudberries dotting the wet bog moss, single low "
     "birch tree silhouetted on the right. " + STYLE,
     "1536x1024"),
    ("lead-lake-fish.jpg",
     "Wide cinematic shot of a frozen Lapland lake at midday in February: brilliant low sun, "
     "a single ice-fishing hole drilled in the foreground with a small wooden stool and "
     "thermos beside it, footprints leading off into the distance. No people. " + STYLE,
     "1536x1024"),

    # === INTRO LEAD (1) — TraditionalRecipes ===
    ("lead-traditional-recipes.jpg",
     "Wide warm interior view of a traditional Sami home kitchen: a heavy black cast-iron pot "
     "of bidos stew steaming on a wood-fired stove, a wooden table beside it with rye flatbread, "
     "a small bowl of lingonberries, a knife, a wooden spoon. Soft warm lamplight, cool blue "
     "twilight outside the small window. No people. " + STYLE,
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
