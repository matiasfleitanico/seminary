import React from 'react';

function PdfViewer({ fileUrl }) {
  return (
    <div className="pdf-viewer">
      <iframe title="PDF Viewer" src={fileUrl} width="100%" height="600px"></iframe>
    </div>
  );
}

export default PdfViewer;