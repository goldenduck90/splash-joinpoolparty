import { Stepper, Step, StepLabel,Stack, IconButton, Button, Typography, DialogProps, List, ListItem, Collapse } from '@mui/material';
import { Close as CloseIcon, ExpandLess as CollapseIcon, ExpandMore as ExpandIcon } from '@mui/icons-material';
import { QontoStepIconRoot, BootstrapDialog, bgStyle, QontoConnector, Content, InfoBox, InfoRow, IconRow, CollectionDescription, Other, PrivateWrap, ConnectWallet, PrivateText, ProgressbarWrap, MintedByYou, BorderLinearProgress, PrivateSubtext } from './StyledComponents'
import { StepIconProps } from '@material-ui/core';
import { DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { AlertState } from '../utils';
import { FC, SetStateAction, SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWallet, Wallet } from '@solana/wallet-adapter-react';
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base';
import { WalletListItem } from './WalletListItem';
import Image from 'next/image';
import { discord, ticket01, twitter } from '../assets';
import { WalletIcon } from './WalletIcon';
import { useCookies } from 'react-cookie';
import Countdown from 'react-countdown';
import { GatewayProvider } from '@civic/solana-gateway-react';
import { MintButton } from '../MintButton';
import { MintCount } from '../styles';
import NftsModal from '../NftsModal';
import Link from 'next/link';
import { GuardGroup, GuardGroupStates, NftPaymentMintSettings, ParsedPricesForUI } from '../hooks/types';
import { useRouter } from 'next/router';
import { Connection, PublicKey } from '@solana/web3.js';
import { TicketMintButton } from '../TicketMintButton';
import { shortenPubkey } from '../utils';
import axios from 'axios';
function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
        //   <Check className="QontoStepIcon-completedIcon" />
            <div className="QontoStepIcon-completedIcon" />
        ) : (
            <div className="QontoStepIcon-circle" />
        )}
        </QontoStepIconRoot>
    );
  }
  
export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
    sx?: {};
}
  
function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;
  
    return (
        <DialogTitle {...other}>
            {children}
            {onClose ? (
                <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 16,
                }}
                >
                <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

export interface MintFlowDialogProps extends Omit<DialogProps, 'title' | 'open'> {
    featuredWallets?: number;
    openDialog: Boolean;
    onClose: ()=> void;
    isMinted: Boolean;
    guardLabel: string;
    guards: GuardGroup;
    guardStates: GuardGroupStates;
    prices: ParsedPricesForUI;
    candyMachineV3: any;
    connection: Connection;
    onSetAlertState: (state: AlertState)=> void;
}

const MintFlowDialog : FC<MintFlowDialogProps>=({
    featuredWallets = 1,
    onClose,
    openDialog,
    isMinted,
    guardLabel,
    guards,
    guardStates,
    prices,
    candyMachineV3,
    connection,
    onSetAlertState
})=>{
    const titles = useMemo(()=> {
        return ['Connect Wallet', 'Connect Discord', 'Mint Ticket!', 'Congrats!']
    }, [])
    const steps = ['1', '2', '3']
    const subtitles = useMemo(()=> {
        return ['Step1 : Connect a Solana Wallet', 'Step2 : Connect your Discord account', 'Step3 : Time to mint!', `Here's your ticket! Try clicking on it!`]}, []);
    const [open, setOpen] = useState(false);
    const [discordName, setDiscordName] = useState('DISCORD');
    const [cookies, setCookie] = useCookies(["discord"]);
    const [activeStep, setActiveStep] = useState(1);
    const [walletsExpanded, setWalletsExpanded] = useState(false);
    const [title, setTitle] = useState('Connect Wallet');
    const [subtitle, setSubtitle] = useState('Step1 : Connect a Solana Wallet');
    const { wallet, publicKey, wallets, select, connected, disconnect, signTransaction } = useWallet();
    const router = useRouter();
    const [ popup, setPopup] = useState(null);
    const [featured, more] = useMemo(() => {
        const installed: Wallet[] = [];
        const loadable: Wallet[] = [];
        const notDetected: Wallet[] = [];

        for (const wallet of wallets) {
            if (wallet.readyState === WalletReadyState.NotDetected) {
                notDetected.push(wallet);
            } else if (wallet.readyState === WalletReadyState.Loadable) {
                loadable.push(wallet);
            } else if (wallet.readyState === WalletReadyState.Installed) {
                installed.push(wallet);
            }
        }

        const orderedWallets = [...installed, ...loadable, ...notDetected];
        return [orderedWallets.slice(0, featuredWallets), orderedWallets.slice(featuredWallets)];
    }, [wallets, featuredWallets]);

    const startMint = useCallback(
        async (quantityString: number = 1) => {
          const nftGuards: NftPaymentMintSettings[] = Array(quantityString)
            .fill(undefined)
            .map((_, i) => {
              return {
                burn: guards.burn?.nfts?.length
                  ? {
                    mint: guards.burn.nfts[i]?.mintAddress,
                  }
                  : undefined,
                payment: guards.payment?.nfts?.length
                  ? {
                    mint: guards.payment.nfts[i]?.mintAddress,
                  }
                  : undefined,
                gate: guards.gate?.nfts?.length
                  ? {
                    mint: guards.gate.nfts[i]?.mintAddress,
                  }
                  : undefined,
              };
            });
    
          console.log({ nftGuards });
          // debugger;
          candyMachineV3
            .mint(quantityString, {
              groupLabel: guardLabel,
              nftGuards,
            })
            .then((items) => {
            //   setMintedItems(items as any); adonis
            })
            .catch((e) =>
              onSetAlertState({
                open: true,
                message: e.message,
                severity: "error",
              })
            );
        },
        [candyMachineV3, guardLabel, guards, onSetAlertState]
      );
    
    const MintButton = ({
        gatekeeperNetwork,
    }: {
        gatekeeperNetwork?: PublicKey;
    }) => (
        <TicketMintButton
          candyMachine={candyMachineV3.candyMachine}
          gatekeeperNetwork={gatekeeperNetwork}
          isMinting={candyMachineV3.status.minting}
          setIsMinting={() => { }}
          isActive={!!candyMachineV3.items.remaining}
          isEnded={guardStates.isEnded}
          isSoldOut={!candyMachineV3.items.remaining}
          guardStates={guardStates}
          onMint={startMint}
          prices={prices}
        />
    );

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    useEffect(()=>{
        if (cookies['discord'] != undefined && cookies['discord'] != null)
            setDiscordName(cookies['discord']);

        if (connected && discordName === 'DISCORD') {
            setActiveStep(3);
            setWalletsExpanded(false);
        } else {
            if (connected && discordName!== 'DISCORD')
                setActiveStep(3);
        }
    }, [connected, cookies, discordName])

    useEffect(()=>{
        if (openDialog){
            setOpen(true);
        }
    }, [openDialog]);

    useEffect(()=>{
        setTitle(titles[activeStep - 1]);
        setSubtitle(subtitles[activeStep - 1]);
    }, [activeStep, subtitles, titles])

    const handleWalletClick = useCallback(
        (event: SyntheticEvent, walletName: WalletName) => {
            select(walletName);
        },
        [select]
    );

    const handleExpandClick = useCallback(() => {
        setWalletsExpanded(!walletsExpanded);
    }, [walletsExpanded]);

    const getUserInfo = async (accessToken: any) => {
        try {
            const response = await axios.get('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${accessToken.data.token_type} ${accessToken.data.access_token}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
    const getToken = async (code: any) => {
        try {
            const options = new URLSearchParams({
                client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URL,
                scope: 'identify'
            });
            const result = await axios.post('https://discord.com/api/oauth2/token', options);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const getInfo = useCallback(async (code: any) => {
        const accessToken = await getToken(code);
        const userInfo = await getUserInfo(accessToken);
        setDiscordName(userInfo.username);
        setCookie("discord", userInfo.username);
    }, [setCookie]);

    const followTwitter = useCallback((e: any)=>{
        e.preventDefault();
        window.open(process.env.NEXT_PUBLIC_TWITTER_FOLLOW, 'Popup', 'location,status,scrollbars,resizable,width=600, height=800');
    }, []);

    const share2Twitter = useCallback((e: any)=>{
        e.preventDefault();
        window.open(process.env.NEXT_PUBLIC_TWITTER_SHARE, 'Popup', 'location,status,scrollbars,resizable,width=600, height=800');
    }, []);

    const disconnectWallet = useCallback((e: any)=>{
        e.preventDefault();
        disconnect();
        setActiveStep(1);
    }, [disconnect]);
    
    const handleAuth = useCallback((event: MessageEvent) => {
        console.log('Handling authentication');

        if (event.origin !== window.location.origin) {
            console.log('Origin check failed:', event.origin, window.location.origin);
            return;
        }

        if (event.data.type === 'authentication') {
            const code = event.data.code;
            console.log(`Access token: ${code}`);

            if (popup)
                popup?.close();

            if (!code) return;
            if (cookies['discord'] == undefined || cookies['discord'] == null)
                getInfo(code);
            else
                setActiveStep(3);
            
            router.push('/');
        }
    }, [cookies, getInfo, popup, router]);

    const handleDiscordClick = useCallback(()=>{
        const p = window.open(process.env.NEXT_PUBLIC_DISCORD_AUTH_LINK, 'Discord Authentication', 'location,status,scrollbars,resizable,width=600, height=800');
        setPopup(p);
        
        console.log('Adding event listener');
        window.addEventListener('message', handleAuth);

        return () => {
            console.log('Removing event listener');
            window.removeEventListener('message', handleAuth);
        };
    }, [handleAuth]);

    return (
        <>
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            
            style={ walletsExpanded ? {
                maxHeight: 'inherit',
                bottom: 'inherit',
                position: 'absolute'
            } : {}}
        >
            <BootstrapDialogTitle sx={bgStyle} id="customized-dialog-title" onClose={handleClose}/>
            <DialogContent sx={bgStyle}>
                <Stack spacing={2}>
                    <Typography variant="h5" component="h2" sx={{alignSelf: 'center', marginTop: '16px'}}>
                        {title}
                    </Typography>
                    <div style={{width: 'fit-content', margin: '0 auto', marginTop: '16px'}}>
                        {activeStep != 4 && (
                            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                                    </Step>
                                ))}
                            </Stepper>    
                        )}
                    </div>
                    <Typography variant="h6" component="h2" sx={{alignSelf: 'center', fontSize: '16px'}}>
                        {subtitle}
                    </Typography>
                    {activeStep == 1 && (
                        <List>
                            {featured.map((wallet) => (
                                <WalletListItem
                                    key={wallet.adapter.name}
                                    onClick={(event) => handleWalletClick(event, wallet.adapter.name)}
                                    wallet={wallet}
                                />
                            ))}
                            {more.length ? (
                                <>
                                    <Collapse in={walletsExpanded} timeout="auto" unmountOnExit>
                                        <List>
                                            {more.map((wallet) => (
                                                <WalletListItem
                                                    key={wallet.adapter.name}
                                                    onClick={(event) => handleWalletClick(event, wallet.adapter.name)}
                                                    wallet={wallet}
                                                />
                                            ))}
                                        </List>
                                    </Collapse>
                                    <ListItem>
                                        <Button onClick={handleExpandClick}>
                                            {walletsExpanded ? 'Less' : 'More'} options
                                            {walletsExpanded ? <CollapseIcon /> : <ExpandIcon />}
                                        </Button>
                                    </ListItem>
                                </>
                            ) : null}
                        </List>
                    )}
                    {activeStep == 2 && (
                        <>
                        <Button onClick={(event)=> handleDiscordClick()}
                            style={{
                                width: '100%', 
                                border: '3px solid #FFFFFF', 
                                borderRadius: '12px', 
                                background: '#4D41DB', 
                                fontSize: '24px', 
                                textTransform: 'none', 
                                color: '#FFF',
                                justifyContent: 'flex-start',
                                paddingLeft: 0,
                                display: 'flex',
                                alignItems: 'flex-start',
                                padding: '10px 100px 10px 24px',
                                gap: '10px'
                            }}>
                            <Image
                                src={discord}
                                alt="discord"
                                style={{width: '40px', height: '30px', marginRight: '16px'}}
                            />
                            <span style={{fontSize: '20px'}}>
                                Connect Discord
                            </span>
                        </Button>
                        </>
                        
                    )}
                    {activeStep == 3 && (
                        <>
                            <div
                                style={{
                                    width: '100%',
                                    height: '160px',
                                    textAlign: 'center'
                                }}
                            >
                                <Image src={ticket01} alt="ticket01"></Image>
                            </div>
                            <div style={{textAlign: 'center'}}>
                                {/* <ReCAPTCHA style={{display: 'inline-block'}}
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                    onChange={(v: any)=> {console.log(v)}}
                                /> */}
                            </div>
                            <div className='flow-step3-disconnect-row'>
                                <div className='flow-step3-username'>
                                    <WalletIcon wallet={wallet}/>
                                    {publicKey && shortenPubkey(publicKey.toBase58()) }
                                </div>
                                <Button className='flow-step3-disconnect-btn' onClick={e=>disconnectWallet(e)}><span>Disconnect</span></Button>
                            </div>
                            <div className='flow-step3-disconnect-row'>
                                <div className='flow-step3-username'>
                                    <div>
                                        <Image src={discord} alt="discord" width={'24px !important'} height={'18px !important'}/>
                                    </div>
                                    {discordName}
                                </div>
                                {/* <Button className='flow-step3-disconnect-btn' onClick={e=>disconnectDiscord(e)}><span>Disconnect</span></Button> */}
                            </div>
                            {guardStates.isStarted && (
                                <> 
                                    
                                    {!!candyMachineV3.items.remaining &&
                                        guardStates.hasGatekeeper &&
                                        publicKey &&
                                        signTransaction ? (
                                        <GatewayProvider
                                        wallet={{
                                            publicKey: publicKey,
                                            //@ts-ignore
                                            signTransaction: signTransaction,
                                        }}
                                        gatekeeperNetwork={guards.gatekeeperNetwork}
                                        connection={connection}
                                        cluster={
                                            process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet"
                                        }
                                        options={{ autoShowModal: false }}
                                        >
                                        <MintButton
                                            gatekeeperNetwork={guards.gatekeeperNetwork}
                                        />
                                        </GatewayProvider>
                                    ) : (
                                        
                                        <MintButton
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}
                    {activeStep == 4 && (
                        <>
                            <div
                                style={{
                                    width: '100%',
                                    height: '160px',
                                    textAlign: 'center'
                                }}
                            >
                                <Image src={ticket01} alt="ticket"/>
                            </div>
                            <div className='flow-step3-disconnect-row'>
                                <div className='flow-step3-username'>
                                    <Image
                                        src={twitter}
                                        alt="twitter"
                                        style={{width: '24px', height: '18px'}}
                                    />
                                    Follow @joinpoolparty.io
                                </div>
                                <Button className='flow-step3-disconnect-btn' onClick={e=>followTwitter(e)}><span>Follow</span></Button>
                            </div>
                            <button className="menu__item-link btn btn-primary btn-press" onClick={e=>share2Twitter(e)}>
                                Share on Twitter
                            </button>
                        </>
                    )}
                </Stack>
            </DialogContent>
            <DialogActions sx={bgStyle}>
                {/* <Button autoFocus onClick={handleClose}>
                    Next
                </Button> */}
            </DialogActions>
        </BootstrapDialog>
        </>
        
    )
}

export default MintFlowDialog;