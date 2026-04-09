from pdfminer.high_level import extract_text
import io

def extract_text_from_pdf(file_bytes: bytes) -> str:
    """Extract text from a PDF file using pdfminer.six."""
    file_like = io.BytesIO(file_bytes)
    text = extract_text(file_like)
    return text
