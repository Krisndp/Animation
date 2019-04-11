import React from 'react';
import {View, TouchableOpacity, Text, Animated, Easing, Image} from 'react-native';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fade: new Animated.Value(0),
      fade1: new Animated.Value(0),
      fade2: new Animated.Value(0),
    }
  }
  //Di chuyen
  fadeAnimation = () => {
    Animated.timing(this.state.fade1, {
      toValue: 300,
      duration: 3000,
      easing: Easing.back(),
    }).start(()=>{
      Animated.timing(this.state.fade1,{
        toValue: 0,
        duration: 3000,
        easing: Easing.cubic,
      }).start(()=>this.fadeAnimation())
    });
  }
  // Zoom
  springAnimation = () => {
    Animated.spring(this.state.fade2, {
      toValue:1,
      friction:1
    }).start(()=> 
    Animated.spring(this.state.fade2, {
      toValue:0,
      friction:1
    }).start(()=> this.springAnimation()));
  }
  // Xoay 360deg
  rotareAnimation = () => {
    Animated.sequence([
      Animated.timing(this.state.fade, {
        toValue:100,
        duration:3000,
        //friction:1,
        easing: Easing.linear,
      }),
      Animated.timing(this.state.fade,{
        toValue:0,
        duration:0,
        //friction:1
      })
    ]).start(()=>this.rotareAnimation())
  }

  moveAndRotate = () => {
    Animated.parallel([
      this.fadeAnimation(),
      this.springAnimation(),
      this.rotareAnimation()
    ])
  }

  render(){
    const interpolatedRotateAnimation = this.state.fade.interpolate({
      inputRange: [0,100],
      outputRange: ['0deg', '360deg'],
    })
    return(
      <View style = {{flex:1, backgroundColor:'green', justifyContent:'center', alignItems:'center'}}>
          <Animated.Image 
          source = {{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvNBH_OsEJcrVx3iQtskK9t42fb95ixHlhTbIocxxZATKRTvktEw"}}
          style={{margin:10,width:100, height: 100, backgroundColor:'yellow', alignSelf: 'center',
            //transform: [{scale: this.state.fade2, }],
            left: this.state.fade1, 
            transform: [{rotate: interpolatedRotateAnimation}, {scale: this.state.fade2, }]
            }}>

          </Animated.Image>
          <TouchableOpacity onPress={()=>this.moveAndRotate()} style ={{backgroundColor:'blue', justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white', fontSize:15, textTransform:'capitalize', margin:10}}>animation</Text>
          </TouchableOpacity>
      </View>
    )
  }
}