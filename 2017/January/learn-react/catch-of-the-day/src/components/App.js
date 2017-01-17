import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Fish from './Fish';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {

	constructor () {
		super();

		this.addFish     = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder  = this.addToOrder.bind(this);

		// getinitialState
		this.state = {
			'fishes' : {},
			'order'  : {}
		};
	}

	componentWillMount () {
		// this runs right before the <App> is rendered
		this.ref = base.syncState( `${this.props.params.storeId}/fishes`, {
			'context' : this,
			'state'   : 'fishes'
		} );

		// check if there is any order in order in localstorage
		const localStorageRef = localStorage.getItem( `order-${this.props.params.storeId}` );

		if ( localStorageRef ) {
			// update App component's order state
			this.setState( {
				order : JSON.parse( localStorageRef )
			} );
		}
	}

	componentWillUpdate ( nextProps, nextState ) {
		console.log( { nextProps, nextState } )
		localStorage.setItem( `order-${this.props.params.storeId}`,
			JSON.stringify( nextState.order ) );
	}

	componentWillUnmount () {
		base.removeBinding( this.ref );
	}

	addFish ( fish ) {
		// update state
		const fishes = { ...this.state.fishes };
		// add new fish
		const timestamp = Date.now();
		fishes[ `fish-${timestamp}` ] = fish;
		// set state
		this.setState( { fishes } );
	}

	loadSamples () {
		this.setState( {
			'fishes' : sampleFishes
		} );
	}

	addToOrder( key ) {
		// take a copy of state
		const order = { ...this.state.order };
		// update or add the number of fish ordered
		order[ key ] = order[ key ] + 1 || 1;
		// update state
		this.setState( { order } );
	}

	render () {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="list-of-fishes">
						{
							Object
								.keys( this.state.fishes )
								.map( key => 
									<Fish
										// for react to identify if it's a unique fish
										key={key}
										// for me to use the key within fish
										index={key}
										details={this.state.fishes[ key ]}
										addToOrder={ this.addToOrder }
									/>
								)
						}
					</ul>
				</div>
				<Order
					fishes={this.state.fishes}
					order={this.state.order}
					params={this.props.params}
				/>
				<Inventory
					loadSamples={ this.loadSamples }
					addFish={ this.addFish }
				/>
			</div>
		)
	}
}

export default App;