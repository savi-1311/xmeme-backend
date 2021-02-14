import logo from './logo.svg';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MemeBox from './MemeBox.js';
import { Button , Form } from 'react-bootstrap';
import axios from 'axios';
import Particles from "react-tsparticles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  var baseurl = (process.env.REACT_APP_NODE_ENV=="production")?(process.env.REACT_APP_BACKEND_URL_PROD):(process.env.REACT_APP_BACKEND_URL_DEV);
  const [memes, setMemes] = React.useState([]); // to store the array of memes returned
  const [inputs, setInputs] = React.useState({  // to store the form inputs
    "name":null,
    "url":null,
    "caption" : null
  });

// this function will get all the memes when the page loads
  React.useEffect(() => {
    getList();
  }, [])

// this function will fetch the response of the GET /meme request
  async function getList(){
    console.log(process.env.REACT_APP_NODE_ENV);
    const response =
    await axios.get(`${baseurl}/memes`)
    setMemes(response.data);
  }


// this function will fetch the response of the POST /meme request and submit the form
  async function submitform(){
    var meme=
    {
      "name": inputs.name,
      "url":inputs.url,
      "caption" : inputs.caption
    }
    const response =
    await axios.post(`${baseurl}/memes`,meme)
    if(response.status!=200)
      toast.error("Error Occured!");
    else
      toast.success("Meme Added!");
    getList();
  }


// this function will change the state of the inputs on change in input fields in the form
  const handleInputChange = (event) => {
    event.persist();
    console.log("Here we are!");
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }


// it invokes the submitform() function of submitting the form
  const handleSubmit = (event) =>{
    console.log(event);
    if (event) {
      event.preventDefault();
    }
    submitform(); 
  }




  return (
    <div className="Outer">
    
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    <ToastContainer />


    <Particles width='100vw' height="100vh"
    id="tsparticles"
    options={{
      background: {
        color: {
          value: "#000000",
        },
      },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "canvas",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
          },
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: false,
          opacity: 0.5,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outMode: "bounce",
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            value_area: 800,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          random: true,
          value: 5,
        },
      },
      detectRetina: true,
    }}
    />

    <div className="App">
    <div className="Name3">😂 Submit Your Memes! 😂</div>


    <Form className="myform" onSubmit={handleSubmit}>

    <Form.Group controlId="formBasicName">
    <Form.Label className="Name2">Your Name</Form.Label>
    <Form.Control type="text" name="name" value={inputs.name} onChange={handleInputChange} placeholder="Enter your name" />
    </Form.Group>
    <Form.Group controlId="formBasicURL">
    <Form.Label className="Name2">Meme URL</Form.Label>
    <Form.Control type="text" name="url" placeholder="Enter the image URL" value={inputs.url} onChange={handleInputChange} />
    </Form.Group>
    <Form.Group controlId="formBasicCaption">
    <Form.Label className="Name2">Caption</Form.Label>
    <Form.Control type="text" name="caption" placeholder="Enter the caption text" value={inputs.caption} onChange={handleInputChange} />
    <Form.Text className="text-muted">
    This will be the caption of your meme! Get creative.
    </Form.Text>
    </Form.Group>

    <Button variant="primary" type="submit">
    Submit
    </Button>

    </Form>


    <br></br>
    <br></br>
    {memes.map(name => (
      <MemeBox title = {name.name} url = {name.url} caption = {name.caption} />
      ))}
    </div>
    </div>
    );
}

export default App;
