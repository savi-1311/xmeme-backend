import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function MemeBox(props){
  return (
  	<div className="MemeBox">
  	<div className="Name">Name : {props.title} </div>
  	<img src={props.url}></img>
  	<div className="Name">Caption : {props.caption}</div>
  	</div>
    
  );
}

export default MemeBox;

