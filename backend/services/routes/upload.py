from fastapi import APIRouter, UploadFile, File
import os
import shutil

from services.pdf_service import extract_pdf_text
from services.gemini_service import summarize_pdf, analyze_image

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/")
async def upload_file(file: UploadFile = File(...)):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # -----------------------------
    # PDF
    # -----------------------------
    if file.filename.lower().endswith(".pdf"):

        text = extract_pdf_text(file_path)

        if not text.strip():
            return {
                "filename": file.filename,
                "message": "This PDF appears to be scanned and contains no selectable text."
            }

        summary = summarize_pdf(text)

        return {
            "filename": file.filename,
            "type": "pdf",
            "summary": summary,
        }

    # -----------------------------
    # Images
    # -----------------------------
    if file.filename.lower().endswith(
        (".png", ".jpg", ".jpeg", ".webp")
    ):

        analysis = analyze_image(file_path)

        return {
            "filename": file.filename,
            "type": "image",
            "analysis": analysis,
        }

    return {
        "filename": file.filename,
        "message": "File uploaded successfully."
    }