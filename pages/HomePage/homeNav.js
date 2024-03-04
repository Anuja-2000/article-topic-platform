import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Styles from '../../styles/homePage.module.css'

export default function HomeNav() {
    return (
        <div className={Styles.navBar}>
                <div style={{ flexGrow: 0.1 }} ></div>
                    <Typography variant="h6" noWrap component="div"
                          sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#9399f7',
                            textDecoration: 'none',
                          }}>
                          Writer
                     </Typography>
                    <Typography variant="h6" noWrap component="div"
                          sx={{
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            paddingLeft: '10px',
                          }}>
                          GATE
                </Typography>
        
                <div style={{ flexGrow: 1 }} ></div>
                <Link href="/HomePage/faq"> <Button  sx={{marginRight:4, textTransform: 'none',fontFamily:'Ubuntu',fontSize:16}}>FAQ</Button></Link>
                <Link href="/WriterPages/signup/writerLogin"> <Button  sx={{marginRight:4, textTransform: 'none',fontFamily:'Ubuntu',fontSize:16}}>Writer SignIn</Button></Link>
                <Link href="/contactUs"> <Button  sx={{marginRight:4, textTransform: 'none',fontFamily:'Ubuntu',fontSize:16}}>Contact Us</Button></Link>
                <Link href="/login"> <Button  sx={{marginRight:4 , textTransform: 'none',fontFamily:'Ubuntu',fontSize:16}}>Sign In</Button></Link>
                <Link href="/register"> <Button sx={{borderRadius:6,marginRight:14,textTransform: 'none',fontFamily:'Ubuntu',fontSize:16}} variant="contained">Sign Up for Free</Button></Link>
            </div>
    )
}