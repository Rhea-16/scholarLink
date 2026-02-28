// MahaDBTPDFCompressor.jsx
import React, { useState, useCallback, useRef } from 'react';
import './MahaDBTPDFCompressor.css';

// PDF Libraries
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const MahaDBTPDFCompressor = () => {
  // State Management
  const [currentFile, setCurrentFile] = useState(null);
  const [currentPdfBytes, setCurrentPdfBytes] = useState(null);
  const [compressedPdfBytes, setCompressedPdfBytes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState({ percent: 0, status: '' });
  const [fileInfo, setFileInfo] = useState({ name: '', size: 0, date: '' });
  
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = useCallback(async (file) => {
    // Reset states
    setError('');
    setShowResults(false);
    
    // Validate file type
    if (!file || file.type !== 'application/pdf') {
      setError('Please select a valid PDF file');
      return;
    }
    
    // Check file size (50MB max)
    if (file.size > 50 * 1024 * 1024) {
      setError('File size exceeds 50MB limit. Please choose a smaller file.');
      return;
    }
    
    try {
      // Read file
      const bytes = await file.arrayBuffer();
      
      // Update state
      setCurrentFile(file);
      setCurrentPdfBytes(bytes);
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2),
        date: new Date().toLocaleDateString()
      });
      
    } catch (err) {
      setError('Failed to read file. Please try again.');
    }
  }, []);

  // Drag and drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  // Compress PDF
  const compressPDF = useCallback(async () => {
    if (!currentPdfBytes) {
      setError('No file loaded. Please upload a PDF first.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setProgress({ percent: 5, status: 'Initializing...' });
    
    try {
      // Load PDF with pdf.js
      setProgress({ percent: 15, status: 'Loading PDF...' });
      const loadingTask = pdfjsLib.getDocument({ data: currentPdfBytes });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      
      setProgress({ percent: 25, status: `Processing ${numPages} page(s)...` });
      
      // Try different quality settings
      let attempts = 0;
      const maxAttempts = 3;
      let finalBytes = null;
      let quality = 0.8;
      
      while (attempts <= maxAttempts) {
        setProgress({ 
          percent: 30 + (attempts * 15), 
          status: `Compression attempt ${attempts + 1}...` 
        });
        
        // Create new PDF document
        const compressedDoc = await PDFDocument.create();
        
        // Process each page
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: quality - (attempts * 0.15) });
          
          // Create canvas for rendering
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          
          // Render page
          await page.render({
            canvasContext: context,
            viewport: viewport
          }).promise;
          
          // Convert to JPEG
          const jpegData = canvas.toDataURL('image/jpeg', 0.5);
          const jpegImage = await compressedDoc.embedJpg(jpegData.split(',')[1]);
          
          // Add page to new document
          const newPage = compressedDoc.addPage([viewport.width, viewport.height]);
          newPage.drawImage(jpegImage, {
            x: 0,
            y: 0,
            width: viewport.width,
            height: viewport.height,
          });
        }
        
        // Save and check size
        finalBytes = await compressedDoc.save();
        
        if (finalBytes.length <= 256 * 1024) {
          break; // Good enough
        }
        
        attempts++;
      }
      
      setProgress({ percent: 90, status: 'Finalizing...' });
      
      // Store compressed bytes
      setCompressedPdfBytes(finalBytes);
      setShowResults(true);
      
    } catch (err) {
      console.error('Compression error:', err);
      setError(`Failed to compress PDF: ${err.message}`);
    } finally {
      setIsLoading(false);
      setProgress({ percent: 0, status: '' });
    }
  }, [currentPdfBytes]);

  // Download compressed PDF
  const downloadPDF = useCallback(() => {
    if (!compressedPdfBytes) return;
    
    const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.name.replace('.pdf', '_compressed.pdf');
    link.click();
    URL.revokeObjectURL(url);
  }, [compressedPdfBytes, currentFile]);

  // Reset everything
  const resetAll = useCallback(() => {
    setCurrentFile(null);
    setCurrentPdfBytes(null);
    setCompressedPdfBytes(null);
    setShowResults(false);
    setError('');
    setFileInfo({ name: '', size: 0, date: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  return (
    <div className="compressor-container">
      {/* Background Gradient */}
      <div className="gradient-bg"></div>
      
      {/* Main Content */}
      <div className="content-wrapper">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <i className="fas fa-file-pdf"></i>
            <span>MAHADBT PORTAL</span>
          </div>
          <h1>PDF Size Optimizer</h1>
          <p className="subtitle">Official document compression tool for scholarship applications</p>
        </header>
        
        {/* Main Card */}
        <div className="main-card">
          {/* Requirement Banner */}
          <div className="requirement-banner">
            <div className="banner-left">
              <div className="banner-icon">
                <i className="fas fa-exclamation"></i>
              </div>
              <div className="banner-text">
                MahaDBT Requirement: Maximum file size <span className="highlight">256 KB</span>
              </div>
            </div>
            <div className="security-badge">
              <i className="fas fa-lock"></i>
              100% Private · No Upload
            </div>
          </div>
          
          {/* Body */}
          <div className="card-body">
            {/* Upload Area - Show only when no file is selected */}
            {!currentFile && (
              <div 
                className="upload-zone"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <i className="fas fa-cloud-upload-alt upload-icon"></i>
                <h3>Drop your PDF here</h3>
                <p>or click to browse</p>
                <div className="upload-hints">
                  <span><i className="fas fa-file-pdf"></i> PDF only</span>
                  <span><i className="fas fa-weight"></i> Max 50 MB</span>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept=".pdf" 
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>
            )}
            
            {/* File Info Card - Show when file is selected */}
            {currentFile && !showResults && (
              <div className="file-card">
                <div className="file-header">
                  <div className="file-icon">
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <div className="file-details">
                    <div className="file-name">{fileInfo.name}</div>
                    <div className="file-meta">
                      <span><i className="far fa-calendar"></i> {fileInfo.date}</span>
                    </div>
                  </div>
                  <div className="file-size">
                    <i className="fas fa-weight"></i> {fileInfo.size} KB
                  </div>
                </div>
                
                {/* Progress Bar */}
                {isLoading && (
                  <div className="progress-section">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progress.percent}%` }}
                      ></div>
                    </div>
                    <div className="progress-stats">
                      <span>{progress.status}</span>
                      <span>{progress.percent}%</span>
                    </div>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="action-buttons">
                  <button 
                    className="btn btn-primary"
                    onClick={compressPDF}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Compressing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-compress-alt"></i>
                        Compress to 256KB
                      </>
                    )}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={resetAll}
                    disabled={isLoading}
                  >
                    <i className="fas fa-times"></i>
                    Remove File
                  </button>
                </div>
              </div>
            )}
            
            {/* Error Message */}
            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}
            
            {/* Results Section */}
            {showResults && compressedPdfBytes && (
              <div className="results-card">
                <div className="results-header">
                  <i className="fas fa-check-circle success-icon"></i>
                  Compression Complete
                </div>
                
                {/* Size Comparison */}
                <div className="size-comparison">
                  <div className="size-box">
                    <div className="size-label">Original Size</div>
                    <div className="size-value">
                      {fileInfo.size} <small>KB</small>
                    </div>
                  </div>
                  <div className="arrow-icon">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                  <div className="size-box">
                    <div className="size-label">Compressed Size</div>
                    <div className="size-value">
                      {(compressedPdfBytes.length / 1024).toFixed(2)} <small>KB</small>
                    </div>
                  </div>
                </div>
                
                {/* Verdict */}
                <div className="verdict-section">
                  {compressedPdfBytes.length <= 256 * 1024 ? (
                    <div className="badge-success">
                      <i className="fas fa-check-circle"></i>
                      ✓ Success! File is ready for MahaDBT ({(compressedPdfBytes.length / 1024).toFixed(2)} KB)
                    </div>
                  ) : (
                    <div className="badge-warning">
                      <i className="fas fa-exclamation-triangle"></i>
                      ⚠ File is {(compressedPdfBytes.length / 1024).toFixed(2)} KB - Still above 256KB limit
                    </div>
                  )}
                </div>
                
                {/* Download Buttons */}
                <div className="download-buttons">
                  <button className="btn btn-primary" onClick={downloadPDF}>
                    <i className="fas fa-download"></i>
                    Download PDF
                  </button>
                  <button className="btn btn-secondary" onClick={resetAll}>
                    <i className="fas fa-redo-alt"></i>
                    Compress Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <footer className="footer">
          <span className="footer-badge">
            <i className="fas fa-shield-alt"></i>
            End-to-end encrypted · No files stored
          </span>
        </footer>
      </div>
    </div>
  );
};

export default MahaDBTPDFCompressor;