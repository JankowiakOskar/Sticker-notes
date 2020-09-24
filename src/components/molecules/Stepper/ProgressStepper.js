import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import { Done } from '@styled-icons/material/Done';
import gsap from 'gsap';

const Wrapper = styled.div`
  width: 100%;
  padding: 0 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: space-between;
  align-items: center;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: ${({ theme }) => theme.fontSizes.m};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border: 3px solid ${({ theme }) => theme.blue};
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  background-color: ${({ theme, isActive }) => (isActive ? theme.blue : theme.white)};
`;

const StyledParagraph = styled(Paragraph)`
  padding: 10px 0;
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const LineWrapper = styled.div`
  padding: 0 5px 35px 5px;
`;

const Line = styled.div`
  border: 2px solid ${({ theme }) => theme.blue};
  border-radius: 5px;
  height: 10px;
  width: 100px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.4);

  @media (max-width: 465px) {
    width: 50px;
  }
`;

const InnerLine = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.blue};
  transform: ${({ isStepDone }) => (isStepDone ? 'scaleX(1)' : 'scaleX(0)')};
  transform-origin: 0 50%;
  transition: transform 0.2s ease-in-out;
`;

const StyledDone = styled(Done)`
  width: 30px;
  height: 30px;
  color: ${({ theme }) => theme.dark};
`;

const ProgressStepper = ({ steps, activeStep = 1 }) => {
  const iconDoneRef = useRef(null);

  useEffect(() => {
    if (iconDoneRef && iconDoneRef.current) {
      const iconDone = iconDoneRef.current;
      const tl = gsap.timeline({ defaults: { ease: 'Power1.easeinOut' } });
      tl.from(iconDone, { autoAlpha: 0, x: '-30px', duration: 0.2 });
    }
  }, [activeStep]);

  return (
    <Wrapper>
      {steps.map((step, index) => {
        const currentStep = index + 1;
        const isStepDone = activeStep > currentStep;
        const isActive = activeStep === currentStep;
        const isLastStep = index === steps.length - 1;

        return isLastStep ? (
          <StepWrapper key={step.title}>
            <Circle isActive={isActive} isStepDone={isStepDone}>
              {isStepDone ? <StyledDone ref={iconDoneRef} /> : `${step.content}`}
            </Circle>
            <StyledParagraph size="s">{step.title}</StyledParagraph>
          </StepWrapper>
        ) : (
          <React.Fragment key={step.title}>
            <StepWrapper>
              <Circle isActive={isActive}>
                {isStepDone ? <StyledDone ref={iconDoneRef} /> : `${step.content}`}
              </Circle>
              <StyledParagraph size="s">{step.title}</StyledParagraph>
            </StepWrapper>
            <LineWrapper>
              <Line>
                <InnerLine isStepDone={isStepDone} />
              </Line>
            </LineWrapper>
          </React.Fragment>
        );
      })}
    </Wrapper>
  );
};

export default ProgressStepper;
