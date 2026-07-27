from flask import Flask, jsonify
from flask_cors import CORS

from config import db, migrate

app = Flask(__name__)
app.config["SECRET_KEY"] = "casevault-dev-secret-key-change-this-later"
CORS(
    app,
    resources={r"/*": {"origins": [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://case-vault-fqzbgejvi-tabby4.vercel.app",
        "https://case-vault-sable.vercel.app",
        "https://case-vault-git-main-tabby4.vercel.app"
    ]}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///casevault.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Initialize extensions
db.init_app(app)
migrate.init_app(app, db)

# Import models
from models import *

# Import routes
from routes import *


# -----------------------------
# Error Handlers
# -----------------------------

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Resource not found."
    }), 404


@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "error": "Bad request."
    }), 400


@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({
        "error": "Internal server error."
    }), 500


if __name__ == "__main__":
    app.run(port=5555, debug=True)
