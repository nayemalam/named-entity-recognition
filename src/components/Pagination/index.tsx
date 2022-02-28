// @ts-nocheck
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Button, LinearProgress, Typography } from '@mui/material'
import React from 'react'

const Pagination = ({
  currentTransaction,
  onPrevTransaction,
  transactions,
  onNextTransaction,
}) => {
  return (
    <div className="pagination">
      <Button
        disabled={currentTransaction === 0}
        title={currentTransaction === 0 ? 'No more transactions' : null}
        variant="outlined"
        className="action-btn"
        startIcon={<ArrowBackIos />}
        onClick={onPrevTransaction}
      >
        Previous
      </Button>

      <>
        <LinearProgress
          className="progress-bar"
          value={((currentTransaction + 1) / transactions.length) * 100}
          variant="determinate"
          title="test"
        />
        <Typography variant="body1" className="progress-text">
          {`${Math.round(
            ((currentTransaction + 1) / transactions.length) * 100
          )}%`}
        </Typography>
      </>

      <Button
        disabled={currentTransaction === transactions.length - 1}
        title={
          currentTransaction === transactions.length - 1
            ? 'No more transactions'
            : null
        }
        variant="outlined"
        className="action-btn"
        endIcon={<ArrowForwardIos />}
        onClick={onNextTransaction}
      >
        Next
      </Button>
    </div>
  )
}

export default Pagination
