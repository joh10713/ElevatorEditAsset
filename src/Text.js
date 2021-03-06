import React, { Component } from "react";
import { Button, Panel, Form, FormGroup, FormControl, ControlLabel, Radio, Col } from "react-bootstrap";
import "./App.css";

class Text extends Component {

  constructor(props) {
    super(props);
    if(props.fillIn)
    {
      this.state = {
        dict: props.fillIn,
      }
    }
    else {
      this.state = {
        dict: [{ "fieldContents" : "",
                 "isPrimary": false,
        }],
      }
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    var dict = this.state.dict.concat([{"fieldContents": "", "isPrimary": false,}]);
    this.props.getState(this.props.data.fieldTitle, dict);

    this.setState ({
      dict: dict,
    });
  }//handleClick for the plus buttons

  componentDidMount() {
    this.props.getState(this.props.data.fieldTitle, this.state.dict);
  }

  render() {
    var handleBlur = function(i, event) {
      var dict= this.state.dict;
      dict[i].fieldContents=event.target.value;
      this.setState ({
        dict: dict,
      })
      this.props.getState(this.props.data.fieldTitle, dict);
    }//updates state when text field blurs

    var handleChange = function(i) {
      var dict = this.state.dict;
      for(var j=0; j<dict.length; j++)
      {
        dict[j].isPrimary = false;
      }
      if(!this.state.dict[i].isPrimary)
      {
        dict[i].isPrimary = true;
      }
      this.setState ({
        dict: dict,
      });
      this.props.getState(this.props.data.fieldTitle, dict);
    }//updates when isPrimary needs to be changed

    var header = (<div>{this.props.data.label}{(this.props.data.tooltip !== "") ? " : " + this.props.data.tooltip : ""}<div className="plusButton">{(this.props.data.allowMultiple) && <Button style={{position: "relative", top: "-25px"}} onClick={this.handleClick}>+</Button>}</div></div>);
    var footer = (<div className="plusButton">{(this.props.data.allowMultiple) && <Button onClick={this.handleClick}>+</Button>}</div>);

    return (<Panel header={header} footer={footer}>
              {[...Array(this.state.dict.length)].map((x, i) =>
                <Col xsOffset={1} xs={11} className="elevatorElement" key={i}>
                  <Form inline onSubmit={(event) => event.preventDefault() }>
                    <FormGroup>
                      <ControlLabel>{this.props.data.label}</ControlLabel>
                      <FormControl className='formcontrol' type="text" defaultValue={this.state.dict[i].fieldContents}  onBlur={handleBlur.bind(this,i)} placeholder={this.props.data.label} />
                    </FormGroup>
                  </Form>

                  {(this.state.dict.length > 1) &&
                  (<FormGroup>
                    <Radio inline onChange={handleChange.bind(this, i)} checked={this.state.dict[i].isPrimary}>
                      <p>Primary Entry</p></Radio>
                  </FormGroup>)}
                </Col>
      				)}
            </Panel>
    );
  }
}

export default Text;

//Created by Beau Johnsrud
