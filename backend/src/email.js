import nodemailer from 'nodemailer';
import emailConfig from '../config/email.js'; 
import {notifyUsersByTime} from '../controllers/user.js'

//var datetime = new Date().toISOString().replace(/T/, '+').replace(/\..+/, '');
var datetime = '2023-12-13+07:00:00';

//email 
const send = async() => {
    const transporter = nodemailer.createTransport(emailConfig);
    let toList = [];
    let test = await notifyUsersByTime(datetime);

    test.forEach(element => {
        //console.log(element);
        let to = {
            'from': 'billy784512369@gmail.com',
            'to': 'r12725051@ntu.edu.tw',
            'subject': 'Joinable: appointment notification',
            'text': element.start_time + '\n' + element.address,
        }
        toList.push(to);
    })

    // toList.forEach(element => {
    //     console.log(element);
    // })

    toList.forEach(element => {
        transporter.sendMail(element, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Send mail');
                return info.response;
            } 
        }) 
    });
};

  
export default send;