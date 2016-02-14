import React, {
  Component,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import moment from 'moment';

import styles from './styles';

import Icon from 'react-native-vector-icons/FontAwesome';

import PostWebView from './PostWebView';
import PostComments from './PostComments';

export default class Post extends Component {

  handlePressComments = () => this.props.commentCount && this.props.navigator.push({
    component: PostComments,
    passProps: this.props,
  });

  handlePressLink = () => this.props.navigator.push({
    component: PostWebView,
    passProps: this.props,
  });

  hasComments() {
    return this.props.commentCount > 0;
  }

  render() {
    return (
      <View style={styles.postStyle}>
        <TouchableOpacity>
          <View style={{width:40,marginRight:10,alignItems:'center',}}>
            <Icon name="chevron-up" color={'#1B0732'} size={20} />
            <Text>{this.props.upvotes}</Text>
          </View>
        </TouchableOpacity> 
        <View style={[styles.container]}>
          <TouchableOpacity onPress={this.handlePressLink}>
            <Text style={{color:'#1B0732'}}>{this.props.title}</Text>
            <View>
              <Text style={{fontSize:10}}>by {this.props.author} {moment(this.props.createdAt).fromNow()}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.handlePressComments}>
          <View style={{ width: 40, marginLeft:10, alignItems:'center' }}>
            <Icon 
              name={this.hasComments() ? 'commenting' : 'comment-o'}
              color={this.hasComments() ? '#1B0732' : '#cccccc'}
              size={20} />
            {this.hasComments() 
              ? (
                <Text>{this.props.commentCount}</Text>
              )
              : false}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
