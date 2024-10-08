const sheetId = "1VO5uYyu7fdBvWgExWpQcPP2pAY_PqGc38Md_Nf1WSSE";
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;

export const loadSheetsApi = async (data: any) => {
  try {
    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyTKgVDJsxEyIxMk26CtrE5JapGxzS9GvLSUa53sH9Bsao2D2JfSqfZNsCVx3y6XTtW/exec";
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    return await fetch(scriptURL, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        console.log(response, "response");
        return response.json();
      })
      .catch((error) => {
        console.error("Error!", error.message);
        return null;
      });
  } catch (error: any) {
    console.error("Error!", error.message);
    return null;
  }
};

export const getSkillsFromSheet = async () => {
  const sheetName = "Skills";
  const query = encodeURIComponent("Select *");
  const url = `${base}sheet=${sheetName}&tq=${query}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const res = JSON.parse(text.substr(47).slice(0, -2));
    const skills = res.table.rows.map((item: any) => item.c[0].v);
    return skills;
  } catch (error: any) {
    return []; // Return an empty array in case of error
  }
};

export const getExperienceFromSheet = async () => {
  const sheetName = "Experience";
  const query = encodeURIComponent("Select *");
  const url = `${base}sheet=${sheetName}&tq=${query}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const res = JSON.parse(text.substr(47).slice(0, -2));
    let experience: any = {};
    const allExperience: any = [];
    res.table.rows.forEach((item: any, index: number) => {
      if (item && item.c && index !== 0)
        item.c.forEach((exp: any, ind: number) => {
          if (exp && exp.v) experience[ind] = exp.v;
        });
      if (Object.keys(experience).length) allExperience.push(experience);
      experience = {};
    });
    let details: any = [];
    if (allExperience.length) {
      details = allExperience.map((exp: any) => ({
        companyName: exp["0"],
        role: exp["1"],
        duration: exp["2"],
        content: exp["3"].split("\n"),
      }));
    }
    return details;
  } catch (error: any) {
    return []; // Return an empty array in case of error
  }
};

export const getInterestsFromSheet = async () => {
  const sheetName = "Interests";
  const query = encodeURIComponent("Select *");
  const url = `${base}sheet=${sheetName}&tq=${query}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const res = JSON.parse(text.substr(47).slice(0, -2));
    const Interests = res.table.rows.map((item: any) => item.c[0].v);
    return Interests;
  } catch (error: any) {
    return []; // Return an empty array in case of error
  }
};


export const getSheetData = async (sheet:string) => {
  const sheetName = sheet;
  const query = encodeURIComponent("Select *");
  const url = `${base}sheet=${sheetName}&tq=${query}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    const res = JSON.parse(text.substr(47).slice(0, -2));
    const intro = res.table.rows.map((item: any) => item.c[0].v);
    return intro[0];
  } catch (error: any) {
    return []; // Return an empty array in case of error
  }
};