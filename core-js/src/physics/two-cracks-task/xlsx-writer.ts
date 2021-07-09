const XLSXChart = require ("xlsx-chart");

export function writeResultsMapToXslx(resultsMap: Map<number, number>): Promise<void> {
   return new Promise<void>((resolve, reject) => {
      const xlsxChart = new XLSXChart ();
      const chartTitle = "σ22";
      const opts = {
         file: "result.xlsx",
         chart: "line",
         titles: [ chartTitle ],
         fields: [],
         data: {
            [chartTitle]: {}
         }
      };
   
      resultsMap.forEach((sigma22: number, x: number) => {
         opts.fields.push(x);
         opts.data[chartTitle][x] = sigma22;
      });
   
      xlsxChart.writeFile (opts, function (err) {
         if(err) {
            reject(err);
         } else {
            resolve();
         }
      });
   });
}
