import React, { RefObject } from 'react';

import classes from './GridItem.scss';

interface IGridItemProps {
	id: string;
	url: string;
	description: string;
	likes: number;
	link?: string;
	className?: string;
	isServer?: boolean;
}


enum LOAD_STATE {
	PENDING,
	LOADING,
	SUCCESS,
	ERROR
}

class GridItem extends React.PureComponent<IGridItemProps> {
	public state = {
		spans: 1,
		loadState: LOAD_STATE.PENDING,
	};

	private _imageRef: RefObject<HTMLImageElement> = React.createRef<HTMLImageElement>();
	private _throttled: boolean = false;

	public componentDidMount(): void {
		this.normaliseImages();
		this.subscribeToWindowResize();
	}

	public render() {
		const { url } = this.props;
		const { spans } = this.state;
		return <div className={classes.item} style={{ gridRowEnd: `span ${spans}` }}>
			<div className={classes.content}>
				<img ref={this._imageRef} className={classes.img} src={url} alt='' onLoad={this.loadHandler} onError={this.errorHandler} />
			</div>
		</div>;
	}

	private normaliseImages = () => {
		const img = this._imageRef.current;
		if (img && img.complete) {
			this.setSpans();
		}
	};

	private subscribeToWindowResize = () => {
		this._throttled = false;
		window.addEventListener('resize', this.resizeHandler);
	};

	private resizeHandler = () => {
		if (!this._throttled) {
			this._throttled = true;
			// set a timeout to un-throttle
			setTimeout(() => {
				this._throttled = false;
				this.normaliseImages();
			}, 100);
		}
	};

	private errorHandler = () => {
		this.setLoadState(LOAD_STATE.ERROR);
	};

	private loadHandler = () => {
		this.setLoadState(LOAD_STATE.SUCCESS);
		this.setSpans();
	};

	private setLoadState(loadState: LOAD_STATE) {
		this.setState((state) => ({ ...state, loadState }));
	}

	private setSpans = () => {
		const imageHeight = this._imageRef.current!.clientHeight;
		const rawHeight = 5;
		const spans = Math.ceil(imageHeight / rawHeight);
		this.setState(state => ({ ...state, spans }));
	};
}

export { GridItem };
