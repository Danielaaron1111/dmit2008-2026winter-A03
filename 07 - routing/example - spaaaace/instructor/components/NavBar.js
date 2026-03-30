// next.js routing components
import Link from 'next/link';

// mui components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'


export default function NavBar(props) {
  return <AppBar position="static">
    <Toolbar>

      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Link href="/">
          Space Agency App
        </Link>
      </Typography>

      <Typography variant="h6" component="div" >
        <Link href="/about">
          About
        </Link>
      </Typography>
    </Toolbar>
  </AppBar>
}
