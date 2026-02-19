from PyPDF2 import PdfReader
import glob
import os

# Find the PDF file
pdf_files = glob.glob("e:/DB Website/dB*Outputs*.pdf")
if pdf_files:
    print(f"Found PDF: {pdf_files[0]}")
    r = PdfReader(pdf_files[0])
    for i, p in enumerate(r.pages):
        text = p.extract_text()
        print(f"--- Page {i+1} ---")
        print(text)
else:
    # List all files to find it
    for f in os.listdir("e:/DB Website"):
        print(f"File: {f}")
