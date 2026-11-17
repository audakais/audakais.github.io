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
    image: "assets/thesis/pancancer-confusion.webp",
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
