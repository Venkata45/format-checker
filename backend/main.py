from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from routes.check_format import router as analysis_router

app = FastAPI(title="Resume ATS Checker API", description="Checks Resume ATS Compatibility and Structure")

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Resume ATS Checker API is running. Access via /docs for interactive documentation."}

# Include routes
app.include_router(analysis_router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
