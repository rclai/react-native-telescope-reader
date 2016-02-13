import React, {
	Component,
	View,
	TouchableOpacity,
	Text,
} from 'react-native';

import moment from 'moment';

import styles from './styles';

import PostWebView from './PostWebView';
import PostComments from './PostComments';

export default class Post extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.postStyle}>
				<TouchableOpacity>
					<View style={{width:40,marginRight:10,alignItems:'center',}}>
						{/*<Text>&#9650;</Text>*/}
						<Text>{this.props.upvotes}</Text>
						<Text style={{fontSize:10}}>votes</Text>
					</View>
				</TouchableOpacity>	
				<View style={[styles.container]}>
					<TouchableOpacity onPress={() => this.props.navigator.push({ component: PostWebView, passProps: this.props })}>
						<Text style={{color:'#1B0732'}}>{this.props.title}</Text>
						<View>
							<Text style={{fontSize:10}}>by {this.props.author} {moment(this.props.createdAt).fromNow()}</Text>
						</View>
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={() => {
					if (!this.props.commentCount) return;
					this.props.navigator.push({ component: PostComments, passProps: this.props })
				}}>
					<View style={{width: 40,marginLeft:10,alignItems:'center',}}>
						<Text>&ldquo; &rdquo;</Text>
						<Text>{this.props.commentCount}</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}
