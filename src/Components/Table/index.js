import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '../Pagination/Pagination';
import Launch from './Launch';

const TableComponent = ({
    setTitle,
    setTableName,
    setHeaders,
    setTableData,
    launchCount,
    setPaginationIndex,
    paginationIndex,
}) => {
    const [rowDetails, setRowDetails] = useState([]);
    const [overallData, setOverallData] = useState(setTableData.length);
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(10);

    const getPageDetails = (data) => {
        setPage(data);
        setPaginationIndex(data);
    };

    useEffect(() => {
        setRowDetails(setTableData);
        setOverallData(setTableData.length);
    }, [setTableData]);

    console.log('launchCount', launchCount);

    return (
        <div className="margin-t-30">
            <Paper className="padding-10">
                <TableContainer>
                    <Table aria-label="simple table" className="tableContent">
                        <TableHead>
                            <TableRow>
                                {setHeaders.map((headers, id) => {
                                    return (
                                        <TableCell
                                            align={
                                                headers === 'Actions'
                                                    ? 'right'
                                                    : 'left'
                                            }
                                            key={id}
                                            className="headerTitle"
                                        >
                                            {headers.title}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                        <Launch
                            rowsPerPage={rowsPerPage}
                            page={page}
                            rowDetails={rowDetails}
                            setTableData={setTableData}
                        />
                    </Table>
                </TableContainer>
            </Paper>
            <div className="margin-top-30 float-right">
                {launchCount > 10 && (
                    <Pagination
                        overAllData={launchCount}
                        setPageDetails={getPageDetails}
                        rowsPerPage={rowsPerPage}
                        paginationIndex={paginationIndex}
                    />
                )}
            </div>
        </div>
    );
};

export default TableComponent;
