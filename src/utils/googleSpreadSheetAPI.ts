/**
 * Contact form submission only.
 * All portfolio content (experience, projects, skills, etc.) lives in src/utils/*.ts
 */
export const loadSheetsApi = async (data: Record<string, string>) => {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyTKgVDJsxEyIxMk26CtrE5JapGxzS9GvLSUa53sH9Bsao2D2JfSqfZNsCVx3y6XTtW/exec";

  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const response = await fetch(scriptURL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Form submission failed (${response.status})`);
  }

  return response.json();
};
