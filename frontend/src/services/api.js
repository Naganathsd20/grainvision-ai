/**
 * GrainVision AI — API Service Module
 * Phase 8: Frontend Web Application
 * 
 * Reusable HTTP helper for communicating with the Flask backend server.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Sends a GET request to verify Flask backend status.
 * @returns {Promise<Object>} Backend health payload.
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Backend health check failed:', error);
    throw error;
  }
}

/**
 * Sends an uploaded rice grain image file to POST /api/predict.
 * 
 * @param {File} imageFile - The selected image file object.
 * @returns {Promise<Object>} API prediction response containing class, confidence, and probabilities.
 */
export async function predictRiceGrain(imageFile) {
  if (!imageFile) {
    throw new Error('Please select an image file first.');
  }

  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch(`${API_BASE_URL}/api/predict`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
      const errorMsg = data.error || `Prediction request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the prediction server. Please ensure the Flask backend is running on http://localhost:5000.');
    }
    throw error;
  }
}
