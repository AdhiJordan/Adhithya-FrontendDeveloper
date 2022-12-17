import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';

const HeaderSection = styled('div')(({ theme }) => ({
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    width: '100%',
}));

export default function Home() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: '#000' }}>
                <Toolbar>
                    <HeaderSection>Space X</HeaderSection>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
