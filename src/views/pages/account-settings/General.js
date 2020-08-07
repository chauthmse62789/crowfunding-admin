import React from "react"
import {
  Button,
  Media,
  Form,
  Alert,
  FormGroup,
  Input,
  Label,
  Row,
  Col
} from "reactstrap"
import Flatpickr from "react-flatpickr";
import CallAPI from './../../../services/CallAPI';
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import { history } from './../../../history';
const token = localStorage.getItem('Token');



class General extends React.Component {
  state = {
    
    visible: false,
    aboutMe: null,
    email: null,
    address: null,
    bio: null,
    city: null,
    country: null,
    fullName: null,
    phone: null,
    postCode: null,
    state: null,
    userName: null,
    dob: new Date(),
    data: {
      name: '',
      subject: ''
    }
  }



  dismissAlert = () => {
    this.setState({
      visible: false
    })
  }
 
  getUserProfile() {
    if (!localStorage.getItem('Token')) {
      return true;
    }
    else {
      CallAPI('/api/User/UserProfile', 'GET', null, token).then(res => {
       
        this.setState({
          aboutMe: res.data.aboutMe,
          address: res.data.address,
          bio: res.data.bio,
          city: res.data.city,
          country: res.data.country,
          email: res.data.email,
          fullName: res.data.fullName,
          phone: res.data.phone,
          postCode: res.data.postCode,
          state: res.data.state,
          userName: res.data.userName,
          dob:res.data.birthday
        });



      });

    }


  };







  handleDob = date => {
  
    var datePick = new Date(date);
    var year = datePick.getFullYear();
    var month = datePick.getMonth();
    var day = datePick.getDate();

    this.setState(
      {dob:new Date(year,month,day,12,0,0,0) }
    )
  }
  componentDidMount(){
    this.getUserProfile();
  }

  handleSubmit(e) {
    e.preventDefault();
    var changePostCode = parseInt(this.state.postCode);
    CallAPI('/api/User/UpdateProfile', 'PUT',
      {
        "fullName": this.state.fullName,
        "address": this.state.address,
        "aboutMe": this.state.aboutMe,
        "bio": this.state.bio,
        "city": this.state.city,
        "postCode": changePostCode,
        "state": this.state.state,
        "country": this.state.country,
        "birthday": this.state.dob
      }
      , token).then(res => {
          this.setState({visible:true});
          window.scrollTo(0, 0);
        
          history.push('account-settings')

        
      }).catch(err=>{
        console.log(err)

      });
  }
  render() {

    return (
      <React.Fragment>
        <Media>
          <Media className="mr-1" left href="#">
            <Media
              className="rounded-circle"
              object
              src={sessionStorage.getItem('Avatar')}
              alt="User"
              height="64"
              width="64"
            />
          </Media>
          <Media className="mt-25" body>
          <Alert
                className="mb-2"
                color="success"
                isOpen={this.state.visible}
                toggle={this.dismissAlert}
              >
                <p className="mb-0">
                  Update Profile Successfully
                 
                </p>
              </Alert>
            {/* <div className="d-flex flex-sm-row flex-column justify-content-start px-0">
              <Button.Ripple
                tag="label"
                className="mr-50 cursor-pointer"
                color="primary"
                outline
              >
                Upload Photo
                <Input type="file" name="file" id="uploadImg" hidden />
              </Button.Ripple>
              <Button.Ripple color="flat-danger">Remove</Button.Ripple>
            </div>
            <p className="text-muted mt-50">
              <small>Allowed JPG, GIF or PNG. Max size of 800kB</small>
            </p> */}
          </Media>
        </Media>
        <Form className="mt-2" onSubmit={this.handleSubmit.bind(this)}>
          <Row>
          <Col sm="12">
              <FormGroup>
                <Label for="name">Username</Label>
                <Input id="userName"  disabled defaultValue={this.state.userName} onChange={e => this.setState({ userName: e.target.value })} />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="name">Full Name</Label>
                <Input id="fullName" defaultValue={this.state.fullName} onChange={e => this.setState({ fullName: e.target.value })} />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label className="d-block" for="date">
                  Date of birth
                </Label>
                <Flatpickr
                  className="form-control"
                  options={{ dateFormat: "d \\ M \\ Y " }}
                  value={new Date(this.state.dob)}
                  // defaultValue={this.state.dob}
                  onChange={date => this.handleDob(date)}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="number">Phone Number</Label>
                <Input
                  type="number"
                  name="phone"
                  id="phone"
                  disabled
                  placeholder="Phone Number"
                  defaultValue={this.state.phone}
                  onChange={e => this.setState({ phone: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id="email" disabled defaultValue={this.state.email}  onChange={e => this.setState({ email: e.target.value })}/>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="address">Address</Label>
                <Input id="address" defaultValue={this.state.address}  onChange={e => this.setState({ address: e.target.value })}/>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="city">City</Label>
                <Input id="city" defaultValue={this.state.city}  onChange={e => this.setState({ city: e.target.value })}/>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="state">State</Label>
                <Input id="state" defaultValue={this.state.state} onChange={e => this.setState({ state: e.target.value })} />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="country">Country</Label>
                <Input type="select" name="country" id="country"  onChange={e => this.setState({ country: e.target.value })} >
                 <option>Vietnam</option>
                 <option>America</option>
                 <option>Argentina</option>
                 <option>Austrilia</option>
                 <option>Austria</option>
                 <option>England</option>
                 <option>France</option>
                 <option>Greece</option>
                 <option>Thailand</option>
                 <option>Singapore</option>
                  
                </Input>
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="postCode">Postal Code</Label>
                <Input id="postCode" defaultValue={this.state.postCode} onChange={e => this.setState({ postCode: e.target.value })} />
              </FormGroup>
            </Col>
            {/* <Col sm="12">
              <Alert
                className="mb-2"
                color="warning"
                isOpen={this.state.visible}
                toggle={this.dismissAlert}
              >
                <p className="mb-0">
                  Your email is not confirmed. Please check your inbox.
                  <span className="text-primary"> Resend Confirmation</span>
                </p>
              </Alert>
            </Col> */}
           
           <Col sm="12">
              <FormGroup>
                <Label for="aboutMe">About</Label>
                <Input
                  type="textarea"
                  name="aboutMe"
                  id="aboutMe"
                  rows="3"
                  placeholder="Your about yourself data here..."
                  defaultValue={this.state.aboutMe}
                  onChange={e => this.setState({ aboutMe: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="bio">Bio</Label>
                <Input
                  type="textarea"
                  name="bio"
                  id="bio"
                  rows="3"
                  placeholder="Your bio data here..."
                  defaultValue={this.state.bio}
                  onChange={e => this.setState({ bio: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col className="d-flex justify-content-start flex-wrap" sm="12">
              <Button.Ripple className="mr-50" type="submit" color="primary">
                Save Changes
              </Button.Ripple>
              <Button.Ripple type="submit" color="danger">
                Cancel
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    )
  }
}
export default General
