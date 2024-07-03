import React from 'react';
import styled from 'styled-components';

const StatItem = ({ count, title, icon, color,bcg }) => {
 

  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className='count'>{count}</span>
        <span className='icon'>{icon||null}</span>
      </header>
      <h5 className='title'>{title}</h5>
    </Wrapper>
  );
};

const Wrapper = styled.article`
padding: 2rem;
background: #fafafa;
border-bottom: 5px solid ${(props) => props.color};
border-radius: 0.25rem;

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.count {
  display: block;
  font-weight: 700;
  font-size: 40px;
  color: ${(props) => props.color};
  line-height: 2;
}
.title {
  margin: 0;
  text-transform: capitalize;
  letter-spacing: 1px;
  text-align: left;
  margin-top: 0.5rem;
  font-size: 1.25rem;
}
.icon {
  width: 50px;
  height: 40px;
  background: ${(props) => props.bcg};
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 2rem;
    color: ${(props) => props.color};
  }
}
`
export default StatItem;
