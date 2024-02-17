import { Container, Paper, Typography } from '@mui/material';
import Navbar from '../../components/Navbar';
import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';

const domData = [300, 100, 240, 400, 150, 250, 300];

const xLabelsUser = [
    'Readers',
    'Writers',
];

const xLabelsDomain = [
    'Technical',
    'Health',
    'Science',
    'Entertainment',
    'Sports',
    'Politics',
    'Business',
];



function Reports() {

    const [usersCount, setUsersCount] = React.useState([0,0]);

    React.useEffect(() => {
        const result = axios.get('http://localhost:3001/api/user/count').then((res) => {
            setUsersCount(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <Navbar>
                <Container maxWidth="xl" sx={{ ml: 5, display: "flex" }}>
                <Paper elevation={3} style={{ width: 300, padding: '20px', marginTop: '20px', marginRight: "40px" }}>
                        <Typography variant="h5" gutterBottom>User Details</Typography>
                        <BarChart
                            width={250}
                            height={300}
                            series={[
                                {
                                    data: usersCount,
                                    label: 'No of users',
                                    id: 'pvId',
                                    yAxisKey: 'leftAxisId',
                                }
                            ]}
                            xAxis={[
                                { data: xLabelsUser, scaleType: 'band' },
                                ]}
                            yAxis={[{ id: 'leftAxisId' }]}                                                   

                        />
                    </Paper>
                    <Paper elevation={3} style={{ width: 600, padding: '20px', marginTop: '20px', marginRight: "40px" }}>
                        <Typography variant="h5" gutterBottom>Domain Popularity</Typography>
                        <BarChart
                            width={550}
                            height={300}
                            series={[
                                {
                                    data: domData,
                                    label: 'No of Articles',
                                    id: 'pvId',
                                    yAxisKey: 'leftAxisId',
                                    color: '#3f51b5'
                                }
                            ]}
                            xAxis={[{ data: xLabelsDomain, scaleType: 'band' }]}
                            yAxis={[{ id: 'leftAxisId' }]}
                        />
                    </Paper>
                    <Paper elevation={3} style={{ height:400, width: 300, padding: '20px', marginTop: '20px' }}>
                        <Typography variant="h5" gutterBottom>Writer Popularity</Typography>
                        <PieChart
                        series={[
                            {
                                data: [{label:'Anuja', value:30, color: 'green'},{label:'Shiran',value:40, color: 'blue'},{label:'Chamodya',value:50, color: 'yellow'},{label:'Upeksha',value:60, color: 'red'}],
                                innerRadius: 50,
                                outerRadius: 95,
                                paddingAngle: 4,
                                cornerRadius: 8,
                                startAngle: -180,
                                endAngle: 180,
                                cx: 125,
                                cy: 130,
                            }
                        ]}
                        slotProps={{legend:{hidden:true}}}
                            />
                    </Paper>
            </Container>
            <Container maxWidth="xl" sx={{ ml: 5, display: "flex" }}>
            
            </Container>
            </Navbar>
        </>
    );
}
export default Reports;