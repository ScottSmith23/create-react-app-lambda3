import React,{useState} from "react";
import styled from "styled-components";
import '../styles/Rules.css'

const DescripDiv = styled.div`

color:gainsboro;
`
const DescripTitle = styled.h4`
font-family: 'Anton', sans-serif;

`
const Rules = props => {

  return (
  <DescripDiv className="DescDiv">
    <DescripTitle className="image-title">Rules:</DescripTitle>
    <div className="ruleList">
    <ul>
      <li>Bing</li>
      <li>Bing</li>
      <li>Wahoo</li>
    </ul>
    </div>
    </DescripDiv>
  );
};

export default Rules;
