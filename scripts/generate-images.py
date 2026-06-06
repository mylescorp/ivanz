import os

base = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(base, exist_ok=True)

themes = {
    "road-construction": ("#D4831A", "Road Construction", "M 120 720 L 1280 720 L 1280 780 L 120 780 Z M 200 680 L 400 680 L 420 720 L 180 720 Z M 600 660 L 900 660 L 920 720 L 580 720 Z"),
    "building-design": ("#4A90D9", "Building Design", "M 350 250 L 350 750 L 1050 750 L 1050 250 L 700 250 L 700 450 L 550 450 L 550 250 Z M 420 320 L 480 320 L 480 380 L 420 380 Z M 420 420 L 480 420 L 480 480 L 420 480 Z"),
    "land-survey": ("#2ECC71", "Land Survey", "M 700 200 L 750 350 L 900 350 L 780 450 L 820 600 L 700 500 L 580 600 L 620 450 L 500 350 L 650 350 Z M 680 520 L 720 520 L 720 720 L 680 720 Z"),
    "drainage": ("#3498DB", "Drainage Systems", "M 200 400 Q 700 200 1200 400 L 1200 480 Q 700 280 200 480 Z M 300 520 L 300 720 L 400 720 L 400 520 Z M 900 520 L 900 720 L 1000 720 L 1000 520 Z"),
    "soil-testing": ("#8B6914", "Soil Testing", "M 550 220 L 850 220 L 900 750 L 500 750 Z M 620 320 L 780 320 L 760 420 L 640 420 Z M 580 500 L 820 500 L 800 650 L 600 650 Z"),
    "structural": ("#E74C3C", "Structural Engineering", "M 700 180 L 950 750 L 700 650 L 450 750 Z M 700 350 L 820 650 L 700 590 L 580 650 Z"),
    "project-management": ("#9B59B6", "Project Management", "M 250 300 L 1150 300 L 1150 380 L 250 380 Z M 250 460 L 1150 460 L 1150 540 L 250 540 Z M 250 620 L 900 620 L 900 700 L 250 700 Z"),
}

for slug, (accent, label, paths) in themes.items():
    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1000" viewBox="0 0 1400 1000" role="img" aria-label="{label}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F1B33"/>
      <stop offset="100%" stop-color="#1A2744"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{accent}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#D4831A" stop-opacity="0.7"/>
    </linearGradient>
  </defs>
  <rect width="1400" height="1000" fill="url(#bg)"/>
  <rect x="0" y="820" width="1400" height="180" fill="#0A1220" opacity="0.5"/>
  <circle cx="1100" cy="200" r="120" fill="url(#accent)" opacity="0.25"/>
  <circle cx="200" cy="150" r="80" fill="{accent}" opacity="0.15"/>
  <path d="{paths}" fill="url(#accent)" opacity="0.85"/>
  <text x="80" y="920" fill="#FFFFFF" font-family="Arial, sans-serif" font-size="48" font-weight="700">{label}</text>
  <text x="80" y="970" fill="#D4831A" font-family="Arial, sans-serif" font-size="24" font-weight="500">IvanZ Construction</text>
</svg>"""
    with open(os.path.join(base, f"{slug}.svg"), "w", encoding="utf-8") as f:
        f.write(svg)

print(f"Created {len(themes)} images in {base}")
