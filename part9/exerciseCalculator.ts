interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
}


export const exerciseCalculator = (week: Array<number>, target: number): Result => {

    const nrDays = week.length;
    const average = week.reduce((acc, cur) => acc + cur, 0) / nrDays;


    const result: Result = {
        periodLength: nrDays,
        trainingDays: week.filter(x => x > 0).length,
        success: average >= target,
        rating: 2,
        ratingDescription : 'not too bad but could be better',
        target,
        average,
    };

    return result;
};

// process.argv.splice(0,2);
// const targetParam = Number(process.argv[0]);
// const weekParam: Array<number> = process.argv.splice(1).map(Number);

// console.log(targetParam, weekParam);
// console.log(exerciseCalculator(weekParam, targetParam));

