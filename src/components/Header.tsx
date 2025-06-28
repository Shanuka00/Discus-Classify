import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  useScrollTrigger, 
  Slide,
  Box
} from '@mui/material';
import { Fish } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  window?: () => Window;
}

// Hide AppBar on scroll down
function HideOnScroll(props: Props) {
  const { window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

const Header: React.FC = () => {
  return (
    <HideOnScroll>
      <AppBar position="sticky" color="default" elevation={0} sx={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
      }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <motion.div
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <Fish 
                    size={36} 
                    color="#3B82F6" 
                    strokeWidth={2} 
                    style={{ marginRight: '12px' }} 
                  />
                </motion.div>
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.5px',
                  }}
                >
                  Discus Classify
                </Typography>
              </Box>
            </motion.div>
            
            <Box sx={{ flexGrow: 1 }} />
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  display: { xs: 'none', sm: 'block' },
                  fontStyle: 'italic'
                }}
              >
                Upload a Discus fish image to identify its variety
              </Typography>
            </motion.div>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;