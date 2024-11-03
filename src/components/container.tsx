import { Stack } from '@mui/material';

interface ContainerProps {
    children: React.ReactNode;
}
const Container = ({ children }: ContainerProps) => {
    return (
        <Stack
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'radial-gradient(ellipse at top, #38bdf8, #1e3a8a)',
            }}
        >
            {children}
        </Stack>
    );
};

export default Container;
