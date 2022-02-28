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
  { name: 'PERSON', color: '#FB6A69', abbreviation: 'PER', active: true },
  { name: 'ORGANIZATION', color: '#FCB96B', abbreviation: 'ORG' },
  { name: 'LOCATION', color: '#71D7A5', abbreviation: 'LOC' },
  { name: 'DATE', color: '#BA97FF', abbreviation: 'DATE' },
]

const Home = () => {
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

  React.useEffect(() => {
    setBody(getSubstringsFromPosition(TEXT, bodyWithLabels))
  }, [bodyWithLabels])

  return (
    <div className="home container">
      <div>
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
            {/* preview labels button */}
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
      </div>
      <div className="entity">
        <div
          onMouseUp={getSelectedText}
          style={{ marginTop: 50, maxWidth: 900 }}
        >
          {body.map((split, i) => (
            <span key={`${split.start}-${split.end}`}>
              {split.isMarked ? (
                <mark
                  key={`${split.start}-${split.end}`}
                  data-id={split.start}
                  className="mark"
                  style={{
                    backgroundColor: split.color,
                    color: '#565656',
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
            <pre style={{ fontSize: 12, lineHeight: 1.2 }}>
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
  )
}

export default Home
