import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Lightbulb, Fish, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiscusFish } from '../types';

interface PredictionResultProps {
  prediction: DiscusFish | null;
  onReset: () => void;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction, onReset }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!prediction) return null;

  // Extract confidence value for styling
  const confidenceValue = parseFloat(prediction.confidence.replace('%', ''));
  
  // Determine confidence level color
  let confidenceColor = theme.palette.success.main;
  if (confidenceValue < 70) {
    confidenceColor = theme.palette.error.main;
  } else if (confidenceValue < 85) {
    confidenceColor = theme.palette.warning.main;
  }

  return (
    <AnimatePresence>
      {prediction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Paper
            elevation={3}
            sx={{
              mt: 4,
              p: { xs: 2, sm: 4 },
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(229, 231, 235, 0.5)',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      borderRadius: '50%',
                      p: 1.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: { xs: 2, sm: 0 },
                      mr: { xs: 0, sm: 2 },
                    }}
                  >
                    <Fish size={32} color={theme.palette.primary.dark} />
                  </Box>
                </motion.div>
                
                <Box>
                  <Typography 
                    variant={isMobile ? "h5" : "h4"} 
                    component="h2" 
                    sx={{ 
                      fontWeight: 700,
                      color: theme.palette.primary.dark,
                    }}
                  >
                    {prediction.predicted_class}
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: { xs: 'center', sm: 'flex-start' },
                      mt: 1,
                    }}
                  >
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <Chip 
                        label={`Confidence: ${prediction.confidence}`}
                        sx={{ 
                          fontWeight: 600,
                          backgroundColor: `${confidenceColor}20`,
                          color: confidenceColor,
                          '& .MuiChip-label': { px: 1.5 }
                        }}
                        size="small"
                      />
                    </motion.div>
                  </Box>
                </Box>
              </Box>
              
              <Box 
                sx={{ 
                  mt: 2, 
                  p: 2, 
                  backgroundColor: 'rgba(59, 130, 246, 0.05)', 
                  borderRadius: 2,
                  border: '1px solid rgba(59, 130, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <Lightbulb 
                  size={20} 
                  color={theme.palette.info.main} 
                  style={{ marginRight: '12px', marginTop: '2px' }}
                />
                <Typography variant="body1" color="text.primary">
                  {prediction.description}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={onReset}
                    startIcon={<RotateCcw size={18} />}
                    sx={{ px: 3 }}
                  >
                    Analyze Another Image
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PredictionResult;