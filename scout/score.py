
"""
Faith Frontier Property Scoring Engine

- Deterministic, explainable scoring for stewardship, housing, rehab, and risk
- Written explanations accompany all scores
- All decisions are auditable and replayable

# LEGAL/ENTITY SEPARATION:
# This script is for use by Faith Frontier Trust only. It does NOT perform or trigger any construction, rehab, or vendor selection.
# Tillerstead LLC (the construction/maintenance vendor) receives only anonymized, contract-based briefs, never raw or decision-making data.
# This separation is required for regulatory, tax, and ethical compliance. Never collapse or mix these roles in code or workflow.

This script is for use by Faith Frontier Trust. Tillerstead LLC may receive anonymized, contract-based briefs only.
"""

import json
import os
from datetime import datetime

CONFIG_PATH = os.path.join(os.path.dirname(__file__), 'config.yml')
CANDIDATES_PATH = os.path.join(os.path.dirname(__file__), 'output/candidates.json')
SHORTLIST_PATH = os.path.join(os.path.dirname(__file__), 'output/weekly-shortlist.md')

import yaml

def load_config():
    with open(CONFIG_PATH, 'r') as f:
        return yaml.safe_load(f)

def load_candidates():
    with open(CANDIDATES_PATH, 'r') as f:
        return json.load(f)

def score_property(prop, config):
    explanations = []
    score = 0.0
    weights = config

    # Stewardship & Land
    stewardship = 0
    if prop.get('lot_size_acres', 0) >= config['stewardship']['min_acreage']:
        stewardship += 50
        explanations.append(f"Lot size {prop.get('lot_size_acres')} acres meets stewardship minimum.")
    else:
        explanations.append(f"Lot size {prop.get('lot_size_acres')} acres below stewardship minimum.")
    if prop.get('flood_risk') in ['High', 'Uninsurable']:
        stewardship -= int(50 * config['stewardship']['flood_risk_penalty'])
        explanations.append("Flood risk present; stewardship score reduced.")
    score += stewardship * config['stewardship']['weight']

    # Housing & Human Dignity
    housing = 0
    if prop.get('habitability_score', 0) >= config['housing']['habitability_min_score']:
        housing += 50
        explanations.append("Habitability potential is strong.")
    else:
        explanations.append("Habitability potential is weak or unknown.")
    if prop.get('adu_viability'):
        housing += int(50 * config['housing']['adu_viability_weight'])
        explanations.append("ADU/expansion potential present.")
    score += housing * config['housing']['weight']

    # Rehab & Construction Feasibility
    rehab = 0
    if prop.get('rehab_tier') == 'cosmetic':
        rehab += int(50 * config['rehab']['cosmetic_tier_weight'])
        explanations.append("Cosmetic rehab only; easier project.")
    elif prop.get('rehab_tier') == 'systems':
        rehab += int(50 * config['rehab']['systems_tier_weight'])
        explanations.append("Systems rehab needed; moderate complexity.")
    elif prop.get('rehab_tier') == 'structural':
        rehab += int(50 * config['rehab']['structural_tier_weight'])
        explanations.append("Structural rehab needed; high complexity.")
    if prop.get('permit_complexity') == 'high':
        rehab -= int(50 * config['rehab']['permit_complexity_penalty'])
        explanations.append("Permit complexity is high; rehab score reduced.")
    score += rehab * config['rehab']['weight']

    # Risk & Governance
    risk = 0
    if prop.get('title_risk') == 'clear':
        risk += 50
        explanations.append("Title appears clear.")
    else:
        risk -= int(50 * config['risk']['title_risk_penalty'])
        explanations.append("Title or tax risk present.")
    if prop.get('zoning_ambiguity') == 'high':
        risk -= int(50 * config['risk']['zoning_ambiguity_penalty'])
        explanations.append("Zoning ambiguity detected.")
    if 'environmental_red_flag' in (prop.get('environmental_flags') or []):
        risk -= int(50 * config['risk']['environmental_red_flag_penalty'])
        explanations.append("Environmental red flag present.")
    score += risk * config['risk']['weight']

    # Red flags (immediate exclusion)
    for flag in prop.get('red_flags', []):
        if flag in config['red_flags']:
            explanations.append(f"Red flag present: {flag}. Excluded from shortlist.")
            return 0, explanations

    # Clamp score to 0-100
    score = max(0, min(100, int(score)))
    return score, explanations

def main():
    config = load_config()
    candidates = load_candidates()
    shortlist = []
    with open(SHORTLIST_PATH, 'w') as md:
        md.write(f"# Faith Frontier Weekly Property Shortlist\n\n")
        md.write(f"_Generated: {datetime.utcnow().isoformat()} UTC_\n\n")
        for prop in candidates:
            score, explanations = score_property(prop, config)
            if score >= 60:  # Example threshold
                shortlist.append({"id": prop['id'], "score": score, "address": prop['address']})
                md.write(f"## {prop['address']}\n")
                md.write(f"**Score:** {score}/100\n\n")
                md.write("**Rationale:**\n")
                for ex in explanations:
                    md.write(f"- {ex}\n")
                md.write("\n---\n\n")
    print(f"Shortlist generated with {len(shortlist)} properties.")

if __name__ == "__main__":
    main()
