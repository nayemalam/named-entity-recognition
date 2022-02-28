// @ts-nocheck
import { Close, Help } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material'
import React from 'react'

const MoreDetailsModal = ({
  isHelpModalOpen,
  setIsHelpModalOpen,
  currentTransaction,
  transactions,
  isViewingTransactions,
  setIsViewingTransactions,
}) => {
  return (
    <div className="transactions-viewer">
      <IconButton onClick={() => setIsHelpModalOpen(true)}>
        <Help />
      </IconButton>
      {isHelpModalOpen && (
        <Dialog
          open={isHelpModalOpen}
          keepMounted
          onClose={() => setIsHelpModalOpen(false)}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          className="help-modal"
        >
          <DialogTitle>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1}>Transactions Details</Box>
              <Box>
                <IconButton onClick={() => setIsHelpModalOpen(false)}>
                  <Close />
                </IconButton>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent className="dialog-content">
            <p>
              Current transaction: <strong>{currentTransaction + 1}</strong>/
              {transactions.length}
            </p>
            <hr />
            <p>Total number of transactions: {transactions.length}</p>
            {/* view all transactions */}
            <Button
              variant="outlined"
              className="action-btn spacer"
              onClick={() => setIsViewingTransactions(!isViewingTransactions)}
            >
              {isViewingTransactions ? 'Hide' : 'View'} All Transactions
            </Button>
            {isViewingTransactions && (
              <div className="transactions-table">
                <Table>
                  <TableBody>
                    {transactions.map((transaction, i) => (
                      <TableRow key={i}>
                        <TableCell>{transaction}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default MoreDetailsModal
