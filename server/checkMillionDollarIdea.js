const checkMillionDollarIdea = (req,res,next) => {
    const {numWeeks, weeklyRevenue} = req.body;
    if (isNaN(numWeeks) || isNaN(weeklyRevenue)){
        req.status(404).send('Not valid');
    }
    else{
        const revenue = numWeeks * weeklyRevenue
        if (revenue < 1000000){
            req.status(404).send('Not valid');
        }
        else{
            next();
        }
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
