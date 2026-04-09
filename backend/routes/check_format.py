from fastapi import APIRouter, UploadFile, File, HTTPException
from parsers.pdf_parser import extract_text_from_pdf
from parsers.docx_parser import extract_text_from_docx
from services.analyzer import analyze_resume
from models.resumes import AnalysisResult

router = APIRouter()

@router.post("/check-format", response_model=AnalysisResult)
async def check_format(request_file: UploadFile = File(...)):
    """API endpoint to check resume format."""
    
    file_bytes = await request_file.read()
    filename = request_file.filename.lower()
    
    try:
        if filename.endswith(".pdf"):
            text = extract_text_from_pdf(file_bytes)
        elif filename.endswith(".docx"):
            text = extract_text_from_docx(file_bytes)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF or DOCX.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error parsing file: {str(e)}")

    if not text.strip():
         raise HTTPException(status_code=422, detail="Extracted text is empty. Resume may be image-based or empty.")

    results = analyze_resume(text)
    return AnalysisResult(**results)
