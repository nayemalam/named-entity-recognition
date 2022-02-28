import React from 'react'
import { toast } from 'react-toastify'
import FileUploader from 'src/components/FileUploader'
import Footer from 'src/components/Footer'
import LabelSelector from 'src/components/LabelSelector'
import MoreDetailsModal from 'src/components/MoreDetailsModal'
import Pagination from 'src/components/Pagination'
import PreviewContainer from 'src/components/PreviewContainer'
import { labels } from 'src/constants'
import { getSubstringsFromPosition } from 'src/helpers'
import { ContentBody } from 'src/types'

const Home = () => {
  const [label, setLabel] = React.useState(labels[0])
  const [transactions, setTransactions] = React.useState<string[]>([
    'EXAMPLE TRANSACTION: TROYS BURGERS 07/04 PURCHASE SAN PEDRO CA',
  ])
  const [isViewingTransactions, setIsViewingTransactions] =
    React.useState<boolean>(true)
  const [isHelpModalOpen, setIsHelpModalOpen] = React.useState<boolean>(false)
  const [isPreviewing, setIsPreviewing] = React.useState<boolean>(false)

  const [currentTransaction, setCurrentTransaction] = React.useState<number>(0)

  const TEXT = transactions[currentTransaction]

  const [body, setBody] = React.useState<ContentBody[]>([
    { start: 0, end: TEXT.length, content: TEXT, label: null },
  ])
  const [bodyWithLabels, setBodyWithLabels] = React.useState<ContentBody[]>([])

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

      let startOfSelection = parseInt(
        selection.anchorNode.parentElement.getAttribute('data-id'),
        10
      )
      let endOfSelection = parseInt(
        selection.focusNode.parentElement.getAttribute('data-id'),
        10
      )

      if (isNaN(startOfSelection) || isNaN(endOfSelection)) {
        return
      }

      let posOfCharsFromStartSelection = selection.anchorOffset
      let posOfCharsFromEndSelection = selection.focusOffset

      let start = startOfSelection + posOfCharsFromStartSelection

      let end = endOfSelection + posOfCharsFromEndSelection

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

    toast.success('Export Complete', { delay: 50 })

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

  const onAddLabel = () => {
    toast.warning('Feature coming soon')
  }

  const onResetSelections = () => {
    const labelsClone = [...labels]

    for (let i = 0; i < labelsClone.length; i++) {
      if (i === 0) {
        labelsClone[i].active = true
      } else {
        labelsClone[i].active = false
      }
    }

    setLabel(labelsClone[0])
    setBodyWithLabels([])
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
        <LabelSelector
          labels={labels}
          onSelectLabel={onSelectLabel}
          onAddLabel={onAddLabel}
          onResetSelections={onResetSelections}
          onExport={onExport}
          isPreviewing={isPreviewing}
          setIsPreviewing={setIsPreviewing}
        />

        <div className="entity">
          <div onMouseUp={getSelectedText} className="selectable-container">
            {body.map((substr, i) => (
              <span key={`${substr.start}-${i}`} className="value">
                {substr.isMarked ? (
                  <mark
                    data-id={substr.start}
                    className="mark"
                    style={{
                      backgroundColor: substr.color,
                    }}
                  >
                    {substr.content}
                    {substr.label && (
                      <span
                        style={{
                          color: substr.color,
                        }}
                        className="label"
                      >
                        {substr.abbreviation}
                      </span>
                    )}
                    <span
                      className="close-btn"
                      onClick={(e) => handleDeselect(e as any)}
                      data-id={substr.start}
                    >
                      x
                    </span>
                  </mark>
                ) : (
                  <span data-id={substr.start}>{substr.content}</span>
                )}
              </span>
            ))}
          </div>
          {isPreviewing && <PreviewContainer body={bodyWithLabels} />}
        </div>
      </div>

      <Pagination
        currentTransaction={currentTransaction}
        onPrevTransaction={onPrevTransaction}
        transactions={transactions}
        onNextTransaction={onNextTransaction}
      />

      <MoreDetailsModal
        isHelpModalOpen={isHelpModalOpen}
        setIsHelpModalOpen={setIsHelpModalOpen}
        currentTransaction={currentTransaction}
        transactions={transactions}
        isViewingTransactions={isViewingTransactions}
        setIsViewingTransactions={setIsViewingTransactions}
      />

      <Footer />
    </div>
  )
}

export default Home
