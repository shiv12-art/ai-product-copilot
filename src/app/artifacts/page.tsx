import { readFileSync } from 'fs';
import { join } from 'path';

export default function ArtifactsPage() {
  // This page will serve the HTML file content
  return (
    <div dangerouslySetInnerHTML={{
      __html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Redirecting to AI Product Copilot...</title>
          <script>
            window.location.href = '/product-artifacts-enhanced.html';
          </script>
        </head>
        <body>
          <p>Redirecting to AI Product Copilot...</p>
        </body>
        </html>
      `
    }} />
  );
}
