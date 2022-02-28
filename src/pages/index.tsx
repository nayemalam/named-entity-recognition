import {
  ArrowBackIos,
  ArrowForwardIos,
  Close,
  ExitToApp,
  Help,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import React from 'react'
import FileUploader from 'src/components/FileUploader'
import { getSubstringsFromPosition } from 'src/helpers'

const labels: {
  name: string
  color: string
  abbreviation: string
  active?: boolean
}[] = [
  { name: 'PERSON', color: '#FB6A69', abbreviation: 'PER', active: true },
  { name: 'ORGANIZATION', color: '#FCB96B', abbreviation: 'ORG' },
  { name: 'LOCATION', color: '#71D7A5', abbreviation: 'LOC' },
  { name: 'DATE', color: '#BA97FF', abbreviation: 'DATE' },
]

const Home = () => {
  const [label, setLabel] = React.useState(labels[0])
  const [bodyWithLabels, setBodyWithLabels] = React.useState([])
  const [bodyWithCleanLabel, setBodyWithCleanLabel] = React.useState([])
  const [isPreviewing, setIsPreviewing] = React.useState(false)
  const [transactions, setTransactions] = React.useState([
    'EXAMPLE TRANSACTION: TROYS BURGERS 07/04 PURCHASE SAN PEDRO CA',
  ])
  const [currentTransaction, setCurrentTransaction] = React.useState(0)
  const [isViewingTransactions, setIsViewingTransactions] = React.useState(true)
  const [isHelpModalOpen, setIsHelpModalOpen] = React.useState(false)

  const TEXT = transactions[currentTransaction]

  const [body, setBody] = React.useState<
    {
      start: number
      end: number
      content: string
      label: string | null
      isMarked?: boolean
      abbreviation?: string
      color?: string
    }[]
  >([{ start: 0, end: TEXT.length, content: TEXT, label: null }])

  const getSelectedText = () => {
    document.onmouseup = () => {
      const selection = window.getSelection()

      if (
        selection.toString() === ' ' ||
        !selection.anchorNode ||
        isHelpModalOpen
      ) {
        return
      }

      let start =
        parseInt(
          selection.anchorNode.parentElement.getAttribute('data-id'),
          10
        ) + selection.anchorOffset

      let end =
        parseInt(
          selection.focusNode.parentElement.getAttribute('data-id'),
          10
        ) + selection.focusOffset

      let position = selection.anchorNode.compareDocumentPosition(
        selection.focusNode
      )

      // when no node is selected
      if (position === 0 && selection.focusOffset === selection.anchorOffset) {
        return
      }

      // if selection is backwards then swap the indices but keep the same start and end
      if (
        (!position && selection.anchorOffset > selection.focusOffset) ||
        position === Node.DOCUMENT_POSITION_PRECEDING
      ) {
        ;[start, end] = [end, start]
      }

      // set selected labels on selected content
      setBodyWithLabels([
        ...bodyWithLabels,
        {
          start,
          end,
          content: TEXT.slice(start, end),
          label: label.name,
          abbreviation: label.abbreviation,
          color: label.color,
        },
      ])

      setBodyWithCleanLabel([
        ...bodyWithCleanLabel,
        {
          id: start,
          content: TEXT.slice(start, end),
          label: label.name,
        },
      ])

      selection.empty()
    }
  }

  const handleDeselect = (event: React.ChangeEvent<HTMLSpanElement>) => {
    const dataId = event.target.getAttribute('data-id')

    const itemStartPos = parseInt(dataId, 10)

    if (itemStartPos || itemStartPos === 0) {
      const item = bodyWithLabels.find((item) => item.start === itemStartPos)

      if (item) {
        setBodyWithLabels(
          bodyWithLabels.filter((item) => item.start !== itemStartPos)
        )
      }
    }
  }

  const onSelectLabel = (event: any) => {
    const { value } = event.target
    const labelsClone = [...labels]

    labelsClone.forEach((item) => {
      if (item.abbreviation === value) {
        item.active = true
      } else {
        item.active = false
      }
    })

    const selectedLabel = labelsClone.find(
      (item) => item.abbreviation === value
    )

    setLabel(selectedLabel)
  }

  const onExport = () => {
    if (bodyWithLabels.length === 0) {
      return
    }
    const cleanedBody = bodyWithLabels.map((item) => {
      return {
        content: item.content,
        label: item.label,
      }
    })

    console.log(cleanedBody)
  }
  const onPrevTransaction = () => {
    if (currentTransaction > 0) {
      const prevItem = currentTransaction - 1
      setCurrentTransaction(prevItem)
      // reset
      setBodyWithLabels([])
    }
  }

  const onNextTransaction = () => {
    if (currentTransaction < transactions.length - 1) {
      const nextItem = currentTransaction + 1
      setCurrentTransaction(nextItem)
      // reset
      setBodyWithLabels([])
    }
  }

  React.useEffect(() => {
    setBody(
      getSubstringsFromPosition(
        transactions[currentTransaction],
        bodyWithLabels
      )
    )
  }, [bodyWithLabels, currentTransaction, transactions])

  return (
    <div className="home">
      <FileUploader setTransactions={setTransactions} />
      <div className="container">
        <div className="label-selector">
          <div>
            {labels.map((label) => (
              <Button
                variant="contained"
                key={label.abbreviation}
                className="label"
                style={{
                  color: label.active ? '#fff' : '#000',
                  backgroundColor: label.active ? label.color : '#fff',
                }}
                value={label.abbreviation}
                onClick={onSelectLabel}
              >
                {label.name}
              </Button>
            ))}
          </div>
          <div>
            <Button
              variant="outlined"
              className="action-btn"
              endIcon={isPreviewing ? <VisibilityOff /> : <Visibility />}
              onClick={() => setIsPreviewing(!isPreviewing)}
            >
              {isPreviewing ? 'Hide Preview' : 'Show Preview'}
            </Button>
            <Button
              variant="outlined"
              className="action-btn"
              endIcon={<ExitToApp />}
              onClick={onExport}
            >
              Export
            </Button>
          </div>
        </div>
        <div className="entity">
          <div onMouseUp={getSelectedText} className="selectable-container">
            {body.map((split, i) => (
              <span key={`${split.start}-${split.end}`} className="value">
                {split.isMarked ? (
                  <mark
                    key={`${split.start}-${split.end}`}
                    data-id={split.start}
                    className="mark"
                    style={{
                      backgroundColor: split.color,
                    }}
                  >
                    {split.content}
                    {split.label && (
                      <span
                        style={{
                          color: split.color,
                        }}
                        className="label"
                      >
                        {split.abbreviation}
                      </span>
                    )}
                    <span
                      className="close-btn"
                      onClick={(e) => handleDeselect(e as any)}
                      data-id={split.start}
                    >
                      x
                    </span>
                  </mark>
                ) : (
                  <span key={split.start} data-id={split.start}>
                    {split.content}
                  </span>
                )}
              </span>
            ))}
          </div>
          {isPreviewing && (
            <div className="preview-container">
              <pre className="json-text">
                {JSON.stringify(
                  bodyWithLabels.map((item) => {
                    return {
                      content: item.content,
                      label: item.label,
                    }
                  }),
                  null,
                  2
                )}
              </pre>
            </div>
          )}
        </div>
        <a
          href="https://ntropy.com/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit us!"
        >
          <img
            src={
              'https://assets.website-files.com/60478d22345ad2b2ea2a1a12/6066044a87fc31364b9df7c3_ntropy.svg'
            }
            alt="logo"
            className="logo-bottom-right"
          />
        </a>
      </div>
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
    </div>
  )
}

export default Home
