/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
} = React;

var ArticleListView = require('./App/Views/ArticleList');

var PolitasReact = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor='#FF6600'
        initialRoute={{
          title: 'ポリタス',
          component: ArticleListView,
      }}/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
});


AppRegistry.registerComponent('PolitasReact', () => PolitasReact);
