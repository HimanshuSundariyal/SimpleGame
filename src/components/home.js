import React from 'react';
import {Container, Row, Col, Alert,Button,Image  } from 'react-bootstrap';
import $ from 'jquery';
class Home extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            first_elements:[],
            second_elements:[], 
            click_count:0,
            item_value:[],
            score:0,
            error:false,
            first_look:"block",
            click_counter:0,
            game_end: false
        }
        this.myitem = React.createRef();

    }

    handelClick = (e) => {
        let value = e.target.getAttribute('key_value');
        var joined = this.state.item_value.concat(value);
        this.setState({ item_value: joined });
        this.setState({click_count: this.state.click_count+1}, function() {
        this.checkCounterValue(value);
        });
        $(e.target).find('img').show(500);
    }

    checkCounterValue = (value=false) =>{
        var item_value_length = this.state.item_value.length;
        this.setState({click_counter:this.state.click_counter+1});
        if(item_value_length===2)
        {
            if(this.state.item_value[0] == this.state.item_value[1])
            {
                this.setState({score: this.state.score+1})  
            }
            else
            {
              this.setState({error:true}) 
            }
            this.setState({ item_value:[]});
        }
        if(this.state.click_count==2)
        {
            this.setState({click_count:0})
        }

        if(this.state.click_counter==7)
        {
            this.setState({game_end:true})
        }        


    }
    reloadPage = () => {
      window.location.reload();
    }
    componentDidMount(){
        var first_array_elements = [1, 2, 3,4];
        var second_array_elements = [1, 2, 3,4];
        this.setState({first_elements: Shuffle(first_array_elements)});
        this.setState({second_elements: Shuffle(second_array_elements)});
        setTimeout(() => {
          this.setState({first_look: "none"});
        }, 1000)
    }
    render(){
            return(
                <React.Fragment> 
                  
                  <Container className="main-container">
                  {
                  this.state.error && (
                  <div id="overlay">
                    <div id="text">
                       <p>Sorry You Lost</p> 
                       <Button onClick={this.reloadPage} variant="info">Reload</Button>
                      </div>
                  </div>
                  )
                }
                {
                    this.state.game_end && (
                      <div id="overlay">
                          <div id="text">
                            <p>You Win</p> 
                            <p>You are the champion</p> 
                            <Button onClick={this.reloadPage} variant="info">Reload</Button>
                          </div>
                        </div>
                        )
              }
                    <Row>
                        <Col className="score_col">
                          <h2>Test Your Memory</h2> 
                          <p><strong>Score: </strong>{this.state.score}</p> 
                        </Col>
                    </Row>
                   
                    <Row>
                        {
                          this.state.first_elements.map(arr_items => (
                            <Col onClick={this.handelClick} key_value={arr_items} key={arr_items}><h2> Click Here </h2>
                            <Image className="item_img" style ={{display: this.state.first_look}} src={process.env.PUBLIC_URL + 'images/' +arr_items+".jpg" }/>
                            </Col>
                          ))  
                        }
                    </Row>

                    <Row>
                        {
                          this.state.second_elements.map(arr_items => (
                            <Col onClick={this.handelClick} key_value={arr_items} key={arr_items}><h2> Click Here </h2>
                            <Image style ={{display: this.state.first_look}} src={process.env.PUBLIC_URL + 'images/' +arr_items+".jpg" }/>
                            </Col>
                          ))  
                        }
                    </Row>
                  
                  </Container>
                </React.Fragment>
            );
    }
}  
function Shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
export default Home;  