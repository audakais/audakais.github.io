// Site content. To add a project, copy a { ... } block into PROJECTS.
// Optional project fields: label, page (case-study page), image, stats, demo, paper, description.

window.SITE = {
  name: "Auda Kais",
  headline: "Turning complex data into products people can use.",
  role: "Computer Science, M.Sc. · Machine learning · Data",
  city: "Rome, Italy",
  links: {
    linkedin: "https://www.linkedin.com/in/auda-kais",
    github: "https://github.com/audakais",
  },
};

window.PROJECTS = [
  {
    title: "Identification of Biomarkers from Gene Expression Data",
    label: "M.Sc. Thesis",
    year: 2026,
    stack: ["Python", "scikit-learn", "PyTorch", "PostgreSQL"],
    page: "thesis.html",
    image: "assets/thesis/shap-brca.webp",
    stats: [
      ["0.968", "pan-cancer accuracy"],
      ["6,585", "tumour samples"],
      ["8", "cancer types"],
    ],
    github: "https://github.com/audakais/thesis",
    paper: "https://github.com/audakais/thesis/blob/main/Identification%20of%20Biomarkers%20from%20Gene%20Expression%20Data.pdf",
    demo: "",
    description: "",
  },
];

// Hero visual: pan-cancer out-of-fold confusion matrix from the thesis (Fig. 4.30).
// Rows = true tumour type, columns = predicted.
window.MATRIX = {
  idle: "Pan-cancer classifier · 6,585 tumour samples · hover a cell",
  labels: ["BRCA", "KIRC", "LUAD", "LUSC", "OV", "PRAD", "STAD", "THCA"],
  rows: [
    [1236, 0, 2, 15, 5, 0, 0, 0],
    [5, 522, 3, 0, 0, 1, 1, 1],
    [9, 2, 909, 37, 0, 0, 4, 0],
    [22, 0, 65, 838, 2, 0, 0, 4],
    [3, 0, 2, 0, 544, 0, 1, 2],
    [5, 0, 0, 1, 0, 677, 0, 0],
    [0, 0, 2, 4, 3, 0, 655, 0],
    [2, 0, 4, 2, 0, 0, 0, 995],
  ],
};
