import os
from dotenv import load_dotenv
from google import genai
from PIL import Image

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise Exception("GEMINI_API_KEY not found in .env")

client = genai.Client(api_key=api_key)


# ===========================
# Normal Chat
# ===========================
def ask_gemini(prompt: str):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        return response.text

    except Exception as e:
        return f"Gemini Error: {e}"


# ===========================
# PDF Summary
# ===========================
def summarize_pdf(text: str):
    try:
        prompt = f"""
You are Agael AI.

Read this PDF and provide:

1. A short summary.
2. Main ideas.
3. Important facts.
4. Explain difficult concepts simply.

Document:

{text[:30000]}
"""

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        return response.text

    except Exception as e:
        return f"Gemini Error: {e}"


# ===========================
# Image Analysis
# ===========================
def analyze_image(image_path):
    try:

        image = Image.open(image_path)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                image,
                """
You are Agael AI.

Carefully analyze this image.

Explain:
- What you see
- Important objects
- Text (if any)
- If it is a diagram, explain it.
- If it is a graph, interpret it.
- If it is a school question, solve it.
"""
            ]
        )

        return response.text

    except Exception as e:
        return f"Gemini Vision Error: {e}"