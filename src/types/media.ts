/**
 * Media Types and Interfaces
 * 
 * TypeScript type definitions for media-related functionality
 * in the Finderly Camera application. Provides type safety
 * for photo capture, storage, and display operations.
 * 
 * @author Aditya Kumar
 * @created 2024
 * @version 1.0.0
 */

/**
 * CapturedPhoto Interface
 * 
 * Represents a successfully captured photo with metadata
 * for display and processing purposes. This interface ensures
 * type safety when working with photo data throughout the app.
 * 
 * @interface CapturedPhoto
 * @property {string} uri - File path or URL to the captured photo
 * @property {number} [width] - Optional width of the photo in pixels
 * @property {number} [height] - Optional height of the photo in pixels
 * 
 * @example
 * ```tsx
 * const photo: CapturedPhoto = {
 *   uri: "file:///path/to/photo.jpg",
 *   width: 1920,
 *   height: 1080
 * };
 * ```
 */
export interface CapturedPhoto {
  /** File path or URL to access the captured photo */
  uri: string;
  
  /** Photo width in pixels (optional, may not be available immediately) */
  width?: number;
  
  /** Photo height in pixels (optional, may not be available immediately) */
  height?: number;
}
