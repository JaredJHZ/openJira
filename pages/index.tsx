
import { Typography } from '@mui/material';
import type { NextPage } from 'next'
import { Layout } from '../components/layouts';

const HomePage: NextPage = () => {
  return (
      <Layout title={''}>
        <Typography variant='h1' color={"primary"}>
            Hola a todos
        </Typography>
      </Layout>
  )
}

export default HomePage;