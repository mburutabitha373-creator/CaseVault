from marshmallow import Schema, fields, validate, validates, ValidationError


class EvidenceSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(
        required=True,
        validate=validate.Length(min=3)
    )
    evidence_type = fields.Str(required=True)
    description = fields.Str()
    secured = fields.Bool()


class CaseEvidenceSchema(Schema):
    id = fields.Int(dump_only=True)

    case_id = fields.Int(dump_only=True)
    evidence_id = fields.Int(dump_only=True)

    importance = fields.Str(required=True)
    found_location = fields.Str(required=True)
    confidence_score = fields.Int(required=True)
    collected_date = fields.Date(required=True)

    @validates("confidence_score")
    def validate_confidence(self, value, **kwargs):
        if value < 0 or value > 100:
            raise ValidationError(
                "Confidence score must be between 0 and 100."
            )

    @validates("importance")
    def validate_importance(self, value, **kwargs):
        allowed = ["Low", "Medium", "High", "Critical"]

        if value not in allowed:
            raise ValidationError(
                "Importance must be Low, Medium, High, or Critical."
            )


class CaseSchema(Schema):
    id = fields.Int(dump_only=True)

    case_number = fields.Str(required=True)

    title = fields.Str(
        required=True,
        validate=validate.Length(min=5)
    )

    crime_type = fields.Str(required=True)
    status = fields.Str(required=True)
    opened_date = fields.Date(required=True)
    lead_investigator = fields.Str(required=True)

    evidence_items = fields.List(
        fields.Nested(EvidenceSchema),
        dump_only=True
    )

    @validates("status")
    def validate_status(self, value, **kwargs):
        allowed = ["Open", "Under Investigation", "Closed"]

        if value not in allowed:
            raise ValidationError(
                "Status must be Open, Under Investigation, or Closed."
            )