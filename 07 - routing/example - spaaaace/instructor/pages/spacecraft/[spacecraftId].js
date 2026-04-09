// react hooks
import { useState, useEffect } from 'react';

// next.js routing
import { useRouter } from 'next/router';

// my API functions
import { getSpaceCraft } from '@utils/api/spaceCraft';

// MUI layout components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

// MUI 'physical' components
import Typography from '@mui/material/Typography';

// our components
import NavBar from '@components/NavBar';
import LoadingCircle from '@components/LoadingCircle';
import SimpleDetailsCard from '@components/SimpleDetailsCard';

export default function SpaceCraft() {

    const [spacecraftDetails, setSpacecraftDetails] = useState()

    const router = useRouter()
    const { spacecraftId } = router.query
    
    useEffect(()=> {
      getSpaceCraft(spacecraftId).then((data)=> {
        console.log(data)
        setSpacecraftDetails(data)
      })
    }, [spacecraftId])


  return  (
    <>

      <NavBar />

      {!spacecraftDetails ? 

        <LoadingCircle />

        :

        <Container sx={{paddingTop:2}}>
          <Grid container>

            <Grid xs="12" item>
              <Typography variant="h3" gutterBottom>
                 {spacecraftDetails.name}
              </Typography>
            </Grid>
            <Grid item xs="4">
              <SimpleDetailsCard 
                title={`${spacecraftDetails.name} details`}
                subDescription={spacecraftDetails.description}
              />
            </Grid>
            <Grid item xs="4">
              <SimpleDetailsCard 
                title={`${spacecraftDetails.name} configuration`}
                subDescription={spacecraftDetails.spacecraft_config.details}
              />
            </Grid>



          </Grid>
        </Container>

      }
    </>
  )

}