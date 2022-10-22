import React from 'react';
import { Card, CardHeader, CardContent, Typography, Divider } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Form from './Form/Form';
import List from './List/List';
import { useExpenseTrackerContext } from '../../context/ExpenseTrackerContext';
import InfoCard from './InfoCard';

const Main = () => {
    const { balance } = useExpenseTrackerContext();
    
  return (
    <Card>
        <CardHeader title='Expense Tracker' subheader='Built by David'/>
        <CardContent>
            <Typography align='center' variant='h5'>Total Balance ₦{balance}</Typography>
            <Typography align='center' variant='subtitle1' style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                <InfoCard />
            </Typography>
            <Divider/>
            <Form />
        </CardContent>
        <CardContent>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <List/>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
  )
}

export default Main;