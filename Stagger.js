import React from 'react';
import { View, Animated } from 'react-native';

export default class Stagger extends React.Component {
    constructor(props) {
        super(props);
        var animatiedValues = [];
        for (var i = 0; i < 1000; i++) {
            animatiedValues.push(new Animated.Value(0))
        };
        this.state = {
            animatiedValues: animatiedValues
        };
        this.stagger();
    }

    
    stagger() {
        const animations = this.state.animatiedValues.map(a => {
            return Animated.timing(a, {
                toValue: 1,
                duration: 4000,
            })
        });
        Animated.stagger(10, animations).start();
    }

    render() {
        const animatedViews = this.state.animatiedValues.map((a, index) => {
            return (
                <Animated.View
                    key={index}
                    style={{ height: 20, width: 20, borderRadius:10 ,backgroundColor: index %2 == 0 ? 'blue' : 'green', margin: 2, opacity: a }}
                >
                </Animated.View>
            )
        })
        return (
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap',}}>
                {animatedViews}
            </View>

        )
    }
}

