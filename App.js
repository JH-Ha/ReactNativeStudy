/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      btnHighlight: [false, false, false],
    }
    let arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push({
        'random': Math.random(),
        'idx': i
      });
    }
    function compare(a, b) {
      if (a.random < b.random) {
        return -1;
      } else if (a.random > b.random) {
        return 1;
      }
      return 0;
    }
    arr.sort(compare);
    console.log(arr);

    


  }

  componentDidMount(){
    let highlightIdx = 0;
    
    setInterval(() => {
      if (highlightIdx >= 3) {
        highlightIdx -= 3;
      }
      let arr = [];
      for(let i = 0; i < 3; i ++){
        if(i == highlightIdx){
          arr.push(true);
        }else{
          arr.push(false);
        }
      }
      highlightIdx ++;
      //false 로 초기화
      this.setState({
        btnHighlight:arr,
      })
    }, 500);
  }

  render() {
    let arr = [1, 2, 3];
    return (
      <>
        <View>
          {arr.map((i, j) => {
            return (<Button title={i.toString()}
              color={this.state.btnHighlight[j] ? "#123456" : "#234567"}></Button>);
          })}
        </View>
        {/* <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView> */}
      </>
    );
  }
};

const styles = StyleSheet.create({
  btnHighlight: {
    flex: 1,
    backgroundColor: Colors.black,
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
