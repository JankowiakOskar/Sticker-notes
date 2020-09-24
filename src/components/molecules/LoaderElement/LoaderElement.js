import React from 'react';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import Loader from 'react-loader-spinner';

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHeading = styled(Heading)`
  font-size: 6rem;
  color: ${({ theme }) => theme.white};
  text-shadow: -1px 0px 2px rgba(150, 150, 150, 1);
  text-align: center;
`;

const LoaderElement = () => {
  return (
    <LoaderContent>
      <StyledHeading data-id="loaderTitle">Sticker Notes</StyledHeading>
      <Loader type="BallTriangle" color="#5D65D3" height={80} width={80} />
    </LoaderContent>
  );
};

export default LoaderElement;
