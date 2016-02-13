'use strict';

// Core
import React, { 
  Component, 
  Navigator,
  View,
  Platform,
  BackAndroid,
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

export default class App extends Component {

  constructor(props) {
    super(props);
    this._initialRoute = { component: PostsList };
  }

  componentDidMount() {
    BackAndroid && BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
        this.navigator.pop();
        return true;
      }
      return false;
    });
  }

  _configureScene = (route) => {
    if (route.configureScene) {
      return route.configureScene;
    } else if (Platform.OS === 'ios') {
      return Navigator.SceneConfigs.FloatFromRight;
    } else {
      return Navigator.SceneConfigs.FadeAndroid;
    }
  };

  _renderScene = (route, navigator) => (
    <route.component navigator={navigator} {...route.passProps} />
  );

  _handleRef = (ref) => this.navigator = ref;

  _renderProvider = () => (
    <View style={[styles.container]}>
      <Navigator
        ref={this._handleRef}
        style={[styles.container, styles.whiteBackground]}
        initialRoute={this._initialRoute}
        configureScene={this._configureScene}
        renderScene={this._renderScene} />
      <Status />
    </View>
  );

  render() {
    return (
      <Provider store={store}>
        {this._renderProvider}
      </Provider>
    );
  }
}
