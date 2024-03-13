import * as React from "react";
import { useState } from "react";
import Navbar from "../../components/createArticleNavbar";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

function Drafts() {
  return (
    <div>
      <Navbar>
        <h1>Drafts</h1>
      </Navbar>
    </div>
  );
}
export default Drafts;
