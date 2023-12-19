import nodemailer from 'nodemailer';
import emailConfig from '../config/email.js'; 
import {notifyUsersByTime} from '../controllers/user.js'

//var datetime = new Date().toISOString().replace(/T/, '+').replace(/\..+/, '');
var datetime = '2023-12-13+07:00:00';

//email 
const send = async() => {
    const transporter = nodemailer.createTransport(emailConfig);
    let toList = [];
    let mailer = await notifyUsersByTime(datetime);
    //console.log(test);

    mailer.forEach(element => {
        //console.log(element);
        let to = {
            'from': 'timmy0823777@gmail.com',
            'to': element.email,
            'subject': 'Joinable: appointment notification',
            'text': `${element.name} 你好：

感謝你使用我們的球場系統！我們提醒您，您今天有球場預約：
                        
    時間：${element.start_time}
    地點：${element.location}  ${element.court_name}
    地址：${element.address}
                        
祝您玩得開心！
By Joinable 揪你Ball`
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