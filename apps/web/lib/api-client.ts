export async function uploadCV(
  file: File,
  token: string,
  onProgress?: (progress: number) => void,
) {
  const formData = new FormData();
  formData.append('file', file);

  const xhr = new XMLHttpRequest();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  return new Promise((resolve, reject) => {
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded * 100) / event.total);
        onProgress(progress);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        console.error(
          'Upload failed, status:',
          xhr.status,
          'response:',
          xhr.responseText,
        );
        reject(new Error(xhr.responseText || 'Upload failed'));
      }
    });

    xhr.open('POST', `${baseUrl}/upload`);
    // Add Bearer prefix to the token
    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send(formData);
  });
}
