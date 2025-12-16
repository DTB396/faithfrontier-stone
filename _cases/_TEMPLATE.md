---
# CASE TEMPLATE - Copy this file to create new case entries
# Remove this header section before committing

layout: case-enhanced  # or 'case' for standard layout
published: true
title: "Full Case Title - Court Name"
short_title: "Short Case Name"
slug: kebab-case-slug
permalink: /cases/kebab-case-slug/

# Court Information
court: "Superior Court of New Jersey" # or "United States District Court, District of New Jersey"
venue: "Atlantic County"  # or leave blank for federal
case_type: "Civil" # or Criminal, Appeal, Post-Conviction Relief, etc.
forum_level: "Trial Court" # or Appellate Division, Supreme Court, etc.

# Party Information
role: "Plaintiff" # or Defendant, Petitioner, Appellant, Respondent, etc.

# Docket Information
dockets:
  - DOCKET-NUMBER-1
  - DOCKET-NUMBER-2  # if applicable
primary_docket: DOCKET-NUMBER-1

# Status and Dates
status: active  # Options: active, pending, closed
filed_date: YYYY-MM-DD
judge: "Judge Name" # or leave blank if not assigned

# Tags for categorization
tags:
  - category1
  - category2

# Document location
assets_dir: "/cases/kebab-case-slug/docket/"

# Optional: Timeline for procedural posture section
timeline:
  - date: YYYY-MM-DD
    event: "Brief description of key event"
  - date: YYYY-MM-DD
    event: "Another key event"

# Optional: Next steps
next_steps:
  - "Brief description of upcoming action"
  - "Another anticipated step"

# Optional: Related cases
related_cases:
  - title: "Related Case Name"
    url: "/cases/related-case-slug/"
    relationship: "Appeal from" # or "Related to", "Consolidated with", etc.

# Optional: Provenance information
source_url: "https://example.com/source"
received_via: "Official court filing"
provenance_note: "Additional context about document sources"

# Enhanced Layout Fields (for case-enhanced layout)

# Procedural Posture - Current state of proceedings
procedural_posture: |
  This matter is currently before the [Court Name] on [pending motion/status]. 
  The case was filed on [date] and involves [brief description of claims/charges].
  
  Key procedural events include:
  - [Event description]
  - [Another event]

# Factual Background - Neutral summary of facts
factual_background: |
  [Provide a neutral, factual summary of the underlying events that led to this case.
  Include relevant dates, locations, and circumstances. Avoid subjective characterizations.]
  
  This should read like a court opinion's factual background section - clear, objective,
  and chronological.

# My Involvement - Personal context and perspective
my_involvement: |
  [Explain your role in this case and why it's being documented on Faith Frontier.
  This is where the personal narrative connects to the legal proceedings.]
  
  Include:
  - How this case arose in your experience
  - What you're seeking or defending
  - How it connects to Faith Frontier's mission of transparency and due process

# Current Status - Where things stand now
current_status: |
  As of [date], this case is [status description]. 
  
  [Provide context about recent developments, pending motions, or upcoming deadlines.]

# Key Documents (if using documents front matter)
documents:
  - label: "Complaint"
    path: "YYYY-MM-DD_Filing_Complaint.pdf"
    note: "Initial filing initiating the action"
    date: YYYY-MM-DD
  - label: "Motion to Dismiss"
    path: "YYYY-MM-DD_Motion_MTD.pdf"
    note: "Defendant's motion to dismiss"
    date: YYYY-MM-DD
---

## Overview

[Provide a brief introductory paragraph about this case. This appears at the top of the case page
and gives readers immediate context.]

## Additional Context

[Any additional narrative, explanation, or commentary that doesn't fit in the structured fields above.
This is optional - you may not need it if the enhanced layout fields cover everything.]

## Faith Frontier Connection

[Explain how this case relates to Faith Frontier's mission of documenting due process, supporting
New Jersey residents, and bearing witness to systemic issues in courts and agencies.]
