import { ExitToApp, Visibility, VisibilityOff } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { getSubstringsFromPosition } from 'src/helpers'

const TEXT = `ATM ATM864511 1625 N. MARKET STREET - MEMO=ATM864511 1625 N. MARKET STREET VDPS0 GOLDEN 1 CREDIT UNION SACRAMENTO CA US`

const labels: {
  name: string
  color: string
  abbreviation: string
  active?: boolean
}[] = [
  { name: 'PERSON', color: '#FC005B', abbreviation: 'PER', active: true },
  { name: 'ORGANIZATION', color: '#00A6FF', abbreviation: 'ORG' },
  { name: 'LOCATION', color: '#FFAC00', abbreviation: 'LOC' },
  { name: 'DATE', color: '#ec19ff', abbreviation: 'DATE' },
]

const Testing = () => {
  const [body, setBody] = React.useState<
    {
      start: number
      end: number
      content: string
      label: string | null
      color?: string
      isMarked?: boolean
    }[]
  >([{ start: 0, end: TEXT.length, content: TEXT, label: null }])
  const [label, setLabel] = React.useState(labels[0])
  const [bodyWithLabels, setBodyWithLabels] = React.useState([])
  const [bodyWithCleanLabel, setBodyWithCleanLabel] = React.useState([])
  const [isPreviewing, setIsPreviewing] = React.useState(false)

  const getSelectedText = () => {
    document.onmouseup = () => {
      const selection = window.getSelection()

      if (selection.toString() === ' ' || !selection.anchorNode) {
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
          color: label.color,
        },
      ])

      setBodyWithCleanLabel([
        ...bodyWithCleanLabel,
        {
          content: TEXT.slice(start, end),
          label: label.abbreviation,
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

  // event of select option
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

  React.useEffect(() => {
    setBody(getSubstringsFromPosition(TEXT, bodyWithLabels))
  }, [bodyWithLabels])

  return (
    <div
      style={{
        height: '80vh',
        width: '90vw',
        boxShadow: '0 5px 6px rgb(32 33 36 / 28%)',
        margin: '50px auto',
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#000',
            padding: 10,
          }}
        >
          <div>
            {labels.map((label) => (
              <Button
                variant="contained"
                key={label.abbreviation}
                style={{
                  padding: '2px 10px',
                  color: label.active ? '#000' : '#fff',
                  marginLeft: 10,
                  backgroundColor: label.active ? '#fff' : label.color,
                  // if selected then set the background color
                }}
                value={label.abbreviation}
                onClick={onSelectLabel}
              >
                {label.name}
              </Button>
            ))}
          </div>
          <div>
            {/* preview labels button */}
            <Button
              style={{
                padding: '2px 10px',
                color: '#fff',
                marginLeft: 10,
                backgroundColor: '#000',
              }}
              endIcon={isPreviewing ? <VisibilityOff /> : <Visibility />}
              onClick={() => setIsPreviewing(!isPreviewing)}
            >
              {isPreviewing ? 'Hide Preview' : 'Show Preview'}
            </Button>
            <Button
              style={{
                padding: '2px 10px',
                color: '#fff',
                marginLeft: 10,
                backgroundColor: '#000',
              }}
              endIcon={<ExitToApp />}
            >
              Export
            </Button>
          </div>
        </div>
        {/* <select onChange={onSelectLabel}>
          {labels.map((option) => (
            <option key={option.name} value={option.abbreviation}>
              {option.name}
            </option>
          ))}
        </select> */}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: '10px 24px',
        }}
      >
        <div
          className="Testing"
          onMouseUp={getSelectedText}
          style={{ marginTop: 50, maxWidth: 900 }}
        >
          {body.map((split, i) => (
            <span key={`${split.start}-${split.end}`}>
              {split.isMarked ? (
                <mark
                  key={`${split.start}-${split.end}`}
                  data-id={split.start}
                  style={{
                    backgroundColor: split.color,
                    padding: '0 5px',
                    fontWeight: 'bold',
                    display: 'inline-flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {split.content}
                  {split.label && (
                    <span
                      style={{
                        fontSize: '0.7em',
                        fontWeight: 500,
                        marginLeft: 6,
                        background: 'white',
                        padding: '0 5px',
                        borderRadius: '2px',
                        color: split.color,
                      }}
                    >
                      {split.label}
                    </span>
                  )}
                  <span
                    style={{
                      cursor: 'pointer',
                      padding: '0 5px',
                      color: '#CCCDCE',
                      fontSize: 10,
                      fontWeight: 'bold',
                      marginBottom: 1,
                    }}
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
          <div
            style={{
              height: 500,
              border: '1px solid black',
              overflowY: 'scroll',
              marginTop: 50,
              marginLeft: 50,
              flex: 1,
              width: 500,
              maxWidth: 500,
            }}
          >
            <pre style={{ fontSize: 12, lineHeight: 1.2 }}>
              {JSON.stringify(bodyWithLabels, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default Testing
