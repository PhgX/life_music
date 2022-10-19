import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function UploadButtons(props) {
    console.log('props', props)
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label" onChange={props}>
        Upload
        <input hidden accept="file/*" multiple type="file" />
      </Button>
    </Stack>
  );
}