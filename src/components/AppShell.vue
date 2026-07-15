<template>
  <div class="app-shell">
    <header class="shell-header">
      <RouterLink to="/" class="brand">
        <img src="/brandlogo.png" width="64" height="64" aria-hidden="true" />
        <span>
          <span class="brand-title">로 컬 허 브</span>
          <span class="brand-subtitle">서울의 지역 정보를 서로 공유해봐요.</span>
        </span>
      </RouterLink>

      <nav class="shell-nav" aria-label="주요 페이지">
        <RouterLink class="nav-link" to="/">홈</RouterLink>
        <RouterLink class="nav-link" to="/posts">게시글</RouterLink>
        <RouterLink class="nav-link" to="/curation">큐레이션</RouterLink>
        <RouterLink class="nav-link" to="/map">지도</RouterLink>
      </nav>
    </header>

    <slot />
  </div>
</template>
