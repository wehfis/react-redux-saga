import React from 'react';
import {
    Typography,
    Grid,
    Button,
    ThemeProvider,
    createTheme,
    CssBaseline,
} from '@mui/material';
import { Link, Navigate } from 'react-router-dom';

const defaultTheme = createTheme();

const WelcomePage = () => {

    // if (localStorage.getItem('token')) {
    //     return <Navigate replace to="/home" />;
    // }

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Grid
                container
                sx={{
                    backgroundImage:
                        'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light'
                            ? t.palette.grey[50]
                            : t.palette.grey[900],
                    backgroundSize: 'cover',
                    height: '100vh',
                    margin: 0, // Remove default margins
                    padding: 0, // Remove default padding
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255,255,255,0.7)', // Adjust opacity or use a separate color
                        padding: '20px',
                    }}
                >
                    <Typography component="h1" variant="h3" gutterBottom>
                        Welcome to Trealooo
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        Let's create some booaaards
                    </Typography>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item>
                            <Link
                                to="/register"
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ width: '100%' }}
                                >
                                    Register
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                to="/login"
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    variant="contained"
                                    sx={{ width: '100%' }}
                                >
                                    Login
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default WelcomePage;
