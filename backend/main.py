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
    how_found_us_detail: str = ""
    event_date: str = Field(..., min_length=1)
    guest_count: str = Field(..., min_length=1)
    service_needed: str = Field(..., min_length=1)
    message: str = Field(..., min_length=1)
    has_planner: str = ""
    planner_name: str = ""
    wants_planning: bool = False
    privacy_accepted: bool = Field(..., description="Must be true")
    surname: str = ""  # honeypot


class EventQuotePayload(BaseModel):
    form_type: str = "events"
    full_name: str = Field(..., min_length=1)
    email: EmailStr
    phone: str = Field(..., min_length=1)
    event_date: str = Field(..., min_length=1)
    event_location: str = Field(..., min_length=1)
    event_location_detail: str = ""
    location_name: str = ""
    guest_count: str = Field(..., min_length=1)
    vision: str = Field(..., min_length=1)
    how_did_you_hear: str = Field(..., min_length=1)
    how_did_you_hear_detail: str = ""
    investment: str = Field(..., min_length=1)
    has_planner: str = ""
    planner_name: str = ""
    wants_planning: bool = False
    privacy_accepted: bool
    surname: str = ""  # honeypot


class WeddingQuotePayload(BaseModel):
    form_type: str  # "wedding" | "elopement"
    full_name: str = Field(..., min_length=1)
    fiance_name: str = Field(..., min_length=1)
    email: EmailStr
    phone: str = Field(..., min_length=1)
    where_from: str = Field(..., min_length=1)
    instagram: str = ""
    how_did_you_meet: str = Field(..., min_length=1)
    how_did_you_hear: str = Field(..., min_length=1)
    how_did_you_hear_detail: str = ""
    guest_count: str = ""
    elopement_guest_type: str = ""
    elopement_guest_count: str = ""
    services_interested: list[str] = []
    floral_pieces: list[str] = []
    multi_day_detail: str = ""
    event_date: str = Field(..., min_length=1)
    region: str = Field(..., min_length=1)
    region_detail: str = ""
    ceremony_location: str = Field(..., min_length=1)
    preferred_moment: str = Field(..., min_length=1)
    pinterest_link: str = ""
    style: str = Field(..., min_length=1)
    style_elements: str = ""
    dream_photographer: str = ""
    budget: str = Field(..., min_length=1)
    has_planner: str = ""
    planner_name: str = ""
    wants_planning: bool = False
    privacy_accepted: bool
    surname: str = ""  # honeypot


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


@app.post("/api/quote-event")
def post_quote_event(body: EventQuotePayload):
    if body.surname:
        return {"ok": True}
    if not body.privacy_accepted:
        raise HTTPException(status_code=400, detail="Privacy required")
    data = body.model_dump()
    html = "<h2>Get a quote, Events</h2>" + _rows(data)
    _send_resend(f"Quote (Events): {body.full_name}", html)
    return {
        "ok": True,
        "message": "Thank you for contacting me!",
        "redirect": "/portfolio/",
    }


@app.post("/api/quote-wedding")
def post_quote_wedding(body: WeddingQuotePayload):
    if body.surname:
        return {"ok": True}
    if not body.privacy_accepted:
        raise HTTPException(status_code=400, detail="Privacy required")
    data = body.model_dump()
    label = "Elopement" if body.form_type == "elopement" else "Wedding"
    html = f"<h2>Get a quote, {label}</h2>" + _rows(data)
    _send_resend(f"Quote ({label}): {body.full_name}", html)
    return {
        "ok": True,
        "message": "Thank you for contacting me!",
        "redirect": "/portfolio/",
    }
