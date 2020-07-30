import React,{useState} from "react";
import styled from "styled-components";
import { Collapse, Button, CardBody, Card } from 'reactstrap';

const DescripDiv = styled.div`

margin-bottom:100px;
color:gainsboro;
`
const DescripTitle = styled.h3`
font-family: 'Anton', sans-serif;

`
const DescripComp = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
  <DescripDiv className="DescDiv">
    <DescripTitle className="image-title">About this Algorithm:</DescripTitle>
     <h4 className="image-date">Conway’s Game of Life is a simulation which was originally conceived by John Von Neumann as a model for self replicating robots. While Von Neumann found a solution to the problem, his answer was highly complicated. Conway’s contribution was to drastically simplify Von Neumann’s model so that it was governed by only four extremely simple rules.</h4>
      <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem',marginTop:"1rem" }}>More Info</Button>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody style={{backgroundColor: '#1c2640'}} >
          badoof
          </CardBody>
        </Card>
      </Collapse>
    </DescripDiv>
  );
};

export default DescripComp;
