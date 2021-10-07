const Course = require('../models/course.model');

//Creating the course
const createCourse = async (req, res) => {
    if( req.body){
        const course =new Course(req.body);
        await course.save()
        .then(data =>{
            res.status(200).send ({data: data});
        })
        .catch(error =>{
            res.status(500).send({ error: error.message});
        });
    }
}

//Get all courses by its name,description and amount
const getAllCourses = async( req,res) => {
    await Course.find({}).populate('subjects', 'name description amount')
    .then(data => {
        res.status(200).send({ data: data });
    })
    .catch(error => {
        res.status(500).send({ error: error.message });
    });
}

//Get subjects within its course
const getSubjectsForCourse = async (req, res) => {
    if (req.params && req.params.id) {
      await Course.findById(req.params.id)
      .populate('subjects', 'name description amount')
      .then(data => {
        res.status(200).send({ subjects: data.subjects });
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
    }
}

//Calculate the amount of selected course plus its subjects
const calculateAmount = async (req, res) => {
    if (req.params && req.params.id) {
      const course = await Course.findById(req.params.id)
      .populate('subjects', 'amount')
      let totalAmount = 0;
  
      if (course.subjects.length > 0) {
        course.subjects.map((subject) => {
          totalAmount += subject.amount;
        });
      }
      res.status(200).send({ totalAmount: totalAmount });
    }
  }

module.exports = {
    createCourse,
    getAllCourses,
    getSubjectsForCourse,
    calculateAmount
};