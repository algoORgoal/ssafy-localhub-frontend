<template>
  <main class="page">
    <section class="hero-card">
      <span class="eyebrow">404</span>
      <h1 style="margin-top: 16px">페이지를 찾을 수 없습니다.</h1>
      <p class="lead">메뉴에서 다른 화면으로 이동해보세요.</p>
      <div class="hero-actions" style="margin-top: 22px">
        <RouterLink class="button" to="/">홈으로</RouterLink>
        <RouterLink class="button-secondary" to="/posts">게시글로</RouterLink>
      </div>
    </section>
  </main>
</template>