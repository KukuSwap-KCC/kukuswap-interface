import * as React from 'react'
import './index.css'
import {
	widget,
	ChartingLibraryWidgetOptions,
	IChartingLibraryWidget,
	ResolutionString,
	IBasicDataFeed,
	OnReadyCallback,
	ErrorCallback,
	HistoryCallback,
	LibrarySymbolInfo,
	PeriodParams,
	ResolveCallback,
	SymbolResolveExtension,
	SubscribeBarsCallback,
	Bar,
	LanguageCode 
} from './charting_library/charting_library';
import { Currency, ETHER, JSBI, TokenAmount, Token, ChainId, KUKU } from '@kukuswap/sdk'

import { getRateData } from '../../contexts/PairData'


export interface ChartContainerProps {
	baseCurrencyId: string
	baseCurrency: Currency
	otherCurrencyId: string
	otherCurrency: Currency,
	baseCurrencySymbol: string,
	pairAddress: string,
	latestBlock: number,
	symbol: ChartingLibraryWidgetOptions['symbol'];
	interval: ChartingLibraryWidgetOptions['interval'];

	// BEWARE: no trailing slash is expected in feed URL
	datafeedUrl: string;
	libraryPath: ChartingLibraryWidgetOptions['library_path'];
	chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'];
	chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'];
	clientId: ChartingLibraryWidgetOptions['client_id'];
	userId: ChartingLibraryWidgetOptions['user_id'];
	fullscreen: ChartingLibraryWidgetOptions['fullscreen'];
	autosize: ChartingLibraryWidgetOptions['autosize'];
	studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides'];
	container: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChartContainerState {}

function getLanguageFromURL(): LanguageCode | null {
    const regex = new RegExp('[\\?&]lang=([^&#]*)')

    // eslint-disable-next-line no-restricted-globals
    const results = regex.exec(location.search)
    return results === null ? null : (decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode)
}




export class TVChartContainer extends React.PureComponent<Partial<ChartContainerProps>, ChartContainerState> {


	public static defaultProps: ChartContainerProps = {
		baseCurrencyId: '',
		baseCurrency: KUKU,
		otherCurrencyId: '',
		otherCurrency: ETHER,
		baseCurrencySymbol: '',
		pairAddress: '',
		latestBlock: 0,
		symbol: 'AAPL',
		interval: '15' as ResolutionString,
		container: 'tv_chart_container',
		datafeedUrl: 'https://demo_feed.tradingview.com',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {}
	};

	private tvWidget: IChartingLibraryWidget | null = null;
	private noMoreBars = false;
	private prevSeconds = 0;
	private currentSubscription= '';
	private lastTransactionId = '';
	private lastBar: Bar | undefined = undefined;
	private latestPrice  = 0
	private oldestPrice  = 0
	private latestBlock = 0
	private chartInternal = '15'
	public componentDidMount(): void {  
		console.log('component mount')
		this.initWidget()
		
		
	}

	public componentWillUnmount(): void {
		console.log('component unmount')
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	refreshWidget() {
		this.cleanWidget();
		this.initWidget();
	}

	componentDidUpdate(prevProps: ChartContainerProps) {
		console.log('component update')
		if (this.props.baseCurrencyId !== prevProps.baseCurrencyId || this.props.otherCurrencyId !== prevProps.otherCurrencyId) {
			this.refreshWidget()
		}
	};

	private convertResolutionToSeconds(resolution: string): number {
		switch (resolution.substr(resolution.length - 1, 1)) {
			case 'D':
				return parseInt(resolution.substr(0, resolution.length - 1)) * 1440 * 60
			default:
				return parseInt(resolution) * 60;
		}
	}

	private async initWidget() {

		const resolutions = ["15", "30"] as ResolutionString[]

		const gtvDataFeed: IBasicDataFeed = {
			onReady: (callback: OnReadyCallback) => {
				const isReady  = () => {
					callback({
					exchanges: [],
					supports_marks: false,
					supports_time: false,
					supports_timescale_marks: false,
					symbols_types: [],
				})
				}	

				setTimeout(isReady, 0)
			},
			searchSymbols: () => {
				console.log('subscribe')
			 },
			resolveSymbol: (symbolName: string, onResolve: ResolveCallback, onError: ErrorCallback, extension?: SymbolResolveExtension): void => {
				const isResolveSymbol = () => {
				onResolve(
						{
							name: this.props.otherCurrency?.symbol ?? '',
							full_name:`${this.props.baseCurrencyId}/${this.props.otherCurrencyId}` ?? '',
							ticker: `${this.props.baseCurrencyId}/${this.props.otherCurrencyId}`,
							description: '',
							type: 'KCC',
							session: '24x7',
							exchange: 'KukuSwap',
							listed_exchange: 'KoffeeSwap',
							timezone: 'Etc/UTC',
							format: "price",
							pricescale: 10 ** 5,
							minmov: 1,
							supported_resolutions: resolutions,
							has_intraday: true
						}
					)
				}

				setTimeout(isResolveSymbol, 0)

			},
			getBars: async(symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, periodParams: PeriodParams, onResult: HistoryCallback, onError: ErrorCallback) => {
				this.chartInternal = resolution
				const seconds = this.convertResolutionToSeconds(resolution)

				console.log(seconds)

				console.log(this.prevSeconds)
				if (seconds !== this.prevSeconds) {
					this.noMoreBars = false;
					this.prevSeconds = seconds;
					this.oldestPrice = 0;
				}
				
				const pair = this.props.pairAddress

				
				if (!this.latestBlock) {
					this.latestBlock = this.props.latestBlock as number
				}

				const latestBlock = this.latestBlock

				const noMoreBars = this.noMoreBars

				async function fetch(pair: string, latestBlock:number, seconds:number) {
					let data = await getRateData(pair, latestBlock, seconds)
					
					return data
				}
				
				
				
				
				let data = await fetch(pair as string, latestBlock as number, seconds)
				
				console.log(data)
				
				let bars: any = []

				console.log(this.props.baseCurrencyId)
				console.log(this.props.baseCurrencySymbol)
				if (this.props.baseCurrencySymbol == this.props.baseCurrencyId) {
					const price1 = data && data[1]
					bars =  price1?.map((entry: any) => {
						return {
							time: parseInt(entry.timestamp) * 1000,
							open: parseFloat(entry.open),
							low: parseFloat(entry.open),
							close: parseFloat(entry.close),
							high: parseFloat(entry.close),
							volume: parseFloat(entry.volume)
						}
					})
				} else {
					const price0 = data && data[0]
					bars =  price0?.map((entry: any) => {
						return {
							time: parseInt(entry.timestamp) * 1000,
							open: parseFloat(entry.open),
							low: parseFloat(entry.open),
							close: parseFloat(entry.close),
							high: parseFloat(entry.close),
							volume: parseFloat(entry.volume)
						}
					})
				}

				const isResult = () => {
					onResult(
						bars
					)
				}

				console.log(isResult)
				setTimeout(isResult, 0)

				this.noMoreBars = true
				
			},

			// eslint-disable-next-line @typescript-eslint/no-empty-function
			subscribeBars: (symbolInfo: LibrarySymbolInfo, resolution: ResolutionString, onTick: SubscribeBarsCallback, listenerGuid: string, onResetCacheNeededCallback)  => {
			},

			// eslint-disable-next-line @typescript-eslint/no-empty-function
			unsubscribeBars: () => { 
			}
		}

		const widgetOptions: ChartingLibraryWidgetOptions = {
			symbol: this.props.otherCurrency?.symbol,
			// BEWARE: no trailing slash is expected in feed URL
			// tslint:disable-next-line:no-any
			datafeed: gtvDataFeed,
			interval: this.chartInternal as ResolutionString,
			container: this.props.container as ChartingLibraryWidgetOptions['container'],
			library_path: this.props.libraryPath as string,

			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings', 'header_symbol_search', 'symbol_search_hot_key', 'header_compare', 'display_market_status'],
			enabled_features: ['disable_resolution_rebuild'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			theme: "Dark",
		};

		const tvWidget = new widget(widgetOptions);
		this.tvWidget = tvWidget;
	}

	cleanWidget = () => {
		if (!this.canUseDOM()) return;
		if (this.props.container) {
			const element = document.getElementById(this.props.container.toString())
			if (element) element.innerHTML = '';
		}
		
	};

	canUseDOM = () => !!(
		typeof window !== 'undefined' &&
		window.document &&
		window.document.createElement
	);

	public render(): JSX.Element {
		return (
			<div
				id={ this.props.container }
				className={ 'TVChartContainer mb-5  border-yellow' }
			/>
		);
	}
}
