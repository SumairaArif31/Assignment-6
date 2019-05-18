module.exports=(app)=>{
    const users=require('../controller/user.controller');

    //Route for Creating New User
    app.post('/users',users.create);

    //Read all Users Route
    app.get('/users',users.selectAll);

    //Updaing Any User Route
    app.put('/users/:UserId',users.update);

    //Delete Any User Route
    app.delete('/users/:UserId',users.delete);

    

}