const express = require('express');
const carsAvaiable = require('../lib/carsrent');

const router = express.Router();

// Get the path for the id, name, image and price but not for the rented
function returnAvaialableCars(){
    return carsAvaiable.filter(car => car.rented === false);
}
router.get('/',(req,res)=>{
    res.json(returnAvaialableCars());
});

router.post('/bookcar',(req,res)=>{
    res.redirect(303, '/');
});

module.exports = router;