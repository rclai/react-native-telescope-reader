import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
  navbar: {
    height: 50,
    backgroundColor: '#1B0732',
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  navbarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postStyle: {
    flexDirection: 'row',
    position: 'relative',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
});

export default styles;
