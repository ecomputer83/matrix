import React from "react";
import { StyleSheet, FlatList, Dimensions} from "react-native";
import { Block, theme, Text, Button } from "galio-framework";
import { white } from "color-name";
import {PriceCard } from "../components";
import {DailyPrices, nowTheme} from "../constants";

const { width, height } = Dimensions.get("screen");
const ratio = width / height;
class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      DailyPrices: DailyPrices
    }
    
  }
  renderPrices = () => {
    return (<Block>
    <FlatList data={this.state.DailyPrices} keyExtractor={item => item.Id.toString()} extraData={this.state} ListHeaderComponent={null} renderItem={({item}) => {
      return <PriceCard Key={item.Product} Value={item.Price} />
    }}/></Block>)
  }
  renderButtons = () => {
    const { navigation } = this.props;
    return (
      <Block row style={{marginTop: 10}}>
                <Button
                  shadowless
                  style={styles.loginbutton}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    Login
                  </Text>
                </Button>
                <Button
                  shadowless
                  style={styles.registerbutton}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() => navigation.navigate('Home')}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    Create Account
                  </Text>
                </Button>
                </Block>
    );
  }
  componentDidMount(){
  }

  render() {
    return (<Block>
        <Text style={{ fontFamily: 'montserrat-bold', fontSize: 16, padding: 10 }} color={theme.COLORS.DEFAULT}>
            DAILY PRICE
        </Text>
      {this.renderPrices()}
      {this.renderButtons()}
    </Block>);
  }
}

const styles = StyleSheet.create({
  loginbutton: {
    width: (width /2) - 7.5,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginRight: 5,
    marginLeft: 5
  },

  registerbutton: {
    width: (width /2) - 7.5,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  }
});

export default Home;
