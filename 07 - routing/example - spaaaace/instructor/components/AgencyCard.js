/* reference for material ui components used
https://mui.com/material-ui/react-card/#media

*/

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


// in this case, both 'key' and 'agency' are passed as the props object, so I'll just destructure
// to snipe the agency, since I'm just using that object's data selectively & no other props in here
export default function AgencyCard({ agency }) {
    return <Card sx={{ marginTop: "8px", maxWidth: 345 }}>
    {agency.image_url && <CardMedia
      component="img"
      height="140"
      image={agency.image_url}
      alt="green iguana"
    />}
    <CardContent>
      <Typography variant="h5" component="div">
        {agency.name}
      </Typography>
      <Typography gutterBottom variant="body2" component="div">
        {agency.abbreviation}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {agency.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Go to Agency</Button>
    </CardActions>
  </Card>
}