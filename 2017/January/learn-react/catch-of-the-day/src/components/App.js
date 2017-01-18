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

		this.addFish         = this.addFish.bind(this);
		this.removeFish      = this.removeFish.bind(this);
		this.updateFish      = this.updateFish.bind(this);
		this.loadSamples     = this.loadSamples.bind(this);
		this.addToOrder      = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);

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

	updateFish( key, updatedFish ) {
		const fishes = { ...this.state.fishes };
		fishes[ key ] = updatedFish;
		this.setState( { fishes } );
	}

	removeFish( key ) {
		const fishes = { ...this.state.fishes };
		// have to use this, some weird interaction with firebase does not allow the Delete keyword
		// to successfully delete it
		fishes[ key ] = null;
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

	removeFromOrder( key ) {
		const order = { ...this.state.order };
		// localstorage, okay to use delete
		delete order[ key ];
		this.setState( { order } );
	}

	render () {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline={"Fresh Seafood Market"} />
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
					fishes={ this.state.fishes }
					order={ this.state.order }
					removeFromOrder={ this.removeFromOrder }
					params={ this.props.params }
				/>
				<Inventory
					fishes={ this.state.fishes }
					removeFish={ this.removeFish }
					updateFish={ this.updateFish }
					loadSamples={ this.loadSamples }
					addFish={ this.addFish }
					storeId={ this.props.params.storeId }
				/>
			</div>
		)
	}
}

App.propTypes =  {
	params : React.PropTypes.object.isRequired
};

export default App;