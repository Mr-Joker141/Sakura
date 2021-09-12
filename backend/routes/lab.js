const express = require('express');
const lab = require('../models/lab');
const Lab = require('../models/lab');

const router = express.Router();

//Save Lab reports

router.post('/lab/save',(req,res)=>{

    let newLab = new Lab(req.body);

    newLab.save((err) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success: "Lab result saved successfully !!"
        });
    });

});

//get lab report
router.get('/lab',(req,res)=>{
    Lab.find().exec((err,lab) =>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success: true,
            existingLab: lab
        });
    });
});

//get a specific report

router.get("/lab/:id",(req,res)=>{
    
    let reportId = req.params.id;

    Lab.findById(reportId,(err,lab) =>{
        if(err){
            return res.status(400).json({success:false, err})
        }

        return res.status(200).json({
            success: true,
            lab
        
        });
    });
});



//update lab report
router.put('/lab/update/:id',(req,res)=>{
    Lab.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        (err,lab)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Updated Succesfully"
            });
            
        }
    );
});

//delete lab report

router.delete('/lab/delete/:id',(req,res) =>{
    Lab.findByIdAndRemove(req.params.id).exec((err,deletedLab) =>{
        if(err) return res.status(400).json({
                message: "Delete Unsuccesful !!",err
            });
            return res.json({
                message: "Deleted !!",deletedLab
            });
        
    });
});

module.exports = router;
