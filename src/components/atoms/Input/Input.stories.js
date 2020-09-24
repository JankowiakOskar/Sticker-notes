import React from 'react';
import Input from './Input';

export default {
  title: 'atoms/Inputs',
};

export const primary = () => <Input />;
export const secondary = () => <Input secondary placeholder="Tytuł notatki" />;
