import React from 'react'

const TEXT = 'A word or phrase that describes the page you are looking at.'

// const tag = 'PERSON'

const tags = ['ORG', 'PER', 'LOC', 'DATE']

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

const Testing = () => {
  const [anchors, setAnchors] = React.useState([])
  const [body, setBody] = React.useState([
    { start: 0, end: TEXT.length, content: TEXT, tag: null },
  ])
  const [tag, setTag] = React.useState(tags[0])
  const [bodyWithTags, setBodyWithTags] = React.useState([])

  // const renderSpan = (span) => {
  //   if (props.getSpan) return props.getSpan(span) as T
  //   return { start: span.start, end: span.end } as T
  // }

  const getSelectedText = () => {
    // if (!bodyWithTags) return
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
          tag,
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
    setTag(tag)
  }

  React.useEffect(() => {
    setBody(splitWithOffsets(TEXT, bodyWithTags))
  }, [bodyWithTags])

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
        <select onChange={onSelectTags}>
          {tags.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="testing" onMouseUp={getSelectedText}>
        {/* select option tags onchange */}
        {body.map((split, i) => (
          <span
            key={`${split.start}-${split.end}`}
            onClick={(e) => handleDeselect(e)}
          >
            {split.mark ? (
              renderItemWithTag({ ...split })
            ) : (
              //   <mark key={`${split.start}-${split.end}`} data-id={split.start}>
              //     {split.content}
              //     {split.tag && (
              //       <span
              //         style={{
              //           fontSize: '0.7em',
              //           fontWeight: 500,
              //           marginLeft: 6,
              //         }}
              //       >
              //         {split.tag}
              //       </span>
              //     )}
              //   </mark>
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
        {/* {body.map((split) => {
        if (split.mark) {
          return (
            <mark
              key={`${split.start}-${split.end}`}
              data-id={split.start}
              onClick={handleDeselect}
            >
              {split.content}
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
        return (
          <span
            key={split.start}
            data-id={split.start}
            // onClick={handleSplitClick({ start: split.start, end: split.end })}
          >
            {split.content}
          </span>
        )
      })} */}
      </div>
    </>
  )
}

export default Testing
