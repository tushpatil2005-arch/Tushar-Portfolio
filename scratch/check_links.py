import re, os

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

links = set(re.findall(r'(?:href|src)=["\']([^"\']+)["\']', html))
print("--- Checking all local resource paths ---")
all_good = True
for link in sorted(links):
    if link.startswith(('http://', 'https://', 'data:', '#', 'mailto:', 'javascript:')):
        continue
    # Strip query/anchor
    clean_path = link.split('?')[0].split('#')[0]
    if clean_path:
        exists = os.path.exists(clean_path)
        status = "OK" if exists else "MISSING!"
        if not exists:
            all_good = False
        print(f"[{status}] {clean_path}")

if all_good:
    print("\nAll local resources verified successfully!")
