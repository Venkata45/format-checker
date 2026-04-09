import re
from typing import List, Dict, Any

def analyze_resume(text: str) -> Dict[str, Any]:
    """Analyze the resume text for ATS compatibility."""
    
    sections_keywords = {
        "Name": [r"(\b[A-Z][a-z]+\s+[A-Z][a-z]+\b)"], # Simple regex for name-like patterns at start
        "Contact Information": [r"email", r"phone", r"\(\d{3}\)", r"@", r"\.com"],
        "Skills": [r"skills", r"technologies", r"tools", r"expertise"],
        "Work Experience": [r"experience", r"employment history", r"professional background", r"career summary"],
        "Education": [r"education", r"academic history", r"degree", r"university", r"college"]
    }
    
    detected_sections = []
    missing_sections = []
    format_issues = []
    suggestions = []
    score = 100
    
    # Check for basic section presence
    for section, patterns in sections_keywords.items():
        found = False
        for pattern in patterns:
            if re.search(pattern, text, re.IGNORECASE):
                found = True
                break
        if found:
            detected_sections.append(section)
        else:
            missing_sections.append(section)
            score -= 15
            suggestions.append(f"Add a clear '{section}' section.")

    # Rule-based formatting checks
    if text.count("\n") < 5:
        format_issues.append("Resume seems too short or malformed.")
        score -= 10
        suggestions.append("Ensure your resume has enough content and clear line breaks.")

    # Tables/Columns detection (basic heuristic: many tabs or multiple spaces)
    if "\t" in text or "    " in text:
        format_issues.append("Possible use of tables or multiple columns detected.")
        score -= 10
        suggestions.append("Avoid tables and complex multi-column layouts, which can confuse some older ATS.")

    # Non-standard headings (basic rule: check for common section headers vs detected)
    common_headers = ["experience", "education", "skills", "summary"]
    for header in common_headers:
        if header not in text.lower():
            format_issues.append(f"Standard header '{header.capitalize()}' not found.")
            # score already affected by missing_sections logic above
            
    # Simple Contact Info pattern check
    if "@" not in text:
        format_issues.append("Missing email address.")
        score -= 5
        suggestions.append("Email is critical for contact. Please include one.")
        
    if not re.search(r"\d{3}", text):
        format_issues.append("Missing or improperly formatted phone number.")
        score -= 5
        suggestions.append("Include a valid phone number.")

    # Poor section order (Summary/Exp should usually come early)
    early_text = text[:1000].lower()
    if "education" in early_text and "experience" in text.lower() and "experience" not in early_text:
        format_issues.append("Consider placing 'Experience' before 'Education' if you're not a recent graduate.")
        suggestions.append("For most roles, professional experience should be the primary focus and placed before education.")

    # Clamp score
    score = max(0, min(100, score))

    return {
        "score": score,
        "missing_sections": missing_sections,
        "format_issues": format_issues,
        "detected_sections": detected_sections,
        "suggestions": suggestions
    }
