import { Container, Paper, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];

const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
];


function Reports() {

    return (
        <>
            <Navbar>
            <Container sx={{ml:5}}>
                <Paper elevation={3} style={{ width:600, padding: '20px', marginTop: '20px' }}>
                    <Typography variant="h5" gutterBottom>User Details</Typography>
                <BarChart
                    width={500}
                    height={300}
                    series={[
                        {
                            data: pData,
                            label: 'pv',
                            id: 'pvId',
                            yAxisKey: 'leftAxisId',
                        },
                        {
                            data: uData,
                            label: 'uv',
                            id: 'uvId',
                            yAxisKey: 'leftAxisId',
                        },
                    ]}
                    xAxis={[{ data: xLabels, scaleType: 'band' }]}
                    yAxis={[{ id: 'leftAxisId' }, {label: "data"}]}
                    
                />
                </Paper>
            </Container>
            </Navbar>
        </>
    );
}
export default Reports;