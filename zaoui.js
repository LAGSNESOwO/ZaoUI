/**
 * UI Component Demo JavaScript
 * 控制所有页面交互功能
 */

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 初始化时检查系统偏好的深色模式
  initDarkMode();
  
  // 监听滚动来控制"返回顶部"按钮和侧边栏激活状态
  initScrollListeners();
  
  // 创建侧边栏切换按钮
  createSidebarToggle();
});

/**
 * 深色模式切换功能
 */
function toggleDarkModeDemo() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    document.getElementById('darkModeToggleDemo').textContent = '🌓';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('darkModeToggleDemo').textContent = '☀️';
  }
}

/**
 * 初始化深色模式
 */
function initDarkMode() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && 
      !document.documentElement.getAttribute('data-theme')) {
    document.documentElement.setAttribute('data-theme', 'dark');
    const toggleButton = document.getElementById('darkModeToggleDemo');
    if (toggleButton) {
      toggleButton.textContent = '☀️';
    }
  }
}

/**
 * 切换侧边栏显示/隐藏
 */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarContent = document.querySelector('.sidebar-content');
  
  if (sidebar) {
    // 移动端使用active类，桌面端使用hidden类
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('active');
    } else {
      sidebar.classList.toggle('hidden');
      if (sidebarContent) {
        sidebarContent.classList.toggle('expanded');
      }
    }
  }
}

/**
 * 创建侧边栏切换按钮
 */
function createSidebarToggle() {
  // 检查是否已经存在移动端按钮
  let mobileToggle = document.getElementById('mobileSidebarToggle');
  
  // 创建桌面端的侧边栏切换按钮
  if (!document.getElementById('desktopSidebarToggle')) {
    const toggleBtn = document.createElement('div');
    toggleBtn.id = 'desktopSidebarToggle';
    toggleBtn.className = 'sidebar-toggle-icon';
    toggleBtn.innerHTML = '☰';
    toggleBtn.onclick = toggleSidebar;
    
    document.body.appendChild(toggleBtn);
  }
}

/**
 * 获取固定顶栏的高度，用于滚动计算
 */
function getHeaderHeight() {
  const header = document.querySelector('header');
  return header ? header.offsetHeight : 60; // 默认高度为60px
}

/**
 * 平滑滚动到指定部分
 */
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = getHeaderHeight();
    
    // 平滑滚动，考虑顶部导航栏的高度
    window.scrollTo({
      top: section.offsetTop - headerHeight,
      behavior: 'smooth'
    });

    // 更新激活的导航项
    updateActiveNavItem(sectionId);

    // 在移动设备上点击后关闭侧边栏
    if (window.innerWidth <= 768) {
      toggleSidebar();
    }
  }
}

/**
 * 更新激活的导航项
 */
function updateActiveNavItem(sectionId) {
  const navItems = document.querySelectorAll('.sidebar-nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('onclick').includes(sectionId)) {
      item.classList.add('active');
    }
  });
}

/**
 * 平滑滚动到页面顶部
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * 初始化滚动监听器
 */
function initScrollListeners() {
  // 监听滚动以显示/隐藏"返回顶部"按钮
  window.addEventListener('scroll', function() {
    const jumpToTopBtn = document.getElementById('jumpToTop');
    if (jumpToTopBtn) {
      if (window.scrollY > 300) {
        jumpToTopBtn.classList.add('visible');
      } else {
        jumpToTopBtn.classList.remove('visible');
      }
    }
  });

  // 监听滚动以更新侧边栏活动项
  window.addEventListener('scroll', updateSidebarOnScroll, { passive: true });
}

/**
 * 根据滚动位置更新侧边栏
 */
function updateSidebarOnScroll() {
  const sections = [
    'introSection',
    'colorSection',
    'typographySection',
    'buttonSection',
    'cardSection',
    'formSection',
    'modalSection',
    'navSection',
    'newComponentsSection'
  ];

  // 查找当前视口中最可见的部分
  let currentSectionId = sections[0];
  let maxVisibleHeight = 0;
  const headerHeight = getHeaderHeight();

  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const rect = section.getBoundingClientRect();
    // 考虑顶栏高度计算可见高度
    const visibleHeight = Math.min(
      rect.bottom, window.innerHeight
    ) - Math.max(rect.top, headerHeight);

    if (visibleHeight > maxVisibleHeight) {
      maxVisibleHeight = visibleHeight;
      currentSectionId = sectionId;
    }
  });

  // 更新激活的导航项
  updateActiveNavItem(currentSectionId);
}

/**
 * 打开模态框
 */
function openDemoModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

/**
 * 关闭模态框
 */
function closeDemoModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * 更新进度条示例
 */
let currentProgress = 60;
function updateProgressBar() {
  currentProgress = (currentProgress + 10) % 110;
  if (currentProgress === 0) currentProgress = 10; // 循环
  const bar = document.getElementById('demoProgressBar');
  if (bar) {
    bar.style.width = currentProgress + '%';
    bar.textContent = currentProgress + '%';
  }
} 