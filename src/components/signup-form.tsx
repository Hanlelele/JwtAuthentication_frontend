import * as React from 'react';
import { Box, Button, FormControl, FormLabel, Card as MuiCard, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AuthApi from '../api/authApi';
import { toast } from 'react-toastify';
import { UserSignup } from '../types';
import { useNavigate, Link } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

export default function LoginForm() {
    const navigate = useNavigate();

    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const dataToSend = {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        };

        const response = await AuthApi.register(dataToSend as UserSignup);
        if (response?.data.success === true) {
            navigate(`/user/login`);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };

    const validateInputs = () => {
        const username = document.getElementById('username') as HTMLInputElement;
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        let isValid = true;

        if (!username.value || username.value.length < 3 || username.value.length > 30) {
            setUsernameError(true);
            setUsernameErrorMessage('Username must be between 3 and 30 characters');
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage('');
        }

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    return (
        <Card variant="outlined" sx={{ borderRadius: '15px' }}>
            <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: '40px', fontWeight: 'bold' }}>
                Sign up
            </Typography>
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (validateInputs()) {
                        handleSubmit(e);
                    }
                }}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
            >
                <FormControl>
                    <FormLabel htmlFor="username" sx={{ display: 'flex', justifyContent: 'start' }}>
                        Username
                    </FormLabel>
                    <TextField
                        error={usernameError}
                        helperText={usernameErrorMessage}
                        id="username"
                        type="text"
                        name="username"
                        placeholder="lehan"
                        autoComplete="username"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={usernameError ? 'error' : 'primary'}
                        sx={{ ariaLabel: 'username' }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email" sx={{ display: 'flex', justifyContent: 'start' }}>
                        Email
                    </FormLabel>
                    <TextField
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                        sx={{ ariaLabel: 'email' }}
                    />
                </FormControl>
                <FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                        <FormLabel htmlFor="password">Password</FormLabel>
                    </Box>
                    <TextField
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        required
                        fullWidth
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>

                <Button type="submit" fullWidth variant="contained">
                    Sign up
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Already have an account?{' '}
                    <span>
                        <Link to="/user/login">
                            <span className="text-sm underline text-sky-700">Sign in</span>
                        </Link>
                    </span>
                </Typography>
            </Box>
        </Card>
    );
}
