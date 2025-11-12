// Docket submission via Cloudflare Worker
document.getElementById('docket-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const status = document.getElementById('status');
  status.textContent = 'Submitting...';
  status.style.color = 'blue';

  const slug = document.getElementById('case-slug').value;
  const date = document.getElementById('entry-date').value;
  const type = document.getElementById('entry-type').value;
  const title = document.getElementById('entry-title').value;
  const notes = document.getElementById('entry-notes').value;
  const file = document.getElementById('pdf-file').files[0];

  if (!file) {
    status.textContent = 'Please select a PDF file.';
    status.style.color = 'red';
    return;
  }

  // Read file as base64
  const reader = new FileReader();
  reader.onload = async () => {
    const base64 = reader.result.split(',')[1];
    
    try {
      // TODO: Replace with your Cloudflare Worker URL
      const workerUrl = 'https://your-worker.your-subdomain.workers.dev/docket-upload';
      
      const response = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          date,
          type,
          title,
          notes,
          filename: file.name,
          content: base64
        })
      });

      const result = await response.json();
      
      if (response.ok) {
        status.innerHTML = `Success! Pull request created: <a href="${result.pr_url}" target="_blank">${result.pr_url}</a>`;
        status.style.color = 'green';
        document.getElementById('docket-form').reset();
      } else {
        status.textContent = `Error: ${result.error || 'Unknown error'}`;
        status.style.color = 'red';
      }
    } catch (error) {
      status.textContent = `Error: ${error.message}`;
      status.style.color = 'red';
    }
  };
  
  reader.readAsDataURL(file);
});
