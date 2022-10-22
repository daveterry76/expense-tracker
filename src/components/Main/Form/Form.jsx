import React, { useEffect, useState } from 'react'
import { TextField, Typography, InputLabel, FormControl, MenuItem, Button, Select, Grid } from '@material-ui/core';
import useStyles from './styles';
import { useExpenseTrackerContext } from '../../../context/ExpenseTrackerContext';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import { v4 as uuid } from 'uuid';
import { useSpeechContext } from '@speechly/react-client';
import CustomizedSnackbar from '../../Snackbar/Snackbar';


const date = new Date();

const initialFormState = {
    amount: '',
    date: new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0],
    category: '',
    type: ''
}
const Form = () => {
    const classes = useStyles();
    const { segment } = useSpeechContext();
    const [formData, setFormData] = useState(initialFormState);
    const [open, setOpen] = useState(false)
    const { deleteTransaction, addTransaction } = useExpenseTrackerContext();

    // Create transaction 

    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount) || !formData.date.includes('-'))) return;
        const transaction = { ...formData, amount: Number(formData.amount), id: uuid() };
        addTransaction(transaction);
        setFormData(initialFormState);
        setOpen(true);
    }

    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income'});
            } else if (segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense'});
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction();
            } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                setFormData(initialFormState);
            }

            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value })
                        break;
                    case 'category':
                        if (incomeCategories.map((i) => i.type).includes(category)) {
                            setFormData({ ...formData, type: 'Income', category })
                        } else if (expenseCategories.map((e) => e.type).includes(category)) {
                            setFormData({ ...formData, type: 'Expense', category })
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: e.value })
                        break;
                    case 'category_income':
                        setFormData({ ...formData, type: e.value })
                        break;
                    case 'category_expense':
                        setFormData({ ...formData, type: e.value })
                        break;
                    default:
                        break;
                }
            })

            if (segment.isFinal && formData.amount && formData.date && formData.category && formData.type ) {
                createTransaction();
            }
        }
    }, [segment]);

  return (
    <Grid container spacing={2}>
        <CustomizedSnackbar open={open} setOpen={setOpen} />
        <Grid item xs={12}>
            <Typography align='center' variant='subtitle2' gutterBottom>
                { segment && segment.words.map((w) => w.value).join(' ')}
            </Typography>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                    <MenuItem value="Income">Income</MenuItem>
                    <MenuItem value='Expense'>Expense</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    {formData.type === "Income" ? 
                    incomeCategories.map((category) => {
                        return <MenuItem key={category.type} value={category.type}>{category.type}</MenuItem>
                    }) : expenseCategories.map((category) => {
                        return <MenuItem key={category.type} value={category.type}>{category.type}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </Grid>
        <Grid item xs={6}>
            <TextField type="number" label='Amount' value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })}/>
        </Grid>
        <Grid item xs={6}>
            <TextField type="date" label='Date' value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}/>
        </Grid>
        <Button onClick={createTransaction} className={classes.button} variant='outlined' color='primary' fullWidth>Create</Button>
    </Grid>
  )
}

export default Form;