function createCourses() {

    const count = Number(document.getElementById("courseCount").value);
    const courses = document.getElementById("courses");

    courses.innerHTML = "";

    if (count <= 0 || isNaN(count)) {
        alert("Please enter a valid number of courses.");
        return;
    }

    for (let i = 1; i <= count; i++) {

        courses.innerHTML += `
            <div class="course">

                <div class="course-title">
                    Course ${i}
                </div>

                <input 
                    type="text" 
                    class="courseName"
                    placeholder="Course name"
                >

                <select class="grade">
                    <option value="">Grade</option>
                    <option value="10">A+</option>
                    <option value="9">A</option>
                    <option value="8">B+</option>
                    <option value="7">B</option>
                    <option value="6">C</option>
                    <option value="5">D</option>
                    <option value="0">F</option>
                </select>

                <input 
                    type="number"
                    class="credit"
                    placeholder="Credit hours"
                    min="1"
                >

            </div>
        `;
    }

    document.getElementById("calculateBtn").style.display = "block";
}


function calculateGPA() {

    const grades = document.querySelectorAll(".grade");
    const credits = document.querySelectorAll(".credit");
    const names = document.querySelectorAll(".courseName");

    let totalCredits = 0;
    let totalPoints = 0;

    let courseResults = "";

    for (let i = 0; i < grades.length; i++) {

        const grade = Number(grades[i].value);
        const credit = Number(credits[i].value);

        if (grades[i].value === "" || credit <= 0) {
            alert(`Please enter valid details for Course ${i + 1}.`);
            return;
        }

        const gradePoints = grade * credit;

        totalCredits += credit;
        totalPoints += gradePoints;

        const courseName =
            names[i].value.trim() || `Course ${i + 1}`;

        courseResults += `
            <div class="course-result">
                <strong>${courseName}</strong>
                <br>
                Grade Points: ${grade}
                | Credits: ${credit}
                | Points: ${gradePoints}
            </div>
        `;
    }

    const gpa = totalPoints / totalCredits;

    document.getElementById("totalCredits").textContent =
        totalCredits.toFixed(2);

    document.getElementById("totalPoints").textContent =
        totalPoints.toFixed(2);

    document.getElementById("gpa").textContent =
        gpa.toFixed(2);

    /*
       For a single semester:
       CGPA = GPA

       For multiple semesters, CGPA should be calculated using:
       Total grade points of all semesters /
       Total credits of all semesters
    */
    document.getElementById("cgpa").textContent =
        gpa.toFixed(2);

    document.getElementById("courseResults").innerHTML =
        courseResults;

    document.getElementById("result").style.display =
        "block";
}