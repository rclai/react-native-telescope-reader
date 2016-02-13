import React, {
  Component,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  WebView
} from 'react-native';

import styles from './styles';

export default class PostWebView extends Component {

  handleBack = () => this.props.navigator.pop();
  
  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={this.handleBack}>
            <View style={{width:30,marginRight: 10}}>
              <Text style={styles.navbarText}>&lt;&lt;</Text>
            </View>
          </TouchableOpacity>
          <ScrollView style={{flex:1,paddingTop:10,paddingBottom:10}} horizontal={true}>
            <Text style={styles.navbarText}>{this.props.title}</Text>
          </ScrollView>
        </View>
        <WebView 
          style={[styles.container]}
          javaScriptEnabled={true}
          startInLoadingState={true}
          renderLoading={Loading}
          url={this.props.url || undefined}
          html={!this.props.url && this.props.htmlBody ? this.props.htmlBody : undefined} />
      </View>
    )
  }
}

const Loading = () => (
  <View style={[styles.container, {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems:'center',
  }]}>
    <Text>Loading...</Text>
  </View>
);
