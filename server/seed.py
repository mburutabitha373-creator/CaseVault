#!/usr/bin/env python3

from datetime import date

from app import app
from config import db
from models import Case, Evidence, CaseEvidence


with app.app_context():

    print("Clearing database...")

    CaseEvidence.query.delete()
    Evidence.query.delete()
    Case.query.delete()

    db.session.commit()

    print("Seeding database...")

    # Cases
    case1 = Case(
        case_number="CV-001",
        title="Downtown Bank Robbery",
        crime_type="Robbery",
        status="Open",
        opened_date=date(2026, 7, 20),
        lead_investigator="Detective Sarah Blake"
    )

    case2 = Case(
        case_number="CV-002",
        title="Museum Artifact Theft",
        crime_type="Theft",
        status="Under Investigation",
        opened_date=date(2026, 7, 18),
        lead_investigator="Detective James Carter"
    )

    db.session.add_all([case1, case2])
    db.session.commit()

    # Evidence
    evidence1 = Evidence(
        name="Fingerprint",
        evidence_type="Forensic",
        description="Fingerprint lifted from vault door.",
        secured=True
    )

    evidence2 = Evidence(
        name="CCTV Footage",
        evidence_type="Digital",
        description="Camera footage from the entrance.",
        secured=True
    )

    evidence3 = Evidence(
        name="Footprint Cast",
        evidence_type="Physical",
        description="Shoe print collected outside the scene.",
        secured=False
    )

    db.session.add_all([evidence1, evidence2, evidence3])
    db.session.commit()

    # Case-Evidence Relationships
    ce1 = CaseEvidence(
        case=case1,
        evidence=evidence1,
        importance="Critical",
        found_location="Main Vault",
        confidence_score=95,
        collected_date=date(2026, 7, 20)
    )

    ce2 = CaseEvidence(
        case=case1,
        evidence=evidence2,
        importance="High",
        found_location="Bank Entrance",
        confidence_score=88,
        collected_date=date(2026, 7, 20)
    )

    ce3 = CaseEvidence(
        case=case2,
        evidence=evidence3,
        importance="Medium",
        found_location="Museum Garden",
        confidence_score=72,
        collected_date=date(2026, 7, 18)
    )

    db.session.add_all([ce1, ce2, ce3])
    db.session.commit()

    print("Database seeded successfully!")