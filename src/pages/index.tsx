import React, { useCallback, useEffect } from 'react'

const Home = () => {
  const [selectedText, setSelectedText] = React.useState('')

  const getSelectedText = useCallback(() => {
    document.onmouseup = () => {
      const selection = window.getSelection().toString()
      if (selection.length === 0 || selection === ' ') {
        return
      }

      setSelectedText(selection)
    }
  }, [])

  useEffect(() => {
    getSelectedText()
  }, [getSelectedText])

  console.log(selectedText)

  return (
    <div className="home">
      Home
      {/* select options that look like a sentence */}
      <p>
        A word or phrase that describes the page you are looking at.
        <select className="select">
          <option value=""></option>
          <option style={{ textTransform: 'uppercase' }}>
            organization (ORG)
          </option>
          <option style={{ textTransform: 'uppercase' }}>person (PER)</option>
          <option style={{ textTransform: 'uppercase' }}>location (LOC)</option>
          <option style={{ textTransform: 'uppercase' }}>date (DATE)</option>
        </select>
      </p>
    </div>
  )
}

export default Home
