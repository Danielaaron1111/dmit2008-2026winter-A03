/* reference for material ui components used
https://mui.com/material-ui/react-card/#media

*/

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// props best practices: option 2 - use destructuring to specifically name each prop you're using
//                                  so someone immediately knows the 'ingredients' before reading implementation
export default function AgencyCard({ imageUrl, name, abbreviation, description }) {
    return <Card sx={{ marginTop: "8px", maxWidth: 345 }}>
    {imageUrl && <CardMedia
      component="img"
      height="140"
      image={imageUrl}
      alt="green iguana"
    />}
    <CardContent>
      <Typography variant="h5" component="div">
        {name}
      </Typography>
      <Typography gutterBottom variant="body2" component="div">
        {abbreviation}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Go to Agency</Button>
    </CardActions>
  </Card>
}