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
const styles = StyleSheet.create({
    three: {
        flexBasis: "30%",
        color: "#ffffff",
        backgroundColor: "#1da1f2",
        height: "30%",
        display: "flex",
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 50,
    },
    four: {
        flexBasis: "40%",
    },
    highlight: {
        backgroundColor: "#3b5998",
    },
    success: {
        backgroundColor: "#3b5998",
    },
    fail: {
        backgroundColor: "#f44336",
    }
});
class Tile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnStyle: {},
            fail: false,
        };
    }
    componentDidMount() {
        if (this.props.type == '3') {
            this.setState({
                btnStyle: styles.three,
            });
        } else if (this.props.type == '4') {
            this.setState({
                btnStyle: styles.four,
            });
        }
    }
    clickBtn = () => {
        let result = this.props.onPress();
        console.log(result);
        if (result == false) {
            this.setState({
                fail: true,
            });

        }
        setTimeout(() => {
            this.setState({
                fail: false,
            })
        }, 200);
    }
    render() {
        return (
            <>
                {/* <View style={this.state.btnStyle}> */}
                <Text style={[this.state.btnStyle, this.props.isHighlight ? styles.highlight : {},
                this.props.isSuccess ? styles.success : {},
                this.state.fail ? styles.fail : {}]}
                    onPress={() => { this.clickBtn() }}>
                    {this.props.context}
                </Text>
            </>
        )
    }
}

export default Tile;