import React from 'react'
import { ContentBody } from 'src/types'

// @ts-ignore
const JsonTextContainer = ({ body }) => {
  return (
    <pre className="json-text">
      {JSON.stringify(
        body.map((item: ContentBody) => {
          return {
            content: item.content,
            label: item.label,
          }
        }),
        null,
        2
      )}
    </pre>
  )
}

export default JsonTextContainer
