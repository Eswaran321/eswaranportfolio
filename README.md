# Eswaran S — Portfolio

Personal developer portfolio built with plain **HTML, CSS, and JavaScript**.  
Live at: `https://eswaran321.github.io/eswaran-portfolio`

---

## Project Structure

```
eswaran-portfolio/
├── index.html              ← Page structure
├── css/
│   └── style.css           ← All styles & animations
├── js/
│   └── main.js             ← All interactions & modal logic
├── assets/
│   ├── images/
│   │   └── profile_avatar.jpg
│   └── certs/
│       ├── java_certificate.jpg
│       ├── aws_certificate.jpg
│       ├── genai_certificate.jpg
│       ├── accenture_certificate.jpg
│       └── python_certificate.jpg
└── README.md
```

---

## Deploy to GitHub Pages — Step by Step

### Step 1 — Create the GitHub Repository

1. Go to [github.com](https://github.com) and log in
2. Click the **+** icon (top-right) → **New repository**
3. Repository name: `eswaran-portfolio`
4. Set to **Public**
5. Leave everything else unchecked
6. Click **Create repository**

---

### Step 2 — Push the Code

Open your terminal (or Git Bash on Windows) inside this project folder:

```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "Initial portfolio deployment"

# Connect to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/Eswaran321/eswaran-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### Step 3 — Enable GitHub Pages

1. Go to your repo on GitHub: `github.com/Eswaran321/eswaran-portfolio`
2. Click **Settings** tab
3. Scroll to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

GitHub will show a message:  
✅ *"Your site is live at https://eswaran321.github.io/eswaran-portfolio"*

It takes **1–3 minutes** for the site to go live the first time.

---

### Step 4 — Update the Portfolio (Any Time)

```bash
# Make your changes, then:
git add .
git commit -m "Update portfolio"
git push
```

GitHub Pages auto-deploys every time you push to `main`.

---

## Local Preview

No server needed — just open the file:

```bash
# Option 1: Double-click index.html in your file explorer

# Option 2: From terminal (macOS/Linux)
open index.html

# Option 3: VS Code Live Server extension (recommended)
# Install "Live Server" extension → right-click index.html → Open with Live Server
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, glassmorphism, CSS Grid) |
| Interactions | Vanilla JavaScript (ES6+) |
| Fonts | Google Fonts (Space Grotesk, Inter, JetBrains Mono) |
| Hosting | GitHub Pages |

---

Built with ♥ by **Eswaran S** · Coimbatore, Tamil Nadu
