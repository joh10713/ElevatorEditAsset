//This widget is unfinished.

import React, { Component } from "react";
import { Button, Panel, Form, FormGroup, FormControl, ControlLabel, Radio, Col } from "react-bootstrap";
import "./App.css";

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      dict: [{
        "file": null,
        "description": "",
        "isPrimary": false,
      }],
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleClick() {
    var dict = this.state.dict.concat([{"file": null, "isPrimary": false}]);
    this.props.getState(this.props.fieldTitle, dict);
    this.setState ({
      dict: dict,
    });
  }//handleClick for the plus buttons

  handleBlur(event) {
    event.preventDefault();
    var upload = [...Array(this.state.upload.length)].map((x,i) => this.refs[i].value);
    this.props.getState(this.props.fieldTitle, upload);
    this.setState ({
      upload: upload,
    });
  }

  componentDidMount() {
    this.props.getState(this.props.data.fieldTitle, this.state.dict);
  }

  render() {
    var handleBlur = function(i, name, event) {
      var dict= this.state.dict;
      if(name === 'file')
      {
        dict[i].file=event.target.value;
      }
      else {
        dict[i].description=event.target.value;
      }
      this.setState ({
        dict: dict,
      })
      this.props.getState(this.props.data.fieldTitle, dict);
    }

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

                  <Form inline>
                    <FormGroup>
                      <ControlLabel>Upload a File: </ControlLabel>
                      <FormControl className='formcontrol' type="text" ref={i} placeholder="Upload" onBlur={handleBlur.bind(this, i, "file")}/>
                    </FormGroup><br/>

                    <FormGroup>
                      <ControlLabel>Description </ControlLabel>
                      <FormControl className='formcontrol' type="text" ref={i} placeholder={this.props.data.label} onBlur={handleBlur.bind(this, i, "description")}/>
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

export default Upload;

//Created by Beau Johnsrud
