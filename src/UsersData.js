const teamMembers = [
  {
    id: 1,
    name: "Dustin",
    email: "dustin@timetoprogram.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    tasks: { pending: 0, inProgress: 2, completed: 1 },
    taskPer: { high: 2, low: 3, medium: 5 },
    taskList: [
      { id: 101, title: "Implement login page", status: "inProgress", priority: "high", createdAt: "2023-05-15" },
      { id: 102, title: "Fix header styling", status: "inProgress", priority: "medium", createdAt: "2023-05-18" },
      { id: 103, title: "Database optimization", status: "completed", priority: "high", createdAt: "2023-05-10" }
    ]
  },
  {
    id: 2,
    name: "John Paul",
    email: "john@timetoprogram.com",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    tasks: { pending: 0, inProgress: 2, completed: 2 },
    taskPer: { high: 2, low: 3, medium: 5 },
    taskList: [
      { id: 201, title: "API documentation", status: "inProgress", priority: "medium", createdAt: "2023-05-16" },
      { id: 202, title: "User profile page", status: "inProgress", priority: "high", createdAt: "2023-05-17" },
      { id: 203, title: "Setup CI/CD pipeline", status: "completed", priority: "high", createdAt: "2023-05-08" },
      { id: 204, title: "Write unit tests", status: "completed", priority: "medium", createdAt: "2023-05-12" }
    ]
  },
  {
    id: 3,
    name: "Mary Jane",
    email: "mary@timetoprogram.com",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    tasks: { pending: 3, inProgress: 0, completed: 0 },
    taskPer: { high: 2, low: 3, medium: 5 },
    taskList: [
      { id: 301, title: "Research new frameworks", status: "pending", priority: "low", createdAt: "2023-05-20" },
      { id: 302, title: "Update dependencies", status: "pending", priority: "medium", createdAt: "2023-05-19" },
      { id: 303, title: "Prepare presentation", status: "pending", priority: "low", createdAt: "2023-05-21" }
    ]
  },
  {
    id: 4,
    name: "James Dean",
    email: "james@timetoprogram.com",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    tasks: { pending: 3, inProgress: 1, completed: 1 },
    taskPer: { high: 2, low: 3, medium: 5 },
    taskList: [
      { id: 401, title: "Refactor authentication", status: "inProgress", priority: "high", createdAt: "2023-05-18" },
      { id: 402, title: "Design dashboard UI", status: "pending", priority: "medium", createdAt: "2023-05-17" },
      { id: 403, title: "Review pull requests", status: "pending", priority: "low", createdAt: "2023-05-19" },
      { id: 404, title: "Implement search feature", status: "inProgress", priority: "high", createdAt: "2023-05-15" },
      { id: 405, title: "Fix mobile layout", status: "completed", priority: "medium", createdAt: "2023-05-10" }
    ]
  },
  {
    id: 5,
    name: "Anna Grace",
    email: "anna@timetoprogram.com",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    tasks: { pending: 3, inProgress: 0, completed: 0 },
    taskPer: { high: 2, low: 3, medium: 5 },
    taskList: [
      { id: 501, title: "Write documentation", status: "pending", priority: "medium", createdAt: "2023-05-14" },
      { id: 502, title: "Create user guides", status: "pending", priority: "low", createdAt: "2023-05-16" },
      { id: 503, title: "Update FAQ section", status: "pending", priority: "low", createdAt: "2023-05-18" }
    ]
  },
  {
    id: 6,
    name: "Mark Lee",
    email: "mark@timetoprogram.com",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    tasks: { pending: 2, inProgress: 2, completed: 0 },
    taskPer: { high: 2, low: 3, medium: 5 },
    taskList: [
      { id: 601, title: "Setup analytics", status: "pending", priority: "medium", createdAt: "2023-05-17" },
      { id: 602, title: "Configure error tracking", status: "pending", priority: "high", createdAt: "2023-05-19" },
      { id: 603, title: "Implement dark mode", status: "inProgress", priority: "high", createdAt: "2023-05-12" },
      { id: 604, title: "Optimize images", status: "inProgress", priority: "low", createdAt: "2023-05-15" }
    ]
  },
  {
    id: 7,
    name: "Emma Rose",
    email: "emma@timetoprogram.com",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    tasks: { pending: 2, inProgress: 1, completed: 1 },
    taskPer: { high: 2, low: 3, medium: 5 },
    taskList: [
      { id: 701, title: "Design icons", status: "pending", priority: "low", createdAt: "2023-05-16" },
      { id: 702, title: "Create illustrations", status: "pending", priority: "medium", createdAt: "2023-05-18" },
      { id: 703, title: "Style buttons", status: "inProgress", priority: "medium", createdAt: "2023-05-14" },
      { id: 704, title: "Color scheme update", status: "completed", priority: "high", createdAt: "2023-05-10" }
    ]
  },
  {
    id: 8,
    name: "Luke Ryan",
    email: "luke@timetoprogram.com",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    tasks: { pending: 4, inProgress: 0, completed: 0 },
    taskPer: { high: 2, low: 3, medium: 5 },
    taskList: [
      { id: 801, title: "Write test cases", status: "pending", priority: "medium", createdAt: "2023-05-15" },
      { id: 802, title: "Review test coverage", status: "pending", priority: "high", createdAt: "2023-05-17" },
      { id: 803, title: "Setup test environment", status: "pending", priority: "medium", createdAt: "2023-05-19" },
      { id: 804, title: "Document test results", status: "pending", priority: "low", createdAt: "2023-05-20" }
    ]
  },
  {
    id: 9,
    name: "Adam Cole",
    email: "adam@timetoprogram.com",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    tasks: { pending: 4, inProgress: 3, completed: 0 },
    taskPer: { high: 2, low: 3, medium: 5 },
    taskList: [
      { id: 901, title: "Backend architecture", status: "pending", priority: "high", createdAt: "2023-05-14" },
      { id: 902, title: "Database schema", status: "pending", priority: "high", createdAt: "2023-05-16" },
      { id: 903, title: "API endpoints", status: "pending", priority: "medium", createdAt: "2023-05-18" },
      { id: 904, title: "Authentication flow", status: "pending", priority: "medium", createdAt: "2023-05-19" },
      { id: 905, title: "Data validation", status: "inProgress", priority: "high", createdAt: "2023-05-12" },
      { id: 906, title: "Error handling", status: "inProgress", priority: "medium", createdAt: "2023-05-15" },
      { id: 907, title: "Logging system", status: "inProgress", priority: "low", createdAt: "2023-05-17" }
    ]
  },
  {
    id: 10,
    name: "Lily May",
    email: "lily@timetoprogram.com",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    tasks: { pending: 0, inProgress: 0, completed: 0 },
    taskPer: { high: 2, low: 3, medium: 5 },
    taskList: []
  },
  {
    id: 11,
    name: "Mia Belle",
    email: "mia@timetoprogram.com",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg",
    tasks: { pending: 3, inProgress: 1, completed: 0 },
    taskPer: { high: 2, low: 3, medium: 5 },
    taskList: [
      { id: 1101, title: "Content strategy", status: "pending", priority: "medium", createdAt: "2023-05-16" },
      { id: 1102, title: "SEO optimization", status: "pending", priority: "high", createdAt: "2023-05-18" },
      { id: 1103, title: "Social media plan", status: "pending", priority: "low", createdAt: "2023-05-19" },
      { id: 1104, title: "Blog post drafts", status: "inProgress", priority: "medium", createdAt: "2023-05-15" }
    ]
  }
];

export default teamMembers;