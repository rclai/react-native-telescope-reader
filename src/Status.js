import React, {
  Component,
  View,
  Text,
  LayoutAnimation,
} from 'react-native';

import { connect } from 'react-redux/native';

export class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
  }

  componentWillReceiveProps(newProps) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (!this.state.visible) {
      this.setState({
        visible: true
      });
    }
    this.timeoutHandle && clearTimeout(this.timeoutHandle);
    this.timeoutHandle = setTimeout(() => {
      this.setState({
        visible: false,
      });
      this.timeoutHandle = null;
    }, 1000);
  }

  render() {
    if (!this.state.visible) return false;
    return (
      <View style={styles}>
        <Text>{this.props.status}...</Text>
      </View>
    );
  }
}

var styles = {
  borderTopWidth:1,
  borderTopColor:'#f1f1f1',
  height: 40,
  justifyContent:'center',
  alignItems:'center',
  backgroundColor: '#f1f1f1',
};

export default connect(
  state => ({
    status: state.status
  }),
)(Status);
