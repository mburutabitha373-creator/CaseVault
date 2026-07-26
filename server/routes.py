from datetime import datetime
from flask import request, jsonify , session
from sqlalchemy.exc import IntegrityError

from app import app
from config import db
from models import Case, Evidence, CaseEvidence , User
from schemas import (
    CaseSchema,
    EvidenceSchema,
    CaseEvidenceSchema
)

case_schema = CaseSchema()
cases_schema = CaseSchema(many=True)

evidence_schema = EvidenceSchema()
evidence_list_schema = EvidenceSchema(many=True)

case_evidence_schema = CaseEvidenceSchema()


@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to the CaseVault API"
    })


# ===========================================
# CASE ROUTES
# ===========================================

@app.route("/cases", methods=["GET"])
def get_cases():
    cases = Case.query.all()
    return jsonify(cases_schema.dump(cases)), 200


@app.route("/cases/<int:id>", methods=["GET"])
def get_case(id):
    case = Case.query.get_or_404(id)
    return jsonify(case_schema.dump(case)), 200


@app.route("/cases", methods=["POST"])
def create_case():

    data = request.get_json()

    errors = case_schema.validate(data)

    if errors:
        return jsonify(errors), 400

    try:
        new_case = Case(
            case_number=data["case_number"],
            title=data["title"],
            crime_type=data["crime_type"],
            status=data["status"],
            opened_date=datetime.strptime(
                data["opened_date"],
                "%Y-%m-%d"
            ).date(),
            lead_investigator=data["lead_investigator"]
        )

        db.session.add(new_case)
        db.session.commit()

        return jsonify(case_schema.dump(new_case)), 201

    except (ValueError, IntegrityError) as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@app.route("/cases/<int:id>", methods=["PATCH"])
def update_case(id):

    case = Case.query.get_or_404(id)

    data = request.get_json()

    errors = case_schema.validate(data)

    if errors:
        return jsonify(errors), 400

    try:
        case.case_number = data["case_number"]
        case.title = data["title"]
        case.crime_type = data["crime_type"]
        case.status = data["status"]
        case.opened_date = datetime.strptime(
            data["opened_date"],
            "%Y-%m-%d"
        ).date()
        case.lead_investigator = data["lead_investigator"]

        db.session.commit()

        return jsonify(case_schema.dump(case)), 200

    except (ValueError, IntegrityError) as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@app.route("/cases/<int:id>", methods=["DELETE"])
def delete_case(id):

    case = Case.query.get_or_404(id)

    db.session.delete(case)
    db.session.commit()

    return jsonify({
        "message": "Case deleted successfully."
    }), 200


# ===========================================
# EVIDENCE ROUTES
# ===========================================

@app.route("/evidence", methods=["GET"])
def get_evidence():

    evidence = Evidence.query.all()

    return jsonify(evidence_list_schema.dump(evidence)), 200


@app.route("/evidence/<int:id>", methods=["GET"])
def get_single_evidence(id):

    evidence = Evidence.query.get_or_404(id)

    return jsonify(evidence_schema.dump(evidence)), 200


@app.route("/evidence", methods=["POST"])
def create_evidence():

    data = request.get_json()

    errors = evidence_schema.validate(data)

    if errors:
        return jsonify(errors), 400

    try:
        evidence = Evidence(
            name=data["name"],
            evidence_type=data["evidence_type"],
            description=data.get("description"),
            secured=data.get("secured", False)
        )

        db.session.add(evidence)
        db.session.commit()

        return jsonify(evidence_schema.dump(evidence)), 201

    except (ValueError, IntegrityError) as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@app.route("/evidence/<int:id>", methods=["DELETE"])
def delete_evidence(id):

    evidence = Evidence.query.get_or_404(id)

    db.session.delete(evidence)
    db.session.commit()

    return jsonify({
        "message": "Evidence deleted successfully."
    }), 200


# ===========================================
# CASE-EVIDENCE ROUTES
# ===========================================

@app.route(
    "/cases/<int:case_id>/evidence/<int:evidence_id>/case_evidence",
    methods=["POST"]
)
def add_evidence_to_case(case_id, evidence_id):

    Case.query.get_or_404(case_id)
    Evidence.query.get_or_404(evidence_id)

    data = request.get_json()

    errors = case_evidence_schema.validate(data)

    if errors:
        return jsonify(errors), 400

    try:
        relationship = CaseEvidence(
            case_id=case_id,
            evidence_id=evidence_id,
            importance=data["importance"],
            found_location=data["found_location"],
            confidence_score=data["confidence_score"],
            collected_date=datetime.strptime(
                data["collected_date"],
                "%Y-%m-%d"
            ).date()
        )

        db.session.add(relationship)
        db.session.commit()

        return jsonify(case_evidence_schema.dump(relationship)), 201

    except (ValueError, IntegrityError) as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
# ===========================================
# AUTHENTICATION ROUTES
# ===========================================

@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({"error": "Request body is required."}), 400

    full_name = data.get("full_name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not full_name:
        return jsonify({"error": "Full name is required."}), 400

    if not email:
        return jsonify({"error": "Email is required."}), 400

    if not password:
        return jsonify({"error": "Password is required."}), 400

    if len(password) < 8:
        return jsonify({
            "error": "Password must be at least 8 characters."
        }), 400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({
            "error": "An account with this email already exists."
        }), 409

    try:
        user = User(
            full_name=full_name,
            email=email
        )

        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        return jsonify({
            "message": "Account created successfully.",
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email
            }
        }), 201

    except (ValueError, IntegrityError) as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:
        return jsonify({"error": "Request body is required."}), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({
            "error": "Email and password are required."
        }), 400

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({
            "error": "Invalid email or password."
        }), 401

    session["user_id"] = user.id

    return jsonify({
        "message": "Login successful.",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email
        }
    }), 200
