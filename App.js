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

import Tile from './Components/Tile';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      btnHighlight: [],
      intervalArr: [],
      curOrder: 0,
      randomArr: [],
      tileLength: 3 * 3,
      tileType: 3,
      success: [],
    }
    this.clearInterval = this.clearInterval.bind(this);
    this.startGame = this.startGame.bind(this);

  }

  componentDidMount() {

  }
  clearInterval() {
    for (let i = 0; i < this.state.intervalArr.length; i++) {
      clearInterval(this.state.intervalArr[i]);
    }
  }
  startGame() {
    let randomArr = [];
    for (let i = 0; i < this.state.tileLength; i++) {
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
    let highlightArr = [];
    let success = [];
    //초기화
    for (let i = 0; i < this.state.tileLength; i++) {
      highlightArr.push(false);
      success.push(false);
    }
    this.setState({
      btnHighlight: highlightArr,
      success: success,
    })

    let intervalId = setInterval(() => {
      let arr = [];
      let success = [];
      if (highlightIdx >= this.state.tileLength) {
        //false로 초기화
        for (let i = 0; i < this.state.tileLength; i++) {
          arr.push(false);
          success.push(false);
        }
        this.setState({
          btnHighlight: arr,
          curOrder: 0,
          success: success,
        });
        clearInterval(intervalId);
        return;
      }
      for (let i = 0; i < this.state.tileLength; i++) {
        if (i == randomArr[highlightIdx].idx) {
          console.log(true);
          arr.push(true);
        } else {
          arr.push(false);
        }
      }
      highlightIdx++;
      //false 로 초기화
      let intervalArr = this.state.intervalArr;
      intervalArr.push(intervalId);
      this.setState({
        btnHighlight: arr,
        intervalArr: intervalArr,
        randomArr: randomArr,
      });

    }, 400);
  }
  clickBtn = (idx) => {
    console.log(idx);
    if (idx == this.state.randomArr[this.state.curOrder].idx) {
      let success = this.state.success;
      success[idx] = true;
      this.setState({
        curOrder: this.state.curOrder + 1,
        success: success,
      });

      if (this.state.curOrder + 1 >= this.state.tileLength) {
        Alert.alert("성공!");
      }
      console.log("return true");
      return true;
    }
    console.log("return false");
    return false;
  }

  render() {
    console.log(this.state.btnHighlight);
    return (
      <>
        <Button title="start" onPress={this.startGame}></Button>
        <Button title="clearInterval" onPress={this.clearInterval}></Button>
        <View style={styles.tileContainer}>
          {this.state.btnHighlight.map((i, j) => {
            return (<Tile context={j + 1} isHighlight={this.state.btnHighlight[j]}
              isSuccess={this.state.success[j]}
              type='3' onPress={() => { return this.clickBtn(j) }}
            ></Tile>);
          })}
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  tileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    aspectRatio: 1,
  },
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
