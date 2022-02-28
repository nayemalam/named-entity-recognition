// @ts-nocheck
import {
  AddCircle,
  ExitToApp,
  RestartAlt,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material'
import { Button, IconButton, Tooltip } from '@mui/material'
import React from 'react'

const LabelSelector = ({
  labels,
  onSelectLabel,
  onAddLabel,
  onResetSelections,
  onExport,
  isPreviewing,
  setIsPreviewing,
}) => {
  return (
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
        <Tooltip title="Not Implemented Yet" placement="top">
          <div style={{ display: 'inline' }}>
            <IconButton aria-label="add" onClick={onAddLabel}>
              <AddCircle />
            </IconButton>
          </div>
        </Tooltip>
      </div>
      <div>
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
          onClick={onResetSelections}
          endIcon={<RestartAlt />}
        >
          Reset
        </Button>
        <Tooltip title="Not Implemented Yet" placement="top">
          <div style={{ display: 'inline' }}>
            <Button
              variant="outlined"
              className="action-btn"
              endIcon={<ExitToApp />}
              onClick={onExport}
            >
              Export
            </Button>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default LabelSelector
