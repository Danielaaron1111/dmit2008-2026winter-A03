import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

export default function AdaptationReviewCard({ adaptation }) {

  /* We can use an 'action' prop to denote some primary interaction/button for the header, 
      as per MUI docs: (see Complex Interaction @ https://mui.com/material-ui/react-card/#complex-interaction#complex-interaction)
  */

  const deleteReviewHandler = (reviewId) => {
    console.log(`deleting review: ${reviewId}`)
  }

  return <Card sx={{mt: 2 }}>
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: 'blue' }} aria-label="recipe">
          {adaptation.rating}
        </Avatar>
      }

      action={
        <IconButton
          onClick={() => {deleteReviewHandler(adaptation.id)}}
        >
          <DeleteIcon />
        </IconButton>
      }
      
      title={
        <Typography variant="body2" color="text.secondary">
          {adaptation.title}
        </Typography>
      }
      
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {adaptation.comment}
      </Typography>
    </CardContent>

  </Card> 
}
