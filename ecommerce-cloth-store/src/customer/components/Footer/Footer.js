import {  Grid, Typography, Link, Divider, Box } from "@mui/material";
import React from "react";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <footer className="mt-auto">
      <Box sx={{ bgcolor: '#0a1535', color: 'white', py: 6 }}>
        <Grid container spacing={4} sx={{ maxWidth: 1200, margin: '0 auto', px: 3 }}>
          {/* Company Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              fontWeight: 600,
              borderBottom: '2px solid #3f51b5',
              display: 'inline-block',
              pb: 0.5
            }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['About', 'Blog', 'Jobs', 'Press', 'Partners'].map((item) => (
                <Link 
                  key={item}
                  href="#" 
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { color: '#3f51b5' },
                    transition: 'color 0.3s'
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Solutions Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              fontWeight: 600,
              borderBottom: '2px solid #3f51b5',
              display: 'inline-block',
              pb: 0.5
            }}>
              Solutions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Marketing', 'Analytics', 'Commerce', 'Insights', 'Support'].map((item) => (
                <Link 
                  key={item}
                  href="#" 
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { color: '#3f51b5' },
                    transition: 'color 0.3s'
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Documentation Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              fontWeight: 600,
              borderBottom: '2px solid #3f51b5',
              display: 'inline-block',
              pb: 0.5
            }}>
              Documentation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Guides', 'API Status'].map((item) => (
                <Link 
                  key={item}
                  href="#" 
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { color: '#3f51b5' },
                    transition: 'color 0.3s'
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Legal Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ 
              mb: 2, 
              fontWeight: 600,
              borderBottom: '2px solid #3f51b5',
              display: 'inline-block',
              pb: 0.5
            }}>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Claim', 'Privacy', 'Terms'].map((item) => (
                <Link 
                  key={item}
                  href="#" 
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': { color: '#3f51b5' },
                    transition: 'color 0.3s'
                  }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, bgcolor: 'rgba(255,255,255,0.2)' }} />

        {/* Social Media and Copyright */}
        <Box sx={{ textAlign: 'center', maxWidth: 1200, margin: '0 auto', px: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 3 }}>
            <Link href="#" sx={{ color: 'inherit', '&:hover': { color: '#3f51b5' } }}>
              <Facebook fontSize="large" />
            </Link>
            <Link href="#" sx={{ color: 'inherit', '&:hover': { color: '#3f51b5' } }}>
              <Twitter fontSize="large" />
            </Link>
            <Link href="#" sx={{ color: 'inherit', '&:hover': { color: '#3f51b5' } }}>
              <Instagram fontSize="large" />
            </Link>
            <Link href="#" sx={{ color: 'inherit', '&:hover': { color: '#3f51b5' } }}>
              <LinkedIn fontSize="large" />
            </Link>
          </Box>

          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            &copy; {new Date().getFullYear()} My Company. All rights reserved.
          </Typography>
          
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
            Made by Umar Hayaat
          </Typography>

          <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.6 }}>
            Icons by{' '}
            <Link 
              href="https://www.flaticon.com/" 
              target="_blank" 
              rel="noopener" 
              sx={{ color: 'inherit', textDecoration: 'none' }}
            >
              Freepik
            </Link>
          </Typography>
        </Box>
      </Box>
    </footer>
  );
}