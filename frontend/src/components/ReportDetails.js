import React, { Component } from 'react';
import axios from 'axios';

import jsPDF from 'jspdf';

export default class ReportDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            lab:{}
        };
    }

 

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`/lab/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    lab:res.data.lab
                });

                console.log(this.state.lab);
                
            }
        });
    }

    //jsPDF generator function
    jsPDFGenerator = () =>{
       //const id = this.props.match.params.id;
        //const name = this.props.match.params.name;
        //const name = this.props.match.params.name;
        const {name,nic,age,sex,type,result,date,status} = this.state.lab;
        
        //new document in jspdf
        var doc = new jsPDF('p','pt');

        //add some text to pdf

        //doc.addImage("/img/sakura_logo.png", "PNG", 15,40,180,180)
       
        doc.text(200,40,`${type}   Report`)

        doc.text(100,120,'Name')
        doc.text(100,140,'NIC')
        doc.text(100,160,'Age')
        doc.text(100,180,'Sex')
        doc.text(100,200,'Test Type')
        doc.text(100,220,'Result')
        doc.text(100,240,'Date')
        doc.text(100,260,'Status')

        doc.text(300,120,name)
        doc.text(300,140,nic)
        doc.text(300,160,age)
        doc.text(300,180,sex)
        doc.text(300,200,type)
        doc.text(300,220,result)
        doc.text(300,240,date)
        doc.text(300,260,status)

        //set the font for pdf
        doc.setFont('courier');
        doc.setFontSize(10);

        //set the font type
        //doc.setFontType('normal')

        doc.text(150,400,'Tested by SAKURA Hospital Laboratory');

        //Save the pdf
        doc.save(`${nic}.pdf`)

    }


    
    render() {

        const {name,nic,age,sex,type,result,date,status} = this.state.lab;

        return (
            <div style={{marginTop:'30px'}}>
                <link type="text/css" rel="stylesheet" href="../css/labstyle.css" />
          
            <h4 className="reportH4">{name}'s {type} Report</h4>
            <hr/>

            <dl className="row">
                <dt className="col-sm-3">NIC</dt>
                <dd className="col-sm-9">{nic}</dd>

                <dt className="col-sm-3">Age</dt>
                <dd className="col-sm-9">{age}</dd>

                <dt className="col-sm-3">Sex</dt>
                <dd className="col-sm-9">{sex}</dd>

                <dt className="col-sm-3">Type</dt>
                <dd className="col-sm-9">{type}</dd>

                <dt className="col-sm-3">Result</dt>
                <dd className="col-sm-9">{result}</dd>

                <dt className="col-sm-3">Date</dt>
                <dd className="col-sm-9">{date}</dd>

                <dt className="col-sm-3">Status</dt>
                <dd className="col-sm-9">{status}</dd>

            </dl>

          
            <a className="btn btn-success btn-lg btn-block" href="#" onClick={this.jsPDFGenerator}>
                      <i className="fas fa-cogs"></i>&nbsp;Generate Report
                    </a>

                    <hr/>
                
            </div>
            
            
        );
    }
}