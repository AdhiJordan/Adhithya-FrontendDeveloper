import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import moment from 'moment';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const SortByDateDashboard = (props) => {
    const [value, setValue] = useState([]);
    const [toggleCustom, setToggleCustom] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        let today = new Date();
        let currentDate = new Date(today.toISOString());
        today.setMonth(today.getMonth() - 1);
        let previousDate = new Date(today.toISOString());
        setValue([previousDate, currentDate]);
    }, []);

    const handleChange = (ranges) => {
        setValue([ranges[0], ranges[1]]);
    };
    const handleSelect = (values) => {
        const date = new Date(values.toISOString());
        setDates((arr) => [...arr, date]);
    };

    const sendConfirmedDates = () => {
        setValue([dates[0], dates[1]]);
        props.userDateSelectedRange([
            moment(dates[0]).format('YYYY-MM-DD'),
            moment(dates[1]).format('YYYY-MM-DD'),
        ]);
        setOpenCalendar(false);
    };

    const backToDefault = () => {
        let today = new Date();
        let currentDate = new Date(today.toISOString());
        today.setMonth(today.getMonth() - 1);
        let previousDate = new Date(today.toISOString());
        setValue([previousDate, currentDate]);
        setDates([]);
        props.userDateSelectedRange([null, null]);
        setOpenCalendar(false);
    };

    const customSelection = () => {
        setToggleCustom(false);
        setOpenCalendar(true);
    };

    const selectDateRange = (data) => {
        if (data === 'Last 15 years') {
            let today = new Date();
            let currentDate = new Date(today.toISOString());
            today.setMonth(today.getMonth() - 180);
            let previousDate = new Date(today.toISOString());

            props.userDateSelectedRange([
                moment(previousDate).format('YYYY-MM-DD'),
                moment(currentDate).format('YYYY-MM-DD'),
            ]);
            setValue([previousDate, currentDate]);
        } else if (data === 'Last 20 years') {
            let today = new Date();
            let currentDate = new Date(today.toISOString());
            today.setMonth(today.getMonth() - 240);
            let previousDate = new Date(today.toISOString());
            props.userDateSelectedRange([
                moment(previousDate).format('YYYY-MM-DD'),
                moment(currentDate).format('YYYY-MM-DD'),
            ]);
            setValue([previousDate, currentDate]);
        } else if (data === 'Last 10 years') {
            let dateToday = new Date();
            let currentDate = new Date(dateToday.toISOString());
            dateToday.setDate(dateToday.getMonth() - 120);
            let previousDate = new Date(dateToday.toISOString());
            props.userDateSelectedRange([
                moment(previousDate).format('YYYY-MM-DD'),
                moment(currentDate).format('YYYY-MM-DD'),
            ]);
            setValue([previousDate, currentDate]);
        } else if (data === 'Last 5 years') {
            let presentDate = new Date();
            let currentDate = new Date(presentDate.toISOString());
            presentDate.setDate(presentDate.getMonth() - 60);
            let previousDate = new Date(presentDate.toISOString());
            props.userDateSelectedRange([
                moment(previousDate).format('YYYY-MM-DD'),
                moment(currentDate).format('YYYY-MM-DD'),
            ]);
            setValue([previousDate, currentDate]);
        }
        setToggleCustom(false);
    };
    return (
        <ClickAwayListener onClickAway={() => setToggleCustom(false)}>
            <div>
                <Button
                    onClick={() => setToggleCustom(!toggleCustom)}
                    variant="contained"
                >
                    Sort By Date
                </Button>
                {toggleCustom && (
                    <div className="positionRelative">
                        <Paper className="calendarAction">
                            <p
                                className="calendarOptions"
                                onClick={() => selectDateRange('Last 5 years')}
                            >
                                In Last 5 years
                            </p>
                            <p
                                className="calendarOptions"
                                onClick={() => selectDateRange('Last 10 years')}
                            >
                                Last 10 years
                            </p>
                            <p
                                className="calendarOptions"
                                onClick={() => selectDateRange('Last 15 years')}
                            >
                                Last 15 years
                            </p>
                            <p
                                className="calendarOptions"
                                onClick={() => selectDateRange('Last 20 years')}
                            >
                                Last 20 years
                            </p>
                        </Paper>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default SortByDateDashboard;
