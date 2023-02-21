---
layout: page
title: Journal
parent: Blog
has_children: true
---
# Journal
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
## Identity
```
Be yourself; 
everyone else is already taken
```

![](../../assets/9780375815164_p2_v1_s600x595.jpg)

{: .fs-6 .fw-300 }

