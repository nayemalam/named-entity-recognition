import React from 'react'

const TEXT = 'A word or phrase that describes the page you are looking at.'

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
        // tag: null,
      })
    }

    splits.push({
      ...offset,
      mark: true,
      content: text.slice(start, end),
      //   tag: tag ? tag : null,
    })

    lastEnd = end
  }

  if (lastEnd < text.length) {
    splits.push({
      start: lastEnd,
      end: text.length,
      content: text.slice(lastEnd, text.length),
      //   tag: null,
    })
  }

  return splits
}

const Split = ({ mark, content, start, end, onClick, tag }) => {
  if (mark)
    return (
      <mark data-id={start}>
        {content}
        {tag && (
          <span
            style={{
              fontSize: '0.7em',
              fontWeight: 500,
              marginLeft: 6,
            }}
          >
            {tag}
          </span>
        )}
      </mark>
    )

  return <span data-id={start}>{content}</span>
}

const TextAnnotate = ({ content, value, onChange, getSpan, data }) => {
  console.log('whole data', data)
  const [anchors, setAnchors] = React.useState([])
  const [body, setBody] = React.useState([
    { start: 0, end: TEXT.length, content: TEXT, tag: null },
  ])
  const [bodyWithTags, setBodyWithTags] = React.useState([])

  const renderSpan = (span) => {
    if (getSpan) return getSpan(span)

    return { start: span.start, end: span.end }
  }

  const getSelectedText = () => {
    // if (!bodyWithTags) return
    document.onmouseup = () => {
      if (!onChange) return
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

      setAnchors([
        ...anchors,
        {
          start,
          end,
        },
      ])

      setBodyWithTags([
        ...bodyWithTags,
        {
          start,
          end,
          content: TEXT.slice(start, end),
        },
      ])

      onChange([
        ...value,
        renderSpan({
          start,
          end,
          content: TEXT.slice(start, end),
        }),
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

  React.useEffect(() => {
    setBody(splitWithOffsets(TEXT, anchors))
  }, [anchors])

  console.log('renderSpN', renderSpan())

  const renderItemWithTag = ({ start, content, tag }) => {
    return (
      <mark data-id={start}>
        {content}
        {tag && (
          <span
            style={{
              fontSize: '0.7em',
              fontWeight: 500,
              marginLeft: 6,
            }}
          >
            {tag}
          </span>
        )}
      </mark>
    )
  }

  console.log(body, bodyWithTags)

  return (
    <>
      <div>
        {/* <select onChange={onSelectTags}>
          {tags.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select> */}
      </div>
      <div className="testing" onMouseUp={getSelectedText}>
        {/* select option tags onchange */}
        {body.map((split, i) => (
          <Split key={`${split.start}-${split.end}`} {...split} />
        ))}
      </div>
    </>
  )
}

export default TextAnnotate
