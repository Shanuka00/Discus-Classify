/** @format */

import React, { useCallback, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DiscusFish } from "../types";
import { getPrediction } from "../data/mockData";
import { ImageService } from "../services/imageService";

interface ImageUploadProps {
  onPredictionResult: (prediction: DiscusFish) => void;
  onReset: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  shouldReset?: boolean; // Add a prop to trigger reset from parent
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onPredictionResult,
  onReset,
  isLoading,
  setIsLoading,
  shouldReset,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Reset image preview when shouldReset changes
  useEffect(() => {
    if (shouldReset) {
      setImagePreview(null);
    }
  }, [shouldReset]);

  const handlePrediction = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay with our mock data
      const result = await getPrediction();
      onPredictionResult(result);
    } catch (error) {
      console.error("Error getting prediction:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, onPredictionResult]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Save image to selectedimg folder
        const uploadResult = await ImageService.uploadImage(file);
        console.log("Upload result", uploadResult);
        if (!uploadResult.success) {
          console.error("Failed to save image:", uploadResult.error);
        } else {
          console.log(
            "Image saved to selectedimg folder:",
            uploadResult.filename,
          );
        }

        const reader = new FileReader();

        reader.onload = () => {
          setImagePreview(reader.result as string);
          // Simulate prediction process
          handlePrediction();
        };

        reader.readAsDataURL(file);
      }
    },
    [handlePrediction],
  );

  const removeImage = async () => {
    // Clean up selectedimg folder
    const cleanupResult = await ImageService.cleanup();
    if (!cleanupResult.success) {
      console.error("Failed to cleanup files:", cleanupResult.error);
    } else {
      console.log("Files cleaned up successfully");
    }

    setImagePreview(null);
    onReset();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    multiple: false,
    disabled: isLoading,
  });

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <AnimatePresence mode="wait">
        {!imagePreview ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 4 },
                borderRadius: 3,
                borderStyle: "dashed",
                borderWidth: 2,
                borderColor: isDragActive
                  ? theme.palette.primary.main
                  : theme.palette.grey[300],
                backgroundColor: isDragActive
                  ? "rgba(59, 130, 246, 0.05)"
                  : theme.palette.background.paper,
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: "rgba(59, 130, 246, 0.05)",
                },
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  p: { xs: 2, sm: 4 },
                }}
              >
                <UploadCloud
                  size={isMobile ? 48 : 64}
                  color={
                    isDragActive
                      ? theme.palette.primary.main
                      : theme.palette.grey[500]
                  }
                  strokeWidth={1.5}
                />
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  align="center"
                  sx={{ mt: 2, fontWeight: 600 }}
                >
                  {isDragActive
                    ? "Drop your image here"
                    : "Drag & drop your Discus fish image"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 1 }}
                >
                  or click to browse files
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  align="center"
                  sx={{ mt: 1 }}
                >
                  Supported formats: JPG, PNG
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                  startIcon={<UploadCloud size={18} />}
                >
                  Select Image
                </Button>
              </Box>
            </Paper>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Paper
              elevation={3}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Image Preview
                </Typography>
                <Box>
                  <IconButton
                    color="primary"
                    onClick={handlePrediction}
                    disabled={isLoading}
                    sx={{ mr: 1 }}
                  >
                    <RefreshCw size={20} />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={removeImage}
                    disabled={isLoading}
                  >
                    <X size={20} />
                  </IconButton>
                </Box>
              </Box>
              <Box
                sx={{
                  position: "relative",
                  height: { xs: 200, sm: 300, md: 400 },
                  width: "100%",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Discus fish preview"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    backgroundColor: "black",
                  }}
                />

                {isLoading && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      borderRadius: 2,
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <CircularProgress color="primary" />
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 2,
                          color: "white",
                          fontWeight: 500,
                        }}
                      >
                        Analyzing image...
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ImageUpload;
