css_additions = """
/* ========== Preloader ========== */
#preloader {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: var(--bg-main);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.6s ease, visibility 0.6s ease;
}
#preloader.fade-out {
    opacity: 0;
    visibility: hidden;
}
.loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}
.loader-content .logo-text {
    font-family: var(--font-heading);
    font-size: 3rem;
    font-weight: 800;
    color: var(--primary);
    letter-spacing: 2px;
    animation: pulseLogo 1.5s infinite alternate;
}
.loading-bar {
    width: 150px;
    height: 4px;
    background: var(--border-glass);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
}
.loading-bar::after {
    content: '';
    position: absolute;
    top: 0; left: 0; height: 100%; width: 50%;
    background: var(--accent);
    animation: loadingAnim 1s infinite ease-in-out;
}
@keyframes pulseLogo {
    0% { opacity: 0.6; transform: scale(0.95); }
    100% { opacity: 1; transform: scale(1.05); }
}
@keyframes loadingAnim {
    0% { left: -50%; }
    100% { left: 100%; }
}

/* ========== Coding Profiles ========== */
.coding-profiles-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.profile-section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--border-glass);
    padding-bottom: 0.5rem;
}
.profile-section-title i {
    color: var(--primary);
}
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
}
.stat-card {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius-md);
    background: var(--bg-glass);
    border: 1px solid var(--border-glass);
}
.stat-card img {
    max-width: 100%;
    height: auto;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}
.stat-card.full-width {
    grid-column: 1 / -1;
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css_additions)

print("CSS appended.")
