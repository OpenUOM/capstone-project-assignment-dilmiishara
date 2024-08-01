const dbConnection = require("./sqlite");

let _db;

dbConnection
    .getDbConnection()
    .then((db) => {
        _db = db;
    })
    .catch((err) => {
        console.log(err);
        throw err;
    });

const addTeacher = async (id, name, age) => {
    const sql = `INSERT INTO teacher(id,name,age) values (?, ?, ?)`;
    return new Promise((resolve, reject) => {
        _db.run(sql, [id, name, age], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({status: "Successfully inserted Teacher"});
            }
        });
    });
}

const readTeachers = async () => {
    const sql = `SELECT * FROM teacher`;
    return new Promise((resolve, reject) => {
        _db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

const readTeacherInfo = async (id) => {
    const sql = `SELECT * FROM teacher WHERE id = ?`;
    return new Promise((resolve, reject) => {
        _db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

const updateTeacher = async (name, age, id) => {
    const sql = `UPDATE teacher SET name=?, age=? WHERE id=?`;
    return new Promise((resolve, reject) => {
        _db.run(sql, [name, age, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({status: "Successfully updated Teacher"});
            }
        });
    });
}

const deleteTeacher = async (id) => {
    const sql = `DELETE FROM teacher WHERE id = ?`;
    return new Promise((resolve, reject) => {
        _db.run(sql, [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({status: "Successfully deleted Teacher"});
            }
        });
    });
}

const readStudents = async () => {
    const sql = `SELECT * FROM student`;
    return new Promise((resolve, reject) => {
        _db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

const readStudentInfo = async (id) => {
    const sql = `SELECT * FROM student WHERE id= ?`;
    return new Promise((resolve, reject) => {
        _db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

const addStudent = async (id, name, age, religion) => {
    const sql = `INSERT INTO student(id, name, age, religion) values(?,?,?,?)`;
    return new Promise((resolve, reject) => {
        _db.run(sql, [id, name, age, religion], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({status: "Successfully inserted Student"});
            }
        });
    });
}

const updateStudent = async (name, age, religion, id) => {
    const sql = `UPDATE student SET name=?, age=?, religion=? WHERE id=?`;
    return new Promise((resolve, reject) => {
        _db.run(sql, [name, age, religion, id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({status: "Successfully updated Student"});
            }
        });
    });
}

const deleteStudent = async (id) => {
    const sql = `DELETE FROM student WHERE id =?`;
    return new Promise((resolve, reject) => {
        _db.run(sql, [id], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve({status: "Successfully deleted Student"});
            }
        });
    });
}

module.exports = {
    readTeachers,
    readStudents,
    addStudent,
    addTeacher,
    deleteTeacher,
    deleteStudent,
    readStudentInfo,
    readTeacherInfo,
    updateStudent,
    updateTeacher
};
