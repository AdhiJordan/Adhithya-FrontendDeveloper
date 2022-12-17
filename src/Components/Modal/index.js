import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Modal(props) {
    const [open, setOpen] = React.useState(props.openToggle);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
        props.closeModal();
    };

    React.useEffect(() => {
        setOpen(props.openToggle);
    }, [props.openToggle]);

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                fullWidth
                maxWidth={props.maxWidth}
            >
                {props.children}
            </Dialog>
        </div>
    );
}
