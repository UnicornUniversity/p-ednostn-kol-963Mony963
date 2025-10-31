//TODO add imports if needed
//TODO doc
/**
 * The main function which calls the application. 
 * This app generates employee data and returns statistic chart data
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {object} containing the statistics
 */
export function main(dtoIn) {
  //TODO code
  //let dtoOut = exMain(dtoIn);
  const employees = generateEmployeeData(dtoIn);
  const dtoOut = getEmployeeChartContent(employees);
  return dtoOut;
}

/**
 * Function generates an array of objects with random employee data - names, surnames, genders, workloads and birthdates
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function generateEmployeeData(dtoIn) {
  //TODO code
  //let dtoOut = exGenerateEmployeeData(dtoIn);
    const dtoOut = [];

    const mNames = ["Jan", "Petr", "Tomas", "Standa", "Pavel", "Jirka", "Martin", "Michal"];
    const fNames = ["Jana", "Petra", "Lenka", "Zdena", "Pavla", "Jirina", "Martina", "Michaela"];
    const mSurnames = ["Novák", "Petrovický", "Beran", "Malý", "Velký", "Hák", "Hašek", "Kovář"];
    const fSurnames = ["Nováková", "Petrovická", "Beranová", "Malá", "Velká", "Novotná", "Levá", "Kovářová"];
    const workloads = [10, 20, 30, 40];
    const genders = ["male", "female"];

    for(let i = 0; i < dtoIn.count; i++) {
        const gender = genders[Math.floor(Math.random()*genders.length)];

        let name;
        let surname;

        if(gender === "male"){
            name = mNames[Math.floor(Math.random()*mNames.length)];
            surname = mSurnames[Math.floor(Math.random()*mSurnames.length)];
        }else{
            name = fNames[Math.floor(Math.random()*fNames.length)];
            surname = fSurnames[Math.floor(Math.random()*fSurnames.length)];
        }

        const workload = workloads[Math.floor(Math.random()*workloads.length)];
        const birthDate = generateBirthDate(dtoIn.age.min, dtoIn.age.max);

        dtoOut.push({name, surname, gender, birthDate, workload});
    }
  return dtoOut;
}

function generateBirthDate(minAge, maxAge){
    const today = new Date();
    const yearMs = 365.25*24*60*60*1000;

    const minDate = new Date(today.getTime() - (maxAge*yearMs));
    const maxDate = new Date(today.getTime() - (minAge*yearMs));

    const randomTime = minDate.getTime()+(Math.random()*(maxDate.getTime()-minDate.getTime()));
    const randomDate = new Date(randomTime);

    return randomDate.toISOString();
}

/**
 * Generate chart data showing counts of different names in each category
 * @param {Array} employees containing all the mocked employee data
 * @returns {object} frequencies of the employee names
 */
export function getEmployeeChartContent(employees) {
  //TODO code
  //let dtoOut = exgetEmployeeChartContent(employees);
  const kategorie = {
        all: {},
        male: {},
        female: {},
        femalePartTime: {},
        maleFullTime: {}
    };

    for (const emp of employees){
        const name = emp.name;
        const gender = emp.gender;
        const workload = emp.workload;

        kategorie.all[name] = kategorie.all[name] ? kategorie.all[name]+1 : 1;
        
        if(gender === "male"){
            kategorie.male[name] = kategorie.male[name] ? kategorie.male[name]+1 : 1;
            if(workload === 40){
                kategorie.maleFullTime[name] = kategorie.maleFullTime[name] ? kategorie.maleFullTime[name]+1 : 1;
            }
        }else{
            kategorie.female[name] = kategorie.female[name] ? kategorie.female[name]+1 : 1;
            if(workload <= 30){
                kategorie.femalePartTime[name] = kategorie.femalePartTime[name] ? kategorie.femalePartTime[name]+1 : 1;
            }
        }
    }

    function formatAndSortData(obj){
        const res = [];

        for(const key in obj){
            res.push({label: key, value: obj[key]});
        }

        res.sort((a,b) => b.value-a.value);

        return res;
    }

    return {
        dtoOut: {
            chartData: {
                all: formatAndSortData(kategorie.all),
                male: formatAndSortData(kategorie.male),
                female: formatAndSortData(kategorie.female),
                femalePartTime: formatAndSortData(kategorie.femalePartTime),
                maleFullTime: formatAndSortData(kategorie.maleFullTime)
            }
        }
    };
}

export { main, generateEmployeeData, generateBirthDate, getEmployeeChartContent };