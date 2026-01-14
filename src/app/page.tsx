'use client';

import React from 'react';
import { ProductCard, CategoryCard, IconButton } from '@/components/ui';

export default function Home() {
  return (
    <div className="pb-24">
      {/* Top App Bar */}
      <header
        className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-oak-border dark:border-white/10"
        role="banner"
      >
        <div className="flex flex-col gap-1 p-4">
          <div className="flex items-center h-12 justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-primary/30 rounded-lg p-1" aria-label="온기상점 홈으로 이동">
              <span className="material-symbols-outlined text-primary text-3xl" aria-hidden="true">
                coffee
              </span>
              <h1 className="text-primary tracking-tight text-2xl font-extrabold leading-tight">
                온기상점
              </h1>
            </a>

            {/* Action Buttons */}
            <div className="flex items-center gap-3" role="group" aria-label="주요 기능">
              <IconButton icon="search" label="검색" />
              <IconButton icon="shopping_cart" label="장바구니" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="px-4 pb-2" aria-label="메인 네비게이션">
          <div className="flex gap-2 bg-warm-cream dark:bg-white/5 p-1.5 rounded-xl border border-oak-border dark:border-white/10" role="tablist">
            <a
              href="#"
              className="flex flex-1 items-center justify-center bg-primary text-white py-4 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-primary/30"
              role="tab"
              aria-selected="true"
              aria-current="page"
            >
              <p className="text-lg font-bold tracking-wider">홈</p>
            </a>
            <a
              href="#"
              className="flex flex-1 items-center justify-center text-primary/70 dark:text-white/70 py-4 rounded-lg hover:bg-primary/5 focus:outline-none focus:ring-4 focus:ring-primary/30"
              role="tab"
              aria-selected="false"
            >
              <p className="text-lg font-bold tracking-wider">베스트</p>
            </a>
            <a
              href="#"
              className="flex flex-1 items-center justify-center text-primary/70 dark:text-white/70 py-4 rounded-lg hover:bg-primary/5 focus:outline-none focus:ring-4 focus:ring-primary/30"
              role="tab"
              aria-selected="false"
            >
              <p className="text-lg font-bold tracking-wider">카테고리</p>
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main role="main">
        {/* Hero Banner Section */}
        <section className="p-4 pt-6" aria-labelledby="hero-title">
          <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-xl border-4 border-white dark:border-white/10">
            <div
              className="absolute inset-0 bg-cover bg-center"
              role="img"
              aria-label="시니어 부부가 아늑한 거실에서 차를 즐기는 모습"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(108, 79, 55, 0.1) 0%, rgba(108, 79, 55, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQLFLybW9RiiCYFBJ2G73RGYNeT8RIWCkH5KMEABz1WEF88iOMm3OGs9sTgwpJr_JdxhMlucy575rQFW1pFlJdEYad71a_n26nWdrV2qRoOKpaU14THXJlkLXHoB2bLtJpPNzFZ_nMWUkRzVqqNw3c94z_VpgGUKpLhpNZyCUopmA0D-WqLhq53Ovj27iXNsWO0WFZ0sxyvc7VX2RJwf9hL8PmymQepN14tZPtbJ3hB5Rz8FrmYDyFYbQUwxvagiAQ0OibhdoKTUA")',
              }}
            ></div>
            <div className="absolute bottom-0 left-0 p-6 flex flex-col gap-2">
              <span className="bg-primary/90 text-white text-sm font-bold px-3 py-1 rounded-full self-start">
                계절 추천
              </span>
              <h2 id="hero-title" className="text-white text-3xl font-bold leading-snug">
                따뜻한 차 한 잔처럼
                <br />
                포근한 일상을 선물하세요
              </h2>
              <p className="text-white/80 text-lg">시니어 필수품 기획전 최대 40%</p>
            </div>
          </div>
        </section>

        {/* Category Grid Section */}
        <section className="px-4 py-4" aria-labelledby="category-title">
          <h2
            id="category-title"
            className="text-primary dark:text-white text-2xl font-extrabold leading-tight tracking-tight mb-4 flex items-center gap-2"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              grid_view
            </span>
            자주 찾는 메뉴
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CategoryCard title="건강 관리" description="영양제 및 보조기구" icon="favorite" />
            <CategoryCard title="생활 편의" description="주방 및 청소 용품" icon="home_iot_device" />
            <CategoryCard title="효도 선물" description="마음을 전하는 선물셋트" icon="featured_seasonal_and_gifts" />
          </div>
        </section>

        {/* Recommended Products */}
        <section className="px-4 py-6" aria-labelledby="products-title">
          <div className="flex items-center justify-between mb-5">
            <h2 id="products-title" className="text-primary dark:text-white text-2xl font-extrabold leading-tight tracking-tight">
              오늘의 추천 상품
            </h2>
            <a
              href="#"
              className="text-primary/70 dark:text-white/70 font-bold flex items-center gap-1 hover:text-primary dark:hover:text-white focus:outline-none focus:ring-4 focus:ring-primary/30 rounded p-1"
            >
              전체보기{' '}
              <span className="material-symbols-outlined" aria-hidden="true">
                chevron_right
              </span>
            </a>
          </div>
          <div className="flex flex-col gap-6">
            <ProductCard
              name="인체공학 설계 프리미엄 오크 지팡이"
              category="프리미엄 리빙"
              price={54000}
              originalPrice={89000}
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuD44-M98c9VGOFXUozCknvca2txhWaOOYrln1SGzpPIQgR23YaobSH9WHgNndZ4SwMRauruTziXR-1rTKbl0xlc0h_4uT2nBnoCi3-S4xsCwLYBV-gWUZv6VkNZtKVy5aF2MPGtfPIV4kycO9DQ6CN3Yn98ZOgif8t6JR7TBag7yz8Aju4hgB_PP9NvP6oxISj4UcRmYGzAO1tMmOZQApVRrq-3XcmFbtrtXHgtr5HK_wkbV5RZcdZY1hhDKJCeWrxnynIV25H6Vlc"
              imageAlt="고품질 인체공학 오크 손잡이 지팡이"
              isFreeShipping={true}
              onAddToCart={() => console.log('장바구니에 추가됨')}
            />
            <ProductCard
              name="고밀도 메모리폼 허리 지지 쿠션"
              category="편안한 휴식"
              price={32800}
              imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDcr5KGvwYpuJAM7KE5eSt6zhRUh6EynnHAbfxtC-Nvq1MWDS0lzMbAJAwHqIqYQnnGvHszAe6NIJ4sBe-mFimb1xxit7bkYTKYke4Kcp8G5Q2tHalxK70jU0bzL3-V5YwOw6J27O1C663EJixjCTGH_JJLosaErf3nVASqDoT0Iq2jQBz3CUqK_ZDSGsxfC_5jY6j7R_4t3ivvqOKiXtqiWmstFg3wwLZBEgwV3FMAzSPKpkUyVldN6vcfwrp6YIy5JrcfWgX20js"
              imageAlt="안락의자용 메모리폼 요추 지지 베개"
              onAddToCart={() => console.log('장바구니에 추가됨')}
            />
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-oak-border dark:border-white/10 px-6 py-4 flex justify-between items-center z-50"
        role="navigation"
        aria-label="하단 네비게이션"
      >
        <a href="/" className="flex flex-col items-center gap-1 focus:outline-none focus:ring-4 focus:ring-primary/30 rounded p-2" aria-current="page">
          <div className="bg-primary px-5 py-2 rounded-full text-white flex items-center justify-center">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
              home
            </span>
          </div>
          <span className="text-primary dark:text-white text-xs font-bold">홈</span>
        </a>
        <a href="/favorites" className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-primary/30 rounded p-2">
          <div className="px-5 py-2 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary dark:text-white" aria-hidden="true">
              favorite
            </span>
          </div>
          <span className="text-primary dark:text-white text-xs font-bold">찜</span>
        </a>
        <a href="/recent" className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-primary/30 rounded p-2">
          <div className="px-5 py-2 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary dark:text-white" aria-hidden="true">
              history
            </span>
          </div>
          <span className="text-primary dark:text-white text-xs font-bold">최근 본</span>
        </a>
        <a href="/profile" className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-primary/30 rounded p-2">
          <div className="px-5 py-2 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary dark:text-white" aria-hidden="true">
              person
            </span>
          </div>
          <span className="text-primary dark:text-white text-xs font-bold">내 정보</span>
        </a>
      </nav>
    </div>
  );
}
