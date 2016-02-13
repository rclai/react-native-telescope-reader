import React, {
	Component,
	View,
	ListView,
	Text,
} from 'react-native';

import { connect } from 'react-redux/native';

import styles from './styles';

import Post from './Post';

class PostsList extends Component {
	constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1.upvotes !== r2.upvotes
          && r1.commentCount !== r2.commentCount
          && r1.title !== r2.title;
      }
    });
    this.state = {
      posts: this.ds.cloneWithRows(props.posts)
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      posts: this.ds.cloneWithRows(newProps.posts)
    });
  }

  render() {
    return (
      <View style={[styles.container,{backgroundColor:'white'}]}>
      	<View style={styles.navbar}>
      		<Text style={styles.navbarText}>Telescope Reader</Text>
      	</View>
      	<ListView
          initialListSize={10}
      		dataSource={this.state.posts}
      		renderRow={(post, index) => (
      			<Post 
      				key={index} 
      				{...post}
      				navigator={this.props.navigator} />
    			)} />
      </View>
    );
  }
}

export default connect(
	state => ({
		posts: state.posts
	})
)(PostsList);