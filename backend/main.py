import html
import os
from typing import Any

import resend
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

app = FastAPI(title="Motif Floral API")

_origins_raw = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
ALLOWED_ORIGINS = [o.strip() for o in _origins_raw.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


class ContactPayload(BaseModel):
    full_name: str = Field(..., min_length=1)
    email: EmailStr
    country: str = Field(..., min_length=1)
    how_found_us: str = Field(..., min_length=1)
    event_date: str = Field(..., min_length=1)
    guest_count: str = Field(..., min_length=1)
    service_needed: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)
    privacy_accepted: bool = Field(..., description="Must be true")
    surname: str = ""  # honeypot


class QuotePayload(BaseModel):
    full_name: str
    partner_name: str
    email: EmailStr
    country: str
    instagram: str = ""
    how_found_us: str
    event_date: str
    guest_count: str
    moodboard: str
    ceremony_type: str
    ceremony_location: str
    ceremony_setup: str
    reception_venue: str
    reception_tables: str
    num_tables: str
    table_setup_desc: str
    pinterest: str
    wedding_planner: str
    photographer: str
    budget: str
    privacy_accepted: bool
    surname: str = ""


def _send_resend(subject: str, html: str) -> None:
    key = os.getenv("RESEND_API_KEY")
    from_email = os.getenv("FROM_EMAIL")
    to_email = os.getenv("RECIPIENT_EMAIL")
    if not key or not from_email or not to_email:
        raise HTTPException(status_code=503, detail="Email not configured")
    resend.api_key = key
    params: dict[str, Any] = {
        "from": from_email,
        "to": [to_email],
        "subject": subject,
        "html": html,
    }
    try:
        resend.Emails.send(params)
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Resend error") from exc


def _rows(d: dict[str, Any]) -> str:
    parts = []
    for k, v in d.items():
        if k == "surname" or v is None or v == "":
            continue
        sv = html.escape(str(v))
        sk = html.escape(str(k))
        parts.append(f"<tr><td><strong>{sk}</strong></td><td>{sv}</td></tr>")
    return "<table>" + "".join(parts) + "</table>"


@app.post("/api/contact")
def post_contact(body: ContactPayload):
    if body.surname:
        return {"ok": True}
    if not body.privacy_accepted:
        raise HTTPException(status_code=400, detail="Privacy required")
    data = body.model_dump()
    html = "<h2>Contact form</h2>" + _rows(data)
    _send_resend(f"Contact: {body.full_name}", html)
    return {"ok": True, "message": "Thank you for contacting us!"}


@app.post("/api/quote")
def post_quote(body: QuotePayload):
    if body.surname:
        return {"ok": True}
    if not body.privacy_accepted:
        raise HTTPException(status_code=400, detail="Privacy required")
    data = body.model_dump()
    html = "<h2>Get a quote</h2>" + _rows(data)
    _send_resend(f"Quote: {body.full_name}", html)
    return {
        "ok": True,
        "message": "Thank you for contacting me!",
        "redirect": "/portfolio/",
    }
