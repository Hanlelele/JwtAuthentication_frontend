import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const navigate = useNavigate();

    const onclick = () => {
        navigate('/user/login');
    };

    return (
        <>
            <div className="space-y-6 text-center mb-3">
                <h1 className="text-6xl font-semibold text-white drop-shadow-md">🔐 Auth</h1>
                <p className="text-white text-xl">A simple authentication service</p>
            </div>
            <Button
                variant="contained"
                onClick={onclick}
                size="small"
                sx={{
                    padding: '12px 24px',
                    width: '150px',
                    fontSize: '18px',
                }}
            >
                Sign in
            </Button>
        </>
    );
}
