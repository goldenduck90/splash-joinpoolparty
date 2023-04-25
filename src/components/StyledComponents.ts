import styled from "styled-components";
import { styled as stylems } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Close as CloseIcon, ExpandLess as CollapseIcon, ExpandMore as ExpandIcon } from '@mui/icons-material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { Paper, Snackbar, LinearProgress } from "@material-ui/core";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const MintContainer = styled.div``;
export const BootstrapDialog = stylems(Dialog)(({ theme }) => ({
    '& .MuiDialog-paperScrollPaper': {
        maxHeight: 'inherit'
    },
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
      borderRadius: '12px',
    },
    '& .MuiDialog-root.MuiModal-root.': {
      bottom: 'inherit',
      position: 'absolute',
    },
    
}));

export const QontoConnector = stylems(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#FFF',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#FF81A6',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#FFF',
      borderRadius: 2,
      borderWidth: 2,
      width: '28px',
      marginLeft: '-20px'
    },
}));
  
export const QontoStepIconRoot = stylems('div')<{ ownerState: { active?: boolean } }>(
({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
    color: '#FF81A6',
    }),
    '& .QontoStepIcon-completedIcon': {
    color: '#FF81A6',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    zIndex: 1,
    fontSize: 18,
    backgroundColor: '#FF81A6',
    },
    '& .QontoStepIcon-circle': {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#FFF',
    },
}),
);

export const bgStyle = {
  bgcolor: '#3E09B2',
  width: '400px'
}

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 32px;
  width: 100%;
`
export const Other = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 48px;
  width: 100%;
`

export const BorderLinearProgress = styled(LinearProgress)`
  height: 16px !important;
  border-radius: 30px;
  background-color: var(--alt-background-color) !important;
  > div.MuiLinearProgress-barColorPrimary{
    background-color: var(--primary) !important;
  }
  > div.MuiLinearProgress-bar1Determinate {
    border-radius: 30px !important;
    background-color: var(--primary);
  }
`;
export const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  width: 100%;

  @media only screen and (max-width: 450px) {
    top: 16px;
  }
`;
export const WalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: right;
  margin: 30px;
  z-index: 999;
  position: relative;

  .wallet-adapter-dropdown-list {
    background: #ffffff;
  }
  .wallet-adapter-dropdown-list-item {
    background: #000000;
  }
  .wallet-adapter-dropdown-list {
    grid-row-gap: 5px;
  }
`;

export const ImageWrap = styled.div`
  aspect-ratio: 1 / 1;
  width: 100%;
  background-image: url(https://images.pexels.com/photos/2832432/pexels-photo-2832432.png);
  border-radius: 16px;
`
export const Image = styled.div`
  height: 100%
  width: 100%;
`
export const CollectionName = styled.h1`
  font-weight: 800;
  font-size: 64px;
  line-height: 100%;
  color: var(--white);

  @media only screen and (max-width: 1024px) {
    font-size: 48px;
  }

  @media only screen and (max-width: 450px) {
    font-size: 40px;
  }
`
export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  gap: 16px;
  flex-wrap: wrap;
`
export const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 16px;
  gap: 8px;
  border: 2px solid #FFFFFF;
  border-radius: 4px;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  text-transform: uppercase;
  color: var(--white);

  @media only screen and (max-width: 450px) {
    font-size: 18px;
  }
`
export const IconRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 24px;
  margin-bottom: -3px;
`
export const CollectionDescription = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  color: var(--white);
`
export const MintedByYou = styled.span`
  font-style: italic;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  text-transform: none;
`
export const ProgressbarWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
  width: 100%;
`
export const StartTimer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 32px;
  gap: 48px;
  background: var(--alt-background-color);
  border-radius: 8px;
  @media only screen and (max-width: 450px) {
    gap: 16px;
    padding: 16px;
    width: -webkit-fill-available;
    justify-content: space-between;
  }
`
export const StartTimerInner = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 16px;
  min-width: 90px;
  border-radius: 0px !important;
  box-shadow: none !important;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  background: none !important;
  text-transform: uppercase;
  color: var(--white);
  span {
    font-style: normal;
    font-weight: 800;
    font-size: 48px;
    line-height: 100%;
  }

  @media only screen and (max-width: 450px) {
    min-width: 70px;
    span {
      font-size: 32px;
    }
  }
`;
export const StartTimerWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0px;
  gap: 16px;
  width: -webkit-fill-available;
`
export const StartTimerSubtitle = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  text-transform: uppercase;
  color: #FFFFFF;
`
export const PrivateWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  width: -webkit-fill-available;
`
export const PrivateText = styled.h2`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 24px;
  gap: 10px;
  background: var(--error);
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  text-transform: uppercase;
  color: var(--white);
  width: -webkit-fill-available;
`
export const PrivateSubtext = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: var(--white);
`
export const WalletAmount = styled.div`
  color: var(--white);
  width: auto;
  padding: 8px 8px 8px 16px;
  min-width: 48px;
  min-height: auto;
  border-radius: 5px;
  background-color: var(--primary);
  box-sizing: border-box;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-weight: 600;
  line-height: 100%;
  text-transform: uppercase;
  border: 0;
  margin: 0;
  display: inline-flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  vertical-align: middle;
  justify-content: flex-start;
  gap: 10px;
`;

export const Wallet = styled.ul`
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
`;

export const ConnectButton = styled(WalletMultiButton)`
  border-radius: 5px !important;
  padding: 6px 16px;
  background-color: #fff;
  color: #000;
  margin: 0 auto;
`;
export const ConnectWallet = styled(WalletMultiButton)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 18px 24px;
  gap: 10px;
  width: 100%;
  height: fit-content;
  background-color: var(--primary) !important;
  border-radius: 4px;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  text-transform: uppercase;
  color: var(--white) !important;
  transition: 0.2s;
  :hover {
    background-color: var(--primary) !important;
    color: var(--white) !important;
    opacity: 0.9;
  }
`