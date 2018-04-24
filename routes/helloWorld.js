let index={
    method: 'GET',
    path: '/',
    handler: function(request, h){
        const response = h.response({text: 'You used a Token!'});
        return response;

    }
};
let hello={
    method: ['GET', 'POST'],
    path: '/hello/{user?}',
    handler: function (request, h) {

        return  {hello: 'world'}
    }
};
module.exports=[index,hello];