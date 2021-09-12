import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default class CreateReport extends Component {

   constructor(props){
        super(props);
        this.state={
            name:"",
            nic:"",
            age:"",
            sex:"",
            type:"",
            result:"",
            date:"",
            status:""
        }
    }

    handleInputChange = (e) =>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit = (e) =>{

        e.preventDefault();

        const {name,nic,age,sex,type,result,date,status} = this.state;

        const data = {
            name:name,
            nic:nic,
            age:age,
            sex:sex,
            type:type,
            result:result,
            date:date,
            status:status
        }

        console.log(data);

        axios.post("/lab/save",data).then((res) =>{
            if(res.data.success){
              //alert("Report Added Successfully !!")
              Swal.fire(
                'Added !!',
                'Report Added Successfully !!',
                'success'
              )

                this.setState(
                    {
                        name:"",
                         nic:"",
                         age:"",
                         sex:"",
                        type:"",
                         result:"",
                         date:"",
                        status:""
                    }
                )
            }
        })

    }

    render() {
        return (
            <div>
              
	<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />



	<link type="text/css" rel="stylesheet" href="css/labstyle.css" />
              <div id="lab" class="section">
		<div class="section-center">
			<div class="container">
				<div class="row">
					<div class="lab-form">
						<div class="form-header">
							<h1>Create Report</h1>
						</div>
						<form>
           
              <form className="need-validation" noValidate>
  <div class="mb-3">
    <label for="name" class="form-label">Patient Name</label>
    <input type="text" class="form-control" name="name" required
     value={this.state.name} onChange={this.handleInputChange} 
     placeholder="Enter Patient Name"
    /> 
  </div>
  <div class="mb-3">
    <label for="nic" class="form-label">NIC</label>
    <input type="text" class="form-control" name="nic" required
     value={this.state.nic} onChange={this.handleInputChange} 
     placeholder="Enter Patient NIC"
    /> 
  </div>

  <div class="mb-3">
    <label for="age" class="form-label">Age</label>
    <input type="number" class="form-control" name="age" required
     value={this.state.age} onChange={this.handleInputChange} 
     placeholder="Enter Patient Age"
    /> 
  </div>

  <span class="form-label">Sex</span>
  <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="sex" id="male" required
  value="Male" onChange={this.handleInputChange}
  />
  <label class="form-check-label" for="male">
    Male
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="sex" id="female" 
  value="Female" onChange={this.handleInputChange}
  />
  <label class="form-check-label" for="female">
    Female
  </label>
</div>

  <div class="mb-3">
    <label for="type" class="form-label">Type</label>
    <input type="text" class="form-control" name="type" required
     value={this.state.type} onChange={this.handleInputChange} 
     placeholder="Enter Test Type"

    /> 
  </div>

  <div class="mb-3">
    <label for="result" class="form-label">Result</label>
    <input type="text" class="form-control" name="result" required
     value={this.state.result} onChange={this.handleInputChange} 
     placeholder="Enter Result(Metrics)"
    /> 
  </div>

  <div class="mb-3">
    <label for="date" class="form-label">Date</label>
    <input type="date" class="form-control" name="date" required
     value={this.state.date} onChange={this.handleInputChange} 
     placeholder="Enter Date"
    />
  </div>

  <span class="form-label">Status</span>
  <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="status" id="good" required
   value="Good" onChange={this.handleInputChange}
  />
  <label class="form-check-label" for="good">
    Good
  </label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="status" id="bad"
  value="Bad" onChange={this.handleInputChange}
  />
  <label class="form-check-label" for="bad">
    Bad
  </label>
</div>

<div>
<button className="submit-btn" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
    <i className="far fa-check-squar"></i>
    &nbsp; Save
</button>
</div>

</form>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>



            </div>
            
        );
    }
}