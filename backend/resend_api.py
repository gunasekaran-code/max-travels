import os
from pathlib import Path
from flask import Flask, request, jsonify
from flask_cors import CORS
import resend


def load_env_file() -> None:
    env_path = Path(__file__).resolve().parent.parent / ".env"
    if not env_path.exists():
        return

    for line in env_path.read_text().splitlines():
        if not line or line.lstrip().startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip("\"'"))


load_env_file()

app = Flask(__name__)
# Enable CORS so your Next.js app running on localhost:3000 can talk to this backend
CORS(app, resources={r"/api/*": {"origins": "*"}})

resend.api_key = os.environ.get("RESEND_API_KEY")

@app.route("/api/contact", methods=["POST"])
def send_contact_email():
    try:
        data = request.json
        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        if not name or not email or not message:
            return jsonify({"error": "Missing required fields"}), 400

        # Constructing the email format with modern styling
        email_html = f"""
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; rounded-corners: 12px; overflow: hidden;">
            <div style="background-color: #1c1c1c; padding: 24px; text-align: center;">
                <h2 style="color: #ffffff; margin: 0; font-size: 24px;">New Contact Inquiry</h2>
            </div>
            <div style="padding: 30px; background-color: #ffffff; color: #1f2937; line-height: 1.6;">
                <p style="margin-top: 0;">You have received a new message from your website contact form:</p>
                
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr>
                        <td style="padding: 10px 0; font-weight: bold; width: 100px; border-bottom: 1px solid #f3f4f6;">Name:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">{name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Email:</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;"><a href="mailto:{email}" style="color: #2563eb;">{email}</a></td>
                    </tr>
                </table>

                <div style="background-color: #f9fafb; border-left: 4px solid #1c1c1c; padding: 16px; margin-top: 20px; font-style: italic;">
                    "{message}"
                </div>
            </div>
            <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #6b7280;">
                Sent via Max Travels Lead Capture Engine
            </div>
        </div>
        """

        # Sending via Resend API Client
        response = resend.Emails.send({
            "from": "onboarding@resend.dev",
            "to": "gunasekaran.code@gmail.com",
            "subject": f"New Message from {name}",
            "html": email_html
        })

        return jsonify({"success": True, "message_id": getattr(response, "id", str(response))}), 200

    except Exception as e:
        print(f"Error handling request: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Runs the local API layer on Port 5000
    app.run(host="0.0.0.0", port=5000, debug=True)
