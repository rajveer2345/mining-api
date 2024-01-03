const { request } = require('express');
const lease = require('../schema/leaseSchema');
//const bcrypt = require("bcrypt");
//const jwt = require('jsonwebtoken');
//const notification = require('../notification/email');
// exports.login = async(req, res) => {
//     try {

//         console.log(req.body);
//         const salt = await bcrypt.genSalt(10);
//         //req.body.password = await bcrypt.hash(req.body.password, salt);
//         const userData = await user.findOne({ email: req.body.email });


//         if (!userData) {
//             res.json({ message: "User not found" });
//             return;
//         }

//         const passwordMatch = await bcrypt.compare(req.body.password, userData.password);

//         if (passwordMatch) {

//             const apptoken = jwt.sign({ userId: userData.id }, 'xxxxxxxxxxxxxxx', { expiresIn: '1h' });


//             res.json({ message: "success", data: userData, token: apptoken }); //jsonwebtoken
//         } else {
//             res.json({ message: "Username or password don't match" });
//         }
//     } catch (err) {
//         res.status(500).json(err)

//     }
// };

// exports.add = async(req, res) => {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         req.body.password = await bcrypt.hash(req.body.password, salt)
//         const userData = new user(req.body);
//         await userData.save();
//         let addressArray = [];
//         addressArray.push(req.body.email);
//         addressArray.push("artikabra001@gmail.com");
//         console.log(addressArray);

//         notification.main(addressArray).catch(console.error);

//         res.json({ message: "user added successfully", data: userData });
//     } catch (err) {
//         res.status(500).json(err)
//     }
// };
exports.add = async(req, res) => {
    try {
        const userData = new lease(req.body);
        await userData.save();       
        res.json({ message: "lease added successfully", data: userData });
    } catch (err) {
        res.status(500).json(err)
    }
};

exports.addMany = async(req, res) => {
    try {
        await lease.insertMany(req.body);     
        res.json({ message: "leases added successfully" });
    } catch (err) {
        res.status(500).json(err)
    }
};
exports.getAll = async(req, res) => {
    try {
        let data = await lease.find()    
        res.json(data);
    } catch (err) {
        res.status(500).json(err)
    }
};
// exports.get = async(req, res) => {

//     try {

//         let userData = {name: "rajveer"}

//         res.json(userData);
//     } catch (error) {
//         console.log(error);
//         if (!error.status) {
//             error.status = 500;
//         }

//         res.status(error.status).json({ message: error.message });
//     }

// }

exports.search = async (req, res) => {
    const filters = req.query;
    if (filters.startDate) {
        filters.validity = { $gte: new Date(filters.startDate) };
        delete filters.startDate;
      }
  
      if (filters.endDate) {
        filters.validity = { ...filters.validity, $lte: new Date(filters.endDate) };
        delete filters.endDate;
      }
  try {
    console.log(filters)
    //const leases = await lease.find(filters);
    const leases = await lease.find(filters);
      
    res.json(leases);
  } catch (err) {
    console.error('Error searching leases:', err.message);
    res.status(500).send('Server Error');
  }
}

// exports.getById = async(req, res) => {
//     try {
//         const data = await user.findById(req.params.id)
//         res.json({ data: data })
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }
// exports.edit = async(req, res) => {
//     try {
//         const userData = await user.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
//         res.json({ message: 'updated successfully', data: userData });
//     } catch (err) {
//         res.status(500).json(err)
//     }
// }
// exports.delete = async(req, res) => {

//     const userData = await user.findByIdAndDelete(req.params.id);
//     try {
//         if (!userData) {
//             res.status(400).json({ message: "user not found." });
//         }
//         res.status(200).json({ message: 'user deleted successfully' });
//     } catch (err) {
//         res.status(500).json(err)
//     }


// }