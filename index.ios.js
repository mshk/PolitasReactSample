/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var API_BASE_URL = "http://politas.jp/api/-/";
var ARTICLES_ENDPONT = "articles";
var FEATURES_ENDPONT = "features";

var React = require('react-native');
var {
  AppRegistry,
  ListView,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

var PolitasReact = React.createClass({
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    var feature = this.state.feature;
    return this.renderAll(feature);
  },
  renderLoadingView: function() {
    return (
	<View style={styles.container}>
        <Text>
        ロード中...
        </Text>
      </View>
    );
  },
  renderAll: function(feature) {
    return (
	<View style={styles.container}>
        <Image
          source={{uri: feature.large_image_url}}
          style={styles.topImage}
        />
	<ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderArticle}
          style={styles.listView}
        />
        </View>
    );
  },
  renderArticle: function(article) {
    return (
	<View style={styles.listContainer}>
        <Image
          source={{uri: article.thumbnail_image}}
          style={styles.thumbnailImage}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{article.title}</Text>
        </View>
      </View>    );
  },
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      feature: null,
    }
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch(API_BASE_URL + FEATURES_ENDPONT)
      .then((response) => response.json())
      .then((responseData) => {
	var feature = responseData[0];
	fetch(API_BASE_URL + ARTICLES_ENDPONT + '?feature_id=' + feature.id)
	  .then((response) => response.json())
	  .then((responseData) => {
            this.setState({
              feature: feature,
	      dataSource: this.state.dataSource.cloneWithRows(responseData),
              loaded: true,
            });
	  });
      })
      .done();}
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
    width: 230
  },
  titleContainer: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 14,
    margin: 10,
  },
  topImage: {
    marginTop: 20,
    alignItems: 'center',
    width: 480,
    height: 168
  },
  thumbnailImage: {
    width: 150,
    height: 100
  },
});

AppRegistry.registerComponent('PolitasReact', () => PolitasReact);
