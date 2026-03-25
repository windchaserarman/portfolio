import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace root vars manually
root_target = """/* ========== Variables & Design System ========== */
:root {
    --bg-main: #0a0a0c;
    --bg-card: rgba(25, 25, 30, 0.4);
    --bg-glass: rgba(17, 17, 24, 0.7);
    --border-glass: rgba(255, 255, 255, 0.08);

    --primary: #8b5cf6;
    /* Vibrant Purple */
    --secondary: #3b82f6;
    /* Vivid Blue */
    --accent: #10b981;
    /* Emerald */
    --gradient: linear-gradient(135deg, var(--primary), var(--secondary));

    --text-primary: #f8fafc;
    --text-secondary: #94a3b8;"""

root_replace = """/* ========== Variables & Design System ========== */
:root {
    --bg-main: #F2EDE4; /* soft cream */
    --bg-sec: #E8E0D2;
    --bg-card: rgba(232, 224, 210, 0.6);
    --bg-glass: rgba(242, 237, 228, 0.75);
    --border-glass: rgba(47, 111, 104, 0.15);

    --primary: #2F6F68; /* deep green */
    --secondary: #4F8A83; /* secondary green */
    --accent: #C8A96A; /* gold */
    --dark-green: #1F4F4A;
    --gradient: linear-gradient(135deg, var(--primary), var(--secondary));

    --text-primary: #2B2B2B;
    --text-secondary: #4A4A4A;"""

css = css.replace(root_target, root_replace)

# Replace any hard-coded black/white variations that are problematic
css = css.replace('background: #0a0a0c;', 'background: var(--bg-main);')
css = css.replace('color: white;', 'color: var(--bg-main);')

# Replace specific white text declarations
css = css.replace('color: #f1f1f1;', 'color: var(--text-primary);')
css = css.replace('color: #bbb;', 'color: var(--text-secondary);')
css = css.replace('color: #0a0a0c;', 'color: var(--text-primary);')

# Replace white background logic with bg-sec or glass
css = css.replace('background: rgba(255, 255, 255, 0.95);', 'background: var(--bg-glass);')
css = css.replace('background: rgba(255, 255, 255, 0.05);', 'background: rgba(47, 111, 104, 0.05);')
css = css.replace('background: rgba(255, 255, 255, 0.03);', 'background: rgba(47, 111, 104, 0.05);')
css = css.replace('background: rgba(255, 255, 255, 0.02);', 'background: rgba(47, 111, 104, 0.03);')
css = css.replace('border-bottom: 1px solid rgba(255, 255, 255, 0.05);', 'border-bottom: 1px solid var(--border-glass);')
css = css.replace('border-top: 1px solid rgba(255, 255, 255, 0.05);', 'border-top: 1px solid var(--border-glass);')
css = css.replace('background-color: rgba(0, 0, 0, 0.85);', 'background-color: rgba(242, 237, 228, 0.85);')

# Fix navbar
css = css.replace('background: rgba(10, 10, 12, 0.85);', 'background: rgba(242, 237, 228, 0.85);')
css = css.replace('border-bottom: 1px solid rgba(255, 255, 255, 0.1);', 'border-bottom: 1px solid var(--border-glass);')

# Fix project and experience pills
css = css.replace('background: rgba(139, 92, 246, 0.1);', 'background: rgba(47, 111, 104, 0.1);')
css = css.replace('border: 1px solid rgba(139, 92, 246, 0.3);', 'border: 1px solid rgba(200, 169, 106, 0.4);')
css = css.replace('border: 1px solid rgba(139, 92, 246, 0.2);', 'border: 1px solid rgba(200, 169, 106, 0.3);')
css = css.replace('box-shadow: 0 0 10px rgba(139, 92, 246, 0.5);', 'box-shadow: 0 0 10px rgba(47, 111, 104, 0.2);')

# Fix profile blob matching gold and green
css = css.replace('background: linear-gradient(135deg, #6a5cff, #8f7cff);', 'background: linear-gradient(135deg, var(--primary), var(--accent));')
css = css.replace('box-shadow: 0 0 40px rgba(100, 100, 255, 0.5);', 'box-shadow: 0 0 40px rgba(47, 111, 104, 0.2);')
css = css.replace('box-shadow: 0 0 50px rgba(16, 185, 129, 0.2);', 'box-shadow: 0 0 50px rgba(200, 169, 106, 0.2);')
css = css.replace('box-shadow: 0 0 60px rgba(16, 185, 129, 0.5);', 'box-shadow: 0 0 60px rgba(200, 169, 106, 0.4);')

# Certificates and buttons using accent and teal
css = css.replace('background: rgba(16, 185, 129, 0.1);', 'background: rgba(47, 111, 104, 0.1);')
css = css.replace('border: 1px solid rgba(16, 185, 129, 0.2);', 'border: 1px solid rgba(47, 111, 104, 0.2);')
css = css.replace('rgba(139, 92, 246, 0.4)', 'rgba(47, 111, 104, 0.8)')
css = css.replace('border: 2px solid var(--primary);', 'border: 2px solid var(--accent);')
css = css.replace('border-left: 2px solid var(--primary);', 'border-left: 2px solid var(--accent);')
css = css.replace('border: 3px solid var(--primary);', 'border: 3px solid var(--accent);')
css = css.replace('box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);', 'box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);')

# Ensure gradient matching green and gold instead of hardcoded
css = css.replace('linear-gradient(145deg, var(--bg-card), rgba(17, 17, 24, 0.9))', 'linear-gradient(145deg, var(--bg-card), var(--bg-glass))')

print("Applied replacements")

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
