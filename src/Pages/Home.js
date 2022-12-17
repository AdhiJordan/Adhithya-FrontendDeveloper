import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

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
            <img
                src="/assets/images/spacex.jpeg"
                alt="Space X"
                width="100%"
                height="100%"
            />
            <div className="margin-top-50">
                <h2 className="text-align-center">About Space X</h2>
                <p className="font-size-20 text-align-center letter-space-2">
                    Space Exploration Technologies Corp. (SpaceX) is an American
                    spacecraft manufacturer, launcher, and a satellite
                    communications corporation headquartered in Hawthorne,
                    California. It was founded in 2002 by Elon Musk with the
                    stated goal of reducing space transportation costs to enable
                    the colonization of Mars. The company manufactures the
                    Falcon 9, Falcon Heavy, and Starship launch vehicles,
                    several rocket engines, Cargo Dragon and Crew Dragon
                    spacecraft, and Starlink communications satellites.
                </p>
            </div>
            <div className="margin-top-50">
                <img
                    src="/assets/images/shuttle-1.jpeg"
                    alt="Space X"
                    width="100%"
                    height="100%"
                />
            </div>
        </Box>
    );
}
