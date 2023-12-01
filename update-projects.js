const fs = require('fs');
const axios = require('axios');

async function updateProjects() {
  const projects = [
    {
      name: 'url shortener',
      description: 'Description of Project 1',
      repoUrl: 'https://github.com/isaackiplangat1/url-shortener',
      liveUrl: 'https://url-shortener-5000vw.vercel.app/',
    },
    // Add more projects as needed
  ];

  const updatedData = projects.map(async (project) => {
    const { data } = await axios.get(`https://api.github.com/repos/${project.repoUrl.split('github.com/')[1]}`);
    return {
      name: project.name,
      description: project.description,
      repoUrl: project.repoUrl,
      liveUrl: project.liveUrl,
      stars: data.stargazers_count,
    };
  });

  fs.writeFileSync('projects.json', JSON.stringify(await Promise.all(updatedData), null, 2));
}

updateProjects();
