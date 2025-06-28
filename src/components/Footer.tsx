import React from 'react';
import { Box, Typography, Container, Divider, Link } from '@mui/material';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            align="center"
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            © {currentYear} Discus Classify. All rights reserved.
          </Typography>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary" mr={0.5}>
                Made with
              </Typography>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5 
                }}
              >
                <Heart size={16} color="#EF4444" fill="#EF4444" />
              </motion.div>
              <Typography variant="body2" color="text.secondary" ml={0.5}>
                from Group - 02
              </Typography>
            </Box>
          </motion.div>
          
          <Box 
            sx={{ 
              display: { xs: 'none', md: 'flex' },
              gap: 2 
            }}
          >
            <Link 
              href="#" 
              underline="hover" 
              color="text.secondary" 
              variant="body2"
            >
              Privacy
            </Link>
            <Link 
              href="#" 
              underline="hover" 
              color="text.secondary" 
              variant="body2"
            >
              Terms
            </Link>
            <Link 
              href="#" 
              underline="hover" 
              color="text.secondary" 
              variant="body2"
            >
              Contact
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;