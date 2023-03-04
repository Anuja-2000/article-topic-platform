import Layout from '../components/Layout';
import Image from 'next/legacy/image'
import Link from 'next/Link'
import { Box } from '@mui/material'
function flaggedTopics() {
  return (
    <Layout>
    <div className="bg-image-wrapper">

     <Image src="/writing.png.jpg"
        alt="Picture of the writing of Admins"
        layout="fill"
      />
   <Box className='text-Box'> Flagged Topics</Box>
   </div>
   </Layout>
  );
}
export default flaggedTopics 
