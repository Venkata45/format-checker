import sys
import os

# Add the backend directory to sys.path
sys.path.append(os.path.join(os.getcwd(), "backend"))

from services.analyzer import analyze_resume

good_resume_text = """
John Doe
Email: john.doe@email.com
Phone: (123) 456-7890

Summary
Professional Software Engineer with 5 years of experience in React and Python.

Skills
JavaScript, React, Python, FastAPI, SQL, Git

Work Experience
Company A | Senior Developer | 2021 - Present
- Built high-performance web applications using React.
- Specialized in API design with FastAPI.

Education
University of Technology | B.S. Computer Science | 2016 - 2020
"""

bad_resume_text = """
Jane Smith
Consultant

Experience
Worked at Various Places.

Education
Some College.
"""

print("--- Testing Good Resume ---")
good_result = analyze_resume(good_resume_text)
print(f"Score: {good_result['score']}")
print(f"Detected: {good_result['detected_sections']}")
print(f"Missing: {good_result['missing_sections']}")
print(f"Issues: {good_result['format_issues']}")

print("\n--- Testing Bad Resume ---")
bad_result = analyze_resume(bad_resume_text)
print(f"Score: {bad_result['score']}")
print(f"Detected: {bad_result['detected_sections']}")
print(f"Missing: {bad_result['missing_sections']}")
print(f"Issues: {bad_result['format_issues']}")
