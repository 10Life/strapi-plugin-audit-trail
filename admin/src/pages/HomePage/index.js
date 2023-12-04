/*
 *
 * HomePage
 *
 */

import React, {useState} from 'react';
import { Typography } from '@strapi/design-system/Typography';
import { Button } from '@strapi/design-system/Button';
import { BaseHeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import Trash from '../../components/TrashIcon';
import logRequests from '../../api/log-request';
const name = "Audit Trail";

const HomePage = () => {
  const [isButton1Loading, setIsButton1Loading] = useState(false);
  const handleSubmit = async (cache_type) =>{
  let res = {};
    if(cache_type === 'flush_logs'){
      setIsButton1Loading(true);
      res = await logRequests.flush();
      setIsButton1Loading(false);
    }
  };
  return (
    <>
     <BaseHeaderLayout
        title={name}
        subtitle="Clear Audit Trails"
        as="h2"
      />
      <ContentLayout>
      <Typography variant="delta" as="h2"></Typography>
      <Grid gap={6}>
        
        <GridItem col={6} s={6}>
         <Typography variant="delta" as="h2">1. Clear audit trails.</Typography>        
        </GridItem>
        <GridItem col={4} s={4}>
            <Button
              onClick={() => handleSubmit('flush_logs')}
              startIcon={<Trash />}
              size="M"
              disabled={isButton1Loading}
              loading={isButton1Loading}
            >
              Clear
            </Button>
        </GridItem>
      </Grid>
     
      </ContentLayout>
    </>
  );
};

export default HomePage;
