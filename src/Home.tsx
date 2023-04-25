import { MouseEventHandler, SetStateAction, useCallback } from "react";
import { Snackbar } from "@mui/material";
import Alert from "@mui/lab/Alert";
import { DefaultCandyGuardRouteSettings, Nft } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import Image from "next/image";
import confetti from "canvas-confetti";
import Link from "next/link";
import Countdown from "react-countdown";
import { StepIconProps } from "@mui/material/StepIcon";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { GatewayProvider } from "@civic/solana-gateway-react";
import DialogTitle from "@mui/material/DialogTitle";
import { defaultGuardGroup, network } from "./config";
import { MultiMintButton } from "./MultiMintButton";
//import { MintButton } from "./MintButton";

import {
	splash,
	heroBgSm,
	heroBg,
	howItWorksBg,
	howItWorksBgSm,
	poolParty,
	ray1,
	ray2,
	ray3,
	ray4,
	ray5,
	vecLayer,
} from "./assets";

import { MintCount, Section, Container, Column } from "./styles";
import { AlertState } from "./utils";
import NftsModal from "./NftsModal";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import useCandyMachineV3 from "./hooks/useCandyMachineV3";
import {
	CustomCandyGuardMintSettings,
	NftPaymentMintSettings,
	ParsedPricesForUI,
} from "./hooks/types";
import { guardToLimitUtil } from "./hooks/utils";
import MintFlowDialog from "./components/MintFlowDialog";
import {
	BorderLinearProgress,
	CollectionDescription,
	CollectionName,
	ConnectWallet,
	Content,
	IconRow,
	ImageWrap,
	InfoBox,
	InfoRow,
	MintedByYou,
	Other,
	PrivateSubtext,
	PrivateText,
	PrivateWrap,
	ProgressbarWrap,
	StartTimer,
	StartTimerInner,
	StartTimerSubtitle,
	StartTimerWrap,
} from "./components/StyledComponents";
import { MintButton } from "./MintButton";
// import { useUserName } from "./hooks/useUserName";

export interface HomeProps {
	candyMachineId: PublicKey;
}
const candyMachinOps = {
	allowLists: [
		{
			list: require("../cmv3-demo-initialization/allowlist.json"),
			groupLabel: "waoed",
		},
	],
};

const Home = (props: HomeProps) => {
	const { connection } = useConnection();
	const wallet = useWallet();
	const candyMachineV3 = useCandyMachineV3(
		props.candyMachineId,
		candyMachinOps
	);

	const [balance, setBalance] = useState<number>();
	const [mintedItems, setMintedItems] = useState<Nft[]>();

	const [openFlowDialog, setOpenFlowDialog] = useState(false);
	const [connectBtnTitle] = useState("Mint Ticket");
	const [isMinted, setIsMinted] = useState(false);

	const onSetAlertState = useCallback((state: AlertState) => {
		setAlertState(state);
	}, []);

	const onDialogExpanded = useCallback(
		(expanded: SetStateAction<boolean>) => {
			console.log(expanded);
			// setDialogExpanded(expanded);
		},
		[]
	);

	const [alertState, setAlertState] = useState<AlertState>({
		open: false,
		message: "",
		severity: undefined,
	});

	const { guardLabel, guards, guardStates, prices } = useMemo(() => {
		const guardLabel = defaultGuardGroup;
		return {
			guardLabel,
			guards:
				candyMachineV3.guards[guardLabel] ||
				candyMachineV3.guards.default ||
				{},
			guardStates: candyMachineV3.guardStates[guardLabel] ||
				candyMachineV3.guardStates.default || {
					isStarted: true,
					isEnded: false,
					isLimitReached: false,
					canPayFor: 10,
					messages: [],
					isWalletWhitelisted: true,
					hasGatekeeper: false,
				},
			prices: candyMachineV3.prices[guardLabel] ||
				candyMachineV3.prices.default || {
					payment: [],
					burn: [],
					gate: [],
				},
		};
	}, [
		candyMachineV3.guards,
		candyMachineV3.guardStates,
		candyMachineV3.prices,
	]);

	useEffect(() => {
		console.log({ guardLabel, guards, guardStates, prices });
	}, [guardLabel, guards, guardStates, prices]);

	useEffect(() => {
		(async () => {
			if (wallet?.publicKey) {
				const balance = await connection.getBalance(wallet.publicKey);
				setBalance(balance / LAMPORTS_PER_SOL);
			}
		})();
	}, [wallet, connection]);

	const openOnSolscan = useCallback((mint) => {
		window.open(
			`https://solscan.io/address/${mint}${
				[
					WalletAdapterNetwork.Devnet,
					WalletAdapterNetwork.Testnet,
				].includes(network)
					? `?cluster=${network}`
					: ""
			}`
		);
	}, []);

	const throwConfetti = useCallback(() => {
		confetti({
			particleCount: 400,
			spread: 70,
			origin: { y: 0.6 },
		});
	}, []);

	useEffect(() => {
		if (mintedItems?.length === 0) throwConfetti();
	}, [mintedItems, throwConfetti]);

	useEffect(() => {
		console.log({ candyMachine: candyMachineV3.candyMachine });
	}, [candyMachineV3.candyMachine]);

	const solCost = useMemo(
		() =>
			prices
				? prices.payment
						.filter(({ kind }) => kind === "sol")
						.reduce((a, { price }) => a + price, 0)
				: 0,
		[prices]
	);

	const tokenCost = useMemo(
		() =>
			prices
				? prices.payment
						.filter(({ kind }) => kind === "token")
						.reduce((a, { price }) => a + price, 0)
				: 0,
		[prices]
	);

	const onConnectWallet: MouseEventHandler<HTMLButtonElement> = useCallback(
		(event) => {
			setOpenFlowDialog(true);
		},
		[]
	);

	useEffect(() => {
		setTimeout(() => {
			if (openFlowDialog)
				document.body.style.paddingRight = "0 !important";
		}, 50);
	}, [openFlowDialog]);

	const closeFlowDialog = useCallback(() => {
		setOpenFlowDialog(false);
	}, []);

	let candyPrice = null;
	if (
		prices.payment
			.filter(({ kind }) => kind === "token")
			.reduce((a, { kind }) => a + kind, "")
	) {
		candyPrice = `${tokenCost} Token`;
	} else if (
		prices.payment
			.filter(({ kind }) => kind === "sol")
			.reduce((a, { price }) => a + price, 0)
	) {
		candyPrice = `◎ ${solCost}`;
	} else {
		candyPrice = "1 NFT";
	}

	console.log(candyPrice);
	// Icons
	const Globe = (props) => (
		<svg
			width={30}
			height={30}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M15 1.667A20.4 20.4 0 0 1 20.333 15 20.4 20.4 0 0 1 15 28.333m0-26.666A20.4 20.4 0 0 0 9.667 15 20.4 20.4 0 0 0 15 28.333m0-26.666C7.636 1.667 1.667 7.637 1.667 15c0 7.364 5.97 13.333 13.333 13.333m0-26.666c7.364 0 13.333 5.97 13.333 13.333 0 7.364-5.97 13.333-13.333 13.333M2.333 11h25.334M2.333 19h25.334"
				stroke="#fff"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
	const Twitter = (props) => (
		<svg
			width={28}
			height={23}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M8.789 23c-3.235 0-6.25-.94-8.789-2.564 2.155.14 5.958-.195 8.324-2.451-3.559-.163-5.164-2.893-5.373-4.059.302.117 1.744.257 2.558-.07C1.416 12.83.788 9.237.927 8.141c.768.536 2.07.723 2.582.676-3.814-2.729-2.442-6.834-1.767-7.72 2.737 3.792 6.84 5.922 11.914 6.04a5.866 5.866 0 0 1-.146-1.305C13.51 2.61 16.113 0 19.325 0a5.79 5.79 0 0 1 4.25 1.853c1.122-.263 2.81-.878 3.634-1.41-.416 1.493-1.71 2.738-2.493 3.2.006.016-.007-.016 0 0 .688-.104 2.549-.462 3.284-.96-.364.838-1.736 2.233-2.862 3.013C25.348 14.938 18.276 23 8.788 23Z"
				fill="#fff"
			/>
		</svg>
	);
	const Discord = (props) => (
		<svg
			width={28}
			height={21}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M24.532 2.66C22.605.98 20.294.14 17.853 0l-.385.42c2.183.56 4.11 1.68 5.908 3.22-2.183-1.26-4.624-2.1-7.193-2.38-.77-.14-1.412-.14-2.183-.14-.77 0-1.413 0-2.184.14-2.568.28-5.009 1.12-7.192 2.38C6.422 2.1 8.349.98 10.532.42L10.147 0c-2.44.14-4.753.98-6.68 2.66C1.285 7.14.129 12.18 0 17.36 1.927 19.6 4.624 21 7.45 21c0 0 .899-1.12 1.54-2.1-1.669-.42-3.21-1.4-4.238-2.94.9.56 1.798 1.12 2.698 1.54 1.155.56 2.311.84 3.467 1.12 1.028.14 2.056.28 3.083.28 1.027 0 2.055-.14 3.083-.28 1.155-.28 2.312-.56 3.468-1.12.899-.42 1.798-.98 2.697-1.54-1.028 1.54-2.57 2.52-4.239 2.94.642.98 1.541 2.1 1.541 2.1 2.826 0 5.523-1.4 7.45-3.64-.128-5.18-1.284-10.22-3.468-14.7ZM9.762 14.84c-1.285 0-2.44-1.26-2.44-2.8 0-1.54 1.155-2.8 2.44-2.8 1.284 0 2.44 1.26 2.44 2.8 0 1.54-1.156 2.8-2.44 2.8Zm8.476 0c-1.284 0-2.44-1.26-2.44-2.8 0-1.54 1.156-2.8 2.44-2.8 1.285 0 2.44 1.26 2.44 2.8 0 1.54-1.155 2.8-2.44 2.8Z"
				fill="#fff"
			/>
		</svg>
	);

	return (
		<>
			<main
				className="main-sections"
				style={
					openFlowDialog
						? { position: "fixed", left: 0, right: 0 }
						: {
								position: "inherit",
								left: "inherit",
								right: "inherit",
						  }
				}
			>
				{/* hero */}
				<section className="hero hero-home">
					<div
						className="bg-holder bg-holder-sm"
						style={{ backgroundImage: `url(${heroBgSm.src})` }}
					/>
					<div
						className="bg-holder bg-holder-md"
						style={{ backgroundImage: `url(${heroBg.src})` }}
					/>
					{/*// bg-holder  */}
					<div className="container">
						<div className="img-wrapper">
							<Image
								src={splash}
								alt="Join pool party"
								width=""
								className="img-fluid"
							/>
						</div>
						<h1 className="title-3">
							Claim Your ticket To The Biggest Pool Party <br />
							of The Year On Solana
						</h1>
						{guardStates.isLimitReached ? (
							<button
								className={
									"btn btn-secondary btn-press btn-disabled"
								}
							>
								{connectBtnTitle}
							</button>
						) : (
							<button
								className={"btn btn-primary btn-press"}
								onClick={onConnectWallet}
							>
								{connectBtnTitle}
							</button>
						)}
					</div>
				</section>
				{/* !hero */}
				{/* description */}
				<section className="description minit_description">
					<div className="bg-holder" />
					{/*// bg-holder */}
					<div className="container">
						<div className="video_iframe_area">
							<iframe
								width={600}
								height={335}
								src="https://www.youtube.com/embed/bON-KPiiNCk?start=0"
								title="YouTube video player"
								frameBorder={0}
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen={false}
							/>
						</div>
					</div>
				</section>
				{/* !description */}
				{/* how it works */}
				<section className="how-it-works minit_pages_how_work">
					<div
						className="bg-holder bg-holder-sm"
						style={{
							backgroundImage: `url(${howItWorksBgSm.src})`,
						}}
					/>
					<div
						className="bg-holder bg-holder-md"
						style={{
							backgroundImage: `url(${howItWorksBg.src})`,
						}}
					/>
					{/*// bg-holder  */}
					<div className="container">
						<div className="pool_party_content">
							<div className="prise_pool">
								<Image src={poolParty} alt="" />
							</div>
							<div className="pool_content_area">
								<h3 className="title-3">
									What Is The Spring Splash Bash?
								</h3>
								<p>
									Simple, the Drinks on Deck Spring Splash
									Bash is a digital “pool party” and raffle
									all in one <br />
									that anyone can participate in. On March
									25th at XX:XX the party kicks off and every
									ticket <br />
									will reveal if its a winning or losing
									ticket.
								</p>
								<p>
									The best part? Almost 50% of tickets will
									win something! <br />
									Prizes consist of, SOL, USDC, Drinks on Deck
									Whitelist access with special mint pricing,
									S Tier <br />
									NFTs, and much more!
								</p>
							</div>
						</div>
					</div>
				</section>
				{/* !how it works */}
				{/* start faq section area */}
				<section className="faq_main_area">
					<div className="container">
						<div className="faq_content_area">
							<div className="section_title">
								<h2 className="title-1">FAQ</h2>
							</div>
							<div className="faq_area">
								<div
									className="accordion"
									id="accordionExample"
								>
									<div className="accordion-item">
										<h2
											className="accordion-header"
											id="headingOne"
										>
											<button
												className="accordion-button"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseOne"
												aria-expanded="true"
												aria-controls="collapseOne"
											>
												<h4 className="title-4">
													What can I win?
												</h4>
											</button>
										</h2>
										<div
											id="collapseOne"
											className="accordion-collapse collapse show"
											aria-labelledby="headingOne"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p className="text-3">
													Prizes consist of, SOL,
													USDC, Drinks on Deck
													Whitelist access with
													special mint pricing, S Tier
													NFTs, and much more!
												</p>
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2
											className="accordion-header"
											id="headingTwo"
										>
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseTwo"
												aria-expanded="false"
												aria-controls="collapseTwo"
											>
												<h4 className="title-4">
													Are tickets tradable?
												</h4>
											</button>
										</h2>
										<div
											id="collapseTwo"
											className="accordion-collapse collapse"
											aria-labelledby="headingTwo"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p className="text-3">
													Yes! Tickets are tradable on
													Magic Eden. Maximize your
													chances and prizes by buying
													additional tickets. How much
													is a ticket worth if it’s
													redeemable for a DeGod after
													reveal?
												</p>
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2
											className="accordion-header"
											id="headingThree"
										>
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseThree"
												aria-expanded="false"
												aria-controls="collapseThree"
											>
												<h4 className="title-4">
													What is Pool Party?
												</h4>
											</button>
										</h2>
										<div
											id="collapseThree"
											className="accordion-collapse collapse"
											aria-labelledby="headingThree"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p className="text-3">
													Pool Party is a DeFi
													platform focused on
													gamifying DeFi to help
													increase positive habits.
													Check out our flagship
													protocol and learn more at
													<a
														target="_blank"
														href="https://joinpoolparty.io/"
														rel="noreferrer"
													>
														https://joinpoolparty.io/
													</a>
												</p>
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2
											className="accordion-header"
											id="headingfour"
										>
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapsefour"
												aria-expanded="false"
												aria-controls="collapsefour"
											>
												<h4 className="title-4">
													What is Drinks on Deck?
												</h4>
											</button>
										</h2>
										<div
											id="collapsefour"
											className="accordion-collapse collapse"
											aria-labelledby="headingfour"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body">
												<p className="text-3">
													Drinks on Deck are you’re
													delightful poolside
													companions and Pool Party’s
													flagship NFT project. Funds
													from the Drinks on Deck mint
													will be staked to create an
													eternal lottery for Drinks
													on Deck holders. Stake your
													Drink to be eligible to win
													prizes generated from the
													yield. Holders will get to
													determine how often the
													drawing occurs, how many
													winners each draw has and so
													much more!
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="minit_items_area">
									<ul>
										<li>
											<a href="#">
												<Image
													src={ray1}
													alt="rays_1"
												/>
											</a>
										</li>
										<li>
											<a href="#">
												<Image
													src={ray2}
													alt="rays_2"
												/>
											</a>
										</li>
										<li>
											<a href="#">
												<Image
													src={ray3}
													alt="rays_3"
												/>
											</a>
										</li>
										<li>
											<a href="#">
												<Image
													src={ray4}
													alt="rays_4"
												/>
											</a>
										</li>
										<li>
											<a href="#">
												<Image
													src={ray5}
													alt="rays_5"
												/>
											</a>
										</li>
									</ul>
								</div>
								<div className="faq_btn_area">
									<Image src={vecLayer} alt="Vector_layer" />
								</div>
							</div>
						</div>
					</div>
				</section>
				{/* End faq section area */}
			</main>
			<Snackbar
				open={alertState.open}
				autoHideDuration={6000}
				onClose={() => setAlertState({ ...alertState, open: false })}
			>
				<Alert
					onClose={() =>
						setAlertState({ ...alertState, open: false })
					}
					severity={alertState.severity}
				>
					{alertState.message}
				</Alert>
			</Snackbar>
			<MintFlowDialog
				openDialog={openFlowDialog}
				onClose={closeFlowDialog}
				isMinted={isMinted}
				guardStates={guardStates}
				guardLabel={guardLabel}
				guards={guards}
				prices={prices}
				candyMachineV3={candyMachineV3}
				connection={connection}
				onSetAlertState={onSetAlertState}
			/>
		</>
	);
};

export default Home;

const renderGoLiveDateCounter = ({ days, hours, minutes, seconds }: any) => {
	return (
		<StartTimerWrap>
			<StartTimerSubtitle>Mint opens in:</StartTimerSubtitle>
			<StartTimer>
				<StartTimerInner elevation={1}>
					<span>{days}</span>Days
				</StartTimerInner>
				<StartTimerInner elevation={1}>
					<span>{hours}</span>
					Hours
				</StartTimerInner>
				<StartTimerInner elevation={1}>
					<span>{minutes}</span>Mins
				</StartTimerInner>
				<StartTimerInner elevation={1}>
					<span>{seconds}</span>Secs
				</StartTimerInner>
			</StartTimer>
		</StartTimerWrap>
	);
};
