/**
 * Created by Aditya Kumar on 08/30/2025
 * visionService.ts - Handles object recognition via Google Cloud Vision API
 */

import axios from 'axios';
import { VISION_CONFIG } from '../config/vision';

/**
 * Sends a Base64 image to Google Vision API and extracts label annotations
 * @param imageBase64 - Base64-encoded image string (without metadata prefix)
 */
export const recognizeObjectsFromImage = async (imageBase64: string) => {
  try {
    const requestBody = {
      requests: [
        {
          image: { content: imageBase64 },
          features: [
            { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
            { type: 'LABEL_DETECTION', maxResults: 10 }
          ],
        },
      ],
    };

    const response = await axios.post(`${VISION_CONFIG.GOOGLE_CLOUD.BASE_URL}?key=${VISION_CONFIG.GOOGLE_CLOUD.API_KEY}`, requestBody);
    const result = response.data.responses?.[0];
    
    // Try to get specific objects first
    const objects = result?.localizedObjectAnnotations?.map((obj: any) => obj.name) || [];
    
    // If no specific objects found, fall back to labels
    const labels = result?.labelAnnotations?.map((label: any) => label.description) || [];
    
    // Return objects if found, otherwise return labels
    if (objects.length > 0) {
      return { objects, labels: [] };
    } else {
      return { objects: [], labels };
    }
  } catch (error) {
    console.error('Vision API error:', error);
    return { objects: [], labels: [] };
  }
};