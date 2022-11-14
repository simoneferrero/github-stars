import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

type Props = {
  handleSubmit: (searchValue: string) => void
  loading: boolean
}

const SearchBox = ({ handleSubmit, loading }: Props) => {
  const [searchValue, setSearchValue] = useState('react')

  const isError = !searchValue

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (isError) return

    handleSubmit(searchValue)
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Search Value"
        error={isError}
        helperText={isError ? 'Required' : ''}
        value={searchValue}
        onChange={handleChange}
        disabled={loading}
      />
      <Button
        onClick={onSubmit}
        type="submit"
        variant="contained"
        size="large"
        disabled={loading || isError}
      >
        Search
      </Button>
    </Box>
  )
}

export default SearchBox
