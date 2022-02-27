import React from 'react'

const TEXT = 'A word or phrase that describes the page you are looking at.'

const tag = 'PERSON'

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
        tag: null,
      })
    }

    splits.push({
      ...offset,
      mark: true,
      content: text.slice(start, end),
      tag: tag ? tag : null,
    })

    lastEnd = end
  }

  if (lastEnd < text.length) {
    splits.push({
      start: lastEnd,
      end: text.length,
      content: text.slice(lastEnd, text.length),
      tag: null,
    })
  }

  return splits
}

const Home = () => {
  const [selectedTextContents, setSelectedTextContents] = React.useState([])
  const [anchor, setAnchor] = React.useState({ start: null, end: null })
  const [value, setValue] = React.useState([])

  const handleChange = (value) => {
    setValue(value)
  }

  const getSelectedText = () => {
    document.onmouseup = () => {
      const selection = window.getSelection().toString()
      // if (selection.length === 0 || selection === ' ') {
      //   return
      // }

      let start =
        parseInt(
          window
            .getSelection()
            .anchorNode.parentElement.getAttribute('data-id'),
          10
        ) + window.getSelection().anchorOffset

      let end =
        parseInt(
          window.getSelection().focusNode.parentElement.getAttribute('data-id'),
          10
        ) + window.getSelection().focusOffset

      let position = window
        .getSelection()
        .anchorNode.compareDocumentPosition(window.getSelection().focusNode)

      if (
        position === 0 &&
        window.getSelection().focusOffset === window.getSelection().anchorOffset
      ) {
        return
      }

      if (
        (!position &&
          window.getSelection().anchorOffset >
            window.getSelection().focusOffset) ||
        position === Node.DOCUMENT_POSITION_PRECEDING
      ) {
        ;[start, end] = [end, start]
      }

      setAnchor({
        start,
        end,
      })

      // if content has tag then return
      // if (
      //   selectedTextContents.some(
      //     (selectedTextContent) => selectedTextContent.tag === tag
      //   )
      // ) {
      //   return
      // }

      const splits = splitWithOffsets(TEXT, [{ start, end }])

      const markedSplits = splits.filter((s) => s.mark)

      // remove duplicates where start = 0 and end = text.length
      const filteredSplits = splits.filter(
        (s) => !(s.start === 0 && s.end === TEXT.length)
      )

      // set value recursively if the start is 0

      // setValue([
      //   ...value,
      //   // { start: 0, end: start, content: TEXT.slice(0, start), tag: null },
      //   { start, end, content: TEXT.slice(start, end), mark: true, tag: tag },
      //   {
      //     start: end,
      //     end: TEXT.length,
      //     content: TEXT.slice(end, TEXT.length),
      //     tag: null,
      //   },
      // ])

      // setSelectedTextContents(filteredSplits)

      // set splits and push markedSplits to selectedTextContents
      // setSelectedTextContents(markedSplits)

      // add the selected value to the selectedTextContents
      // setSelectedTextContents([
      //   ...selectedTextContents,
      //   {
      //     start,
      //     end,
      //     mark: true,
      //     content: TEXT.slice(start, end),
      //     tag: tag ? tag : null,
      //   },
      // ])

      window.getSelection().empty()
    }
  }

  console.log('value', value)

  const handleSplitClick = ({ start, end }) => {
    // Find and remove the matching split.
    const splitIndex = [anchor].findIndex(
      (s) => s.start === start && s.end === end
    )

    // console.log(splitIndex)
    // if (splitIndex >= 0) {
    //   reClicked([...[position].slice(0, splitIndex), ...props.value.slice(splitIndex + 1)])
    // }
  }

  // console.log('value', value)

  // React.useEffect(() => {
  //   const splits = splitWithOffsets(
  //     TEXT,
  //     anchor.start && anchor.end ? [anchor] : []
  //   )

  //   // selectedTextContents.forEach((selectedTextContent) => {
  //   //   const matchedItem = splits.find(
  //   //     (s) =>
  //   //       s.start === selectedTextContent.start &&
  //   //       s.end === selectedTextContent.end
  //   //   )

  //   //   if (!matchedItem) {
  //   //     setSelectedTextContents([...selectedTextContent, matchedItem])
  //   //   }
  //   // })

  //   setValue(splits)

  //   // if (selectedTextContents.length === 0) {
  //   // setSelectedTextContents(splits)

  //   // }
  // }, [anchor, value.length])

  // const splits = splitWithOffsets(
  //   TEXT,
  //   position.start && position.end ? [position] : []
  // )

  // const splits = splitWithOffsets(
  //   TEXT,
  //   position.start && position.end ? [position] : []
  // )

  const splits = splitWithOffsets(
    TEXT,
    anchor.start && anchor.end ? [anchor] : []
  )

  // setValue(splits)

  return (
    <div className="home" onMouseUp={getSelectedText}>
      Home
      <div>
        {splits.map((split) => {
          if (split.mark) {
            return (
              <mark key={`${split.start}-${split.end}`} data-id={split.start}>
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
        })}
      </div>
    </div>
  )
}

export default Home
