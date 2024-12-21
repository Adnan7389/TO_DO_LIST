class Storage {
  static saveProjects(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

  static getProjects() {
    return JSON.parse(localStorage.getItem('projects')) || [];
  }
}

export default Storage;