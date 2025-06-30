/** @format */

// Image service for handling local file uploads and cleanup

const IMAGE_SERVICE_URL = "http://localhost:8000";

export class ImageService {
  // Upload image to selectedimg folder
  static async uploadImage(
    file: File,
  ): Promise<{ success: boolean; filename?: string; error?: string }> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${IMAGE_SERVICE_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Upload error:", error);
      return { success: false, error: "Failed to upload image" };
    }
  }

  // Clean up selectedimg folder
  static async cleanup(): Promise<{ success: boolean; error?: string }> {
    try {
      const response = await fetch(`${IMAGE_SERVICE_URL}/api/cleanup`, {
        method: "POST",
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Cleanup error:", error);
      return { success: false, error: "Failed to cleanup files" };
    }
  }

  // Check if service is available
  static async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${IMAGE_SERVICE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}
