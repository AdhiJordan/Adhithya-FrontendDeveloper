import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from '../Components/Table';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SortBySelect from '../Components/SortBySelect';
import filterOptions from './../Static/filtersOptions.json';
import Loaders from '../Components/Loaders';
import {
    getLaunchList,
    getLaunchByFiltersQuery,
    getQueryURL,
    //resetAll,
} from './../store/actions/launch';
import { connect, useDispatch } from 'react-redux';
import headerDetails from './../Static/headers.json';
import SortByDateDashboard from '../Components/SortByDateDashboard';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Home from './Home';

function createData(id, launchedAt, location, mission, orbit, status, rocket) {
    return {
        id,
        launchedAt,
        location,
        mission,
        orbit,
        status,
        rocket,
    };
}

const Dashboard = ({ launchDetails }) => {
    const [getLaunchDetails, setLaunchDetails] = useState([]);
    const [launchCount, setLaunchCount] = useState(0);
    const [paginationIndex, setPaginationIndex] = useState(1);
    const [emptyLaunchList, setEmptyLaunchList] = useState(false);
    const [queryFilters, setQueryFilters] = useState({
        limit: 10,
        offset: 0,
        launch_success: '',
        launch_type: '',
        launchStartDateFilter: '',
        launchEndDateFilter: '',
        orbit: '',
    });
    const dispatch = useDispatch();

    const getInitialData = () => {
        dispatch(getLaunchList());
        //queryUrlParams(window.location.search);

        //process.env.REACT_APP_API_BASE_URL
        axios
            .get(`https://api.spacexdata.com/v3/launches/?&offset=0&order=`)
            .then((res) => {
                if (res) {
                    setLaunchCount(res.data.length);
                }
            });
    };

    useEffect(() => {
        getInitialData();
    }, []);

    useEffect(() => {
        if (launchDetails.launch === 'Not Found') {
            setEmptyLaunchList(true);
            setLaunchDetails([]);
        } else if (
            launchDetails.launch === null ||
            launchDetails.launch.length === 0
        ) {
            setEmptyLaunchList(true);
            setLaunchDetails([]);
        } else if (launchDetails && launchDetails.launch) {
            const tableDetails = launchDetails.launch;
            if (tableDetails.length === 0) {
                setEmptyLaunchList(true);
                //setLaunchCount(launchDetails.launch.length);
            } else if (tableDetails.length > 0) {
                //setLaunchCount(launchDetails.launch.length);
                let getUpdateDetails =
                    tableDetails &&
                    tableDetails.map((data) =>
                        createData(
                            data.flight_number,
                            data.launch_date_utc,
                            data.launch_site.site_name,
                            data.mission_name,
                            data.rocket.second_stage.payloads[0].orbit,
                            data.launch_success,
                            data.rocket.rocket_name
                        )
                    );
                setLaunchDetails(getUpdateDetails);
                setEmptyLaunchList(false);
            }
        }
    }, [launchDetails]);

    const getPageIndex = (index) => {
        // setLaunchDetails([]);
        // dispatch(resetAll());
        let queryUrl = {
            limit: queryFilters.limit,
            offset: queryFilters.offset,
            launch_success: queryFilters.launch_success,
            launch_type: queryFilters.launch_type,
            launchStartDateFilter: '',
            launchEndDateFilter: '',
            orbit: queryFilters.orbit,
        };
        if (index * 10 < launchCount) {
            setPaginationIndex(index + 1);
            //dispatch(getLaunchByPaginationIndex(index + 1));
            queryUrl['offset'] = index + 1;
            dispatch(getLaunchByFiltersQuery(queryUrl));
        } else if (launchCount === index * 10) {
            setPaginationIndex(index + 1);
            //dispatch(getLaunchByPaginationIndex(index));
            queryUrl['offset'] = index;
            dispatch(getLaunchByFiltersQuery(queryUrl));
        }

        setQueryFilters((queryFilters) => ({
            ...queryFilters,
            limit: queryUrl.limit,
            offset: queryUrl.offset,
            launch_success: queryUrl.launch_success,
            launch_type: queryUrl.launch_type,
            launchStartDateFilter: '',
            launchEndDateFilter: '',
            orbit: queryUrl.orbit,
        }));
    };

    const getUserSelectedValue = (data) => {
        //  setLaunchDetails([]);
        // dispatch(resetAll());
        let queryUrl = {
            limit: 10,
            offset: 0,
            launch_success: '',
            launch_type: '',
            launchStartDateFilter: '',
            launchEndDateFilter: '',
            orbit: '',
        };

        if (data === 'Successfull Launches') {
            queryUrl['launch_success'] = true;
        } else if (data === 'Failed Launches') {
            queryUrl['launch_success'] = false;
        } else if (data === 'Upcoming Launches') {
            queryUrl['launch_type'] = 'upcoming';
        } else if (data === 'All Launches') {
            queryUrl['launch_type'] = '';
        } else if (data.length > 0) {
            queryUrl['launchStartDateFilter'] = data[0];
            queryUrl['launchEndDateFilter'] = data[1];
        }

        dispatch(getLaunchByFiltersQuery(queryUrl));

        setQueryFilters((queryFilters) => ({
            ...queryFilters,
            limit: queryUrl.limit,
            offset: queryUrl.offset,
            launch_success: queryUrl.launch_success,
            launch_type: queryUrl.launch_type,
            launchStartDateFilter: queryUrl.launchStartDateFilter,
            launchEndDateFilter: queryUrl.launchEndDateFilter,
            orbit: queryUrl.orbit,
        }));

        axios
            .get(
                queryUrl.launch_type
                    ? `https://api.spacexdata.com/v3/launches/` +
                          queryUrl.launch_type +
                          `/?&offset=0&order=launch_success=${queryUrl.launch_success}&start=${queryUrl.launchStartDateFilter}&end=${queryUrl.launchEndDateFilter}&orbit=${queryUrl.orbit}`
                    : `https://api.spacexdata.com/v3/launches/?&offset=0&order=&launch_success=${queryUrl.launch_success}&start=${queryUrl.launchStartDateFilter}&end=${queryUrl.launchEndDateFilter}&orbit=${queryUrl.orbit}`
            )
            .then((res) => {
                if (res) {
                    setLaunchCount(res.data.length);
                }
            });
    };

    const handleChange = (event) => {
        let queryUrl = {
            limit: 10,
            offset: 0,
            launch_success: '',
            launch_type: '',
            launchStartDateFilter: '',
            launchEndDateFilter: '',
            orbit: '',
        };
        queryUrl['orbit'] = event.target.value;
        setQueryFilters((queryFilters) => ({
            ...queryFilters,
            limit: queryUrl.limit,
            offset: queryUrl.offset,
            launch_success: queryUrl.launch_success,
            launch_type: queryUrl.launch_type,
            launchStartDateFilter: '',
            launchEndDateFilter: '',
            orbit: queryUrl.orbit,
        }));
    };

    const handleSearch = () => {
        dispatch(getLaunchByFiltersQuery(queryFilters));
        axios
            .get(
                queryFilters.launch_type
                    ? `https://api.spacexdata.com/v3/launches/` +
                          queryFilters.launch_type +
                          `/?&limit=10&offset=${queryFilters.offset}&order=launch_success=${queryFilters.launch_success}&start=${queryFilters.launchStartDateFilter}&end=${queryFilters.launchEndDateFilter}&orbit=${queryFilters.orbit}`
                    : `https://api.spacexdata.com/v3/launches/?&limit=10&offset=${queryFilters.offset}&order=&launch_success=${queryFilters.launch_success}&start=${queryFilters.launchStartDateFilter}&end=${queryFilters.launchEndDateFilter}&orbit=${queryFilters.orbit}`
            )
            .then((res) => {
                if (res) {
                    setLaunchCount(res.data.length);
                }
            });
    };

    const handleReset = () => {
        setQueryFilters((queryFilters) => ({
            ...queryFilters,
            limit: 10,
            offset: 0,
            launch_success: '',
            launch_type: '',
            launchStartDateFilter: '',
            launchEndDateFilter: '',
            orbit: '',
        }));
        getInitialData();
    };

    useEffect(() => {
        let queryUrl = `?limit=${queryFilters.limit}&offset=${queryFilters.offset}&launch_success=${queryFilters.launch_success}&launch_type=${queryFilters.launch_type}&start=${queryFilters.launchStartDateFilter}&end=${queryFilters.launchEndDateFilter}&orbit=${queryFilters.orbit}`;
        window.history.replaceState(
            {
                foo: 'bar',
            },
            'Filters',
            queryUrl
        );
        dispatch(getQueryURL(queryUrl));
    }, [queryFilters]);

    // const queryUrlParams = (windowUrl) => {
    //     let url = windowUrl;
    //     var queryparams = url.split('?')[1];
    //     var params = queryparams.split('&');
    //     var pair = null,
    //         data = [];

    //     params.forEach(function (d) {
    //         pair = d.split('=');
    //         data.push({ key: pair[0], value: pair[1] });
    //     });

    //     if (data) {
    //         let queryUrl = {
    //             limit: Number(data[0].value),
    //             offset: Number(data[1].value),
    //             launch_success: data[2].value && JSON.parse(data[2].value),
    //             launch_type: data[3].value,
    //             launchStartDateFilter: data[4].value,
    //             launchEndDateFilter: data[5].value,
    //         };
    //         setPaginationIndex(Number(data[1].value));

    //         setQueryFilters((queryFilters) => ({
    //             ...queryFilters,
    //             limit: queryUrl.limit,
    //             offset: queryUrl.offset,
    //             launch_success: queryUrl.launch_success,
    //             launch_type: queryUrl.launch_type,
    //             launchStartDateFilter: queryUrl.launchStartDateFilter,
    //             launchEndDateFilter: queryUrl.launchEndDateFilter,
    //         }));

    //         dispatch(getLaunchByFiltersQuery(queryUrl));
    //         axios
    //             .get(
    //                 queryUrl.launch_type
    //                     ? `https://api.spacexdata.com/v3/launches/` +
    //                           queryUrl.launch_type +
    //                           `/?&offset=0&order=launch_success=${queryUrl.launch_success}&start=${queryUrl.launchStartDateFilter}&end=${queryUrl.launchEndDateFilter}`
    //                     : `https://api.spacexdata.com/v3/launches/?&offset=0&order=&launch_success=${queryUrl.launch_success}&start=${queryUrl.launchStartDateFilter}&end=${queryUrl.launchEndDateFilter}`
    //             )
    //             .then((res) => {
    //                 if (res) {
    //                     setLaunchCount(res.data.length);
    //                 }
    //             });
    //     }
    // };

    // useEffect(() => {
    //     if (launchDetails.queryUrl) {
    //         queryUrlParams(launchDetails.queryUrl);
    //         window.history.replaceState(
    //             {
    //                 foo: 'bar',
    //             },
    //             'Filters',
    //             launchDetails.queryUrl
    //         );
    //     }
    // }, []);

    return (
        <div>
            <Home />
            <div className="margin-top-50 margin-bottom-30">
                <div className="margin-bottom-30">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                            <Grid item xs={12} sm={12} md={2} lg={2}>
                                <div className="margin-top-20">
                                    <SortByDateDashboard
                                        userDateSelectedRange={
                                            getUserSelectedValue
                                        }
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={3} lg={3}>
                                <SortBySelect
                                    sortByOptions={filterOptions}
                                    userSelectedValue={getUserSelectedValue}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                                <TextField
                                    data-testid="searchByOrbit"
                                    id="Search_orbit"
                                    label="Search by Orbit"
                                    variant="outlined"
                                    value={queryFilters.orbit}
                                    className="searchOrbitCls"
                                    InputProps={{
                                        style: {
                                            height: 45,
                                            margin: '10px 10px 0px 10px',
                                            paddingTop: 10,
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            margin: '8px 0px 0px 8px',
                                        },
                                    }}
                                    onChange={handleChange}
                                />
                                <Button
                                    data-testid="searchByOrbitButton"
                                    variant="contained"
                                    style={{
                                        margin: '14px 10px 0px 10px',
                                    }}
                                    onClick={handleSearch}
                                >
                                    Search
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{
                                        margin: '14px 0px 0px 10px',
                                    }}
                                    onClick={handleReset}
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={10}
                            lg={10}
                            className="gridBox"
                        >
                            {getLaunchDetails.length > 0 ? (
                                <TableComponent
                                    setTitle="Launch"
                                    setTableName="Overview"
                                    launchCount={launchCount}
                                    setHeaders={headerDetails}
                                    setTableData={getLaunchDetails}
                                    setPaginationIndex={getPageIndex}
                                    paginationIndex={paginationIndex}
                                />
                            ) : emptyLaunchList ? (
                                <>
                                    <h2 className="padding-20 text-center">
                                        <img
                                            src="/assets/images/NoDataFound.svg"
                                            alt="Not found"
                                            className="margin-b-30"
                                        />{' '}
                                        <br />
                                        No results found for this specified
                                        filter!
                                    </h2>
                                </>
                            ) : (
                                <div className="flex-center">
                                    <Loaders />
                                </div>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                    </Grid>
                </Box>
            </div>
            <div className="margin-top-50">
                <img
                    src="/assets/images/shuttle.jpeg"
                    alt="Space X"
                    width="100%"
                    height="100%"
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        launchDetails: state.launchDetails,
    };
};

export default connect(mapStateToProps)(Dashboard);
