import React, { MouseEventHandler } from 'react';

export interface ModalInterface {
  title?: string
  children?: string | typeof React.Component
  show: boolean
  handleClose: MouseEventHandler
}
