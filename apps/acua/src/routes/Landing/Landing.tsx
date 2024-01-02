import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LandingProps {}

export function Landing(props: LandingProps) {
  return (
    <Container sx={{ my: 1 }}>
      <Box>
        <Typography variant="h4" component="h1">
          Welcome to the Apartment Complex Utility App!
        </Typography>
        <Typography variant="body1" component="p">
          Here you can file repair requests and manage your account information.
        </Typography>
      </Box>
      <Divider variant="middle" sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to="/tickets">
              <CardMedia
                component="img"
                height="140"
                image="/images/repair.jpg"
                alt="Pliers and a hammer"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Repair Requests
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Something broken in or around your apartment? File a repair
                  request, and we'll take care of it.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to="/edit-profile">
              <CardMedia
                component="img"
                height="140"
                image="/images/couple.jpg"
                alt="A happy looking couple holding mugs, relaxing on a bench with a dog."
                sx={{ objectPosition: 'top' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Manage your account
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Has something changed? View and manage your account
                  information.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Landing;
