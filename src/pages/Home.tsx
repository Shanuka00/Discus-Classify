import React, { useState } from 'react';
import { Container, Box, Paper, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import ImageUpload from '../components/ImageUpload';
import PredictionResult from '../components/PredictionResult';
import Footer from '../components/Footer';
import { DiscusFish } from '../types';

const Home: React.FC = () => {
  const [prediction, setPrediction] = useState<DiscusFish | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePredictionResult = (result: DiscusFish) => {
    setPrediction(result);
  };

  const handleReset = () => {
    setPrediction(null);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)',
      }}
    >
      <Header />
      
      <Container maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2, sm: 4 },
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              mb: 4,
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                  color: (theme) => theme.palette.primary.dark,
                }}
              >
                Discus Fish Classifier
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
                Upload an image of your Discus fish and our AI will identify its variety. 
                Get instant information about different Discus types and their characteristics.
              </Typography>
            </Box>
            
            <ImageUpload 
              onPredictionResult={handlePredictionResult}
              onReset={handleReset}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            
            <PredictionResult 
              prediction={prediction}
              onReset={handleReset}
            />
          </Paper>
          
          <Box 
            sx={{ 
              mt: 4, 
              mx: 'auto', 
              maxWidth: '800px',
              display: prediction ? 'none' : 'block',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                About Discus Fish
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Discus fish (Symphysodon) are a genus of cichlids native to the Amazon River basin. 
                Known for their disc-shaped bodies and vibrant colors, they're often called the "King of the Aquarium" 
                due to their striking appearance and peaceful temperament.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Our classifier can identify various popular Discus varieties including Red Checkerboard, 
                Blue Diamond, Pigeon Blood, Snake Skin, and Golden Leopard, among others.
              </Typography>
            </Paper>
          </Box>
        </motion.div>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default Home;