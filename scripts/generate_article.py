import os
import datetime
import pathlib
from openai import OpenAI

# Modèle par défaut : rapide et économique. Tu peux mettre "gpt-5" pour du plus costaud.
MODEL = os.getenv("OPENAI_MODEL", "gpt-5-mini")
AFFILIATE = os.getenv("AFFILIATE_URL", "[MON_LIEN_PARRAINAGE]")

# Vérifs minimales pour éviter les erreurs courantes
API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    raise RuntimeError("OPENAI_API_KEY n'est pas défini dans les secrets GitHub.")

client = OpenAI(api_key=API_KEY)

PROMPT = f"""
Tu es un rédacteur SEO francophone. Génère un article PRÊT À COLLER dans WordPress
au format Markdown + images <img>, sur "Trade Republic (carte Mirror)".
Objectif: convaincre de s'inscrire via mon lien d'affiliation {AFFILIATE}.
Contraintes:
- H1, H2/H3 clairs, paragraphes courts, bullets, encarts "⚠️ Points d’attention".
- Inclure 4 images en ligne avec balises <img> (logo TR, interface portefeuille, plan d’investissement, carte Mirror).
- Ton: pédagogique, pro et convaincant. Inclure une FAQ.
- Ajoute un CTA visible avec {AFFILIATE}.
- Aucun code HTML inutile hors <img>, pas de table trop lourde.
"""

def main():
    # Dossier de sortie
    out_dir = pathlib.Path("content")
    out_dir.mkdir(parents=True, exist_ok=True)
    slug = f"trade-republic-mirror-{datetime.date.today().isoformat()}.md"
    out_path = out_dir / slug

    # Appel API (⚠️ pas de temperature ici)
    resp = client.responses.create(
        model=MODEL,
        input=PROMPT,
    )

    # Récupération du texte agrégé
    article = resp.output_text if hasattr(resp, "output_text") else str(resp)

    # Sauvegarde
    out_path.write_text(article, encoding="utf-8")
    print(f"✅ Article généré: {out_path}")

if __name__ == "__main__":
    main()
