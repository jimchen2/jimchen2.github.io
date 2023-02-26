---
layout: page
title: "20230209"
nav_order: 1
parent: Journal
grand_parent: Blog
---
<button class="btn js-toggle-dark-mode">Dark Mode</button>

<script>
const toggleDarkMode = document.querySelector('.js-toggle-dark-mode');

jtd.addEvent(toggleDarkMode, 'click', function(){
  if (jtd.getTheme() === 'dark') {
    jtd.setTheme('light');
    toggleDarkMode.textContent = 'Dark Mode';
  } else {
    jtd.setTheme('dark');
    toggleDarkMode.textContent = 'Light Mode';
  }
});
</script>
# 20230209
## Welcome to my new website
What's up, this is my first blog here.

I am testing to see how the site works. Hopefully it does! Wait for more to come! 
