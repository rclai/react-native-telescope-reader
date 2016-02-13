import React, {
  Component,
  View,
  Text,
} from 'react-native';

import moment from 'moment';

export default class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
          <Text style={{fontWeight:'bold',marginRight: 5}}>{this.props.author}</Text> 
          <Text style={{fontSize:12,marginRight: 5}}>{moment(this.props.createdAt).fromNow()}</Text>
          <Text style={{fontSize:12}}>{this.props.upvotes} points</Text>
        </View>
        <Text>{this.props.body}</Text>
      </View>
    );
  }
}
