import React from 'react'
import { getSubstringsFromPosition } from 'src/helpers'

const TEXT = `Online Banking transfer to CHK 7325 Confirmation# 3555236074`

const labels = [
  { name: 'PERSON', color: '#FC005B', abbreviation: 'PER' },
  { name: 'ORGANIZATION', color: '#00A6FF', abbreviation: 'ORG' },
  { name: 'LOCATION', color: '#FFAC00', abbreviation: 'LOC' },
  { name: 'DATE', color: '#ea00ff', abbreviation: 'DATE' },
]

const Home = () => {
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
          label: label.abbreviation,
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

    if (itemStartPos) {
      const item = bodyWithLabels.find((item) => item.start === itemStartPos)

      if (item) {
        setBodyWithLabels(
          bodyWithLabels.filter((item) => item.start !== itemStartPos)
        )
      }
    }
  }

  // event of select option
  const onSelectLabel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target

    setLabel(labels.find((label) => label.abbreviation === value))
  }

  React.useEffect(() => {
    setBody(getSubstringsFromPosition(TEXT, bodyWithLabels))
  }, [bodyWithLabels])

  return (
    <>
      <div>
        <select onChange={onSelectLabel}>
          {labels.map((option) => (
            <option key={option.name} value={option.abbreviation}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="home" onMouseUp={getSelectedText}>
        {body.map((split, i) => (
          <span
            key={`${split.start}-${split.end}`}
            onClick={(e) => handleDeselect(e as any)}
          >
            {split.isMarked ? (
              <mark
                key={`${split.start}-${split.end}`}
                data-id={split.start}
                style={{ backgroundColor: split.color }}
              >
                {split.content}
                {split.label && (
                  <span
                    style={{
                      fontSize: '0.7em',
                      fontWeight: 500,
                      marginLeft: 6,
                    }}
                  >
                    {split.label}
                  </span>
                )}
              </mark>
            ) : (
              <span key={split.start} data-id={split.start}>
                {split.content}
              </span>
            )}
          </span>
        ))}
      </div>
      <div
        style={{ height: 500, border: '1px solid black', overflowY: 'scroll' }}
      >
        <pre style={{ fontSize: 12, lineHeight: 1.2 }}>
          {JSON.stringify(bodyWithCleanLabel, null, 2)}
        </pre>
      </div>
    </>
  )
}

export default Home
