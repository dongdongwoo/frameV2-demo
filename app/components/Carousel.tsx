"use client";

import { useEffect, useState } from "react";
import { useGetCarouselList } from "~/app/hooks/useGetCarouselList";
import sdk from "@farcaster/frame-sdk";

const Carousel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const { data: carouselData, isLoading, error } = useGetCarouselList();

  // Frame SDK 초기화
  useEffect(() => {
    const initializeSDK = async () => {
      if (!isSDKLoaded) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const context = await sdk.context;
        setIsSDKLoaded(true);

        // Frame이 준비되었음을 알림
        sdk.actions.ready({});
      }
    };

    initializeSDK().catch(console.error);

    return () => {
      sdk.removeAllListeners();
    };
  }, [isSDKLoaded]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-600">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <div>Error loading data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-lg">
      {/* 상단 고정 부분 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Degenpad ITO Projects
        </h2>
        <div className="space-y-4">
          {/* Project Cards */}
          <div className="grid gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
              <p className="font-medium text-gray-800">
                <span className="inline-block bg-blue-200 text-blue-800 px-2 py-1 rounded mr-2">
                  1️⃣ Eco Project
                </span>
                Tiptok (@tiptok)
              </p>
              <p className="mt-2 text-blue-700">
                Tip Explorer built on Lum0x infrastructure - Empowering the
                DEGEN ecosystem
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
              <p className="font-medium text-gray-800">
                <span className="inline-block bg-purple-200 text-purple-800 px-2 py-1 rounded mr-2">
                  2️⃣ Eco Project
                </span>
                MemeTogether (@memetogether)
              </p>
              <p className="mt-2 text-purple-700">
                Meme Token Portfolio Exchange - Your gateway to the meme coin
                universe
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-100 hover:shadow-md transition-shadow">
              <p className="font-medium text-gray-800">
                <span className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded mr-2">
                  3️⃣ Open ITO
                </span>
                Degenpad (@degenpad)
              </p>
              <p className="mt-2 text-green-700">
                Open ITO for $DPAD LP Tokens - Always available for community
                participation
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-yellow-800">
              ITO subscriptions will be transferred as is. Terminated project
              allocations will be redistributed among active projects.
            </p>
          </div>

          <p className="text-sm font-medium text-center bg-gray-50 p-4 rounded-lg">
            Select a project below to participate in the ITO
          </p>
        </div>
      </div>

      {/* 칩 네비게이션 - 미니멀 모던 스타일 */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 bg-gray-50/80">
          {carouselData?.map((item, index) => (
            <button
              key={item.path}
              onClick={() => setActiveTab(index)}
              className={`
                px-6 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-300 ease-in-out
                ${
                  activeTab === index
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-white hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }
                relative overflow-hidden group
              `}
            >
              <div className="relative z-10 flex items-center gap-2">
                <span>ITO {index + 1}</span>
                {activeTab === index && (
                  <span className="text-blue-400">●</span>
                )}
              </div>
              {activeTab === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800" />
              )}
            </button>
          ))}
        </div>

        {/* 컨텐츠 영역 */}
        <div className="p-6 max-w-4xl mx-auto w-full">
          <div className="flex flex-col items-center">
            <div
              className="relative group w-full mb-6 overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              onClick={() => {
                if (carouselData?.[activeTab]?.path) {
                  window.open(carouselData[activeTab].path, "_blank");
                }
              }}
            >
              <img
                src={carouselData?.[activeTab]?.imageSrc}
                alt={`ITO ${activeTab + 1}`}
                className="w-full h-auto object-contain"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>
            <button
              className="w-full md:w-2/3 bg-gray-900 text-white px-8 py-4 text-lg rounded-full hover:bg-gray-800 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center gap-3 shadow-lg"
              onClick={() =>
                window.open(carouselData?.[activeTab]?.path ?? "", "_blank")
              }
            >
              <span>
                Go to ITO {(carouselData?.[activeTab]?.order ?? 0) + 1}
              </span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
