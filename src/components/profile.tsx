import { Card, CardContent, CardHeader, Avatar, Menu, MenuItem } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useEffect } from 'react';
import authApi from '../api/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { UserLogInResponse } from '../types';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [userDetails, setUserDetails] = useState<UserLogInResponse | null>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        if (!user || !user._id) {
            navigate('/');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await authApi.getProfile();
                if (response.data.success === true) {
                    setUserDetails(response.data.data);
                } else if (response.data.statusCode === 401) {
                    if (!userDetails) {
                        toast.error(response.data.message);
                    }
                }
            } catch (error) {
                console.log('error', error);
            }
        };
        fetchUserDetails();
    }, [user._id]);

    const handleLogout = async () => {
        const response = await authApi.logout();
        logout();
        if (response.data.success === true) {
            toast.success(response.data.message);
            navigate('/');
        }
        setAnchorEl(null);
    };

    return (
        <Card className="w-[80%] shadow-md">
            <div className="flex justify-between items-center">
                <CardHeader title="Profile" />
                <div className="mr-3">
                    <button onClick={handleClick}>
                        <Avatar aria-label="recipe">
                            <AccountCircleIcon />
                        </Avatar>
                    </button>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleLogout}>Log out</MenuItem>
                    </Menu>
                </div>
            </div>
            <CardContent className="space-y-4">
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">ID</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {userDetails?._id}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Username</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {userDetails?.username}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Email</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {userDetails?.email}
                    </p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Created At</p>
                    <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
                        {userDetails?.createdAt ? format(new Date(user.createdAt), 'iiii, LLLL dd, yyyy p') : ''}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default Profile;
