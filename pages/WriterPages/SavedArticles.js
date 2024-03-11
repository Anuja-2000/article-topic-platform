/*import React from 'react';


import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
*/

import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Navbar from "../../components/createArticleNavbar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteConfirmationDialog from "../../components/DeleteConfirmationDialog";
import EditConfirmationDialog from "../../components/EditConfirmationDialog";
import AddTopicDomainConfirmationDialog from "../../components/AddTopicDomainConfirmationDialog";
import AlertDialog from "../../components/AlertDialog";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePaginationActions from "../../components/TablePaginationActions";
import Paper from "@mui/material/Paper";

import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const api = axios.create({
  baseURL: `http://localhost:3001/api/topicDomains`,
});

function TopicDomains() {
  return (
    <div>
      <Navbar>
        <h1>Saved Articles</h1>
      </Navbar>
    </div>
  );
}

export default TopicDomains;
