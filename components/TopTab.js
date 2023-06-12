import * as React from 'react';
import { useRouter } from 'next/router';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Navbar from './Navbar';

import CreateIcon from '@mui/icons-material/Create';
import EditOffIcon from '@mui/icons-material/EditOff';


export default function TopTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    if (newValue !== -1 && value !== newValue) {
      setValue(newValue);
    }
  };

  const router = useRouter();

  const handleCreateArticleType = () => {
    console.log('Tab1 clicked');
    router.push('/AdminPages/ArticleTypes/createArticleTypes');
  };

  const handleEditArticleType = () => {
    console.log('Tab 2 clicked');
    router.push('/AdminPages/ArticleTypes/EditArticleTypes');
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          padding: '20px',
          marginLeft: '300px',
          marginRight: '260px',
          backgroundColor: '#0082e6',
          color: 'white',
        }}
      >
        <Box sx={{ maxWidth: { xs: 320, sm: 480 }, backgroundColor: 'white' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            
          >
            <Tab
              label="Create"
              icon={<CreateIcon />}
              onClick={handleCreateArticleType}
              sx={{ flexDirection: 'row', alignItems: 'center',fontWeight:'700' }}
            />
            <Tab label="Edit"
              icon={< EditOffIcon />}
              onClick={handleEditArticleType} 
              sx={{ flexDirection: 'row', alignItems: 'center',fontWeight:'700' }}
              />
          </Tabs>
        </Box>
      </Box>
    </div>
  );
}
