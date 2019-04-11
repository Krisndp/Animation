import React from 'react';
import { View, Text, Animated, PanResponder } from 'react-native';

export default class Gesture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
            scale: new Animated.Value(1)
        }
    }

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onMoveShouldSetPanResponderCapture: () => true,
            onMoveShouldSetResponderCapture: () => true,
            onPanResponderGrant: (evt, getsureState) => {
                this.state.pan.setOffset({
                    x: this.state.pan.x._value,
                    y: this.state.pan.y._value,
                });
                this.state.pan.setValue({x:0, y:0});

                Animated.spring(this.state.scale, {
                    toValue: 2, friction: 3
                }).start()
            },
            onPanResponderMove: Animated.event([
                null,
                {dx: this.state.pan.x, dy: this.state.pan.y}
            ]),
            onPanResponderRelease: (evt, getsureState) => {
                {
                    this.state.pan.flattenOffset();
                    Animated.spring(
                        this.state.scale, {
                            toValue: 1, friction: 3
                        }
                    ).start();
                }
            }

        })
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <Animated.View
                    style={{
                        height: 100, width: 100, borderRadius: 50,
                        position: 'absolute', backgroundColor: 'steelblue',
                        transform: [
                            {translateX:this.state.pan.x},
                            {translateY: this.state.pan.x},
                            { scale: this.state.scale }],
                   
                }}
                {...this.panResponder.panHandlers}
                >

                </Animated.View>
            </View >
        )
    }
}