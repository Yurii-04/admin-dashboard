import { mainShadow } from '../../../styles/app-theme/app.shadows.ts';

export const styles = {
  header: {
    position: "static",
    my: 2,
    backgroundColor: 'basic.white',
    color: 'basic.black',
    borderRadius: 4,
    height: '50px',
    boxShadow: mainShadow,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    '& .MuiToolbar-root': {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      '& > div': {
        height: '32px',
      },
    },
  },
  nav: {

  }
}