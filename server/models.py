from config import db
from sqlalchemy.orm import validates
from werkzeug.security import generate_password_hash, check_password_hash


class Case(db.Model):
    __tablename__ = "cases"

    id = db.Column(db.Integer, primary_key=True)
    case_number = db.Column(db.String(20), unique=True, nullable=False)
    title = db.Column(db.String(100), nullable=False)
    crime_type = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(30), nullable=False)
    opened_date = db.Column(db.Date, nullable=False)
    lead_investigator = db.Column(db.String(100), nullable=False)

    # Relationships
    case_evidence = db.relationship(
        "CaseEvidence",
        back_populates="case",
        cascade="all, delete-orphan"
    )

    evidence_items = db.relationship(
        "Evidence",
        secondary="case_evidence",
        viewonly=True
    )

    # Model Validations
    @validates("title")
    def validate_title(self, key, title):
        if len(title.strip()) < 5:
            raise ValueError("Title must contain at least 5 characters.")
        return title

    @validates("status")
    def validate_status(self, key, status):
        allowed = ["Open", "Under Investigation", "Closed"]
        if status not in allowed:
            raise ValueError(
                "Status must be Open, Under Investigation, or Closed."
            )
        return status


class Evidence(db.Model):
    __tablename__ = "evidence"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    evidence_type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    secured = db.Column(db.Boolean, default=False)

    # Relationships
    case_evidence = db.relationship(
        "CaseEvidence",
        back_populates="evidence",
        cascade="all, delete-orphan"
    )

    investigation_cases = db.relationship(
        "Case",
        secondary="case_evidence",
        viewonly=True
    )

    # Model Validations
    @validates("name")
    def validate_name(self, key, name):
        if len(name.strip()) < 3:
            raise ValueError("Evidence name must contain at least 3 characters.")
        return name

    @validates("evidence_type")
    def validate_evidence_type(self, key, evidence_type):
        if not evidence_type.strip():
            raise ValueError("Evidence type cannot be empty.")
        return evidence_type


class CaseEvidence(db.Model):
    __tablename__ = "case_evidence"

    id = db.Column(db.Integer, primary_key=True)

    case_id = db.Column(
        db.Integer,
        db.ForeignKey("cases.id"),
        nullable=False
    )

    evidence_id = db.Column(
        db.Integer,
        db.ForeignKey("evidence.id"),
        nullable=False
    )

    importance = db.Column(db.String(20), nullable=False)
    found_location = db.Column(db.String(150), nullable=False)
    confidence_score = db.Column(db.Integer, nullable=False)
    collected_date = db.Column(db.Date, nullable=False)

    # Relationships
    case = db.relationship(
        "Case",
        back_populates="case_evidence"
    )

    evidence = db.relationship(
        "Evidence",
        back_populates="case_evidence"
    )

    # Model Validations
    @validates("confidence_score")
    def validate_confidence_score(self, key, score):
        if score < 0 or score > 100:
            raise ValueError("Confidence score must be between 0 and 100.")
        return score

    @validates("importance")
    def validate_importance(self, key, importance):
        allowed = ["Low", "Medium", "High", "Critical"]

        if importance not in allowed:
            raise ValueError(
                "Importance must be Low, Medium, High, or Critical."
            )

        return importance
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    @validates("email")
    def validate_email(self, key, email):
        if "@" not in email:
            raise ValueError("Invalid email address.")
        return email.lower()
