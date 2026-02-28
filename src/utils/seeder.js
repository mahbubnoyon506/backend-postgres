require('dotenv').config();
const { Institute, Student, Course, Result, sequelize } = require('../models');

const seedData = async () => {
    try {
        // Clear existing data (use with caution!)
        await sequelize.sync({ force: true });

        // Get count from ENV or default to 1000
        const count = parseInt(process.env.SEED_COUNT) || 1000;

        console.log(`⏳ Starting Seeder: Generating ${count} records per table...`);

        // Seed Courses
        const courseData = [];
        for (let i = 1; i <= count; i++) {
            courseData.push({ title: `Course_${i}`, code: `C-${i}` });
        }
        await Course.bulkCreate(courseData, { chunk: 5000 });
        const allCourses = await Course.findAll({ attributes: ['id'], limit: count });

        // Seed Institutes
        const instituteData = [];
        for (let i = 1; i <= count; i++) {
            instituteData.push({ name: `Institute_${i}`, location: `City_${i}` });
        }
        const allInstitutes = await Institute.bulkCreate(instituteData, { chunk: 5000, returning: ['id'] });

        // Seed Students
        const studentData = [];
        for (let i = 1; i <= count; i++) {
            studentData.push({
                name: `Student_${i}`,
                email: `student${i}@kicks.com`,
                instituteId: allInstitutes[i - 1].id
            });
        }
        const allStudents = await Student.bulkCreate(studentData, { chunk: 5000, returning: ['id'] });

        // Seed Results
        const resultData = [];
        for (let i = 0; i < count; i++) {
            resultData.push({
                studentId: allStudents[i].id,
                courseId: allCourses[i].id,
                grade: (Math.random() * (4.0 - 2.0) + 2.0).toFixed(2),
                semester: 'Spring 2026'
            });
        }
        await Result.bulkCreate(resultData, { chunk: 5000 });

        console.log(`Success! Generated ${count * 4} total records.`);
        process.exit();
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seedData();