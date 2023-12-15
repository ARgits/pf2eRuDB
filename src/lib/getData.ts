let importData = { readyData: {} };
const { conditions } = await import("../lib/constants");

if (import.meta.env.PROD) {
  // console.log("prod");
  const modules = import.meta.glob("../data/prod/*.ts");
  for (const path in modules) {
    const module = (await modules[path]()) as {};
    // console.log(module);
    importData.readyData = { ...importData.readyData, ...module };
  }
} else {
  importData = await import("../data/dev/prepareData");
}

export const data: {} = importData.readyData;
export const allDataArr: any[] = [
  ...(Object.values(data).reduce((prev: any[], curr: any[]) => {
    if (curr[0]?.id) return [...prev, ...curr];
    else return prev;
  }, []) as any[]),
  ...conditions,
];
