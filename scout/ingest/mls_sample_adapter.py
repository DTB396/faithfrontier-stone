
"""
Faith Frontier Property Scout - MLS RESO Web API Adapter

This script demonstrates a compliant, auditable ingestion of property data from the MLS RESO Web API.

- Only uses permitted, standards-based API endpoints.
- No scraping or unauthorized data access.
- All API calls and decisions are logged for auditability.

# LEGAL/ENTITY SEPARATION:
# This script is for use by Faith Frontier Trust only. It does NOT perform or trigger any construction, rehab, or vendor selection.
# Tillerstead LLC (the construction/maintenance vendor) receives only anonymized, contract-based briefs, never raw or decision-making data.
# This separation is required for regulatory, tax, and ethical compliance. Never collapse or mix these roles in code or workflow.

Replace API_KEY and endpoint as appropriate for your licensed access.
"""

import requests
import json
import os
from datetime import datetime

API_KEY = os.getenv("MLS_API_KEY")  # Set in environment, never hardcoded
MLS_ENDPOINT = "https://webapi.reso.org/properties"  # Example endpoint
LOG_DIR = os.path.join(os.path.dirname(__file__), '../logs/api-runs')
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), '../output/candidates.json')

# Ensure log directory exists
os.makedirs(LOG_DIR, exist_ok=True)

def log_api_run(response, params):
    log_entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "endpoint": MLS_ENDPOINT,
        "params": params,
        "status_code": response.status_code,
        "response_sample": response.text[:500]  # Truncate for log
    }
    log_file = os.path.join(LOG_DIR, f"mls_{datetime.utcnow().strftime('%Y%m%dT%H%M%S')}.json")
    with open(log_file, 'w') as f:
        json.dump(log_entry, f, indent=2)

def fetch_properties():
    params = {
        # Example: filter for minimum acreage, exclude red-flag zones, etc.
        "minLotSize": 0.25,
        # Add more filters as needed
    }
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Accept": "application/json"
    }
    response = requests.get(MLS_ENDPOINT, params=params, headers=headers)
    log_api_run(response, params)
    if response.status_code != 200:
        raise Exception(f"MLS API error: {response.status_code}")
    return response.json()

def normalize_property(raw):
    # Map raw MLS fields to Faith Frontier schema (see ../schema.json)
    return {
        "id": raw.get("ListingKey"),
        "address": raw.get("UnparsedAddress"),
        "county": raw.get("CountyOrParish"),
        "lat": raw.get("Latitude"),
        "lng": raw.get("Longitude"),
        "lot_size_acres": raw.get("LotSizeAcres"),
        "flood_risk": raw.get("FloodZone"),
        "soil_type": None,  # Not always available
        "water_access": raw.get("WaterSource") is not None,
        "industrial_distance_km": None,  # Needs external data
        "habitability_score": None,  # To be scored later
        "adu_viability": None,  # To be scored later
        "neighborhood_stability": None,  # To be scored later
        "rehab_tier": None,  # To be scored later
        "permit_complexity": None,  # To be scored later
        "utility_status": raw.get("Utilities"),
        "title_risk": None,  # To be scored later
        "zoning_ambiguity": None,  # To be scored later
        "environmental_flags": [],
        "red_flags": [],
        "source": "mls",
        "ingested_at": datetime.utcnow().isoformat()
    }

def main():
    properties = fetch_properties()
    normalized = [normalize_property(p) for p in properties.get('value', [])]
    with open(OUTPUT_PATH, 'w') as f:
        json.dump(normalized, f, indent=2)
    print(f"Ingested {len(normalized)} properties to {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
