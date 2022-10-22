import React from 'react'


const isIncome = Math.round(Math.random());

const InfoCard = () => {
  return (
    <div style={{ textAlign: 'center', padding: '0 10%' }}>
        Try saying: <br />
        Add {isIncome ? 'Income ' : 'Expense '} 
        for {isIncome ? '4000 ' : '1500 '} dollars
        to Category {isIncome ? 'Investments ' : 'Travel '} 
        for next {isIncome ? 'Thursday ' : 'Saturday '}
    </div>
  )
}

export default InfoCard