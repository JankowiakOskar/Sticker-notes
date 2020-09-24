import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import cloudUpload from 'assets/svg/cloudUpload.svg';

const DropzoneWrapper = styled.div`
  height: 120px;
  width: 120px;
  background-color: ${({ theme, highlight }) => (highlight ? 'rgb(188, 185, 236)' : theme.white)};
  border: 2px dashed ${({ theme }) => theme.blue};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: ${({ theme }) => theme.fontSizes.m};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  @media (max-width: 320px) {
    padding: 10px;
    width: 80px;
    height: 80px;
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      cursor: default;
      opacity: 0.4;
    `}
`;

const Icon = styled.img`
  opacity: 0.6;
  width: 50px;
  height: 50px;

  @media (max-width: 320px) {
    width: 40px;
    height: 40px;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const DescribeText = styled.span`
  @media (max-width: 320px) {
    fontsize: ${({ theme }) => theme.fontSizes.s};
    text-align: center;
  }
`;

const Dropzone = ({ addFile, disabled, allowFiles }) => {
  const [highlight, setHighlight] = useState(false);
  const fileInputRef = useRef();

  const openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };
  const onFilesAdded = (event) => {
    if (disabled) return;
    const file = event.target.files[0];
    if (addFile) {
      const arrayWithFile = [file];
      addFile(arrayWithFile);
      fileInputRef.current.value = null;
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
    if (disabled) return;
    setHighlight(true);
  };
  const onDragLeave = () => {
    setHighlight(false);
  };
  const onDrop = (event) => {
    event.preventDefault();
    if (disabled) return;
    const file = event.dataTransfer.files[0];
    if (addFile) {
      const arrayWithFile = [file];
      addFile(arrayWithFile);
      fileInputRef.current.value = null;
    }
    setHighlight(false);
  };

  return (
    <DropzoneWrapper
      highlight={highlight}
      isDisabled={disabled}
      onClick={openFileDialog}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <Icon alt="upload" src={cloudUpload} />
      <FileInput ref={fileInputRef} type="file" onChange={onFilesAdded} accept={allowFiles} />
      <DescribeText>Dodaj plik</DescribeText>
    </DropzoneWrapper>
  );
};

export default Dropzone;
