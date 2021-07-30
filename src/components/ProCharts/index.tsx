import * as React from 'react';
import './index.css';
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

import { getRateData } from '../../contexts/PairData'

export interface ChartContainerProps {
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
export interface ChartContainerState {
}

function getLanguageFromURL(): LanguageCode | null {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');

    // eslint-disable-next-line no-restricted-globals
	const results = regex.exec(location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode;
}

export class TVChartContainer extends React.PureComponent<Partial<ChartContainerProps>, ChartContainerState> {


	public static defaultProps: ChartContainerProps = {
		pairAddress: '',
		latestBlock: 0,
		symbol: 'AAPL',
		interval: 'D' as ResolutionString,
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

	public componentDidMount(): void {  

		this.initWidget()
		
		const widgetOptions: ChartingLibraryWidgetOptions = {
			symbol: this.props.symbol as string,
			// BEWARE: no trailing slash is expected in feed URL
			// tslint:disable-next-line:no-any
			datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
			interval: this.props.interval as ChartingLibraryWidgetOptions['interval'],
			container: this.props.container as ChartingLibraryWidgetOptions['container'],
			library_path: this.props.libraryPath as string,

			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings', 'header_symbol_search', 'symbol_search_hot_key', 'header_compare', 'display_market_status'],
			enabled_features: ['study_templates'],
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

		tvWidget.onChartReady(() => {
			tvWidget.headerReady().then(() => {
				const button = tvWidget.createButton();
				button.setAttribute('title', 'Click to show a notification popup');
				button.classList.add('apply-common-tooltip');
				button.addEventListener('click', () => tvWidget.showNoticeDialog({
						title: 'Notification',
						body: 'TradingView Charting Library API works correctly',
						callback: () => {
							console.log('Noticed!');
						},
					}));
				button.innerHTML = 'Check API';
			});
		});
	}

	public componentWillUnmount(): void {
		if (this.tvWidget !== null) {
			this.tvWidget.remove();
			this.tvWidget = null;
		}
	}

	private initWidget():void {
		const resolutions = ["1", "5", "15", "30", "45", "60", "120", "240", "1D"] as ResolutionString[]

		const pair = this.props.pairAddress
		const latestBlock = this.props.latestBlock

		async function fetch(pair: string, latestBlock:number) {
			let data = await getRateData(pair, latestBlock, 900)
	
			console.log('update Data')
	
			console.log(data)
		}
	
		fetch(pair as string, latestBlock as number)
	}

	public render(): JSX.Element {
		return (
			<div
				id={ this.props.container }
				className={ 'TVChartContainer' }
			/>
		);
	}
}