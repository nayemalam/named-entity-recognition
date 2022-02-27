import React from 'react'

const TEXT = 'A word or phrase that describes the page you are looking at.'

const tags = [
  { name: 'PERSON', color: '#FD005B', abbreviation: 'PER' },
  { name: 'ORGANIZATION', color: '#00A6FF', abbreviation: 'ORG' },
  { name: 'LOCATION', color: '#FFAC00', abbreviation: 'LOC' },
  { name: 'DATE', color: '#ea00ff', abbreviation: 'DATE' },
]

const sortBy = (obj) => {
  return obj.sort((a, b) => a.start - b.start)
}

const splitWithOffsets = (text, offsets: { start: number; end: number }[]) => {
  let lastEnd = 0
  const splits = []

  for (let offset of sortBy(offsets)) {
    const { start, end } = offset

    if (lastEnd < start) {
      splits.push({
        start: lastEnd,
        end: start,
        content: text.slice(lastEnd, start),
      })
    }

    splits.push({
      ...offset,
      mark: true,
      content: text.slice(start, end),
    })

    lastEnd = end
  }

  if (lastEnd < text.length) {
    splits.push({
      start: lastEnd,
      end: text.length,
      content: text.slice(lastEnd, text.length),
    })
  }

  return splits
}

const Testing = () => {
  const [body, setBody] = React.useState([
    { start: 0, end: TEXT.length, content: TEXT, tag: null },
  ])
  const [tag, setTag] = React.useState(tags[0])
  const [bodyWithTags, setBodyWithTags] = React.useState([])

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

      if (position === 0 && selection.focusOffset === selection.anchorOffset) {
        return
      }

      if (
        (!position && selection.anchorOffset > selection.focusOffset) ||
        position === Node.DOCUMENT_POSITION_PRECEDING
      ) {
        ;[start, end] = [end, start]
      }

      setBodyWithTags([
        ...bodyWithTags,
        {
          start,
          end,
          content: TEXT.slice(start, end),
          tag: tag.abbreviation,
          color: tag.color,
        },
      ])

      selection.empty()
    }
  }

  const handleDeselect = (e) => {
    // if mark exists in body then remove it at the same position

    const itemStartPos = parseInt(e.target.getAttribute('data-id'), 10)

    // find the item in the body that has the same start position
    const item = body.find((item) => item.start === itemStartPos && item.mark)

    if (item) {
      // slice item out of body
    }
  }

  const onSelectTags = (e) => {
    const tag = e.target.value
    setTag(tags.find((t) => t.abbreviation === tag))
  }

  React.useEffect(() => {
    setBody(splitWithOffsets(TEXT, bodyWithTags))
  }, [bodyWithTags])

  console.log(body, bodyWithTags)

  return (
    <>
      <div>
        <select onChange={onSelectTags}>
          {tags.map((option) => (
            <option key={option.name} value={option.abbreviation}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="testing" onMouseUp={getSelectedText}>
        {body.map((split, i) => (
          <span
            key={`${split.start}-${split.end}`}
            onClick={(e) => handleDeselect(e)}
          >
            {split.mark ? (
              <mark
                key={`${split.start}-${split.end}`}
                data-id={split.start}
                style={{ backgroundColor: split.color }}
              >
                {split.content}
                {split.tag && (
                  <span
                    style={{
                      fontSize: '0.7em',
                      fontWeight: 500,
                      marginLeft: 6,
                    }}
                  >
                    {split.tag}
                  </span>
                )}
              </mark>
            ) : (
              <span
                key={split.start}
                data-id={split.start}
                // onClick={handleSplitClick({ start: split.start, end: split.end })}
              >
                {split.content}
              </span>
            )}
          </span>
        ))}
      </div>
    </>
  )
}

export default Testing
