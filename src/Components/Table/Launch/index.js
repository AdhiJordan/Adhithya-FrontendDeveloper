import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Pagination from '../../Pagination/Pagination';
import headerDetails from './../../../Static/headers.json';
import Modal from './../../Modal';
import axios from 'axios';
import moment from 'moment';

const Launch = ({ setTableData }) => {
    const [rowDetails, setRowDetails] = useState([]);
    const [overallData, setOverallData] = useState(0);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(20);
    const [toggleModal, setToggleModal] = useState(false);
    const [launchDetails, setLaunchDetails] = useState(null);

    const getPageDetails = (data) => {
        setPage(data);
        setPaginationIndex(data);
    };

    const getLauchDetails = (data) => {
        axios
            .get(`https://api.spacexdata.com/v3/launches/` + data)
            .then((response) => {
                if (response) {
                    setToggleModal(true);
                    setLaunchDetails(response.data);
                }
            });
    };

    const handleCloseModal = () => {
        setToggleModal(false);
        setLaunchDetails(null);
    };

    return (
        <>
            <TableBody>
                {(rowsPerPage > 0 && setTableData
                    ? setTableData.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                      )
                    : setTableData
                ).map((launch, index) => {
                    return (
                        <TableRow
                            onClick={() => getLauchDetails(launch.id)}
                            className="cursor-pointer"
                        >
                            <TableCell align="left">{launch.id}</TableCell>
                            <TableCell align="left">
                                {moment(launch.launchedAt).format('LL')}
                            </TableCell>
                            <TableCell align="left">
                                {launch.location}
                            </TableCell>
                            <TableCell align="left">{launch.mission}</TableCell>
                            <TableCell align="left">{launch.orbit}</TableCell>
                            <TableCell align="left">
                                {launch.status === true ? (
                                    <span className="successCls">Success</span>
                                ) : (
                                    <span className="failureCls">Failure</span>
                                )}
                            </TableCell>
                            <TableCell align="left">{launch.rocket}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            <Modal
                openToggle={toggleModal}
                closeModal={handleCloseModal}
                maxWidth="sm"
            >
                {launchDetails && (
                    <div className="padding-20-40">
                        <div class="container2">
                            <img
                                src="/assets/icons/close-circle.svg"
                                alt="Close_icon"
                                className="float-right"
                                onClick={handleCloseModal}
                            />
                            <img
                                src={launchDetails.links.mission_patch}
                                alt={launchDetails.mission_name}
                                width="100px"
                                height="100px"
                                className="iconDetails"
                            />

                            <div class="text">
                                <h2>
                                    {launchDetails.mission_name}
                                    <label className="margin-left-10">
                                        {launchDetails.launch_success ? (
                                            <span className="successCls">
                                                Success
                                            </span>
                                        ) : (
                                            <span className="failureCls">
                                                Failure
                                            </span>
                                        )}
                                    </label>
                                </h2>
                                <h3>{launchDetails.rocket.rocket_name}</h3>
                            </div>
                        </div>

                        <div className="flex-width-100">
                            <p>{launchDetails.details}</p>
                        </div>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">
                                        Flight Number
                                    </TableCell>
                                    <TableCell align="left">
                                        {launchDetails.flight_number}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Mission Name
                                    </TableCell>
                                    <TableCell align="left">
                                        {launchDetails.mission_name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Rocket Type
                                    </TableCell>
                                    <TableCell align="left">
                                        {launchDetails.rocket.rocket_type}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Rocket Name
                                    </TableCell>
                                    <TableCell align="left">
                                        {launchDetails.rocket.rocket_name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Manufacturer
                                    </TableCell>
                                    <TableCell align="left">
                                        {
                                            launchDetails.rocket.second_stage
                                                .payloads[0].manufacturer
                                        }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Nationality
                                    </TableCell>
                                    <TableCell align="left">
                                        {
                                            launchDetails.rocket.second_stage
                                                .payloads[0].nationality
                                        }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Launch Date
                                    </TableCell>
                                    <TableCell align="left">
                                        {launchDetails.launch_date_utc}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Payload Type
                                    </TableCell>
                                    <TableCell align="left">
                                        {launchDetails.mission_name}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">Orbit</TableCell>
                                    <TableCell align="left">
                                        {
                                            launchDetails.rocket.second_stage
                                                .payloads[0].orbit
                                        }
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left">
                                        Launch Site
                                    </TableCell>
                                    <TableCell align="left">
                                        {launchDetails.launch_site.site_name}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default Launch;
