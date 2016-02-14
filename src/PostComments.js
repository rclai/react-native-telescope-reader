import React, {
  Component,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ListView,
  InteractionManager,
} from 'react-native';

import _ from 'underscore';
import { subscribe, unsubscribe, batchActions } from './store/actions';
import Crater from './store/crater';
import { connect } from 'react-redux/native';

import styles from './styles';

import Comment from './Comment';

class PostComments extends React.Component {
  constructor(props) {
    super(props);
    
    this.subId = undefined;

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1.upvotes !== r2.upvotes
          && r1.body !== r2.body;
      }
    });
  }

  componentWillMount() {
    const { dispatch, _id } = this.props;

    InteractionManager.runAfterInteractions(() => {
      
      console.log('subscribing to comments');

      dispatch(
        subscribe('commentsList', [{
          view: 'postComments',
          postId: this.props._id,
        }])
      ).then(
        (subId) => {
          this.subId = subId;
          console.log('done subscribing to comments!');
          dispatch(batchActions({
            type: 'SET_STATUS',
            payload: 'Enjoy'
          }, {
            type: 'SYNC_COMMENTS',
            payload: _.map(Crater.collections.comments, comment => comment)
          }));
        },
        error => dispatch({
          type: 'SET_STATUS',
          payload: 'Uh oh.. something went wrong'
        })
      );
    });
  }

  componentWillUnmount() {
    const { dispatch, _id, comments } = this.props;
    InteractionManager.runAfterInteractions(() => {
      this.subId && dispatch(unsubscribe(this.subId));

      dispatch({
        type: 'SYNC_COMMENTS',
        payload: []
      });
    });
  }

  renderChildComments(comments) {
    if (!comments.length) return false;
    return (
      <View style={{marginLeft:5}}>
        {comments.map(comment => this.renderComment(comment))}
      </View>
    );
  }

  renderComment = (comment) => {
    return (
      <View key={comment._id} style={{paddingLeft: 10,paddingRight:10,paddingTop:5,paddingBottom:5}}>
        <Comment {..._.omit(comment, 'childrenComments')} />
        {this.renderChildComments(comment.childrenComments)}
      </View>
    );
  };

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
        <ListView 
          style={[styles.container, {backgroundColor:'white'}]}
          dataSource={this.ds.cloneWithRows(this.props.comments)}
          renderRow={this.renderComment} />
      </View>
    );
  }
}

function structureComments({ comments }, ownProps) {
  comments = comments.sort((c1, c2) => {
    if (c1.score > c2.score) {
      return -1;
    } else if (c1.score < c2.score) {
      return 1;
    }
    return 0;
  });

  var i, comment, commentsLength = comments.length, map = {};
  for (i = 0; i < commentsLength; i++) {
    comment = comments[i];
    map[comment._id] = i;
    comment.childrenComments = [];
  }

  var newComments = [], parent;
  for (i = 0; i < commentsLength; i++) {
    comment = comments[i];

    if (comment.parentCommentId) {
      comments[map[comment.parentCommentId]].childrenComments.push(comment);
    } else {
      newComments.push(comment);
    }
  }
  return newComments;
}

export default connect(
  (state, ownProps) => ({
    comments: structureComments(state, ownProps),
  })
)(PostComments);
