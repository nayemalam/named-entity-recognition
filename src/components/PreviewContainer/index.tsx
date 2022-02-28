import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { ContentBody } from 'src/types'
// import JsonTextContainer from './JsonTextContainer'

// @ts-ignore
const PreviewContainer = ({ body }) => {
  return (
    <div className="preview-container">
      <Table>
        <TableHead style={{ background: '#000' }}>
          <TableRow>
            <TableCell style={{ color: '#FFF' }}>Entity</TableCell>
            <TableCell style={{ color: '#FFF' }}>Label</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((item: ContentBody, index: number) => (
            <TableRow
              key={item.start}
              style={
                index % 2 ? { background: '#F5F5F5' } : { background: '#FFF' }
              }
            >
              <TableCell>{item.content}</TableCell>
              <TableCell>{item.label}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <JsonTextContainer body={body} /> */}
    </div>
  )
}

export default PreviewContainer
