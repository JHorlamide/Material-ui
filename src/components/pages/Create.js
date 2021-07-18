import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
});

const Create = ({ history }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    title: '',
    details: '',
  });

  const [category, setCategory] = useState('money');

  const [formError, setFormError] = useState({
    titleError: false,
    detailsError: false,
  });

  const { title, details } = formData;
  const { titleError, detailsError } = formError;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError({
      ...formError,
      titleError: false,
      detailsError: false,
    });

    if (title === '' || details === '') {
      setFormError({
        ...formError,
        titleError: title ? false : true,
        detailsError: details ? false : true,
      });
    }

    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ title, details, category }),
      }).then(() => {
        history.push('/notes');
      });
    }
  };

  return (
    <Container>
      <Typography
        className={classes.title}
        variant='h6'
        component='h2'
        color='textSecondary'
        gutterBottom
      >
        Create New Note
      </Typography>

      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          name='title'
          value={title}
          label='Note title'
          variant='outlined'
          color='secondary'
          fullWidth
          required
          onChange={onChange}
          error={titleError}
        />

        <TextField
          className={classes.field}
          name='details'
          value={details}
          label='Details'
          variant='outlined'
          color='secondary'
          multiline
          rows={4}
          fullWidth
          required
          onChange={onChange}
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Not Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              name='money'
              value='money'
              control={<Radio />}
              label='money'
            />
            <FormControlLabel
              name='todos'
              value='todos'
              control={<Radio />}
              label='todos'
            />
            <FormControlLabel
              name='reminder'
              value='reminder'
              control={<Radio />}
              label='reminder'
            />
            <FormControlLabel
              name='work'
              value='work'
              control={<Radio />}
              label='work'
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant='contained'
          color='secondary'
          type='submit'
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Create;
