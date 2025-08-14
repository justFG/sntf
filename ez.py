#!/usr/bin/env python3
import os
import re
from pathlib import Path

# Configuration
PROJECT_PATH = Path.cwd()  # Chemin courant
SEARCH_PATTERN = r"<Link"  # Motif à rechercher
FILE_EXTENSIONS = ('.js', '.jsx', '.ts', '.tsx')  # Extensions à analyser

# Dossiers à ignorer (ajoutez selon vos besoins)
EXCLUDED_DIRS = {
    'node_modules',
    '.git',
    '.vscode',
    'dist',
    'build',
    '__pycache__'
}

# Couleurs pour l'affichage
class colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def should_skip(path):
    """Vérifie si le chemin doit être ignoré"""
    parts = Path(path).parts
    return any(excluded in parts for excluded in EXCLUDED_DIRS)

# Compteurs
stats = {
    'total_files': 0,
    'total_matches': 0,
    'files_with_matches': 0,
    'skipped_dirs': 0
}

print(f"{colors.HEADER}\n🔍 Recherche de '{SEARCH_PATTERN}' dans {PROJECT_PATH}{colors.ENDC}")
print(f"{colors.HEADER}────────────────────────────────────────────{colors.ENDC}")

for root, dirs, files in os.walk(PROJECT_PATH, topdown=True):
    # Supprime les dossiers exclus de la recherche
    dirs[:] = [d for d in dirs if not should_skip(Path(root)/d)]
    
    if should_skip(root):
        stats['skipped_dirs'] += 1
        continue

    for file in files:
        if file.endswith(FILE_EXTENSIONS):
            filepath = Path(root) / file
            relative_path = filepath.relative_to(PROJECT_PATH)
            
            stats['total_files'] += 1
            print(f"{colors.OKBLUE}Analyse: {relative_path}{colors.ENDC}")
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                matches = list(re.finditer(SEARCH_PATTERN, content))
                if matches:
                    stats['files_with_matches'] += 1
                    stats['total_matches'] += len(matches)
                    print(f"{colors.OKGREEN}  → Trouvé {len(matches)} occurrence(s){colors.ENDC}")
                    
                    # Affiche le contexte des matches
                    lines = content.splitlines()
                    for match in matches:
                        line_num = content.count('\n', 0, match.start()) + 1
                        context = lines[line_num-1].strip()
                        print(f"{colors.WARNING}    Ligne {line_num}: {context[:100]}{'...' if len(context) > 100 else ''}{colors.ENDC}")
            
            except UnicodeDecodeError:
                pass  # Ignore les fichiers binaires
            except Exception as e:
                print(f"{colors.FAIL}  Erreur: {e}{colors.ENDC}")

# Résumé détaillé
print(f"{colors.HEADER}\n────────────────────────────────────────────{colors.ENDC}")
print(f"{colors.BOLD}📊 Résultats:{colors.ENDC}")
print(f"- 📂 Dossiers ignorés: {stats['skipped_dirs']}")
print(f"- 📝 Fichiers analysés: {stats['total_files']}")
print(f"- 🔍 Fichiers avec correspondances: {stats['files_with_matches']}")
print(f"- ✨ Occurrences totales: {stats['total_matches']}")
print(f"{colors.HEADER}✅ Recherche terminée.\n{colors.ENDC}")