let yearlyWeightedAverages = [];
let yearWeightings = [];
let degreeClassification;
let totalWeightedAverage = 0;
let totalMedian = 0;
let totalRangeComparer = 0;
let primaryDegreeClassification;
let secondaryDegreeClassificationCalc1;
let secondaryDegreeClassificationCalc2;
let totalSecondaryDegreeClassification;


// ============== Creation and Deletion of Module Inputs ================
// adds new rows to enter modules
const addModulesButtons = document.querySelectorAll(".addModules");
for (let button of addModulesButtons) {
    button.addEventListener('click', function () {
        let parentForm = this.parentElement;
        let template = document.querySelector("#moduleInputTemplate");
        let newInput = template.content.cloneNode(true);
        let elementToAddNewInput = parentForm.querySelector(".listOfGrades");
        elementToAddNewInput.appendChild(newInput);
    })
}

// deletes rows to enter modules
const listOfGradesLists = document.querySelectorAll(".listOfGrades");
for (let lists of listOfGradesLists) {
    lists.addEventListener('click', function (evt) {
        if (evt.target.nodeName === "BUTTON") {
            evt.target.parentElement.remove()
        }
    })
}
// =====================================================================


// ================ CALCULATES AVERAGES AND DEGREE CLASSIFICATION =======
document.querySelector("#calculateButton").addEventListener('click', function () {
    let forms = document.querySelectorAll('.gradesForm');
    yearlyWeightedAverages = []
    yearWeightings = [];
    totalWeightedAverage = 0;
    let orderedWeightedGrades = [];

    // loops through each form aka each year's worth of grades
    for (let form of forms) {
        let inputs = form.querySelectorAll("input");
        let sumOfWeightingMultipliedMarks = 0;
        let totalCredits = 0;
        let currentYearWeighting = parseFloat(inputs[inputs.length - 1].value)
        yearWeightings.push(currentYearWeighting);

        // scrapes forms to obtain all input values from the forms
        for (let i = 0; i < inputs.length - 1; i = i + 2) { // input.length - 1 is used since last input is the year weighting
            sumOfWeightingMultipliedMarks = sumOfWeightingMultipliedMarks + inputs[i].value * inputs[i + 1].value;
            totalCredits = totalCredits + parseFloat(inputs[i + 1].value);
            if (currentYearWeighting !== 0) {
                for (let j = 0; j <= parseFloat(inputs[i + 1].value) * currentYearWeighting; j++) {
                    orderedWeightedGrades.push(parseFloat(inputs[i].value));
                }
            }
        }
        // appends the yearly averages and weightings to arrays
        yearlyWeightedAverages.push(sumOfWeightingMultipliedMarks / totalCredits);
    }


    // calculataing total weighted average
    let sumOfWeightings = 0;
    let sumOfyearWeightedAverages = 0;
    for (i = 0; i < yearWeightings.length; i++) {
        if (yearWeightings[i] >= 0) {
            sumOfyearWeightedAverages = sumOfyearWeightedAverages + yearWeightings[i] * yearlyWeightedAverages[i];
            sumOfWeightings = sumOfWeightings + yearWeightings[i];
        }
    }
    totalWeightedAverage = sumOfyearWeightedAverages / sumOfWeightings;

    // calculate the median grade for secondary degree classification
    orderedWeightedGrades.sort(function (a, b) { return a - b });
    totalMedian = orderedWeightedGrades[Math.round(orderedWeightedGrades.length / 2)];
    totalRangeComparer = orderedWeightedGrades[(orderedWeightedGrades.length) - Math.round(orderedWeightedGrades.length * (5 / 12))];


    calculatePrimaryDegreeClassification()
    secondaryDegreeClassificationCalc1 = calculateSecondaryDegreeClassification(totalMedian)
    secondaryDegreeClassificationCalc2 = calculateSecondaryDegreeClassification(totalRangeComparer)
    calculateFullSecondaryDegreeClassification()
    showResults()

});

// Calculates what classifiication of degree you would get based on mean
// classifications based on https://www.sheffield.ac.uk/usp/currentstudents/undergraduate/results/degreeclassification
function calculatePrimaryDegreeClassification() {
    if (totalWeightedAverage >= 69.5) {
        primaryDegreeClassification = "First"
    } else if (totalWeightedAverage >= 68) {
        primaryDegreeClassification = "Borderline First"
    } else if (totalWeightedAverage >= 59.9) {
        primaryDegreeClassification = "2.1"
    } else if (totalWeightedAverage >= 58) {
        primaryDegreeClassification = "Borderline 2.1"
    } else if (totalWeightedAverage >= 49.5) {
        primaryDegreeClassification = "2.2"
    } else if (totalWeightedAverage >= 48) {
        primaryDegreeClassification = "Borderline 2.2"
    } else if (totalWeightedAverage >= 44.5) {
        primaryDegreeClassification = "Third"
    } else if (totalWeightedAverage >= 43.5) {
        primaryDegreeClassification = "Borderline Third"
    } else if (totalWeightedAverage >= 39.5) {
        primaryDegreeClassification = "Pass"
    } else if (totalWeightedAverage >= 38.50) {
        primaryDegreeClassification = "Borderline Pass"
    } else {
        primaryDegreeClassification = "Fail"
    }
}

function calculateSecondaryDegreeClassification(numberToCheck) {
    let classification = ""
    if (numberToCheck >= 69.5) {
        classification = "First"
    } else if (numberToCheck >= 59.9) {
        classification = "2.1"
    } else if (numberToCheck >= 49.5) {
        classification = "2.2"
    } else if (numberToCheck >= 44.5) {
        classification = "Third"
    } else if (numberToCheck >= 39.5) {
        classification = "Pass"
    } else {
        classification = "Fail"
    }
    return classification;
}

function calculateFullSecondaryDegreeClassification() {
    if (secondaryDegreeClassificationCalc1 !== secondaryDegreeClassificationCalc2) {
        if (secondaryDegreeClassificationCalc1 === "First" || secondaryDegreeClassificationCalc2 === "First") {
            totalSecondaryDegreeClassification = "Borderline First"
        } else if (secondaryDegreeClassificationCalc1 === "2.1" || secondaryDegreeClassificationCalc2 === "2.1") {
            totalSecondaryDegreeClassification = "Borderline 2.1"
        } else if (secondaryDegreeClassificationCalc1 === "2.2" || secondaryDegreeClassificationCalc2 === "2.2") {
            totalSecondaryDegreeClassification = "Borderline 2.2"
        } else if (secondaryDegreeClassificationCalc1 === "Third" || secondaryDegreeClassificationCalc2 === "Third") {
            totalSecondaryDegreeClassification = "Borderline Third"
        } else if (secondaryDegreeClassificationCalc1 === "Pass" || secondaryDegreeClassificationCalc2 === "Pass") {
            totalSecondaryDegreeClassification = "Borderline Pass"
        }
    } else {
        totalSecondaryDegreeClassification = secondaryDegreeClassificationCalc1;
    }
}


// comppiles message to be shown
function showResults() {
    let message = `Year 1 Weighted Average Mean: ${yearlyWeightedAverages[0]}<br>
    Year 2 Weighted Average Mean: ${yearlyWeightedAverages[1]}<br>
    Year 3 Weighted Average Mean: ${yearlyWeightedAverages[2]}<br>
    Year 4 Weighted Average Mean: ${yearlyWeightedAverages[3]}<br>
    TOTAL WEIGHTED AVERAGE MEAN: ${totalWeightedAverage}<br>
    TOTAL WEIGHTED MEDIAN: ${totalMedian}<br>
    TOTAL WEIGHTED 5/12 FROM HIGHEST GRADE: ${totalRangeComparer}<br><br>
    PRIMARY DEGREE CLASSIFICATION: ${primaryDegreeClassification}<br>
    SECONDARY DEGREE CLASSIFICATION: ${totalSecondaryDegreeClassification}`;

    document.querySelector("#resultsOutput").innerHTML = message;
};
