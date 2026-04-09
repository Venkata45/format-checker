from pydantic import BaseModel
from typing import List

class AnalysisResult(BaseModel):
    score: int
    missing_sections: List[str]
    format_issues: List[str]
    detected_sections: List[str]
    suggestions: List[str]
