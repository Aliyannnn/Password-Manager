import React from 'react';
import { Box, Button, Typography, Paper, Stack, Grow } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

const backendBaseUrl = "http://localhost:3000";

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${backendBaseUrl}/auth/google`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${backendBaseUrl}/auth/github`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top left, #0d0d0d, #000)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Grow in timeout={800}>
        <Paper
          elevation={20}
          sx={{
            p: 6,
            pt: 10,
            pb: 10,
            borderRadius: 6,
            width: '100%',
            maxWidth: 440,
            textAlign: 'center',
            background: 'rgba(15, 15, 15, 0.95)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 10px 50px rgba(0,0,0,0.7)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              background: 'linear-gradient(90deg, #ffffff, #999)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: 1,
              fontSize: '2.4rem',
              fontWeight: 900,
            }}
          >
            Password Manager
          </Typography>

          <Typography
            variant="body2"
            color="grey.500"
            mb={5}
            sx={{ maxWidth: 360, mx: 'auto' }}
          >
            Securely manage all your credentials with encrypted storage.
          </Typography>

          <Stack spacing={2.5} alignItems="center">
            {/* Google Login */}
            <Button
              variant="outlined"
              onClick={handleGoogleLogin}
              startIcon={
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt="Google"
                  style={{ width: 26, height: 26 }}
                />
              }
              sx={{
                backgroundColor: '#fff',
                color: '#000',
                fontWeight: 600,
                width: '85%',
                py: 1.2,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transform: 'scale(1.03)',
                },
              }}
            >
              Login with Google
            </Button>

            {/* GitHub Login */}
            <Button
              variant="contained"
              onClick={handleGithubLogin}
              startIcon={<GitHubIcon />}
              sx={{
                background: 'linear-gradient(145deg, #1a1a1a, #2a2a2a)',
                color: '#fff',
                fontWeight: 600,
                width: '85%',
                py: 1.2,
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
                  transform: 'scale(1.03)',
                },
              }}
            >
              Login with GitHub
            </Button>
          </Stack>
        </Paper>
      </Grow>
    </Box>
  );
}
