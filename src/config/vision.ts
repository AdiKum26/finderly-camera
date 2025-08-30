/**
 * Created by Aditya Kumar on 30/08/2025
 * Documented clearly for understanding purposes
 * 
 * ⚠️ SECURITY WARNING: 
 * - This file contains a placeholder API key
 * - You MUST replace 'YOUR_GOOGLE_CLOUD_VISION_API_KEY_HERE' with your actual API key
 * - Never commit your real API key to version control
 * - See API_CONFIG_TEMPLATE.md for setup instructions
 */


/**
 * Vision Configuration Module
 * 
 * This module centralizes all configuration settings related to
 * computer vision services used in the application. It provides
 * a single source of truth for API endpoints, authentication
 * credentials, and feature configurations.
 */

/**
 * Google Cloud Vision API Configuration
 * 
 * Contains all settings required to interact with Google Cloud
 * Vision API, including authentication, endpoints, and feature
 * configurations. This service provides comprehensive image
 * analysis capabilities including object detection, label
 * classification, and text extraction.
 */
export const GOOGLE_CLOUD = {
  /** API key for authenticating requests to Google Cloud Vision */
  API_KEY: 'YOUR_GOOGLE_CLOUD_VISION_API_KEY_HERE', // ⚠️ REPLACE WITH YOUR ACTUAL API KEY
  
  /** Base URL for the Google Cloud Vision API endpoint */
  BASE_URL: 'https://vision.googleapis.com/v1/images:annotate',
  
  /** Maximum number of results to return for each feature type */
  MAX_RESULTS: {
    LABELS: 10,      // Maximum label detection results
    OBJECTS: 10,     // Maximum object localization results
    TEXT: 5,         // Maximum text detection results
    FACES: 5,        // Maximum face detection results
    LANDMARKS: 5,    // Maximum landmark detection results
    LOGOS: 5,        // Maximum logo detection results
  },
  
  /** Supported image formats for analysis */
  SUPPORTED_FORMATS: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
  ],
  
  /** Maximum image size in bytes (10MB) */
  MAX_IMAGE_SIZE: 10 * 1024 * 1024,
};

/**
 * Vision Service Configuration
 * 
 * Global configuration object that consolidates all vision
 * service settings. This provides a unified interface for
 * accessing configuration across the application.
 */
export const VISION_CONFIG = {
  /** Google Cloud Vision API settings */
  GOOGLE_CLOUD,
  
  /** Global vision service settings */
  GLOBAL: {
    /** Default timeout for API requests in milliseconds */
    REQUEST_TIMEOUT: 30000,
    
    /** Maximum retry attempts for failed requests */
    MAX_RETRIES: 3,
    
    /** Whether to enable request caching */
    ENABLE_CACHING: true,
    
    /** Cache expiration time in milliseconds */
    CACHE_EXPIRY: 5 * 60 * 1000, // 5 minutes
  },
};

export default VISION_CONFIG;
