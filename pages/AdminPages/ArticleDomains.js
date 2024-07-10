import Navbar from "../../components/Navbar"
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import { Button, Container, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import axios from "axios";
import urls from "../../enums/url";
import { set } from "react-hook-form";


export default function ArticleDomains() {

    const [articleDomain, setArticleDomain] = React.useState({
        domainId: "",
        domainName: "",
        domainDescription: "",
    });
    const [domains, setDomains] = React.useState([]);
    const [domainNames, setDomainNames] = useState([]);
    const [errors, setErrors] = useState({ domainName: false, domainNameHelperText: 'Domain name is required', domainDescription: false });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setArticleDomain(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === 'domainName') {
            if (value.trim() === '') {
                setErrors(prev => ({ ...prev, domainName: true }));
            } else if (domainNames.includes(value)) {
                setErrors(prev => ({ ...prev, domainName: true }));
                setErrors(prev => ({ ...prev, domainNameHelperText: 'Domain name already exists' }));
            } else {
                setErrors(prev => ({ ...prev, domainName: false }));
            }
        } else if (name === 'domain-description') {
            setDomainDescription(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(articleDomain);
        axios.post(`${urls.BASE_URL_ARTICLE_DOMAINS}`, {
            domainName: articleDomain.domainName,
            domainDescription: articleDomain.domainDescription
        }).then((response) => {
            if (response.status === 201) {
                alert("Domain added successfully");
                setArticleDomain({
                    domainId: "",
                    domainName: "",
                    domainDescription: "",
                });
                const domains = axios.get(`${urls.BASE_URL_ARTICLE_DOMAINS}`).then((response) => {
                    setDomains(response.data);
                }).catch((error) => {
                    console.log(error);
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    React.useEffect(() => {
        const domains = axios.get(`${urls.BASE_URL_ARTICLE_DOMAINS}`).then((response) => {
            setDomains(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    React.useEffect(() => {
        const domainNames = domains.map((domain) => domain.domainName);
        setDomainNames(domainNames);
    }, [domains]);
    return (
        <div>
            <Navbar>
                <Container maxWidth="lg">
                    <Box marginBottom={2}>
                        <Typography variant="h4" marginBottom={2} color={"primary.main"}>
                            Article Domains
                        </Typography>
                    </Box>
                    <Box marginBottom={2} border={1} borderRadius={1} borderColor={"primary.main"} padding={2}>
                        <form onSubmit={handleSubmit}>
                            <Typography variant="h5" marginBottom={2} color={"primary.dark"}>
                                Add New Article Domain
                            </Typography>
                            <TextField
                                id="domain-name"
                                name="domainName"
                                label="Domain Name"
                                variant="outlined"
                                sx={{ width: '15rem' }}
                                required
                                value={articleDomain.domainName}
                                onChange={handleChange}
                                error={errors.domainName}
                                helperText={errors.domainName ? errors.domainNameHelperText : ''}
                            />
                            <br />
                            <TextField
                                label="Domain Description"
                                name="domainDescription"
                                variant="outlined"
                                sx={{ margin: '1rem 0px 0px 0px', width: '18rem' }}
                                multiline
                                value={articleDomain.domainDescription}
                                onChange={handleChange}
                            />
                            <br />
                            <Box display="flex" justifyContent="flex-end" marginTop={2}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{ width: "20%", padding: 1 }}
                                    disabled={errors.domainName}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: "1.1rem", color: "white" }}>
                                        Domain
                                    </TableCell>
                                    <TableCell sx={{ fontSize: "1.1rem", color: "white" }}>
                                        Description
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {domains.map((domain) => (
                                    <TableRow
                                        key={domain.domainId}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {domain.domainName}
                                        </TableCell>
                                        <TableCell>{domain.domainDescription}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Navbar>
        </div>
    )
}