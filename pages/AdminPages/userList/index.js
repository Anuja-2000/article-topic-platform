import * as React from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { NavigateBeforeRounded } from '@mui/icons-material';
import Navbar from '../../../components/Navbar';
import UserList from './userList';

function UserListPage() {
  const [checkboxSelection, setCheckboxSelection] = React.useState(true);

  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 500,
    maxColumns: 7,
  });

  return (
   
    <div style={{ width: '80%', 
    marginTop:'1.5%',
    marginLeft: '260px',
    marginRight: '260px' }}>
      <div> <Navbar /></div>
      <div>< UserList /> </div>
      
    </div>
  );
}

export default UserListPage;
