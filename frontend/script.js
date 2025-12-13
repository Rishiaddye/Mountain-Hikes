document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;
  
  // Check for saved theme preference or default to dark mode
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply saved theme
  if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  } else {
    document.body.classList.remove('light-mode');
    themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
  }
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    
    // Update icon
    if (document.body.classList.contains('light-mode')) {
      themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
      localStorage.setItem('theme', 'light');
    } else {
      themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
      localStorage.setItem('theme', 'dark');
    }
  });
});