'use strict';

// Core
import React, { 
	Component, 
	Navigator,
	View,
	Platform,
	//BackAndroid,
} from 'react-native';

//console.log('BackAndroid', BackAndroid)

// Styles
import styles from './styles';

// Components
import PostsList from './PostsList';
import Status from './Status';

// Redux
import { Provider } from 'react-redux/native';
import store from './store';

/*let navigator;

BackAndroid.addListener('hardwareBackPress', () => {
	if (navigator && navigator.getCurrentRoutes().length > 1) {
		navigator.pop();
		return true;
	}
	return false;
});*/

export default class App extends Component {

  constructor(props) {
    super(props);

    /*React.*/
  }

  _renderScene(route, navigator) {
  	return (
  		<route.component navigator={navigator} {...route.passProps} />
		);
  }

  render() {
    return (
    	<Provider store={store}>
	    	{() => (
		    	<View style={[styles.container]}>
			      <Navigator
			      	ref={ref => { navigator = ref; }}
			      	style={[styles.container, {backgroundColor:'#1B0732'}]}
			      	initialRoute={{ component: PostsList }}
			      	configureScene={route => {
			      		if (route.configureScene) {
			      			return route.configureScene;
			      		} else if (Platform.OS === 'ios') {
			      			return Navigator.SceneConfigs.FloatFromRight;
			      		} else {
			      			return Navigator.SceneConfigs.FadeAndroid;
			      		}
			      	}}
			      	renderScene={this._renderScene}	/>
		      	<Status />
		    	</View>
	    	)}
    	</Provider>
    );
  }
}
