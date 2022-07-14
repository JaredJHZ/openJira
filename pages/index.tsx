
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import type { NextPage } from 'next'
import { Layout } from '../components/layouts';
import { EntryList, NewEntry } from '../components/ui';

const HomePage: NextPage = () => {

  console.log(process.env.NEXT_PUBLIC_CLIENT_KEY);

  return (
      <Layout title={'Home Open Jira'}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm ={4}>
            <Card sx={{height:'90vh'}}>
              <CardHeader title="pendientes"/>
              <CardContent>


                <NewEntry/>
                <EntryList status='pending'/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm ={4}>
            <Card sx={{height:'90vh'}}>
              <CardHeader title="en progreso"/>
              <CardContent>
              <EntryList status='in-progress'/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm ={4}>
            <Card sx={{height:'90vh'}}>
              <CardHeader title="completados"/>
              <CardContent>
              <EntryList status='finished'/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Layout>
  )
}

export default HomePage;