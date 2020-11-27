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
  Alert,
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
      highlightOrder :[],
      intervalArr :[],
      curOrder : 0,
      randomArr :[],
    }
    this.clearInterval = this.clearInterval.bind(this);
    this.startGame = this.startGame.bind(this);

  }

  componentDidMount(){
    
  }
  clearInterval(){
    let lastOne = setTimeout(()=>{},1);
    for(let i = 0; i < this.state.intervalArr.length; i ++){
      clearInterval(this.state.intervalArr[i]);
    }
  }
  startGame(){
    let randomArr = [];
    for (let i = 0; i < 3; i++) {
      randomArr.push({
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
    randomArr.sort(compare);
    console.log(randomArr);

    let highlightIdx = 0;
    
    let intervalId = setInterval(() => {
      let arr = [];
      if (highlightIdx >= 3) {
        highlightIdx -= 3;
      }
      for(let i = 0; i < 3; i ++){
        if(i == randomArr[highlightIdx].idx){
          console.log(true);
          arr.push(true);
        }else{
          arr.push(false);
        }
      }
      highlightIdx ++;
      //false 로 초기화
      let intervalArr = this.state.intervalArr;
      intervalArr.push(intervalId);
      this.setState({
        btnHighlight:arr,
        intervalArr : intervalArr,
        randomArr : randomArr,
      });
      
    }, 500);
    setTimeout(()=>{
      clearInterval(intervalId);

      //false로 초기화
      let arr = [];
      for(let i = 0; i < 3; i ++){
        arr.push(false);
      }
      this.setState({
        btnHighlight: arr,
        curOrder : 0,
      });
    },500 * (3 + 1));
  }
  clickBtn= (idx)=>{
    console.log(idx);
    if(idx == this.state.randomArr[this.state.curOrder].idx){
      this.setState({
        curOrder : this.state.curOrder + 1,
      });
      if(this.state.curOrder + 1 >= 3){
        Alert.alert("성공!");
      }
    }else{
      Alert.alert("틀렸습니다.");
    }
  }

  render() {
    let arr = [1, 2, 3];
    return (
      <>
      <Button title="start" onPress={this.startGame}></Button>
      <Button title="clearInterval" onPress={this.clearInterval}></Button>
        <View>
          {arr.map((i, j) => {
            return (<Button title={i.toString()}
              color={this.state.btnHighlight[j] ? "#123456" : "#234567"}
              onPress={()=>{this.clickBtn(j)}}></Button>);
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
