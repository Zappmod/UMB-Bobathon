#!/usr/bin/env python3
"""
Rebuild public/lab-guide.pdf from public/lab-guide.md.

Pipeline:
  1. Strip YAML front-matter.
  2. Rewrite  images/foo.png  → absolute file:// paths.
  3. Pre-render ```{mermaid} blocks to PNG via npx mmdc.
  4. Convert the full markdown to HTML via mistune.
  5. Render HTML → PDF via WeasyPrint (no Chrome, no timeout).

Run from the bob-premium-for-z/ directory:
  python3 build-pdf.py
"""

import re
import subprocess
import sys
import tempfile
from pathlib import Path

SCRIPT_DIR  = Path(__file__).parent.resolve()
PUBLIC_DIR  = SCRIPT_DIR / "public"
MD_FILE     = PUBLIC_DIR / "lab-guide.md"
OUT_PDF     = PUBLIC_DIR / "lab-guide.pdf"
IMAGES_DIR  = PUBLIC_DIR / "lab-instructions" / "images"
COVER_IMAGE = PUBLIC_DIR / "BobMainframe.png"

MERMAID_RE = re.compile(r"```\{mermaid\}(.*?)```", re.DOTALL)
IMAGE_RE   = re.compile(r"(!\[[^\]]*\])\(images/([^)]+)\)")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def ensure_pkg(pkg, import_as=None):
    name = import_as or pkg
    try:
        return __import__(name)
    except ImportError:
        subprocess.run([sys.executable, "-m", "pip", "install", "-q", pkg], check=True)
        return __import__(name)


def render_mermaid(raw: str, tmp_dir: Path) -> str:
    counter = [0]

    def replace_block(match):
        diagram_src = match.group(1).strip()
        counter[0] += 1
        mmd_file = tmp_dir / f"diagram-{counter[0]}.mmd"
        png_file = tmp_dir / f"diagram-{counter[0]}.png"
        mmd_file.write_text(diagram_src, encoding="utf-8")
        result = subprocess.run(
            ["npx", "-p", "@mermaid-js/mermaid-cli", "mmdc",
             "-i", str(mmd_file), "-o", str(png_file),
             "-b", "white", "--width", "800"],
            capture_output=True, text=True, timeout=120
        )
        if result.returncode != 0 or not png_file.exists():
            print(f"  ⚠ mermaid render failed: {result.stderr.strip()}")
            return ""
        print(f"  ✓ mermaid diagram {counter[0]} → {png_file.name}")
        return f"![](file://{png_file})"

    return MERMAID_RE.sub(replace_block, raw)


def rewrite_image_paths(raw: str) -> str:
    def replace_img(match):
        alt_part = match.group(1)
        filename = match.group(2)
        abs_path = IMAGES_DIR / filename
        if not abs_path.exists():
            print(f"  ⚠ image not found: {abs_path}")
        return f"{alt_part}(file://{abs_path})"
    return IMAGE_RE.sub(replace_img, raw)


def md_to_html(raw: str) -> str:
    """Convert markdown to HTML using mistune with GFM-style extensions."""
    import mistune
    return mistune.html(raw)


CSS = """
body {
    font-family: -apple-system, "Segoe UI", Arial, sans-serif;
    font-size: 13pt;
    line-height: 1.6;
    color: #1f2328;
    max-width: 780px;
    margin: 0 auto;
    padding: 0 10px;
}
h1 { font-size: 22pt; margin-top: 2em; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.3em; }
h2 { font-size: 18pt; margin-top: 1.8em; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.2em; }
h3 { font-size: 14pt; margin-top: 1.4em; }
h4 { font-size: 12pt; margin-top: 1em; }
pre {
    background: #f6f8fa;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 12px 16px;
    font-size: 11pt;
    white-space: pre-wrap;
    word-break: break-all;
}
code {
    background: #f6f8fa;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 11pt;
}
pre code { background: none; padding: 0; }
img { max-width: 100%; height: auto; display: block; margin: 1em auto; }
blockquote {
    border-left: 4px solid #3b82d4;
    margin: 0;
    padding: 0.5em 1em;
    color: #57606a;
    background: #f7f8fa;
}
table { border-collapse: collapse; width: 100%; margin: 1em 0; }
th, td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; }
th { background: #f7f8fa; font-weight: 600; }
a { color: #3b82d4; }
.title-page {
    text-align: center;
    padding-top: 120px;
    page-break-after: always;
}
.title-page img { width: 220px; margin: 0 auto 40px; }
.title-page h1 { border: none; font-size: 26pt; }
"""


def build_html(body_html: str) -> str:
    title_page = f"""
<div class="title-page">
  <img src="file://{COVER_IMAGE}" />
  <h1>Bob Premium Package for Z</h1>
  <p><strong>Bobathon Lab Guide</strong></p>
  <p><em>IBM Client Engineering — 2025</em></p>
  <p><em>Created by Sophie Harrison &amp; Renate Hamrick — Application Modernization for Z team</em></p>
</div>
"""
    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bob Premium Package for Z — Lab Guide</title>
  <style>{CSS}</style>
</head>
<body>
{title_page}
{body_html}
</body>
</html>"""


def build_pdf():
    print(f"Reading {MD_FILE}")
    raw = MD_FILE.read_text(encoding="utf-8")

    # Strip YAML front-matter
    if raw.startswith("---"):
        end = raw.index("\n---", 3)
        raw = raw[end + 4:].lstrip("\n")

    # Rewrite image paths → absolute file:// URIs
    raw = rewrite_image_paths(raw)

    with tempfile.TemporaryDirectory() as tmp:
        tmp_dir = Path(tmp)

        # Pre-render mermaid diagrams
        print("Rendering mermaid diagrams …")
        raw = render_mermaid(raw, tmp_dir)

        # Markdown → HTML
        print("Converting markdown → HTML …")
        ensure_pkg("mistune")
        body_html = md_to_html(raw)
        full_html = build_html(body_html)

        html_path = tmp_dir / "lab-guide.html"
        html_path.write_text(full_html, encoding="utf-8")

        # HTML → PDF via WeasyPrint
        print("Rendering PDF via WeasyPrint …")
        from weasyprint import HTML, CSS as WeasyCss
        HTML(filename=str(html_path)).write_pdf(str(OUT_PDF))
        print(f"✓ PDF saved → {OUT_PDF}")


if __name__ == "__main__":
    build_pdf()
