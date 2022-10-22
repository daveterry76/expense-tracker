import { Grid } from '@material-ui/core'
import React, { useState, useEffect, useRef } from 'react'
import Details from './components/Details/Details'
import Main from './components/Main/Main'
import useStyles from './appStyles'
import style from './App.module.css'
import { ExpenseTrackerProvider } from './context/ExpenseTrackerContext'
import { PushToTalkButton, PushToTalkButtonContainer } from '@speechly/react-ui'
import { useSpeechContext } from '@speechly/react-client'
// import { SpeechContextState } from '@speechly/react-client'


const App = () => {
  const classes = useStyles();
  // const { speechState } = useSpeechContext();
  // const main = useRef(null);

  // const scrollToTop = () => {
  //   return main.current.scrollIntoView();
  // }

  // useEffect(() => {
  //   if (speechState === SpeechContextState.Recording) {
  //     scrollToTop();
  //   }
  // }, [speechState])

  return (
    <ExpenseTrackerProvider>
      <Grid className={classes.grid} container spacing={0} alignItems='center' justifyContent='center' style={{ height: '100vh' }}>
        <Grid item xs={12} sm={4} className={style.incomeSm}>
          <Details title='Income'/>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Main/>
        </Grid>
        <Grid item xs={12} sm={4} className={style.incomeLg}>
          <Details title='Income'/>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Details title='Expense'/>
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
      </PushToTalkButtonContainer>
    </ExpenseTrackerProvider>
    
  )
}

export default App;