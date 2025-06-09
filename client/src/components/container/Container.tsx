import {Container as MuiContainer, type ContainerProps} from '@mui/material';
import type { FC } from 'react';

const Container: FC<ContainerProps> = ({children, sx, component = 'div'}) => {
  return (
    <MuiContainer
      maxWidth='xl'
      sx={sx}
      component={component}
    >
      {children}
    </MuiContainer>
  );
};

export default Container;