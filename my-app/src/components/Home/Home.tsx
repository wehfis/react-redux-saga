import { ThemeProvider } from '@emotion/react';
import { Grid, CssBaseline, createTheme, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, Navigate, redirect } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useEffect } from 'react';
import { getUserRequest } from '../../store/reducers/userReducer';
import { userApi } from '../../Services/UserService';
import { logout } from '../../store/reducers/tokenReducer';

export default function Home() {
    const username = useAppSelector((state) => state.user.username);
    const dispatch = useAppDispatch();
    const defaultTheme = createTheme();
    if (!localStorage.getItem('token')) {
        return <Navigate replace to="/" />;
    }

    function handleClick() {
        dispatch(logout());
        return redirect('/');
    }

    return (
        <>
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
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255,255,255,0.7)', // Adjust opacity or use a separate color
                            padding: '20px',
                        }}
                    >
                        <Grid container justifyContent="flex-end" spacing={4}>
                            <Grid item>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleClick}
                                >
                                    Log Out
                                </Button>
                            </Grid>
                        </Grid>
                        <Typography component="h1" variant="h3" gutterBottom>
                            Hello, {username} !
                        </Typography>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );
}
