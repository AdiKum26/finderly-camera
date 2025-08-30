/**
 * Created by Aditya Kumar on 30/08/2025
 * Documented clearly for understanding purposes
 */


import axios from 'axios';
import { VISION_CONFIG } from '../config/vision';

/**
 * Interface defining the structure of vision analysis results
 * 
 * This interface represents the standardized response format
 * returned by the vision service after processing images.
 * It includes detected labels with confidence scores, localized
 * objects, and extracted text content.
 */
interface VisionResponse {
  /** Array of detected labels with their descriptions */
  labels: string[];
  /** Confidence scores corresponding to each detected label */
  confidence: number[];
  /** Array of detected objects with their names */
  objects: string[];
  /** Optional extracted text content from the image */
  text?: string;
}

/**
 * VisionService Class
 * 
 * This service class encapsulates all functionality related to
 * computer vision analysis using Google Cloud Vision API. It
 * provides methods for analyzing images and extracting meaningful
 * information including objects, labels, and text.
 */
class VisionService {
  /** API key for Google Cloud Vision service authentication */
  private apiKey: string;
  /** Base URL for the Google Cloud Vision API endpoint */
  private baseUrl: string;

  /**
   * Constructor initializes the service with configuration
   * 
   * Sets up the API key and base URL from the configuration
   * file. The API key is essential for authenticating requests
   * to the Google Cloud Vision service.
   */
  constructor() {
    // Get API key from configuration
    this.apiKey = VISION_CONFIG.GOOGLE_CLOUD.API_KEY;
    this.baseUrl = VISION_CONFIG.GOOGLE_CLOUD.BASE_URL;
  }

  /**
   * Analyzes an image and returns comprehensive recognition results
   * 
   * This method processes images through Google Cloud Vision API
   * to extract multiple types of information. It handles image
   * preparation, API communication, and result processing.
   * 
   * The analysis includes three main feature types:
   * - Label Detection: General categorization of image content
   * - Object Localization: Precise object identification and positioning
   * - Text Detection: Extraction of readable text from images
   * 
   * @param imageBase64 - Base64 encoded image data for analysis
   * @returns Promise<VisionResponse> - Structured analysis results
   * @throws Error when API communication fails or processing errors occur
   */
  async analyzeImage(imageBase64: string): Promise<VisionResponse> {
    try {
      // Remove the data:image/jpeg;base64, prefix if present
      // This ensures the API receives clean base64 data
      const base64Image = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

      // Prepare the request payload for Google Cloud Vision API
      // The API expects a specific structure with features configuration
      const requestBody = {
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 10, // Limit results for performance optimization
              },
              {
                type: 'OBJECT_LOCALIZATION',
                maxResults: 10, // Limit results for performance optimization
              },
              {
                type: 'TEXT_DETECTION',
                maxResults: 5, // Limit results for performance optimization
              },
            ],
          },
        ],
      };

      // Send the analysis request to Google Cloud Vision API
      // The API processes the image and returns detailed results
      const response = await axios.post(
        `${this.baseUrl}?key=${this.apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Extract the first response from the API result
      // Google Cloud Vision returns results in a nested structure
      const result = response.data.responses[0];
      
      // Transform the API response into our standardized format
      // This ensures consistent data structure across the application
      return {
        labels: result.labelAnnotations?.map((label: any) => label.description) || [],
        confidence: result.labelAnnotations?.map((label: any) => label.score) || [],
        objects: result.localizedObjectAnnotations?.map((obj: any) => obj.name) || [],
        text: result.textAnnotations?.[0]?.description,
      };
    } catch (error) {
      // Log detailed error information for debugging
      console.error('Vision API Error:', error);
      // Throw user-friendly error message
      throw new Error('Failed to analyze image');
    }
  }

}

// Export a singleton instance of the service
// This ensures consistent configuration and state across the application
export default new VisionService();
