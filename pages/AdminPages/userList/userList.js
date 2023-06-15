import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridEditSingleSelectCell,
  GridCellEditStopReasons,
  gridClasses,
} from '@mui/x-data-grid';
import { randomPrice } from '@mui/x-data-grid-generator';
import { Avatar } from '@mui/material';
import moment from "moment";
import Typography from '@mui/material/Typography'
import UserActions from './userActions';





const initialRows = [
  {
    id:1001,
    photoURL: 1,
    name: 'Vincent Hartman',
    email: 'vincent@gmail.com',
    role: 'Writer',
    active: 1,
    createdAt:new Date().getTime(),
  },
  {
    id: 1002,
    photoURL: 1,
    name: 'Autumn Bradford',
    email: 'autumn@gmail.com',
    role: 'Admin',
    active: 1,
    createdAt:new Date().getTime(),
  },
  {
    id: 1003,
    photoURL: 1,
    name: 'Heaven Dorsey',
    email: 'heaven@gmail.com',
    role: 'Reader',
    active: 1,
    createdAt:new Date().getTime(),
  },
  {
    id: 1004,
    photoURL: 1,
    name: 'Emanuel Stephens',
    email: 'emanuel@gmail.com',
    role: 'Reader',
    active: 1,
    createdAt:new Date().getTime(),
  },
  {
    id: 1005,
    photoURL: 1,
    name: 'Carlie Evans',
    email: 'carlie@gmail.com',
    role: 'Writer',
    active: 1,
    createdAt:new Date().getTime(),
  },
];

function CustomTypeEditComponent(props) {
  const { setRows, ...other } = props;

  const handleValueChange = () => {
    setRows((prevRows) => {
      console.log(prevRows);
      return prevRows.map((row) =>
        row.userId === props.userId ? { ...row, account: null } : row,
      );
    });
  };

  return <GridEditSingleSelectCell onValueChange={handleValueChange} {...other} />;
}

CustomTypeEditComponent.propTypes = {
  /**
   * The grid row id.
   */
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  setRows: PropTypes.func.isRequired,
};



function userList() {
  const editingRow = React.useRef(null);
  const [rowId, setRowId] = React.useState(null);
  const [rows, setRows] = React.useState([]);
  const url = `../api/getUserList`;
  const method = 'GET';
  const option = {
        method: method,
        
  }
  React.useEffect(() => {
    const fetchData = async () => {
      console.log("response1");
    try{
        const response = await fetch(url, option);
        const finalData = await response.json();
        const productsArray = finalData.products;
        setRows(productsArray);
        console.log("response");
      }catch(error){
  
          console.error(error);
          console.log("responseee");
        }
       
      }
      fetchData()
  
      
    }, []) 
  
   console.log(rows);
   console.log(typeof(rows));
  

  const columns = React.useMemo( 
    () =>
    [
    { 
      field: 'photoURL',
      headerName: 'Avatar', 
      width: 100,
      renderCell: (params) => <Avatar src={params.row.photoURL} />,
      sortable: false,
      filterable : false,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 170,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Role',
      type: 'singleSelect',
      valueOptions: ['Reader', 'Writer' , 'Admin'],
      width: 100,
      editable: true,
    },
    {
      field: 'active',
      headerName: 'Active',
      type: 'boolean',
      width: 120,
      editable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      editable: true,
      renderCell: params=>moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type:'actions',
      renderCell: (params)=>( 
        < UserActions {...{params, rowId , setRowId}} />
    ),
    },
    
    
  ],[rowId]

  );

  const handleCellEditStart = (params) => {
    editingRow.current = rows.find((row) => row.userId === params.userId) || null;
  };

  const handleCellEditStop = (params) => {
    if (params.reason === GridCellEditStopReasons.escapeKeyDown) {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.userId === editingRow.current?.userId
            ? { ...row, account: editingRow.current?.account }
            : row,
        ),
      );
    }
  };

  const processRowUpdate = (newRow) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.userId === editingRow.current?.userId ? newRow : row)),
    );

    return newRow;
  };
  const getRowId = (row) => row.userId;

  return (
    <Box sx={{ width: '100%', height: 500 }}>
      <Typography sx={{mb:3}}>
        All Users | 30 total  . 2 inactive
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        onCellEditStart={handleCellEditStart}
        onCellEditStop={handleCellEditStop}
        processRowUpdate={processRowUpdate}
        onCellEditCommit = {(params)=>setRowId(params.userId)}
        getRowId={getRowId}
      />
    </Box>
  );
}

export default UserList;
