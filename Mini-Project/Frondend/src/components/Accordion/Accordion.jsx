import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FaqAccordion = ({ topic, details }) => {
  const topicHeaderStyle = {
    backgroundColor: '#017A04',
    color: 'white',
    margin: '10px 0px 0px 0px',
    borderRadius: '8px',
  };

  const detailsStyle = {
    backgroundColor: '#92D69B',
    color: 'black',
    
    borderRadius: '0px 0px 8px 8px',
    margin:"-5px 0px 0px 0px"
    
  };

  return (
    <div >
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ fontSize: 32, color: 'white' }} />} // Larger and white dropdown icon
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={topicHeaderStyle}
        >
          <Typography >{topic}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={detailsStyle}>
          <Typography>{details}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FaqAccordion;
