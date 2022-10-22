import React from 'react';
import { List as MUIList, ListItem, ListItemAvatar, Avatar, ListItemSecondaryAction, IconButton, ListItemText, Slide } from '@material-ui/core';
import { Delete, MoneyOff  } from '@material-ui/icons';
import useStyles from './styles';
import { useExpenseTrackerContext } from '../../../context/ExpenseTrackerContext';

const List = () => {
    const classes = useStyles();
    const { transactions, deleteTransaction } = useExpenseTrackerContext();

  return (
    <MUIList dense={false} className={classes.list}>
        {transactions.map((transaction) => (
            <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={transaction.type === "Income" ? classes.avatarIncome : classes.avatarExpense}>
                           <MoneyOff />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={transaction.category} secondary={`₦${transaction.amount} - ${transaction.date}`}/>
                    <ListItemSecondaryAction>
                        <IconButton edge='end' onClick={() => deleteTransaction(transaction.id)}>
                            <Delete />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </Slide>
        ))}
    </MUIList>
  )
}

export default List;