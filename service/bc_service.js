// "use strict";
// const request = require("request");
// const config = require('../config/config');
// /*const config = require('../config/config');
// const Hapi = require('hapi');
// const bc_service=Hapi.server({
//     host:config.server.host,
//     port:config.server.port
// });*/
//
// async function bc_post(options) {
//     return new Promise((resolve, reject) => {
//
//         var options = {
//             url:"http://localhost:3000/api/Cash",
//             form: {
//                 "$class": "org.decentralized.energy.network.Cash",
//                 "cashID": "222222",
//                 "currency": "22222",
//                 "value": 110,
//                 "ownerID": "22222",
//                 "ownerEntity": "Resident"
//             }
//         };
//
//         request.post(options, function(err, response, body){
//             resolve(body);
//         });
//
//     })
// }
//
// async function bc_get(options) {
//     return new Promise((resolve, reject) => {
//
//         request.post(options, function(err, response, body){
//             resolve(body);
//         });
//
//     })
// }
//
// async function bc_put(options) {
//     return new Promise((resolve, reject) => {
//
//         request.post(options, function(err, response, body){
//             resolve(body);
//         });
//
//     })
// }
//
// async function bc_delete(options) {
//     return new Promise((resolve, reject) => {
//
//         request.post(options, function(err, response, body){
//             resolve(body);
//         });
//
//     })
// }