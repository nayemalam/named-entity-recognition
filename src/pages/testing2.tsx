import React from 'react'
import TextAnnotate from 'src/components/TextAnnotate'

const TEXT = 'A word or phrase that describes the page you are looking at.'

const TAG_COLORS = {
  ORG: '#00ffa2',
  PERSON: '#84d2ff',
}

const Testing2 = ({ content, value, onChange, getSpan }) => {
  const [data, setData] = React.useState({
    value: [{ start: 17, end: 19, tag: 'PERSON' }],
    tag: 'PERSON',
  })

  const handleChange = (value) => {
    setData({
      ...data,
      value,
    })
    console.log('triggered')
  }

  const handleTagChange = (e) => {
    setData({
      ...data,
      tag: e.target.value,
    })
  }

  return (
    <>
      <div>
        <select onChange={handleTagChange} value={data.tag}>
          <option value="ORG">ORG</option>
          <option value="PERSON">PERSON</option>
        </select>
      </div>
      <TextAnnotate
        content={TEXT}
        value={data.value}
        onChange={handleChange}
        getSpan={(span) => ({
          ...span,
          tag: data.tag,
          color: TAG_COLORS[data.tag],
        })}
        data={data}
      />
      <pre style={{ fontSize: 12, lineHeight: 1.2 }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </>
  )
}

export default Testing2
